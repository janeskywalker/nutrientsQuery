import React, { useEffect, useState } from 'react';
import Form from './Form';

const WEB_ADDRESS = 'http://localhost:3000/foods?';

const createQueryRoute = state => {
  console.log('creating Query Route');
  let queryRoute = '';
  let nutrientIndex = 0;

  for (let key in state) {
    const stateValue = parseFloat(state[key]);
    if (!isNaN(stateValue)) {
      console.log({ key, stateValue });
      if (nutrientIndex === 0) {
        queryRoute += `nutrients[${nutrientIndex}]=${key}:${stateValue}`;
      } else if (nutrientIndex > 0) {
        queryRoute += `&nutrients[${nutrientIndex}]=${key}:${stateValue}`;
      }
      nutrientIndex++;
    }
  }
  queryRoute += `&operator=${state.operator}`;
  console.log({ queryRoute });
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
      console.log('submitting fetch');
      controller = new AbortController();
      const signal = controller.signal;

      const queryRoute = createQueryRoute(state);
      const url = WEB_ADDRESS + queryRoute;
      console.log({ url });

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
            console.log({ myJson });
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
    console.log('operator changing');
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

  console.log({ state });

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
