const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

(async () => {
  const prisma = new PrismaClient();
  try {
    const email = process.argv[2] || 'juan.vergara@bambubpo.com';
    const nombre = process.argv[3] || 'Juan Diego Vergara Gomez';

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({ data: { email, name: nombre } });
    }

    const asesor = await prisma.asesor.upsert({
      where: { email },
      create: {
        nombre: nombre,
        email,
        estado: 'activo',
        rol: 'owner',
        userId: user.id
      },
      update: {
        nombre: nombre,
        rol: 'owner',
        estado: 'activo',
        userId: user.id
      }
    });

    console.log('Owner upserted:', asesor);
    process.exit(0);
  } catch (e) {
    console.error('Error upserting owner:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
