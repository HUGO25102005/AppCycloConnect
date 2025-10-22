import { useState, useCallback } from 'react';
import {
    validateEmail,
    validatePasswordNotEmpty,
    validatePasswordRules,
} from '@shared/utils';
import type { LoginFormData, ValidationErrors } from '@auth/types';

/**
 * Hook personalizado para manejar el formulario de login con validaciones
 */
export const useLoginForm = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<ValidationErrors>({});

    /**
     * Maneja cambios en el campo email
     */
    const handleEmailChange = useCallback((text: string) => {
        setFormData((prev) => ({ ...prev, email: text }));
        // Limpiar error cuando el usuario empieza a escribir
        setErrors((prev) => ({ ...prev, email: undefined }));
    }, []);

    /**
     * Maneja cambios en el campo password
     */
    const handlePasswordChange = useCallback((text: string) => {
        setFormData((prev) => ({ ...prev, password: text }));
        // Limpiar error cuando el usuario empieza a escribir
        setErrors((prev) => ({ ...prev, password: undefined }));
    }, []);

    /**
     * Valida el formulario completo
     * @returns true si el formulario es válido
     */
    const validateForm = useCallback((): boolean => {
        const newErrors: ValidationErrors = {};

        // Validar email
        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'El email no es válido';
        }

        // Validar password
        if (!validatePasswordNotEmpty(formData.password)) {
            newErrors.password = 'El password es requerido';
        } else {
            const passwordValidation = validatePasswordRules(formData.password);
            if (!passwordValidation.isValid) {
                newErrors.password = passwordValidation.error;
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    /**
     * Maneja el envío del formulario
     * @param onSuccess - Callback a ejecutar si la validación es exitosa
     */
    const handleSubmit = useCallback(
        (onSuccess: (data: LoginFormData) => void) => {
            if (validateForm()) {
                onSuccess(formData);
            }
        },
        [formData, validateForm]
    );

    /**
     * Resetea el formulario
     */
    const resetForm = useCallback(() => {
        setFormData({ email: '', password: '' });
        setErrors({});
    }, []);

    return {
        formData,
        errors,
        handleEmailChange,
        handlePasswordChange,
        handleSubmit,
        resetForm,
    };
};

