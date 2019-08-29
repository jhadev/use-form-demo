# React hook to gen forms.

needs a ton of work, but it works.

## **usage**

---

In any functional component...

```
import React from 'react';
import { useForm } from '../hooks/useForm';

const SomeForm = props => {

  const { formState, setFormState, onChange, mapInputs } = useForm({
    // initialize state here
  });

  ...
}

export default SomeForm
```

Input changes are handled automatically.

Defaults to bootstrap form-control class names for inputs if no deps are specified. If no ids are specified it will auto gen and append a random string of characters to the key name in state and apply it as the input field id and label htmlFor (if specified) to avoid duplicate ids. Labels are not shown by default. Simple validation can be handled by disabling a button for now.

- _ex:_ **id="name-gnb1ee5r0"**

- **setFormState behaves just like this.setState**

```
  ...

  const { formState, setFormState, onChange, mapInputs } = useForm({
    email: '',
    password: '',
    success: false,
    error: null
  });

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
  });

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
  });

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
  });

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
  });

  // order matters
  // options are label, id, className, placeholder, type

  const formOptions = [
    {
      label: 'Enter your name.',
      placeholder: 'Do you even have a name?',
      type: 'text',
      className: 'form-control my-2'
    },
    { id: 'password-field', className: 'form-control my-2' }
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
