import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary";
  backgroundColor?: string;
  textColor?: string;
  icon?: React.ReactNode;
}

/**
 * Componente Button reutilizable
 */
export const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  disabled,
  backgroundColor,
  textColor,
  icon,
  ...touchableProps
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "primary" ? styles.buttonPrimary : styles.buttonSecondary,
        disabled && styles.buttonDisabled,
        backgroundColor && { backgroundColor },
      ]}
      activeOpacity={0.8}
      disabled={disabled}
      {...touchableProps}
    >
      <Text
        style={[
          styles.buttonText,
          variant === "primary"
            ? styles.buttonTextPrimary
            : styles.buttonTextSecondary,
          disabled && styles.buttonTextDisabled,
          textColor && { color: textColor },
        ]}
      >
        {icon} {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  buttonPrimary: {
    backgroundColor: "#007AFF",
  },
  buttonSecondary: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  buttonTextPrimary: {
    color: "#fff",
  },
  buttonTextSecondary: {
    color: "#007AFF",
  },
  buttonTextDisabled: {
    color: "#999",
  },
});
