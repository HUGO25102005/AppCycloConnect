# 📱 MyMusic — Tu música, siempre contigo

<!-- Aplicación móvil de streaming y gestión de música personal -->

Aplicación móvil construida con **React Native + Expo + TypeScript + Redux Toolkit + RTK Query** siguiendo una arquitectura **feature-based**. Esta app permite a los usuarios autenticarse, gestionar sus listas de reproducción y disfrutar de su música favorita en cualquier dispositivo.

> **Estado:** `alpha` / `en desarrollo`  
> **Mantenimiento:** Isai Rodriguez  
> **Licencia:** MIT

---

## 🔎 Índice

- [Arquitectura](#-arquitectura)
- [Tecnologías](#-tecnologías)
- [Estructura de carpetas](#-estructura-de-carpetas)
- [Guía rápida](#-guía-rápida)
- [Variables de entorno](#-variables-de-entorno)
- [Alias de imports](#-alias-de-imports)
- [Estado y datos](#-estado-y-datos)
- [Navegación](#-navegación)
- [Estilos y tema](#-estilos-y-tema)
- [Calidad y convenciones](#-calidad-y-convenciones)
- [Testing](#-testing)
- [Rendimiento y accesibilidad](#-rendimiento-y-accesibilidad)
- [Troubleshooting](#-troubleshooting)
- [Roadmap](#-roadmap)

---

## 🧱 Arquitectura

**Enfoque:** _feature-first_. Todo lo que pertenece al dominio de un módulo vive en su **feature** (UI, tipos, estado local del feature, endpoints RTKQ).

- **`/src/core`**: piezas transversales (store, baseApi, navegación, tema, hooks, utils, tipos globales).
- **`/src/features/<feature>`**: `api/`, `model/`, `components/`, `screens/`, `hooks/`, `types/`, `index.ts`.
- **`/src/shared`**: UI reusable (Botones, Inputs, estados `Loading/Error/Empty`), sin lógica de dominio.
- **`/src/app`**: rutas file-based con expo-router.

### Diagrama de flujo

```
┌─────────────────────────────────────────────┐
│          Usuario inicia la app              │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
         ┌─────────────────────┐
         │   expo-router       │
         │   (src/app/)        │
         └─────────┬───────────┘
                   │
         ┌─────────▼──────────┐
         │   _layout.tsx      │ ◄──── Stack Navigator
         │   (Root Layout)    │
         └─────────┬──────────┘
                   │
         ┌─────────▼──────────┐
         │   index.tsx        │ ◄──── Redirect
         │   (/)              │
         └─────────┬──────────┘
                   │
         ┌─────────▼──────────┐
         │  /auth/login       │ ◄──── Feature Auth
         │  LoginScreen       │
         └─────────┬──────────┘
                   │
         ┌─────────▼──────────┐
         │  useLoginForm      │ ◄──── Custom Hook
         │  (validaciones)    │
         └─────────┬──────────┘
                   │
         ┌─────────▼──────────┐
         │  Shared Components │ ◄──── Input, Button
         │  (UI reutilizable) │
         └────────────────────┘
```

---

## 🧰 Tecnologías

| Categoría        | Tecnología        | Versión           |
| ---------------- | ----------------- | ----------------- |
| **Runtime**      | Expo              | ~54.0.13          |
| **Framework**    | React Native      | 0.81.4            |
| **Lenguaje**     | TypeScript        | ~5.9.2            |
| **Estado**       | Redux Toolkit     | ^2.9.1            |
| **Cache/API**    | RTK Query         | (incluido en RTK) |
| **Navegación**   | Expo Router       | ~6.0.12           |
| **Estilos**      | StyleSheet nativo | -                 |
| **Persistencia** | Redux Persist     | ^6.0.0            |
| **Storage**      | AsyncStorage      | 2.2.0             |

### Herramientas de desarrollo

- **babel-plugin-module-resolver** para aliases
- **babel-preset-expo** para transformaciones
- **TypeScript strict mode** habilitado

---

## 🗂 Estructura de carpetas

```bash
practice-class-02/
├── src/
│   ├── app/                          # Expo Router (file-based routing)
│   │   ├── _layout.tsx              # Root Stack Navigator
│   │   ├── index.tsx                # Redirect a /auth/login
│   │   └── auth/
│   │       └── login.tsx            # Ruta de login
│   │
│   ├── core/                         # TODO: Configuración central (próxima fase)
│   │   ├── api/                     # baseApi.ts con RTK Query
│   │   ├── navigation/              # Navegadores y helpers
│   │   ├── store/                   # Redux store, persist config
│   │   ├── theme/                   # Tokens de diseño (colors, spacing)
│   │   ├── hooks/                   # useAppDispatch, useAppSelector
│   │   ├── utils/                   # Utilidades globales
│   │   └── types/                   # Tipos globales (ApiError, etc)
│   │
│   ├── features/                     # Features del dominio
│   │   ├── auth/                    # ✅ Feature de autenticación
│   │   │   ├── screens/
│   │   │   │   ├── LoginScreen.tsx  # Pantalla de login con validaciones
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useLoginForm.ts  # Hook personalizado del formulario
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   └── index.ts         # LoginFormData, ValidationErrors
│   │   │   ├── api/                 # TODO: auth.api.ts (RTK Query)
│   │   │   ├── model/               # TODO: auth.slice.ts (Redux)
│   │   │   └── index.ts
│   │   │
│   │   └── lists/                   # TODO: Feature de listas de música
│   │
│   ├── shared/                       # Componentes y utils reutilizables
│   │   ├── components/
│   │   │   ├── Input.tsx            # ✅ Input con label y error
│   │   │   ├── Button.tsx           # ✅ Button con variantes
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   ├── validators.ts        # ✅ Validaciones (email, password)
│   │   │   └── index.ts
│   │   ├── hooks/                   # Hooks compartidos
│   │   └── types/                   # Tipos compartidos
│   │
│   └── assets/                       # Imágenes, iconos, fuentes
│
├── babel.config.js                   # ✅ Configuración de Babel + aliases
├── tsconfig.json                     # ✅ TypeScript config + paths
├── app.json                          # ✅ Configuración de Expo
└── package.json                      # Dependencias del proyecto
```

**Leyenda:**

- ✅ = Implementado
- TODO = Pendiente de implementar

---

## 🚀 Guía rápida

### Prerrequisitos

- **Node.js** >= 18.x
- **npm** >= 9.x
- **Expo CLI** (se instala automáticamente)
- **Expo Go** app en tu móvil (para testing rápido)

### Instalación

```bash
# Clonar el repositorio
git clone <URL_DEL_REPO>
cd practice-class-02

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm start

# O directamente en simulador/emulador
npm run ios      # iOS simulator
npm run android  # Android emulator
npm run web      # Navegador
```

### Comandos disponibles

```bash
npm start              # Inicia Expo Dev Server
npm run ios            # Abre en iOS Simulator
npm run android        # Abre en Android Emulator
npm run web            # Abre en navegador

# Limpiar caché si hay problemas
npx expo start --clear
```

---

## 🔐 Variables de entorno

> **Nota:** Por ahora no se requieren variables de entorno. En la próxima fase (integración con API):

```bash
# .env.local (ejemplo para futura implementación)
API_BASE_URL=https://api.mymusic.com
API_TIMEOUT=10000
ENVIRONMENT=development
```

Crear archivo `.env.local` copiando desde `.env.example` (cuando se implemente).

---

## 📦 Alias de imports

Configurados en `babel.config.js` y `tsconfig.json`:

```typescript
// Alias globales
import { Button } from "@shared/components";
import { validateEmail } from "@shared/utils";

// Alias por feature
import { LoginScreen } from "@auth/screens/LoginScreen";
import { useLoginForm } from "@auth/hooks/useLoginForm";
import type { LoginFormData } from "@auth/types";

// Alias de core (próxima implementación)
import { baseApi } from "@core/api/baseApi";
import { store } from "@core/store";
```

### Tabla de aliases

| Alias         | Ruta                   | Uso                           |
| ------------- | ---------------------- | ----------------------------- |
| `@/*`         | `src/*`                | Acceso general                |
| `@core/*`     | `src/core/*`           | API, store, theme, utils      |
| `@features/*` | `src/features/*`       | Todos los features            |
| `@shared/*`   | `src/shared/*`         | Componentes/utils compartidos |
| `@assets/*`   | `src/assets/*`         | Imágenes, iconos              |
| `@app/*`      | `src/app/*`            | Rutas de expo-router          |
| `@auth/*`     | `src/features/auth/*`  | Feature de autenticación      |
| `@lists/*`    | `src/features/lists/*` | Feature de listas             |

---

## 🗄 Estado y datos

### Estado actual (alpha)

**Gestión local con `useState`** en hooks personalizados:

- `useLoginForm`: maneja email, password, errores y validaciones

### Próxima fase (integración con API)

#### RTK Query (cache de servidor)

```typescript
// src/features/auth/api/auth.api.ts
export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});
```

#### Redux Slice (estado UI local)

```typescript
// src/features/auth/model/auth.slice.ts
const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, user: null },
  reducers: {
    logout: (state) => {
      /* ... */
    },
  },
});
```

---

## 🧭 Navegación

**Expo Router** con enrutado file-based:

```
/                    → Redirect a /auth/login
/auth/login          → LoginScreen
/auth/register       → TODO
/home                → TODO (pantalla principal)
/profile             → TODO
```

### Estructura de rutas

```typescript
// src/app/_layout.tsx
<Stack>
  <Stack.Screen name="index" />
  <Stack.Screen name="auth/login" />
</Stack>;

// Navegación programática
import { useRouter } from "expo-router";

const router = useRouter();
router.push("/home");
router.replace("/auth/login");
```

### Deep Linking

Configurado con el scheme `mymusic://`:

```
mymusic://auth/login
mymusic://profile
```

---

## 🎨 Estilos y tema

**StyleSheet nativo** de React Native (sin dependencias externas adicionales por ahora).

### Tokens de diseño (implementados inline)

```typescript
// Colores principales
const colors = {
  primary: "#007AFF",
  error: "#e74c3c",
  text: "#333",
  textSecondary: "#666",
  border: "#ddd",
  background: "#f8f9fa",
};

// Espaciado
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 40,
};
```

### Próxima fase: Theme Provider

```typescript
// src/core/theme/tokens.ts
export const theme = {
  colors: {
    /* ... */
  },
  spacing: {
    /* ... */
  },
  typography: {
    /* ... */
  },
  radii: {
    /* ... */
  },
};
```

---

## ✅ Calidad y convenciones

### TypeScript

- **Modo estricto habilitado** (`strict: true`)
- Sin `any` implícitos
- Tipado fuerte en props, state y APIs

### Convenciones de código

#### Nomenclatura

- **Componentes**: `PascalCase` (ej. `LoginScreen`, `Button`)
- **Funciones/variables**: `camelCase` (ej. `handleSubmit`, `formData`)
- **Tipos**: `PascalCase` (ej. `LoginFormData`, `ValidationErrors`)
- **Archivos**: coinciden con el export principal

#### Estructura de componentes

```typescript
// 1. Imports
import React from "react";
import { View, Text } from "react-native";

// 2. Types/Interfaces
interface Props {
  title: string;
}

// 3. Component
export const MyComponent: React.FC<Props> = ({ title }) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

// 4. Styles
const styles = StyleSheet.create({
  /* ... */
});
```

#### Commits (Conventional Commits)

```bash
feat: agregar pantalla de registro
fix: corregir validación de email
refactor: reorganizar estructura de auth
docs: actualizar README
chore: actualizar dependencias
test: agregar tests para useLoginForm
```

---

## 🧪 Testing

### Próxima implementación

```bash
# Unit tests (utils, hooks, selectors)
npm run test

# Component tests
npm run test:components

# E2E tests (Detox)
npm run test:e2e
```

**Stack sugerido:**

- **Jest** para tests unitarios
- **@testing-library/react-native** para componentes
- **Detox** para E2E (opcional)

---

## ⚡ Rendimiento y accesibilidad

### Optimizaciones implementadas

✅ **KeyboardAvoidingView** en LoginScreen  
✅ **ScrollView** para pantallas pequeñas  
✅ **useCallback/useMemo** en hooks personalizados  
✅ **Platform-specific behavior** (iOS/Android)

### Próximas optimizaciones

- [ ] React.memo en componentes de lista
- [ ] FlatList con `keyExtractor`, `getItemLayout`, `removeClippedSubviews`
- [ ] Code splitting por feature
- [ ] Lazy loading de imágenes

### Accesibilidad

```typescript
// TODO: Agregar props de accesibilidad
<TouchableOpacity
  accessible
  accessibilityLabel="Iniciar sesión"
  accessibilityRole="button"
  accessibilityHint="Presiona para iniciar sesión"
>
```

---

## 🔧 Troubleshooting

### Metro Bundler: "Got unexpected undefined"

**Causa:** Caché corrupta o módulos no resueltos

**Solución:**

```bash
# Limpiar caché completa
rm -rf .expo node_modules/.cache
npx expo start --clear
```

### Alias no funcionan

**Verificar:**

1. `babel.config.js` tiene `babel-plugin-module-resolver` configurado
2. `tsconfig.json` tiene `paths` configurado
3. Reiniciar el servidor con `--clear`

### "Attempted to navigate before mounting"

**Causa:** Navegación en `useEffect` antes de que el layout esté listo

**Solución:** Usar `<Redirect />` en lugar de `router.replace()`:

```typescript
// ❌ Incorrecto
useEffect(() => {
  router.replace("/auth/login");
}, []);

// ✅ Correcto
return <Redirect href="/auth/login" />;
```

### iOS Simulator no abre

```bash
# Verificar que Xcode esté instalado
xcode-select --install

# Abrir manualmente
npm run ios
```

### Android Emulator no conecta

```bash
# Verificar emulador corriendo
adb devices

# Reiniciar ADB
adb kill-server && adb start-server

npm run android
```

---

## 🗺 Roadmap

### Fase 1: Autenticación local ✅ (Actual)

- [x] Configuración inicial de Expo + TypeScript
- [x] Configuración de aliases
- [x] Expo Router básico
- [x] LoginScreen con Flexbox
- [x] Validaciones locales (email, password)
- [x] Componentes shared (Input, Button)

### Fase 2: Integración con API 🚧 (Próxima)

- [ ] Configurar baseApi con RTK Query
- [ ] Crear auth.api.ts con endpoints de login/register
- [ ] Crear auth.slice.ts para gestionar token y usuario
- [ ] Integrar validaciones con respuestas del servidor
- [ ] Implementar Redux Persist para mantener sesión
- [ ] Manejo de errores de red (401, 500, etc)

### Fase 3: Features de usuario

- [ ] Pantalla de registro
- [ ] Recuperación de contraseña
- [ ] Perfil de usuario
- [ ] Edición de perfil

### Fase 4: Música y listas

- [ ] Feature de listas de reproducción
- [ ] Búsqueda de canciones
- [ ] Reproductor de música
- [ ] Favoritos y likes

### Fase 5: Polish y producción

- [ ] Testing completo (unit, component, E2E)
- [ ] Optimizaciones de rendimiento
- [ ] Accesibilidad completa
- [ ] Build de producción (EAS Build)
- [ ] Publicación en App Store / Google Play

---

## 📚 Recursos útiles

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [RTK Query Documentation](https://redux-toolkit.js.org/rtk-query/overview)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 👥 Contribución

Este proyecto sigue las reglas de arquitectura definidas en `.cursor/rules/proyect-work.mdc`.

### Flujo de contribución

1. Fork del repositorio
2. Crear rama feature: `git checkout -b feat/nueva-funcionalidad`
3. Commit con Conventional Commits: `git commit -m "feat: agregar X"`
4. Push: `git push origin feat/nueva-funcionalidad`
5. Abrir Pull Request

---

## 📄 Licencia

MIT © 2025 Isai Rodriguez

---

**Hecho con ❤️ usando React Native + Expo**
