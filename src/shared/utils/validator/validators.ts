
const useValidatorSintax = () => {

    const isEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    const isPasswordValid = (password: string) => {
        const regex = /^^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
        return regex.test(password);
    }

    return {
        isEmail,
        isPasswordValid
    }
}

export default useValidatorSintax
