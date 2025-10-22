import prisma from "@/lib/prisma";

export async function getUserByEmail(email: string) {
  try {
    return await prisma.asesor.findUnique({
      where: { email },
      include: { user: true },
    });
  } catch (error) {
    console.error("Error buscando asesor:", error);
    return null;
  }
}

export async function upsertAsesor(data: { email: string; nombre?: string; image?: string }) {
  try {
    // Verifica si ya existe el usuario base
    let user = await prisma.user.findUnique({ where: { email: data.email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: data.email,
          name: data.nombre || "Nuevo Asesor",
          image: data.image || null,
        },
      });
    }

    // Verifica o crea el asesor asociado
    let asesor = await prisma.asesor.findUnique({ where: { email: data.email } });
    if (!asesor) {
      asesor = await prisma.asesor.create({
        data: {
          nombre: data.nombre || "Sin nombre",
          email: data.email,
          estado: "activo",
          rol: "asesor",
          userId: user.id,
          image: data.image || null,
        },
      });
    }

    return asesor;
  } catch (error) {
    console.error("Error creando asesor:", error);
    throw error;
  }
}

export async function makeOwner(email: string, nombre?: string) {
  try {
    // Ensure base user
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({ data: { email, name: nombre || 'Owner' } });
    }

    // Upsert asesor with owner role
    const asesor = await prisma.asesor.upsert({
      where: { email },
      create: {
        nombre: nombre || 'Owner',
        email,
        estado: 'activo',
        rol: 'owner',
        userId: user.id
      },
      update: {
        nombre: nombre || undefined,
        rol: 'owner',
        estado: 'activo',
        userId: user.id
      }
    });

    return asesor;
  } catch (error) {
    console.error('Error creando owner:', error);
    throw error;
  }
}
