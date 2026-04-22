import { getPayload } from 'payload'
import config from '../../payload.config'

async function listUsersAndReset() {
  const payload = await getPayload({ config })
  const users = await payload.find({ collection: 'users' })
  
  if (users.docs.length > 0) {
    console.log(`Encontrado ${users.docs.length} usuários.`);
    for (const user of users.docs) {
       console.log(`E-mail: ${user.email}`);
       await payload.update({
           collection: 'users',
           id: user.id,
           data: {
               password: 'admin'
           }
       });
       console.log(`Senha atualizada para 'admin' no usuário: ${user.email}`);
    }
  } else {
    console.log('Nenhum usuário encontrado. Criando admin dinâmico...');
    await payload.create({
        collection: 'users',
        data: {
            email: 'admin@bebiluminacao.com.br',
            password: 'admin',
        }
    });
    console.log('Usuário admin@bebiluminacao.com.br criado com senha "admin".')
  }
  process.exit(0);
}

listUsersAndReset()
