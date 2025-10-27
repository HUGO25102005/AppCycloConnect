# Configuración de Firebase Auth con Google Sign-In

## Pasos para Configurar Google OAuth

### 1. Configurar Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Ve a "APIs & Services" > "Credentials"
4. Haz clic en "Create Credentials" > "OAuth client ID"

### 2. Configurar Credenciales para Web (Firebase)

1. Crea credenciales OAuth 2.0 para "Web application"
2. Copia el "Client ID" que se genera
3. Agrega este Client ID a tu archivo `.env`:
   ```
   EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=tu_client_id.apps.googleusercontent.com
   ```

### 3. Configurar Firebase Console

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto
3. Ve a "Authentication" > "Sign-in method"
4. Habilita el proveedor de Google
5. En la configuración de Google, agrega el Client ID que obtuviste en el paso 2

### 4. Configurar Credenciales para Android

1. En Google Cloud Console, crea credenciales para "Android"
2. Necesitarás:
   - Package name: `com.yourcompany.cycloconnect` (actualízalo en `app.json`)
   - SHA-1 fingerprint: Ejecuta `eas credentials -p android` para obtenerlo
3. Agrega al archivo `.env`:
   ```
   EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=tu_android_client_id.apps.googleusercontent.com
   ```

### 5. Configurar Credenciales para iOS

1. En Google Cloud Console, crea credenciales para "iOS"
2. Necesitarás:
   - Bundle ID: Configurado en `app.json`
3. Agrega al archivo `.env`:
   ```
   EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=tu_ios_client_id.apps.googleusercontent.com
   ```

### 6. Obtener SHA-1 para Android

```bash
# Instala EAS CLI si no lo tienes
npm install -g eas-cli

# Obtén las credenciales
eas credentials -p android
```

## Variables de Entorno Requeridas

Crea un archivo `.env` en la raíz del proyecto con:

```env
# Google OAuth Client IDs
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=tu_web_client_id.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=tu_ios_client_id.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=tu_android_client_id.apps.googleusercontent.com
```

## Arquitectura

### Flujo de Autenticación

1. **Usuario presiona botón de Google Sign-In**

   - Se ejecuta `useGoogleSignIn()` hook
   - Llamada a `promptAsync()` de expo-auth-session

2. **expo-auth-session abre navegador**

   - Usuario se autentica con Google
   - Obtiene `id_token`

3. **id_token se envía a Redux thunk**

   - `startGoogleSignInThunk` recibe el token
   - Llamada a `authenticateWithGoogle(idToken)`

4. **Firebase autentica**

   - Se crea credential con `GoogleAuthProvider.credential(idToken)`
   - Se autentica con `signInWithCredential`

5. **Redux se actualiza**
   - El listener de `onAuthStateChanged` detecta el cambio
   - Dispatch automático de `login()` action
   - Estado sincronizado

### Componentes Clave

- **src/firebase/googleAuthProvider.ts**: Hook de expo-auth-session
- **src/firebase/providers.ts**: Funciones de autenticación con Firebase
- **src/features/auth/store/thunks/authThunks.ts**: Thunks de Redux
- **src/features/auth/hooks/useGoogleSignIn.ts**: Integración expo-auth-session + Redux
- **src/features/auth/store/listeners/authListener.ts**: Sincronización Firebase ↔ Redux

## Notas Importantes

- **expo-auth-session** requiere `expo-dev-client` (no funciona en Expo Go)
- Para desarrollo, necesitas ejecutar: `npx expo run:android` o `npx expo run:ios`
- Los Client IDs son sensibles - no los subas a git
- El listener de auth se inicializa automáticamente en `src/store/appStarted.ts`

## Probar la Integración

Una vez configuradas las variables de entorno:

```bash
# Limpia y reconstruye
npx expo start --clear

# Ejecuta en dispositivo
npx expo run:android
# o
npx expo run:ios
```
