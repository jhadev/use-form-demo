import React from 'react';
import { useForm } from '../hooks/useForm';

const FormMapState = props => {
  // extract and initialize useForm hook. don't need on change here, but might be useful at some point.
  const { formState, setFormState, onChange, mapInputs } = useForm(
    {
      name: '',
      password: ''
    },
    'example-map-state'
  );

  // options are label, id, className, placeholder, type
  const displayInputs = mapInputs(formState)();

  const postForm = () => {
    // simulate post to server or can update parent with prop function here.
    console.log(formState);
    setFormState({ name: '', password: '' });
  };

  const isInvalid = formState.name === '' || formState.password === '';

  return (
    <div className="mt-3">
      <h1>Form Map State</h1>
      <div className="form-group">{displayInputs}</div>
      <button
        disabled={isInvalid}
        className="btn btn-primary"
        onClick={postForm}>
        Send
      </button>
    </div>
  );
};

export default FormMapState;
