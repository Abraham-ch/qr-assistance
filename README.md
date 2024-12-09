# QR Assistance

Un sistema de asistencia basado en QR utilizando Firebase y React con Vite.

## Instalación y configuración

### 1. Clonar el repositorio

Clona el repositorio y navega al directorio del proyecto:

```bash
git clone https://github.com/Abraham-ch/qr-assistance.git
cd qr-assistance
```

### 2. Instalar dependencias

Asegúrate de tener instalado pnpm, npm o yarn. Usa el siguiente comando para instalar las dependencias:

```bash
pnpm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables de entorno:

 ```bash
VITE_FIREBASE_API_KEY=TU_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=TU_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=TU_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=TU_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=TU_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=TU_APP_ID
VITE_FIREBASE_MEASUREMENT_ID=TU_MEASUREMENT_ID
```

### 4.Ejecutar la aplicación en desarrollo

Inicia el servidor de desarrollo con el siguiente comando:

```bash
pnpm dev
```

### 5.Compilar para producción

Para compilar la aplicación para producción, utiliza el siguiente comando:

```bash
pnpm build
```

## Estructura del proyecto

```bash 
src/
├── components/    # Componentes de React
├── firebase.js    # Configuración de Firebase
├── App.jsx        # Componente principal
├── main.jsx       # Punto de entrada
└── ...
```

## Dependencias principales

- React: Biblioteca de interfaces de usuario.
- Vite: Herramienta de construcción rápida.
- Firebase: Backend para autenticación y base de datos.
