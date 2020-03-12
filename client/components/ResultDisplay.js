import React from 'react';

const ResultDisplay = ({ queryResult }) => {
  return (
    <>
      <div id="resultDisplay" className="resultDisplay">
        <h2 class="selection-header-wrapper">Search Result:</h2>
        <p className="selection-header-wrapper">
          Number of Result: {queryResult.length}
        </p>
        <ul id="result-list">
          {queryResult.map(food => {
            return <li>{food}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default ResultDisplay;
