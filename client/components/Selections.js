import React, { useState } from 'react';

const Selections = ({ onSelectionsChange }) => {
  const [state, setState] = useState({
    protein: null,
    sugar: null,
    fat: null,
    carb: null
  });

  const onSubmit = evt => {
    evt.preventDefault();
    console.log('submitting');

    fetch('http://localhost:3000/foods?nutrients[0]=protein:1&operator=or', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.json();
      })
      .then(myJson => {
        console.log({ myJson });
        onSelectionsChange(myJson.message);
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
          <div className="input-group">
            <label htmlFor="protein">Protein</label>
            <textarea
              className="input-amount"
              name="protein"
              placeholder="amount"
              onChange={onChange}
            ></textarea>
          </div>

          <div className="input-group">
            <label htmlFor="sugar">Sugar</label>
            <textarea
              className="input-amount"
              name="sugar"
              placeholder="amount"
              onChange={onChange}
            ></textarea>
          </div>

          <div className="form-footer">
            <button className="submit-button" type="submit">
              Submit
            </button>
          </div>
        </form>

        {/* <div>
          <ul id="nutrients-list" className="nutrients-list">
            <li>
              Protien
              <input
                id="input-amount"
                className="input-amount"
                placeholder="amount"
              />
            </li>
            <li>
              Sugar
              <input
                id="input-amount"
                className="input-amount"
                placeholder="amount"
              />
            </li>
            <li>
              Fat
              <input
                id="input-amount"
                className="input-amount"
                placeholder="amount"
              />
            </li>
            <li>
              Carbonhydrate
              <input
                id="input-amount"
                className="input-amount"
                placeholder="amount"
              />
            </li>
          </ul>
        </div> */}
      </div>
    </>
  );
};

export default Selections;
