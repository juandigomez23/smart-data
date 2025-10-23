import prisma from "@/lib/prisma";

export async function getUserByEmail(email: string) {
  try {
    return await prisma.asesores.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error("Error buscando asesor:", error);
    return null;
  }
}

export async function upsertAsesor(data: { email: string; nombre?: string; image?: string }) {
  try {
    // Hacemos upsert directamente en el modelo `asesores` (el esquema actual usa `asesores`)
    const asesor = await prisma.asesores.upsert({
      where: { email: data.email },
      create: {
        nombre: data.nombre || "Sin nombre",
        email: data.email,
        estado: "activo",
        rol: "asesor",
        image: data.image || null,
      },
      update: {
        nombre: data.nombre || undefined,
        image: data.image || undefined,
      },
    });

    return asesor;
  } catch (error) {
    console.error("Error creando asesor:", error);
    throw error;
  }
}

export async function makeOwner(email: string, nombre?: string) {
  try {
    // Upsert asesor with owner role directly on `asesores` model
    const asesor = await prisma.asesores.upsert({
      where: { email },
      create: {
        nombre: nombre || 'Owner',
        email,
        estado: 'activo',
        rol: 'owner',
      },
      update: {
        nombre: nombre || undefined,
        rol: 'owner',
        estado: 'activo',
      }
    });

    return asesor;
  } catch (error) {
    console.error('Error creando owner:', error);
    throw error;
  }
}
