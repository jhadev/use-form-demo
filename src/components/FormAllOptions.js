import React from 'react';
import { useForm } from '../hooks/useForm';

const FormAllOptions = props => {
  // extract and initialize useForm hook. don't need on change here, but might be useful at some point.
  const { formState, setFormState, onChange, mapInputs } = useForm(
    {
      name: '',
      password: '',
      age: '',
      success: false
    },
    'example-all-options'
  );

  // define form options here -- need to either leave out dependency array or add empty objects to go in order

  const formOptions = [
    {
      label: 'Enter your name.',
      placeholder: 'Do you even have a name?',
      type: 'text',
      className: 'form-control my-2'
    },
    { id: 'password-field' }
  ];

  // options are label, id, className, placeholder, type
  // mapInputs second argument is a filter to display inputs
  const displayInputs = mapInputs(formState, ['name', 'password'])(formOptions);

  /*
  if no options
  const displayInputs = mapInputs(formState, ['name', 'password'])();

  if no filter and no options
  const displayInput = mapInputs(formState)()

  if no filter and options  
  const displayInput = mapInputs(formState)(formOptions)
  */

  const postForm = () => {
    // simulate post to server or can update parent with prop function here.
    console.log(formState);
    setFormState({ name: '', password: '', success: true });
  };

  const isInvalid = formState.name === '' || formState.password === '';

  return (
    <div className="mt-3">
      <h1>Form All Options</h1>
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

export default FormAllOptions;
