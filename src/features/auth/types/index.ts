/**
 * Tipos para el feature de autenticación
 */

export interface LoginFormData {
    email: string;
    password: string;
}

export interface ValidationErrors {
    email?: string;
    password?: string;
}

export interface ValidationResult {
    isValid: boolean;
    errors: ValidationErrors;
}

