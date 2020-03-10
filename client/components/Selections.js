import React, { useEffect, useState } from 'react';

const WEB_ADDRESS = 'http://localhost:3000/foods?';

const Selections = ({ onSelectionsChange }) => {
  const [state, setState] = useState({
    protein: null,
    sugar: null,
    fat: null,
    carb: null,
    operator: 'and',
    isSubmitting: false
  });

  useEffect(() => {
    let controller = null;

    if (state.isSubmitting) {
      controller = new AbortController();
      const signal = controller.signal;

      fetch('http://localhost:3000/foods?nutrients[0]=protein:1&operator=or', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        signal
      })
        .then(res => {
          return res.json();
        })
        .then(myJson => {
          console.log({ myJson });
          onSelectionsChange(myJson.message);
          setState({
            ...state,
            isSubmitting: false
          });
        });
    }

    return function unmount() {
      if (controller !== null) {
        controller.abort();
      }
    };
  }, [state.isSubmitting]);

  const onSubmit = evt => {
    console.log({ evt });
    evt.preventDefault();
    setState({
      ...state,
      isSubmitting: true
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
        <h2>Please select nutrients:</h2>

        <form className="nutrients-search-form" onSubmit={onSubmit}>
          <ul>
            <li className="input-group">
              <label htmlFor="protein">Protein</label>
              <input
                className="input-amount"
                name="protein"
                placeholder="amount"
                onChange={onChange}
              ></input>
            </li>

            <li className="input-group">
              <label htmlFor="sugar">Sugar</label>
              <input
                className="input-amount"
                name="sugar"
                placeholder="amount"
                onChange={onChange}
              ></input>
            </li>
          </ul>

          <div className="form-footer">
            <button
              className="submit-button"
              disabled={state.isSubmitting}
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Selections;
