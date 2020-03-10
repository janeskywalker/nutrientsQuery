import React from 'react';

const ResultDisplay = ({ queryResult }) => {
  console.log('display result');
  console.log({ queryResult });

  return (
    <>
      <div id="resultDisplay" className="resultDisplay">
        <h2>Search Result:</h2>
        <p>Number of Result: {queryResult.length}</p>
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
