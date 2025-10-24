import { render, screen } from "@testing-library/react-native";
import { LoginScreen } from "@/features/auth";
import { Alert } from "react-native";

jest.spyOn(Alert, "alert");

describe("Index (login)", () => {
  it("render components in my login screen", () => {
    render(<LoginScreen />);
    // Verificar inputs
    expect(screen.getByPlaceholderText("correo@ejemplo.com")).toBeTruthy();
    expect(screen.getByPlaceholderText("Ingresa tu contraseña")).toBeTruthy();
    // Verificar título
    expect(screen.getByText("Inicio de sesión")).toBeTruthy();
    // Verificar label de campos
    expect(screen.getByText("Email")).toBeTruthy();
    expect(screen.getByText("Password")).toBeTruthy();
  });
});
