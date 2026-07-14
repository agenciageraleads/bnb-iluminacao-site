# Enxugamento da Linha Orna — ações necessárias

Contexto: o guia comercial enxugou a linha de postes ornamentais **Orna**. O site
precisa refletir a mesma mudança:

1. **Remover** 3 modelos ornamentais redundantes: **Aurora**, **Vespera**, **Serena**.
2. **Realocar** 2 modelos de Orna → linha **Versa** (postes decorativos): **EOS** e **Astrea**.

Orna final = **10 modelos**: Aquila, Harmonia, Lyra, Phoenix, Altair, Atlas, Orionis,
Aurum, Vela, Pyxis.

> ⚠️ Os produtos do site são renderizados **dinamicamente a partir do banco (Payload CMS)**
> via `src/lib/data.ts → getProducts()`. Não existe lista de modelos hard-coded no código.
> Portanto a remoção efetiva no site **acontece no admin do Payload**, não no código.
> Este PR ajusta apenas as fontes de *seed*/referência; a etapa de banco é manual (abaixo).

---

## O que este PR já fez (código/dados de seed)

| Arquivo | Mudança |
|---|---|
| `products-to-import.xlsx` | Removidas as linhas de rascunho de **Aurora Flangeado**, **Autora Engastado** (variante engastada da Aurora), **Vespera** e **Serena** — evita que `npm run import` (via `src/scripts/import-products.ts`) recrie esses produtos. |
| `all_products.txt` | Removidas as 4 linhas correspondentes do snapshot de referência do banco e atualizado o contador de linhas (68 → 64). |

### EOS e Astrea → Versa: **já estavam** feitos na `main`

Nenhuma alteração de código foi necessária para a realocação — já estava consistente em toda a base:

- `src/scripts/import-versa-products.ts` — EOS (`BB-VRS-EOSXX`) e Astrea (`BB-VRS-ASTXX`) já criados na categoria **Versa**.
- `products-to-import.xlsx` — ambos já constam com `Categoria = Versa` e modelo `BB-VRS-EOSXX` / `BB-VRS-ASTXX`.
- `src/lib/seo/images.ts` — `posteEos` / `posteAstrea` descritos como "Linha Versa".
- `public/llms.txt` — EOS e Astrea listados sob "Linha Versa".
- `all_products.txt` — ambos já constavam com categoria `Versa` no snapshot do banco.

---

## Ações manuais no admin do Payload (não dá pra rodar o DB local)

### 1. Excluir os produtos removidos (3 modelos = 4 registros)

Em **Products**, excluir os documentos com os slugs:

| Modelo | slug | categoria atual no dump |
|---|---|---|
| Aurora (flangeado) | `poste-ornamental-aurora-flangeado` | Ornamental |
| Aurora (engastado) | `porte-ornamental-autora-engastado` | Ornamental |
| Vespera | `poste-ornamental-vespera` | Geral |
| Serena | `poste-ornamental-serena` | Geral |

> Obs.: no banco a Aurora aparece como 2 registros (variantes flangeado/engastado), este
> último com o nome digitado como "Porte Ornamental **Autora** Engastado" (typo de Poste/Aurora).
> Ambos devem sair.

Se houver mídia (imagem) exclusiva desses produtos em **Media**, pode removê-la também.

### 2. Confirmar EOS e Astrea na categoria Versa

Em **Products**, verificar que `poste-ornamental-eos` e `poste-ornamental-astrea` estão com
**category = Versa**. Segundo o snapshot `all_products.txt`, ambos **já estão em Versa** — apenas
confirmar. Se ainda existir cópia antiga em Orna/Geral/Ornamental, remover a duplicata.

---

## ⚠️ Fora de escopo (sinalizar, não agir sem confirmação)

O snapshot do banco (`all_products.txt`) e o `products-to-import.xlsx` contêm **mais** rascunhos
ornamentais do que os 10 modelos finais — ex.: **Astra, Arcus, Ignis, Heliptica (×2), Polaris,
Aurion, Halo, Zéfiro**, além de variantes engastado/flangeado de Aquila e Harmonia. Muitos com
categoria inconsistente (`Geral` / `Ornamental` em vez de `orna`).

Este PR seguiu estritamente a instrução "só remover/realocar" os modelos nomeados (Aurora, Vespera,
Serena; EOS, Astrea). A reconciliação completa da linha Orna para exatamente 10 modelos — e a
padronização da categoria para `orna` — precisa de decisão comercial e **não** foi feita aqui.
