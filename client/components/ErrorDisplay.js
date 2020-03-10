import React from 'react';

const ErrorDisplay = ({ error }) => {
  console.log('display error');
  console.log({ error });

  return (
    <>
      <div id="errorDisplay" className="errorDisplay">
        <h2>Error:</h2>
      </div>
    </>
  );
};

export default ErrorDisplay;
