import { useState, useCallback, useEffect } from 'react';
import {
    validateEmail,
    validatePasswordNotEmpty,
    validatePasswordRules,
} from '@shared/utils';
import type { LoginFormData, ValidationErrors } from '@auth/types';
import { useForm } from '@/shared/hooks';
import { useAuth } from './useAuth';

/**
 * Hook personalizado para manejar el formulario de login con validaciones
 */
export const useLoginForm = () => {
    const { email, password, onInputChange, onResetForm } = useForm<LoginFormData>({
        email: 'rodriguezjosef@gmail.com',
        password: 'H12345678.a',
    });

    const [errors, setErrors] = useState<ValidationErrors>({});

    /**
     * Maneja cambios en el campo email
     */
    const handleEmailChange = useCallback((text: string) => {
        onInputChange({ name: 'email', value: text });
        // Limpiar error cuando el usuario empieza a escribir
        setErrors((prev) => ({ ...prev, email: undefined }));
    }, []);

    /**
     * Maneja cambios en el campo password
     */
    const handlePasswordChange = useCallback((text: string) => {
        onInputChange({ name: 'password', value: text });
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
        if (!email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!validateEmail(email)) {
            newErrors.email = 'El email no es válido';
        }

        // Validar password
        if (!validatePasswordNotEmpty(password)) {
            newErrors.password = 'El password es requerido';
        } else {
            const passwordValidation = validatePasswordRules(password);
            if (!passwordValidation.isValid) {
                newErrors.password = passwordValidation.error;
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [email, password]);

    /**
     * Maneja el envío del formulario
     * @param onSuccess - Callback a ejecutar si la validación es exitosa
     * @param onError - Callback opcional a ejecutar si hay errores de validación
     */
    const handleSubmit = useCallback(
        (
            onSuccess: (data: LoginFormData) => void,
            onError?: (errors: ValidationErrors) => void
        ) => {
            if (validateForm()) {
                onSuccess({ email, password });
                return;
            } 
            onError?.(errors);
        },
        [email, password, validateForm, errors]
    );

    /**
     * Resetea el formulario
     */
    const resetForm = useCallback(() => {
        onResetForm();
        setErrors({});
    }, []);



    return {
        email,
        password,
        errors,
        handleEmailChange,
        handlePasswordChange,
        handleSubmit,
        resetForm,
    };
};

