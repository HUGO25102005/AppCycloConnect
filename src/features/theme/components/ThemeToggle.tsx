import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setPreference } from "../store/themeSlice";
import type { preference } from "../types";

interface ThemeToggleProps {
  style?: any;
}

/**
 * Componente para cambiar entre light/dark/system theme
 * Listo para integrar en futura pantalla de Settings
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({ style }) => {
  const dispatch = useDispatch<AppDispatch>();

  const options: { label: string; value: preference }[] = [
    { label: "Claro", value: "light" },
    { label: "Oscuro", value: "dark" },
    { label: "Sistema", value: "system" },
  ];

  const handleSelect = (value: preference) => {
    dispatch(setPreference(value));
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>Tema</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={styles.option}
            onPress={() => handleSelect(option.value)}
          >
            <Text style={styles.optionText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  option: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  optionText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
