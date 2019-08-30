import React, { useReducer } from 'react';

// reducer to emulate this.setState
const reducer = (currentState, newState) => {
  return { ...currentState, ...newState };
};


const genId = () => {
  let cache = {}
  return (key, index) => {
    console.log(cache)
    if (!cache[key + index]) {
      cache[key + index] = Math.random()
        .toString(36)
        .substr(2, 8) + index * 2
    }
    return cache
  }
}

const createCache = genId()

// call useForm with initialState object in any functional component
const useForm = initialState => {
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
        const genned = createCache(key, index)
        return (
          <React.Fragment key={index}>
            {args[index].label && (
              <label htmlFor={args[index].id || `${genned[key + index]}`}>
                {args[index].label}
              </label>
            )}
            <input
              className={args[index].className || `form-control mb-3`}
              id={args[index].id || `${genned[key + index]}`}
              type={args[index].type || key}
              placeholder={
                args[index].placeholder ||
                `${key.charAt(0).toUpperCase() + key.slice(1)}`
              }
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
