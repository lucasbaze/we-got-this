import React from 'react';
import { useForm } from '../hooks/useForm';
import { createCustomer } from '../state/reducers/customerReducer';

const CreateCustomerForm = () => {
    const submitForm = values => {
        createCustomer(values);
    };

    const [values, handleChange, handleSubmit] = useForm(
        {
            name: '',
            phone: '',
        },
        submitForm
    );

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Customer</h1>
            <label htmlFor="name">Customer Name</label>
            <input
                type="text"
                name="name"
                placeholder="Jenny"
                onChange={e => handleChange(e)}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default CreateCustomerForm;
