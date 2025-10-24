// Mock Expo Winter runtime
(global as any).__ExpoImportMetaRegistry = {};

// Mock structuredClone
(global as any).structuredClone = (obj: any) => JSON.parse(JSON.stringify(obj));

// Mock de expo-font para que no intente cargar fuentes nativas
jest.mock('expo-font', () => ({
    loadAsync: jest.fn().mockResolvedValue(undefined),
}));

// Mock minimalista de vector-icons
jest.mock('@expo/vector-icons', () => {
    const React = require('react');
    const { Text } = require('react-native');
    const Icon = (props: any) => React.createElement(Text, props, `Icon:${props.name ?? ''}`);
    return {
        FontAwesome: Icon,
        MaterialIcons: Icon,
        AntDesign: Icon,
        Ionicons: Icon,
    };
});

// Mock de react-redux para evitar problemas con el store
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

// Mock de AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);