# React hook to gen forms.

needs a ton of work, but it works.

## **usage**

---

Input changes are handled automatically.

Defaults to bootstrap form-control class names for inputs if no deps are specified. If no ids are specified it will auto gen and append a random string of characters to the key name in state and apply it as the input field id and label htmlFor (if specified) to avoid duplicate ids. Labels are not shown by default. Simple validation can be handled by disabling a button for now.

- _ex:_ **id="name-gnb1ee5r0"**

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

  // second optional argument of mapInputs is an array of state values as strings to filter
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

  const displayInputs = mapInputs(formState)(
    formOptions
  );

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

  const formOptions = [
    {
      label: 'test',
      placeholder: '',
      type: 'text',
      className: 'form-control my-2'
    },
    { id: 'testing', className: 'form-control my-2' }
  ];

  // options are label, id, className, placeholder, type
  // mapInputs second argument is an array to filter the to display inputs you want.

  const displayInputs = mapInputs(formState, ['name', 'password'])(
    formOptions
  );

  ...
  return (
    ...
    <div className='form-group'>{displayInputs}</div>
    ...
  )
```
