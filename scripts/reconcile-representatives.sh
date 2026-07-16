#!/bin/sh
set -eu

GENERIC_EMAIL='contato@bebiluminacao.com'
APPLY=0
KEEP_CRM_USER_ID=''
BACKUP_FILE=''

usage() {
  cat <<'EOF'
Uso:
  DATABASE_URL=... scripts/reconcile-representatives.sh
  DATABASE_URL=... scripts/reconcile-representatives.sh --keep-crm-user-id <uuid>
  DATABASE_URL=... scripts/reconcile-representatives.sh --apply --keep-crm-user-id <uuid> --backup-file <arquivo.dump>

Sem --apply, o script apenas mede duplicidades. Com uma identidade CRM, ele
valida o grupo que seria consolidado. A aplicação exige backup explícito.
EOF
}

fail() {
  printf '%s\n' "Erro: $*" >&2
  exit 1
}

require_database_url() {
  [ -n "${DATABASE_URL:-}" ] || fail 'DATABASE_URL não definido.'
  command -v psql >/dev/null 2>&1 || fail 'psql não encontrado.'
}

query_value() {
  psql "$DATABASE_URL" -At -v ON_ERROR_STOP=1 -c "$1"
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    --apply)
      APPLY=1
      ;;
    --keep-crm-user-id)
      shift
      [ "$#" -gt 0 ] || fail 'Informe o UUID após --keep-crm-user-id.'
      KEEP_CRM_USER_ID=$1
      ;;
    --backup-file)
      shift
      [ "$#" -gt 0 ] || fail 'Informe o caminho após --backup-file.'
      BACKUP_FILE=$1
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    *)
      usage >&2
      fail "Argumento desconhecido: $1"
      ;;
  esac
  shift
done

require_database_url

total=$(query_value 'SELECT count(*) FROM representatives;')
duplicate_groups=$(query_value "
  SELECT count(*)
  FROM (
    SELECT lower(btrim(email))
    FROM representatives
    WHERE lower(btrim(email)) <> '$GENERIC_EMAIL'
    GROUP BY 1
    HAVING count(*) > 1
  ) duplicate_emails;
")
shared_generic_groups=$(query_value "
  SELECT count(*)
  FROM (
    SELECT lower(btrim(email))
    FROM representatives
    WHERE lower(btrim(email)) = '$GENERIC_EMAIL'
    GROUP BY 1
    HAVING count(*) > 1
  ) shared_generic_emails;
")

printf 'Representantes: %s\n' "$total"
printf 'Grupos duplicados por e-mail não genérico: %s\n' "$duplicate_groups"
printf 'Grupos com e-mail genérico compartilhado: %s\n' "$shared_generic_groups"

if [ -z "$KEEP_CRM_USER_ID" ]; then
  [ "$APPLY" -eq 0 ] || fail '--apply exige --keep-crm-user-id.'
  exit 0
fi

case "$KEEP_CRM_USER_ID" in
  *[!0-9a-fA-F-]*|'') fail 'O crmUserId deve ser um UUID.' ;;
esac

selected_count=$(query_value "
  SELECT count(*)
  FROM representatives
  WHERE crm_user_id = '$KEEP_CRM_USER_ID';
")
[ "$selected_count" = '1' ] || fail 'A identidade CRM escolhida não corresponde a um único representante do site.'

group_count=$(query_value "
  WITH selected_email AS (
    SELECT lower(btrim(email)) AS email
    FROM representatives
    WHERE crm_user_id = '$KEEP_CRM_USER_ID'
  )
  SELECT count(*)
  FROM representatives
  WHERE lower(btrim(email)) = (SELECT email FROM selected_email);
")

[ "$group_count" -gt 1 ] || fail 'A identidade CRM escolhida não pertence a um grupo compartilhado no site.'
printf 'Registros que serão consolidados: %s\n' "$group_count"
printf 'Registros que serão removidos: %s\n' "$((group_count - 1))"

if [ "$APPLY" -eq 0 ]; then
  printf '%s\n' 'Dry-run concluído. Nenhum dado foi alterado.'
  exit 0
fi

[ -n "$BACKUP_FILE" ] || fail '--apply exige --backup-file.'
command -v pg_dump >/dev/null 2>&1 || fail 'pg_dump não encontrado.'
[ ! -e "$BACKUP_FILE" ] || fail 'O arquivo de backup já existe.'

pg_dump "$DATABASE_URL" --format=custom --table=public.representatives --file="$BACKUP_FILE"

deleted=$(query_value "
  WITH selected_email AS (
    SELECT lower(btrim(email)) AS email
    FROM representatives
    WHERE crm_user_id = '$KEEP_CRM_USER_ID'
  ), removed AS (
    DELETE FROM representatives
    WHERE lower(btrim(email)) = (SELECT email FROM selected_email)
      AND crm_user_id <> '$KEEP_CRM_USER_ID'
    RETURNING id
  )
  SELECT count(*) FROM removed;
")

remaining=$(query_value "
  WITH selected_email AS (
    SELECT lower(btrim(email)) AS email
    FROM representatives
    WHERE crm_user_id = '$KEEP_CRM_USER_ID'
  )
  SELECT count(*)
  FROM representatives
  WHERE lower(btrim(email)) = (SELECT email FROM selected_email);
")

[ "$remaining" = '1' ] || fail "Validação pós-aplicação falhou: restaram $remaining registros no grupo. Restaure $BACKUP_FILE antes de nova tentativa."
printf 'Consolidação concluída. Registros removidos: %s\n' "$deleted"
printf 'Backup: %s\n' "$BACKUP_FILE"
