import React from 'react';
import { useForm } from '../hooks/useForm';

const FormOnlyFilter = props => {
  // extract and initialize useForm hook. don't need on change here, but might be useful at some point.
  const { formState, setFormState, onChange, mapInputs } = useForm(
    {
      name: '',
      password: '',
      success: false,
      error: null
    },
    'example-only-filter'
  );

  // mapInputs second argument is a filter to display inputs
  const displayInputs = mapInputs(formState, ['name', 'password'])();

  const postForm = () => {
    // simulate post to server or can update parent with prop function here.
    console.log('testing');
    console.log(formState);
    setFormState({ name: '', password: '', success: true });
  };

  const isInvalid = formState.name === '' || formState.password === '';

  return (
    <div className="mt-3">
      <h1>Form Only Filter</h1>
      <div className="form-group">{displayInputs}</div>
      <button
        id="send"
        disabled={isInvalid}
        className="btn btn-primary"
        onClick={postForm}>
        Send Data
      </button>
    </div>
  );
};

export default FormOnlyFilter;
