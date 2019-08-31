# React hook to gen forms.

_in progress_

## **usage**

---

In any functional component...

```
import React from 'react';
import { useForm } from '../hooks/useForm';

const SomeForm = props => {
  // initial state is first argument to useForm, name of Form is second argument.
  const { formState, setFormState, onChange, mapInputs } = useForm({
    // initialize state here
  }, 'some-form');

  ...
}

export default SomeForm
```

Input changes are handled automatically.

Defaults to bootstrap form-control class names for inputs if no deps are specified. If no ids are specified it will create ids based on the form name and the key in state.

If useForm is used in multiple components, the form name must be unique to that component.
This ensures ids will not be duplicated, but will still be styleable because they won't be randomly generated.

- _ex:_ if a key in state is called 'age' and form is named 'form-one' then- **id="form-one-age"**

- **setFormState behaves just like this.setState**

```
  ...

  const { formState, setFormState, onChange, mapInputs } = useForm({
    email: '',
    password: '',
    success: false,
    error: null
  }, 'sign-in-form');

  ...

  const signInUser = () => {
    const { email, password } = formState

    props.firebase.signInWithEmailAndPassword(email, password)
      .then(() => {
        setFormState({ email: '', password: '', success: true })
        props.history.push('/home')
      }).catch(error => {
        setFormState({ error, success: false })
      })
  }

  ...
```

### **Map all of state to inputs with no options**

- _onChange is optional because it is already handled, but it is still available if needed._

```
  const { formState, setFormState, onChange, mapInputs } = useForm({
    name: '',
    password: ''
  }, 'example-state-form');

  const displayInputs = mapInputs(formState)()

  ...
  return (
    ...
    <div className='form-group'>{displayInputs}</div>
    ...
  )
```

### **Map some of state into inputs**

```
  const { formState, setFormState, onChange, mapInputs } = useForm({
    name: '',
    password: '',
    success: false,
    error: null
  }, 'example-filter-form');

  // second optional argument of mapInputs is an array of certain state values as strings to create into inputs

  const displayInputs = mapInputs(formState, ['name', 'password'])();

  ...
  return (
    ...
    <div className='form-group'>{displayInputs}</div>
    ...
  )
```

### **Map all of state into inputs with options**

```
  const { formState, setFormState, onChange, mapInputs } = useForm({
    name: '',
    password: '',
    age: '',
  }, 'example-options-form');

  // if an input does not need options, insert an empty object as the placeholder. The order matters.
  // options are label, id, className, placeholder, type

  const formOptions = [
    {
      label: 'Enter your name.',
      placeholder: 'Your Name Here',
      type: 'text',
      id: 'name-field'
    },
    {},
    { label: 'How old are you?', type: 'number' }
  ];

  const displayInputs = mapInputs(formState)(formOptions);

  return (
    ...
    <div className='form-group'>{displayInputs}</div>
    ...
  )
```

### **Map and filter state into inputs with options**

```
const { formState, setFormState, onChange, mapInputs } = useForm({
    name: '',
    password: '',
    success: false
  }, 'example-all-form');

  /*
    order matters
    options are label, id, className, placeholder, type
    if className property exists for the first item,
    it will be automatically added to the rest of the inputs.
    if classNames exist for any of the following objects,
    they will not be replaced.
  */

  const formOptions = [
    {
      label: 'Enter your name.',
      placeholder: 'Do you even have a name?',
      type: 'text',
      className: 'form-control my-2'
    },
    { id: 'password-field' }
  ];

  // mapInputs second argument is an array to filter the inputs you want to display.

  const displayInputs = mapInputs(formState, ['name', 'password'])(formOptions);

  ...
  return (
    ...
    <div className='form-group'>{displayInputs}</div>
    ...
  )
```
