require('dotenv').config();

const { getPayload } = require('payload');
const config = require('./payload.config').default;

async function createAdmin() {
  const payload = await getPayload({ config });
  
  const email = 'contato@bebiluminacao.com.br';
  const newPassword = 'Admin_BeB_2024!';

  console.log('Attempting to check/create/reset admin user...');

  try {
    // Tenta atualizar o test@admin.com primeiro
    const updatedTest = await payload.update({
      collection: 'users',
      where: {
        email: { equals: 'test@admin.com' }
      },
      data: {
        password: newPassword,
      },
    });

    if (updatedTest.docs.length > 0) {
        console.log('Password reset for test@admin.com to:', newPassword);
        process.exit(0);
    }

    // Se não existir, tenta criar o novo
    const user = await payload.create({
      collection: 'users',
      data: {
        email: email,
        password: newPassword,
        name: 'Lucas B&B',
        role: 'admin',
      },
    });
    console.log('Admin user created successfully:', user.email, 'with password:', newPassword);
  } catch (error) {
    console.error('Error during admin operation:', error.message);
  }
  process.exit(0);
}

createAdmin();
