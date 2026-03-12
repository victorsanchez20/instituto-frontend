# Frontend Academia - Sistema de Gestión Académica

![Angular](https://img.shields.io/badge/Angular-21.0.0-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![npm](https://img.shields.io/badge/npm-10.9.3-green)

## Descripción

**Frontend Academia** es una aplicación web desarrollada con Angular que proporciona un sistema integral de gestión académica. Permite a administradores, profesores y estudiantes interactuar con la plataforma para gestionar cursos, aulas, inscriciones y seguimiento académico.

## Características Principales

- ✅ **Panel de Administrador**: Gestión completa de usuarios, cursos y aulas
- ✅ **Área de Estudiante**: Acceso a cursos inscritos, oferta académica y calificaciones
- ✅ **Autenticación y Seguridad**: Sistema de login y signup integrado
- ✅ **Gestión de Cursos**: Crear, editar y eliminar cursos académicos
- ✅ **Gestión de Aulas**: Control de aulas y sus integrantes
- ✅ **Inscripciones**: Sistema de inscripción de estudiantes a cursos
- ✅ **Diseño Responsivo**: Interfaz adaptativa para diferentes dispositivos

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v18 o superior)
- **npm** (v10.9.3 o superior)
- **Angular CLI** (v21.0.0)

```bash
# Verificar versiones
node --version
npm --version
ng version
```

## Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd frontend-academia
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar el servidor de desarrollo**
```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200/`

## Scripts Disponibles

### Desarrollo
```bash
npm start                # Inicia el servidor de desarrollo (ng serve)
npm run watch           # Inicia compilación en modo watch
```

### Compilación
```bash
npm run build           # Compila la aplicación para producción
```

### Testing
```bash
npm test                # Ejecuta pruebas unitarias (Vitest)
```

### Angular CLI
```bash
ng generate component componente-name   # Crear nuevo componente
ng generate service servicio-name       # Crear nuevo servicio
```

## Estructura del Proyecto

```
src/
├── app/
│   ├── admin/                    # Módulo de administración
│   │   └── pages/
│   │       ├── aula/            # Gestión de aulas
│   │       ├── curso/           # Gestión de cursos
│   │       ├── profesor/        # Gestión de profesores
│   │       ├── lista-alumnos/   # Listado de alumnos
│   │       └── inicio-admin/    # Dashboard del admin
│   │
│   ├── auth/                     # Módulo de autenticación
│   │   └── pages/
│   │       ├── login/           # Página de inicio de sesión
│   │       └── signup/          # Página de registro
│   │
│   ├── student/                  # Módulo de estudiante
│   │   └── pages/
│   │       ├── inicio/          # Dashboard del estudiante
│   │       ├── mis-cursos/      # Cursos inscritos
│   │       └── oferta-academica/ # Cursos disponibles
│   │
│   ├── public/                   # Módulo público
│   │   └── pages/
│   │       ├── home/            # Página principal
│   │       ├── nosotros/        # Información de la institución
│   │       ├── contacto/        # Formulario de contacto
│   │       └── cursos-public/   # Cursos públicos
│   │
│   ├── layouts/                  # Componentes de diseño
│   │   ├── admin-layout/        # Layout para admin
│   │   ├── auth-layout/         # Layout para auth
│   │   ├── public-layout/       # Layout público
│   │   └── student-layout/      # Layout para estudiante
│   │
│   ├── models/                   # Modelos de datos
│   │   ├── aula.ts
│   │   ├── curso.ts
│   │   ├── estudiante.ts
│   │   ├── inscripcion.ts
│   │   ├── profesor.ts
│   │   └── estado.ts
│   │
│   ├── services/                 # Servicios HTTP
│   │   ├── aula.service.ts
│   │   ├── curso.service.ts
│   │   ├── estudiante.service.ts
│   │   ├── inscripcion.service.ts
│   │   ├── profesor.service.ts
│   │   └── estado.service.ts
│   │
│   ├── app.routes.ts            # Rutas de la aplicación
│   ├── app.config.ts            # Configuración principal
│   └── app.ts                   # Componente root
│
├── assets/                       # Recursos estáticos
├── environments/                 # Configuración de entornos
│   ├── environment.ts           # Desarrollo
│   └── environment.prod.ts      # Producción
├── main.ts                      # Punto de entrada de la aplicación
└── styles.css                   # Estilos globales
```

## Tecnologías Utilizadas

### Frontend
- **Angular 21.0.0**: Framework principal
- **TypeScript 5.9**: Lenguaje de programación
- **RxJS 7.8.0**: Programación reactiva
- **CSS 3**: Estilos de aplicación
- **SweetAlert2**: Alertas personalizadas

### DevOps & Testing
- **Vitest 4.0.8**: Framework de testing
- **jsdom 27.1.0**: Simulador de DOM para pruebas
- **Angular CLI 21.0.0**: Herramientas de desarrollo
- **Prettier**: Formateador de código

## Configuración de Rutas

La aplicación utiliza Angular Router con las siguientes rutas principales:

- `/` - Página pública principal
- `/public/home` - Inicio público
- `/public/cursos` - Cursos disponibles públicos
- `/public/nosotros` - Información institucional
- `/public/contacto` - Formulario de contacto
- `/auth/login` - Inicio de sesión
- `/auth/signup` - Registro de usuario
- `/admin/*` - Panel de administración (requiere auth)
- `/student/*` - Área del estudiante (requiere auth)

## Modelos de Datos

### Estudiante
```typescript
{
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: Date;
  estado: Estado;
}
```

### Curso
```typescript
{
  id: number;
  nombre: string;
  descripcion: string;
  profesor: Profesor;
  creditos: number;
  estado: Estado;
}
```

### Aula
```typescript
{
  id: number;
  nombre: string;
  capacidad: number;
  estado: Estado;
  integrantes: Estudiante[];
}
```

### Inscripción
```typescript
{
  id: number;
  estudiante: Estudiante;
  curso: Curso;
  aula: Aula;
  fechaInscripcion: Date;
  estado: Estado;
}
```

## Servicios Disponibles

Todos los servicios se encuentran en `src/app/services/` y proporcionan métodos CRUD:

| Servicio | Entidad | Métodos |
|----------|---------|---------|
| `AulaService` | Aulas | GET, POST, PUT, DELETE |
| `CursoService` | Cursos | GET, POST, PUT, DELETE |
| `EstudianteService` | Estudiantes | GET, POST, PUT, DELETE |
| `InscripcionService` | Inscripciones | GET, POST, PUT, DELETE |
| `ProfesorService` | Profesores | GET, POST, PUT, DELETE |
| `EstadoService` | Estados | GET |

## Debugging

### Usando Chrome DevTools
1. Inicia la aplicación con `npm start`
2. Abre Chrome en `http://localhost:4200`
3. Presiona `F12` para abrir DevTools
4. Accede a la pestaña "Sources" para debug de TypeScript

### Usando VS Code Debugger
1. Presiona `F5` para iniciar el debugger
2. Selecciona la configuración "ng serve"
3. Coloca breakpoints en el código
4. La aplicación se abrirá automáticamente en Chrome

## Configuración de Entornos

### Desarrollo
```typescript
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

### Producción
```typescript
// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.produccion.com'
};
```

## Convenciones de Código

- **Componentes**: PascalCase (ej: `LoginComponent`)
- **Archivos**: kebab-case (ej: `login.component.ts`)
- **Variables/Métodos**: camelCase (ej: `userName`)
- **Constantes**: UPPER_SNAKE_CASE (ej: `MAX_USERS`)
- **Interfaces**: PascalCase con prefijo `I` (ej: `IEstudiante`)

## Formatos de Código

El proyecto utiliza **Prettier** para mantener la consistencia de formato:

```json
{
  "printWidth": 100,
  "singleQuote": true,
  "overrides": [
    {
      "files": "*.html",
      "options": {
        "parser": "angular"
      }
    }
  ]
}
```

## Contribución

Para contribuir al proyecto:

1. Crea una rama para tu feature (`git checkout -b feature/nueva-feature`)
2. Realiza tus cambios
3. Ejecuta las pruebas (`npm test`)
4. Haz commit de tus cambios (`git commit -m 'Agregar nueva feature'`)
5. Push a la rama (`git push origin feature/nueva-feature`)
6. Abre un Pull Request

## Solución de Problemas

### El servidor no inicia
```bash
# Limpia la caché y reinstala dependencias
rm -rf node_modules
npm cache clean --force
npm install
npm start
```

### Puerto 4200 en uso
```bash
# Especifica un puerto diferente
ng serve --port 4201
```

### Problemas de CORS
Verifica la configuración de proxy en `angular.json` y asegúrate de que tu API esté configurada correctamente.

## Recursos Útiles

- [Documentación Angular](https://angular.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [RxJS Documentation](https://rxjs.dev/)
- [Angular CLI Commands](https://angular.io/cli)

## Licencia

Este proyecto está bajo licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## Autor

Desarrollado como sistema de gestión académica integral para instituciones educativas.

---

**Última actualización**: Marzo 2026
