
# Smart Data

Aplicativo web para la gestión administrativa y operativa de formularios, usuarios, permisos y reportes. Desarrollado con Next.js, React y Tailwind CSS.

---

## 1. Descripción General

**Smart Data** es una plataforma que permite la administración eficiente de formularios, usuarios, permisos y reportes para equipos administrativos y asesores. Incluye autenticación, exportación de datos y una interfaz moderna y profesional.

---

## 2. Estructura del Proyecto

```
smart-data/
  ├── public/                # Archivos estáticos e imágenes
  ├── src/
  │   ├── app/               # Páginas principales y rutas
  │   ├── components/        # Componentes reutilizables (UI, layouts, formularios)
  │   ├── config/            # Configuración y esquemas de formularios (Zod)
  │   ├── hooks/             # Hooks personalizados para lógica de negocio
  │   ├── lib/               # Utilidades y lógica compartida
  │   ├── types/             # Tipos globales y personalizados
  │   └── utils/             # Funciones de utilidad (exportación, etc.)
  ├── package.json           # Dependencias y scripts
  ├── tailwind.config.js     # Configuración de Tailwind CSS
  ├── tsconfig.json          # Configuración de TypeScript
  └── README.md              # Documentación principal
```

---

## 3. Instalación y Ejecución

1. Instala las dependencias:
	```bash
	npm install
	```
2. Ejecuta el servidor de desarrollo:
	```bash
	npm run dev
	```
3. Accede a la app en [http://localhost:3000](http://localhost:3000).

---

## 4. Principales Módulos y Funcionalidades

- **Formularios Dinámicos:** Configurados en `src/config/forms/`, validados con Zod y renderizados por el componente `FormGenerator`.
- **Gestión de Usuarios y Permisos:** Vistas en `src/app/admin/users/` y `src/app/admin/permisos/`, con tarjetas y modales para administración.
- **Reportes y Exportación:** Módulo de reportes en `src/app/admin/reports/` y utilidades en `src/utils/exportutils.ts`.
- **Autenticación:** Implementada con NextAuth en `src/app/api/auth/[...nextauth]/`.
- **Hooks Personalizados:** Ejemplo: `useAsesor` para lógica de negocio y estado.

---

## 5. Ejemplo de Uso

Para agregar un nuevo formulario:
- Define la configuración en `src/config/forms/[nombre].ts`.
- Crea el esquema de validación en `src/config/forms/[nombre]-schema.ts` usando Zod.
- Usa el componente `FormGenerator` en la página correspondiente.

---

## 6. Buenas Prácticas y Convenciones

- Usa tipado estricto con TypeScript en todos los componentes y hooks.
- Documenta cada función y componente con comentarios JSDoc.
- Mantén la validación de campos obligatorios en los esquemas Zod.
- Utiliza los hooks personalizados para lógica compartida.

---

## 7. Despliegue

El proyecto está listo para desplegarse en Vercel o cualquier plataforma compatible con Next.js.

---

## 8. Contacto y Soporte

Para dudas, soporte o colaboración, contacta al responsable del proyecto o revisa la documentación interna.
