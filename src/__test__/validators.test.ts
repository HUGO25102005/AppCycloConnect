import {
    validateEmail,
    validatePasswordNotEmpty,
    validatePasswordRules,
} from '@shared/utils/validators';

describe('Validators', () => {
    describe('validateEmail', () => {
        it('should return true for valid email', () => {
            expect(validateEmail('test@example.com')).toBe(true);
        });

        it('should return false for invalid email', () => {
            expect(validateEmail('invalid-email')).toBe(false);
            expect(validateEmail('test@')).toBe(false);
            expect(validateEmail('@example.com')).toBe(false);
        });

        it('should return false for empty string', () => {
            expect(validateEmail('')).toBe(false);
        });
    });

    describe('validatePasswordNotEmpty', () => {
        it('should return true for non-empty string', () => {
            expect(validatePasswordNotEmpty('test')).toBe(true);
        });

        it('should return false for empty string', () => {
            expect(validatePasswordNotEmpty('')).toBe(false);
        });

        it('should return false for whitespace only', () => {
            expect(validatePasswordNotEmpty('   ')).toBe(false);
        });
    });

    describe('validatePasswordRules', () => {
        it('should return isValid true for valid password', () => {
            const result = validatePasswordRules('Test123!@#');
            expect(result.isValid).toBe(true);
        });

        it('should return error for password shorter than 8 characters', () => {
            const result = validatePasswordRules('Test1!');
            expect(result.isValid).toBe(false);
            expect(result.error).toBe('El password debe tener al menos 8 caracteres');
        });

        it('should return error for password without uppercase', () => {
            const result = validatePasswordRules('test123!@#');
            expect(result.isValid).toBe(false);
            expect(result.error).toBe('El password debe tener al menos una mayúscula');
        });

        it('should return error for password without lowercase', () => {
            const result = validatePasswordRules('TEST123!@#');
            expect(result.isValid).toBe(false);
            expect(result.error).toBe('El password debe tener al menos una minúscula');
        });

        it('should return error for password without special character', () => {
            const result = validatePasswordRules('Test12345');
            expect(result.isValid).toBe(false);
            expect(result.error).toBe('El password debe tener al menos un carácter especial');
        });
    });
});

