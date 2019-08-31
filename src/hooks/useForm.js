import React, { useReducer } from 'react';

// reducer to emulate this.setState
const reducer = (currentState, newState) => {
  return { ...currentState, ...newState };
};

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

const genId = () => {
  let cache = {}
  return (formName, key, index) => {
    // maybe set default here??
    // what a hodgepodge
    if (!cache[formName + key + index]) {
      cache[formName + key + index] = `${formName}-${key}`
    }
    return cache
  }
}

const createCache = genId()

// call useForm with initialState object in any functional component
const useForm = (initialState, formName) => {
  // initialize useReducer and extract state object and setState function from it.
  const [formState, setFormState] = useReducer(reducer, initialState);

  // handle setting state with the value of the input based on input name tags
  const onChange = event => {
    const { name, value } = event.target;
    setFormState({ [name]: value });
  };

  // takes in the formState object as an arg in the functional component
  // create an array of arrays with key, value pairs.
  // return a closure that uses the state object to map inputs as JSX

  const mapInputs = (state, filter) => {

    let stateToMap = Object.entries(state);
    // if there is an array of filter deps get them ready to map
    if (filter) {
      const filteredState = filter
        .reduce((obj, key) => ({ ...obj, [key]: state[key] }), {});
      stateToMap = Object.entries(filteredState)
    }

    return args => {
      if (args) {
        // placeholder to do something else.
        args = [...args];
        // if there is a className defined in first dependency obj
        // use it for every dep that doesn't have a className.
        const [{ className }] = args
        if (className) {
          args = args.map(dependency => {
            if (!dependency.className) {
              return { ...dependency, className: className }
            }
            return dependency
          })
        }
      } else {
        args = [];
        args.length = stateToMap.length;
        args = [...args].map(() => ({}));
      }

      return stateToMap.map(([key, value], index) => {
        const genned = createCache(formName, key, index)
        const { label, id, className, placeholder, type } = args[index]
        return (
          <React.Fragment key={index}>
            {label && (
              <label htmlFor={id || `${genned[formName + key + index]}`}>
                {label}
              </label>
            )}
            <input
              className={className || `form-control mb-3`}
              id={id || `${genned[formName + key + index]}`}
              type={type ? type : types.includes(key) ? key : 'text'}
              placeholder={placeholder || `${key.charAt(0).toUpperCase() + key.slice(1)}`}
              name={key}
              value={value}
              onChange={onChange}
            />
          </React.Fragment>
        );
      });
    };
  };

  return { formState, setFormState, onChange, mapInputs };
};

export { useForm };
