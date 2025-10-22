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
import { Input, Button } from "@shared/components";
import { useLoginForm } from "@auth/hooks/useLoginForm";
import type { LoginFormData } from "@auth/types";

/**
 * Pantalla de Login con validaciones y layout usando Flexbox
 */
export const LoginScreen: React.FC = () => {
  const {
    formData,
    errors,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useLoginForm();

  /**
   * Callback cuando el formulario es válido
   */
  const onLoginSuccess = (data: LoginFormData) => {
    Alert.alert(
      "¡Éxito!",
      `Login exitoso\n\nEmail: ${data.email}\nPassword: ${"*".repeat(
        data.password.length
      )}`,
      [{ text: "OK" }]
    );
  };

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
          <View style={styles.logoContainer}>
            <Text style={styles.logoEmoji}>🎵</Text>
          </View>
          <Text style={styles.title}>MyMusic</Text>
          <Text style={styles.subtitle}>Inicia sesión en tu cuenta</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
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
              title="Iniciar Sesión"
              onPress={() => handleSubmit(onLoginSuccess)}
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
    paddingVertical: 40,
  },
  header: {
    alignItems: "center",
    marginTop: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  logoEmoji: {
    fontSize: 40,
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
    marginTop: 40,
  },
  buttonContainer: {
    marginTop: 8,
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
