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

/**
 * Pantalla de Login con validaciones y layout usando Flexbox
 */
export const LoginScreen: React.FC = () => {
  const {
    formData,
    errors,
    setErrors,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useLoginForm();

  const onLoginSuccess = (data: LoginFormData) => {
    Alert.alert("¡Éxito!", `Login exitoso`, [{ text: "OK" }]);
  };

  const onLoginError = (validationErrors: typeof errors) => {
    const errorMessages: string[] = [];

    if (validationErrors.email) {
      errorMessages.push(`📧 ${validationErrors.email}`);
    }

    if (validationErrors.password) {
      errorMessages.push(`🔒 ${validationErrors.password}`);
    }

    Alert.alert("Error de Validación", errorMessages.join("\n\n"), [
      {
        text: "Entendido",
      },
    ]);
  };

  //   useEffect(() => {
  //     if (errors.email || errors.password) {
  //       onLoginError(errors);
  //     }
  //   }, [errors]);

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
            value={formData.email}
            onChangeText={handleEmailChange}
            error={errors.email}
            keyboardType="email-address"
          />

          <Input
            label="Password"
            placeholder="Ingresa tu contraseña"
            value={formData.password}
            onChangeText={handlePasswordChange}
            error={errors.password}
            secureTextEntry
          />

          <View style={styles.buttonContainer}>
            <Button
              title="Login"
              onPress={() => handleSubmit(onLoginSuccess)}
              icon={<FontAwesome name={"user"} size={20} />}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Login with Google"
              onPress={() => handleSubmit(onLoginSuccess)}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 70,
  },
  header: {
    alignItems: "center",
    marginTop: 40,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 40,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  form: {
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 8,
  },
  googleButtonContainer: {
    color: "white",
    backgroundColor: "red",
  },
  footer: {
    alignItems: "center",
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
  footerLink: {
    color: "#007AFF",
    fontWeight: "600",
  },
});
