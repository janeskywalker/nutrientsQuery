import React from 'react';

const Form = ({
  onSubmit,
  onOperatorChange,
  onChange,
  isSubmitting,
  operator,
  hasError
}) => {
  const formData = [
    {
      label: 'Protein',
      name: 'protein'
    },
    {
      label: 'Sugar',
      name: 'sugar'
    },
    {
      label: 'Fat',
      name: 'fat'
    },
    {
      label: 'Carbohydrate, by difference',
      name: 'carb'
    }
  ];

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
        <h2 className="select-foods">
          of the following Nutrients Over the select Amount:
        </h2>
      </div>

      <ul>
        {formData.map(data => {
          return (
            <li className="input-group">
              <label htmlFor={data.name}>{data.label}</label>
              <input
                className="input-amount"
                name={data.name}
                type="number"
                min="0"
                step=".01"
                placeholder="amount in gram"
                onChange={onChange}
              ></input>
            </li>
          );
        })}
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
