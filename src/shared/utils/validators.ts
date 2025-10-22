/**
 * Utilidades de validación reutilizables
 */

/**
 * Valida formato de email
 * @param email - Email a validar
 * @returns true si el email es válido
 */
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Valida que el password no esté vacío
 * @param password - Password a validar
 * @returns true si el password no está vacío
 */
export const validatePasswordNotEmpty = (password: string): boolean => {
    return password.trim().length > 0;
};

/**
 * Valida reglas complejas del password:
 * - Mínimo 8 caracteres
 * - Al menos una mayúscula
 * - Al menos una minúscula
 * - Al menos un carácter especial
 * @param password - Password a validar
 * @returns objeto con resultado y mensaje de error si hay
 */
export const validatePasswordRules = (
    password: string
): { isValid: boolean; error?: string } => {
    if (password.length < 8) {
        return {
            isValid: false,
            error: 'El password debe tener al menos 8 caracteres',
        };
    }

    if (!/[A-Z]/.test(password)) {
        return {
            isValid: false,
            error: 'El password debe tener al menos una mayúscula',
        };
    }

    if (!/[a-z]/.test(password)) {
        return {
            isValid: false,
            error: 'El password debe tener al menos una minúscula',
        };
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return {
            isValid: false,
            error: 'El password debe tener al menos un carácter especial',
        };
    }

    return { isValid: true };
};

