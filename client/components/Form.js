import React from 'react';

const Form = ({
  onSubmit,
  onOperatorChange,
  onChange,
  isSubmitting,
  state
}) => {
  return (
    <form className="nutrients-search-form" onSubmit={onSubmit}>
      <h2 className="show-foods">Show Foods with</h2>
      <select
        id="oprator"
        className="operator"
        value={state.operator}
        onChange={onOperatorChange}
      >
        <option value="and">All</option>
        <option value="or">Any</option>
      </select>
      <h2 className="show-foods">of the following Nutrients:</h2>

      <ul>
        <li className="input-group">
          <label htmlFor="protein">Protein</label>
          <input
            className="input-amount"
            name="protein"
            type="number"
            placeholder="amount"
            onChange={onChange}
          ></input>
        </li>

        <li className="input-group">
          <label htmlFor="sugar">Sugar</label>
          <input
            className="input-amount"
            name="sugar"
            type="number"
            placeholder="amount"
            onChange={onChange}
          ></input>
        </li>

        <li className="input-group">
          <label htmlFor="fat">Fat</label>
          <input
            className="input-amount"
            name="fat"
            type="number"
            placeholder="amount"
            onChange={onChange}
          ></input>
        </li>

        <li className="input-group">
          <label htmlFor="carb">Carbonhydrate</label>
          <input
            className="input-amount"
            name="carb"
            type="number"
            placeholder="amount"
            onChange={onChange}
          ></input>
        </li>
      </ul>

      <div className="form-footer">
        <button className="submit-button" disabled={isSubmitting} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
