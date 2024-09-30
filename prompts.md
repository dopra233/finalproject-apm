# Prompts para la Documentación del Proyecto "Los Prado"

## Índice

1. [Descripción general del producto](#1-descripción-general-del-producto)
2. [Arquitectura del sistema](#2-arquitectura-del-sistema)
3. [Modelo de datos](#3-modelo-de-datos)
4. [Especificación de la API](#4-especificación-de-la-api)
5. [Historias de usuario](#5-historias-de-usuario)
6. [Tickets de trabajo](#6-tickets-de-trabajo)
7. [Pull requests](#7-pull-requests)

---

## 1. Descripción general del producto

**Prompt 1:**

> Rol: Como un consultor experto en comercio electrónico especializado en la venta de productos diversos, especialmente en la construcción de marketplaces en línea:
>
> Instrucción: Desarrolla una ficha detallada para un nuevo proyecto de ecommerce llamado "Los Prado." El objetivo principal del proyecto es facilitar la compra y venta de productos en línea, gestionando inventarios, pagos, y seguimiento de pedidos. Asegúrate de incluir una breve descripción del proyecto, las características principales, los objetivos, y la experiencia de usuario, detallando cómo se debe diseñar la interfaz y la navegación.

---

## 2. Arquitectura del Sistema

### **2.1. Diagrama de arquitectura:**

**Prompt 1:**

> Rol: Como arquitecto de sistemas experto en plataformas de comercio electrónico, especializado en arquitecturas basadas en Next.js, Node.js, y Firebase:
>
> Instrucción: Diseña y describe detalladamente la arquitectura del sistema para el proyecto de ecommerce "Los Prado," teniendo en cuenta las siguientes especificaciones tecnológicas:
>
> - **Frontend:** Next.js con Tailwind CSS.
> - **Backend:** Firebase SDK con integración de Firebase Firestore para la base de datos.
> - **Modelo de Arquitectura:** JAMstack.
>
> Explica los componentes principales (frontend, backend, integraciones), justifica por qué se ha elegido esta arquitectura, y describe tanto los beneficios como los sacrificios o déficits que implica. Incluye recomendaciones para garantizar el rendimiento y la seguridad de la aplicación.

---

## 3. Modelo de Datos

**Prompt 1:**

> Rol: Como experto en modelado de datos especializado en plataformas de comercio electrónico con experiencia en bases de datos NoSQL:
>
> Instrucción: Diseña y documenta el modelo de datos para el proyecto de ecommerce "Los Prado," utilizando Firebase Firestore como la base de datos. Asegúrate de incluir las entidades principales, sus atributos, claves primarias, claves foráneas, y las relaciones entre ellas. Explica en detalle el propósito de cada entidad, los tipos de datos, las restricciones, y el flujo de datos dentro del sistema.

---

## 4. Especificación de la API

**Prompt 1:**

> Rol: Como arquitecto de software especializado en el desarrollo de APIs para plataformas de comercio electrónico:
>
> Instrucción: Desarrolla una especificación detallada de la API para el sistema de ecommerce "Los Prado." La API será fundamental para la integración con sistemas externos y el desarrollo de aplicaciones cliente. Incluye los endpoints principales (usuarios, productos, pedidos, pagos), la versión de la API, el método de autenticación (e.g., JWT), y ejemplos claros de los endpoints (incluyendo métodos HTTP como GET, POST) y sus descripciones. Describe también cómo se manejarán las operaciones CRUD y los flujos básicos del sistema.

---

## 5. Historias de Usuario

**Prompt 1:**

> Rol: Como experto en gestión de proyectos de desarrollo de software especializado en ecommerce:
>
> Instrucción: Documenta tres historias de usuario para el flujo funcional básico de "Los Prado." Cada historia debe reflejar la perspectiva del usuario final e incluir criterios de aceptación claros. Luego, detalla tres tickets de trabajo correspondientes a estas historias de usuario: uno enfocado en el frontend, uno en el backend, y uno que abarque ambos. Para cada ticket, describe las tareas necesarias, el flujo de desarrollo, y los criterios de aceptación que deben cumplirse para dar por terminada la tarea.

---

## 6. Tickets de Trabajo

**Prompt 1:**

> Rol: Como experto en gestión de proyectos de desarrollo de software especializado en ecommerce:
>
> Instrucción: Documenta tres tickets de trabajo para el flujo funcional básico del proyecto "Los Prado." Estos tickets deben incluir uno enfocado en el frontend, uno en el backend, y uno que abarque ambos. Para cada ticket, detalla las tareas necesarias, el flujo de desarrollo, y los criterios de aceptación que deben cumplirse para dar por terminada la tarea. Describe también cómo se integran estos tickets en el flujo general de desarrollo.

**Ticket 1: Implementar Página de Inicio (Frontend)**

- Descripción: Crear una página de inicio que muestre una lista de productos con filtros y opciones para navegar a los detalles del producto.
- Tareas:
  1. Diseñar la interfaz de la página principal usando Next.js y Tailwind CSS.
  2. Implementar el listado de productos con filtros y ordenamiento.
  3. Habilitar la navegación a la página de detalles del producto al hacer clic en un producto.
- Criterios de Aceptación:
  - La página principal debe mostrar una lista de productos y permitir filtrarlos por categoría y precio.
  - Al hacer clic en un producto, el usuario debe ser redirigido a la página de detalles del producto.

**Ticket 2: Desarrollar el Proceso de Pago (Backend y Frontend)**

- Descripción: Implementar la página de checkout que permite al usuario procesar un pedido con la selección de dirección y método de pago.
- Tareas:
  1. Crear un formulario de pago con campos para la dirección y el método de pago.
  2. Implementar la lógica para almacenar el pedido en `localStorage`.
  3. Limpiar el carrito y actualizar el historial de pedidos tras la confirmación del pedido.
- Criterios de Aceptación:
  - La página de checkout debe mostrar los productos seleccionados y calcular el total.
  - Al confirmar el pedido, el sistema debe almacenar los datos en `localStorage` y vaciar el carrito.

**Ticket 3: Implementar Historial de Pedidos (Frontend)**

- Descripción: Crear la sección "Mi Cuenta" para mostrar el historial de pedidos realizados por el usuario.
- Tareas:
  1. Diseñar la página de "Mi Cuenta" y conectar con `localStorage` para cargar los pedidos.
  2. Mostrar los detalles de cada pedido, incluyendo fecha, estado, y productos comprados.
- Criterios de Aceptación:
  - La página "Mi Cuenta" debe mostrar una lista de pedidos realizados, con todos los detalles relevantes.
  - La lista debe actualizarse automáticamente cuando se confirmen nuevos pedidos.

---

## 7. Pull Requests

**Prompt 1:**

> Rol: Como desarrollador especializado en frontend y backend de comercio electrónico:
>
> Instrucción: Crea y documenta los prompts para las Pull Requests necesarias para las implementaciones realizadas en el proyecto "Los Prado." Cada Pull Request debe contener un resumen claro de los cambios realizados, su propósito, y cualquier consideración adicional que deba ser tenida en cuenta (como dependencias, pruebas o documentación adicional).
