# React hook to gen forms.

_in progress_

## **usage**

---

In any functional component...

```
import React from 'react';
import { useForm } from '../hooks/useForm';

const SomeForm = props => {

  // initial state is first argument to useForm, name of form is second argument.

  const { formState, setFormState, onChange, mapInputs } = useForm({

    // initialize state here

  }, 'some-form');

  ...
}

export default SomeForm
```

Input changes are handled automatically.

Defaults to bootstrap form-control class names for inputs if no options are specified. If no ids are specified it will create ids based on the form name and the key in state.

If useForm is used in multiple components, the form name must be unique to that component.
This ensures ids will not be duplicated, but will still be styleable because they won't be randomly generated.

- _ex:_ If a key in state is named **age** and the form is named **form-one** then **id="form-one-age"**

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

**Example all of state no options**

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

**HTML Output**

```
<div class="form-group">
  <input
    class="form-control mb-3"
    id="example-state-form-name"
    type="text"
    placeholder="Name"
    name="name"
    value=""/>
  <input
    class="form-control mb-3"
    id="example-state-form-password"
    type="password"
    placeholder="Password"
    name="password"
    value=""/>
</div>
```

### **Map some of state into inputs**

**Filter state example**

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

**HTML Output**

```
<div class="form-group">
  <input
    class="form-control mb-3"
    id="example-only-filter-name"
    type="text"
    placeholder="Name"
    name="name"
    value=""/>
  <input
    class="form-control mb-3"
    id="example-only-filter-password"
    type="password"
    placeholder="Password"
    name="password"
    value=""/>
</div>
```

### **Map all of state into inputs with options**

Options are: **label, id, className, placeholder, type**

There is no need to define classNames for every options object if they are all the same.
If a className property exists for the first options object, it will be automatically added to the rest of the inputs.
If classNames exist for any of the following option objects, they will not be replaced.

Labels are off by default.
If a label is specified for an input field, but no id is provided, an id will be created to match the label's htmlFor property.

```
const types = [
  'date',
  'datetime-local',
  'email',
  'number',
  'password',
  'range',
  'search',
  'tel',
  'time',
  'url',
  'week',
  'month'
]

/*
  If the key in state matches one of these types it will be used as the type for the input field.
  If it does not match and no type is specified that specific input field,
  the type will default to 'text'.
*/
```

**Example with options**

```
  const { formState, setFormState, onChange, mapInputs } = useForm({
    name: '',
    password: '',
    age: '',
  }, 'example-options-form');

  // If an input does not need options, insert an empty object as the placeholder. The order matters.

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

**HTML output**

```
<div class="form-group">
  <label for="name-field">Enter your name.</label>
  <input
    class="form-control mb-3"
    id="name-field"
    type="text"
    placeholder="Your Name Here"
    name="name"
    value=""/>
  <input
    class="form-control mb-3"
    id="example-options-form-password"
    type="password"
    placeholder="Password"
    name="password"
    value=""/>
  <label for="example-options-form-age">How old are you?</label>
  <input
    class="form-control mb-3"
    id="example-options-form-age"
    type="number"
    placeholder="Age"
    name="age"
    value=""/>
</div>
```

### **Map and filter state into inputs with options**

**Filter and options example**

```
const { formState, setFormState, onChange, mapInputs } = useForm({
    name: '',
    password: '',
    success: false
  }, 'example-all-form');

  /*
    Order matters.
    Options are label, id, className, placeholder, type.
    If className property exists for the first item,
    it will be automatically added to the rest of the inputs.
    If classNames exist for any of the following objects,
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

  // mapInputs second argument is an array to filter the inputs that need to be created.

  const displayInputs = mapInputs(formState, ['name', 'password'])(formOptions);

  ...
  return (
    ...
    <div className='form-group'>{displayInputs}</div>
    ...
  )
```

**HTML Output**

```
<div class="form-group">
  <label for="example-all-form-name">Enter your name.</label>
  <input
    class="form-control my-2"
    id="example-all-form-name"
    type="text"
    placeholder="Do you even have a name?"
    name="name"
    value=""/>
  <input
    class="form-control my-2"
    id="password-field"
    type="password"
    placeholder="Password"
    name="password"
    value=""/>
</div>
```

❤ if you read this far.
