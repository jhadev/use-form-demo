import React from 'react';
import { useForm } from '../hooks/useForm';

const FormWithSubmit = props => {
  // extract and initialize useForm hook. don't need on change here, but might be useful at some point.
  const { formState, setFormState, onChange, mapForm } = useForm(
    {
      name: '',
      comment: ''
    },
    'example-with-submit'
  );

  const formOptions = [
    {
      label: 'Enter your name.',
      placeholder: 'Do you even have a name?',
      type: 'text',
      className: 'form-control my-2'
    },
    { label: 'Enter Your comment.', textarea: { rows: 4 } }
  ];

  const postForm = event => {
    event.preventDefault();
    console.log(formState);
    setFormState({ name: '', comment: '' });
  };

  const isInvalid = formState.name === '' || formState.comment === '';

  const displayForm = mapForm(formState)(formOptions)(postForm, isInvalid);

  return (
    <div className="mt-3">
      <h1>Form With Submit</h1>
      {formState.comment.length < 20 && formState.comment !== '' && (
        <div className="alert alert-danger">
          Comment must be over 20 characters
        </div>
      )}
      {formState.name.length < 5 && formState.name !== '' && (
        <div className="alert alert-danger">Name must be over 5 characters</div>
      )}
      <div>{displayForm}</div>
    </div>
  );
};

export default FormWithSubmit;
