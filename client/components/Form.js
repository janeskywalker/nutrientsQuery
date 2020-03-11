import React from 'react';

const Form = ({
  onSubmit,
  onOperatorChange,
  onChange,
  isSubmitting,
  operator,
  hasError
}) => {
  console.log({ hasError });
  return (
    <form className="nutrients-search-form" onSubmit={onSubmit}>
      <div className="selection-header-wrapper">
        <h2 className="select-foods">Show Foods with</h2>
        <select
          id="oprator"
          className="operator"
          value={operator}
          onChange={onOperatorChange}
        >
          <option value="and">All</option>
          <option value="or">Any</option>
        </select>
        <h2 className="select-foods">of the following Nutrients:</h2>
      </div>

      <ul>
        <li className="input-group">
          <label htmlFor="protein">Protein</label>
          <input
            className="input-amount"
            name="protein"
            type="number"
            min="0"
            step=".01"
            placeholder="amount"
            onChange={onChange}
          ></input>
          g
        </li>

        <li className="input-group">
          <label htmlFor="sugar">Sugar</label>
          <input
            className="input-amount"
            name="sugar"
            type="number"
            min="0"
            step=".01"
            placeholder="amount"
            onChange={onChange}
          ></input>
          g
        </li>

        <li className="input-group">
          <label htmlFor="fat">Fat</label>
          <input
            className="input-amount"
            name="fat"
            type="number"
            min="0"
            step=".01"
            placeholder="amount"
            onChange={onChange}
          ></input>
          g
        </li>

        <li className="input-group">
          <label htmlFor="carb">Carbonhydrate</label>
          <input
            className="input-amount"
            name="carb"
            type="number"
            min="0"
            step=".01"
            placeholder="amount"
            onChange={onChange}
          ></input>
          g
        </li>
      </ul>

      {hasError ? (
        <div className="errorDisplay">
          There was an error handling your request. Please try again.
        </div>
      ) : null}

      <div className="form-footer">
        <button className="submit-button" disabled={isSubmitting} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
