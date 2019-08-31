import React from 'react';
import { useForm } from '../hooks/useForm';

const FormOnlyOptions = props => {
  // extract and initialize useForm hook. don't need on change here, but might be useful at some point.
  const { formState, setFormState, onChange, mapInputs } = useForm({
    name: '',
    password: '',
    age: '',
  }, 'formOnlyOptions');

  // options are label, id, className, placeholder, type
  const formOptions = [
    {
      label: 'Enter your name.',
      placeholder: 'Your Name Here',
      type: 'text',
      id: 'name-field',
    },
    {},
    { label: 'How old are you?', type: 'number' }
  ];

  const displayInputs = mapInputs(formState)(
    formOptions
  );

  const postForm = () => {
    // simulate post to server or can update parent with prop function here.
    console.log(formState);
    setFormState({ name: '', password: '', age: '' });
  };

  const isInvalid = formState.name === '' || formState.password === ''

  return (
    <div className='mt-3'>
      <h1>Form Only Options</h1>
      <div className="form-group">{displayInputs}</div>
      <button disabled={isInvalid} className="btn btn-primary" onClick={postForm}>
        Send
      </button>
    </div>
  );
};

export default FormOnlyOptions;