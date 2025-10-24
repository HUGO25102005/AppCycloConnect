import { useState } from 'react';


interface target {
    name: string;
    value: string;
}

export const useForm = <T extends object>(initialForm: T = {} as T) => {

    const [formState, setFormState] = useState(initialForm);

    const onInputChange = ({ name, value }: target) => {
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    }
}