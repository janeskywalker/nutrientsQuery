import React, { useEffect, useState } from 'react';
import Form from './Form';

const WEB_ADDRESS = 'http://localhost:3000/foods?';

const createQueryRoute = state => {
  let queryRoute = '';
  let nutrientIndex = 0;

  for (let key in state) {
    const stateValue = parseFloat(state[key]);
    if (!isNaN(stateValue)) {
      console.log({ key, stateValue });
      const prefix = nutrientIndex > 0 ? '&' : '';
      queryRoute += `${prefix}nutrients[${nutrientIndex}]=${key}:${stateValue}`;
      nutrientIndex++;
    }
  }
  queryRoute += `&operator=${state.operator}`;
  return queryRoute;
};

const Selections = ({ onSelectionsChange }) => {
  const [state, setState] = useState({
    protein: null,
    sugar: null,
    fat: null,
    carb: null,
    operator: 'and',
    isSubmitting: false,
    hasError: false
  });

  useEffect(() => {
    let controller = null;

    if (state.isSubmitting) {
      controller = new AbortController();
      const signal = controller.signal;

      const queryRoute = createQueryRoute(state);
      const url = WEB_ADDRESS + queryRoute;

      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        signal
      })
        .then(res => {
          return res.json();
        })
        .then(
          myJson => {
            onSelectionsChange(myJson.message);
            setState({
              ...state,
              isSubmitting: false,
              hasError: false
            });
          },
          err => {
            console.error(err);
            setState({
              ...state,
              hasError: true
            });
          }
        );
    }

    return function unmount() {
      if (controller !== null) {
        controller.abort();
      }
    };
  }, [state.isSubmitting]);

  const onSubmit = evt => {
    evt.preventDefault();
    setState({
      ...state,
      isSubmitting: true
    });
  };

  const onOperatorChange = evt => {
    setState({
      ...state,
      operator: evt.target.value
    });
  };

  const onChange = evt => {
    const name = evt.target.name;
    const value = evt.target.value;
    setState({
      ...state,
      [name]: value
    });
  };

  return (
    <>
      <div id="selections" className="selections">
        <Form
          onSubmit={onSubmit}
          onChange={onChange}
          onOperatorChange={onOperatorChange}
          isSubmitting={state.isSubmitting}
          operator={state.operator}
          hasError={state.hasError}
        />
      </div>
    </>
  );
};

export default Selections;
