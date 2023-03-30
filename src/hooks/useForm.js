import { useState, useCallback } from "react";

export default function useForm() {
    const [values, setValues] = useState({});

    const handleChange = (event) => {
        const { value, name } = event.target;
        setValues({ ...values, [name]: value });
    }
    const resetForm = useCallback
        ((newValues = {} = false) => {
            setValues(newValues);
        }, [setValues]);

    return { values, handleChange, resetForm, setValues };
}
