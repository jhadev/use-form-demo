import React from 'react';
import { useForm } from '../hooks/useForm';

const FormAllOptions = props => {
  // extract and initialize useForm hook. don't need on change here, but might be useful at some point.
  const { formState, setFormState, onChange, mapInputs } = useForm({
    name: '',
    password: '',
    success: false
  });

  // if we don't want all of state to be made into input fields can do this.
  // state is preserved and we can call setFormState on the non input items in state normally.
  const filterInputsToDisplay = ({ name, password }) => ({ name, password });
  // return the closure to map inputs to the items in state asked for above.

  // define form options here -- need to either leave out dependency array or add empty objects to go in order

  const formOptions = [
    {
      label: 'test',
      placeholder: '',
      type: 'text',
      className: 'form-control my-2'
    },
    { id: 'testing', className: ' form-control my-2' }
  ];

  // options are label, id, className, placeholder, type
  const displayInputs = mapInputs(filterInputsToDisplay(formState))(
    formOptions
  );

  /*
  if no options
  const displayInputs = mapInputs(filterInputsToDisplay(formState))();

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

  const isInvalid = formState.name === '' || formState.password === ''

  return (
    <div className='mt-3'>
      <h1>Form All Options</h1>
      <div className="form-group">{displayInputs}</div>
      <button disabled={isInvalid} className="btn btn-primary" onClick={postForm}>
        Send
      </button>
    </div>
  );
};

export default FormAllOptions;