import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Configuración de Reactotron para debugging de Redux y React Native
 * Compatible con Expo + Nueva Arquitectura
 */
const reactotron = Reactotron
    .setAsyncStorageHandler(AsyncStorage)
    .configure({
        name: 'practice-class-02',
        host: 'localhost', // iOS Simulator usa localhost
        port: 9090 // Puerto por defecto de Reactotron
    })
    .useReactNative({
        asyncStorage: true, // Monitorea AsyncStorage
        networking: false, // Cambiar a true si necesitas ver peticiones de red
        editor: false,
        errors: { veto: () => false },
        overlay: false,
    })
    .use(reactotronRedux()) // Plugin para Redux
    .connect();


export default reactotron;

