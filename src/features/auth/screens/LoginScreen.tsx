import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Input, Button, LogoApp } from "@shared/components";
import { useLoginForm } from "@auth/hooks/useLoginForm";
import type { LoginFormData } from "@auth/types";
import { useAuth } from "../hooks/useAuth";
import { useAppTheme } from "@/features/theme";

/**
 * Pantalla de Login con validaciones y layout usando Flexbox
 */
export const LoginScreen: React.FC = () => {
  const theme = useAppTheme();
  const { checkingAuthentication, googleLogin, logout } = useAuth();
  const {
    email,
    password,
    errors,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useLoginForm();

  const onLoginSuccess = (data: LoginFormData) => {
    checkingAuthentication();
    Alert.alert("¡Éxito!", `Login exitoso`, [{ text: "OK" }]);
  };
  const onGoogleSignIn = () => {
    googleLogin();
    console.log("onGoogleSignIn");
  };
  const onLogout = () => {
    logout();
  };

  const styles = createStyles(theme);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <LogoApp
            styleConteiner={styles.logoContainer}
            styleImage={styles.logo}
          />
          {/* <Text style={styles.title}>CycloConnect</Text> */}
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Inicio de sesión</Text>
            {/* <Text style={styles.subtitle}>Inicia sesión en tu cuenta</Text> */}
          </View>
          <Input
            label="Email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChangeText={handleEmailChange}
            error={errors.email}
            keyboardType="email-address"
          />

          <Input
            label="Password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChangeText={handlePasswordChange}
            error={errors.password}
            secureTextEntry
          />

          <View style={styles.buttonContainer}>
            <Button
              title="Login"
              onPress={() => handleSubmit(onLoginSuccess)}
              icon={<FontAwesome name={"user"} size={20} />}
              backgroundColor={theme.colors.primary}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Login with Google"
              onPress={onGoogleSignIn}
              backgroundColor="#DB4437"
              textColor="#FFFFFF"
              icon={<FontAwesome name={"google"} size={20} />}
            />
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            ¿Olvidaste tu contraseña?{" "}
            <Text style={styles.footerLink}>Recuperar</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Función para crear estilos dinámicos basados en el theme
const createStyles = (theme: ReturnType<typeof useAppTheme>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.bg,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: "space-between",
      paddingHorizontal: theme.spacing(6),
      paddingVertical: theme.spacing(17.5),
    },
    header: {
      alignItems: "center",
      marginTop: theme.spacing(10),
    },
    logoContainer: {
      width: 100,
      height: 100,
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.primary,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: theme.spacing(4),
    },
    logo: {
      width: 150,
      height: 150,
      borderRadius: 75,
    },
    titleContainer: {
      alignItems: "center",
      marginTop: theme.spacing(4),
    },
    title: {
      fontSize: theme.typography.title + 12,
      fontWeight: "bold",
      color: theme.colors.text,
      marginBottom: theme.spacing(2),
    },
    subtitle: {
      fontSize: theme.typography.body,
      color: theme.colors.text,
      opacity: 0.6,
    },
    form: {
      marginTop: theme.spacing(5),
    },
    buttonContainer: {
      marginTop: theme.spacing(2),
    },
    googleButtonContainer: {
      color: "white",
      backgroundColor: "red",
    },
    footer: {
      alignItems: "center",
      marginTop: theme.spacing(6),
    },
    footerText: {
      fontSize: 14,
      color: theme.colors.text,
      opacity: 0.6,
    },
    footerLink: {
      color: theme.colors.primary,
      fontWeight: "600",
    },
  });
