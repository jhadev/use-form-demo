import React from 'react';
import { useForm } from '../hooks/useForm';

const FormWithSubmit = props => {
  // extract and initialize useForm hook. don't need on change here, but might be useful at some point.
  const { formState, setFormState, onChange, mapInputs } = useForm(
    {
      name: '',
      date: '',
      comment: ''
    },
    'example-with-submit'
  );

  // define form options here -- need to either leave out dependency array or add empty objects to go in order

  const formOptions = [
    {
      label: 'Enter your name.',
      placeholder: 'Do you even have a name?',
      type: 'text',
      className: 'form-control my-2'
    },
    { label: 'Enter Your Comment' }
  ];

  const postForm = event => {
    // simulate post to server or can update parent with prop function here.
    event.preventDefault();
    console.log(formState);
    setFormState({ name: '', date: '', comment: '', success: true });
  };
  // options are label, id, className, placeholder, type
  // mapInputs second argument is a filter to display inputs

  const isInvalid =
    formState.name === '' || formState.age === '' || formState.comment === '';

  const displayInputs = mapInputs(formState, ['name', 'comment'])(formOptions)(
    postForm,
    isInvalid
  );

  return (
    <div className="mt-3">
      <h1>Form All Options</h1>
      <div>{displayInputs}</div>
    </div>
  );
};

export default FormWithSubmit;
