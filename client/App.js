import React, { useState } from 'react';
import './App.css';
import Selections from './components/Selections';
import ResultDisplay from './components/ResultDisplay';
import ErrorDisplay from './components/ErrorDisplay';

const App = () => {
  const [state, setState] = useState({
    error: null,
    queryResult: null
  });

  console.log({ state });

  const onSelectionsChange = queryResult => {
    console.log('updating query result in App');
    console.log({ queryResult });
    setState({
      ...state,
      queryResult: queryResult
    });
  };

  return (
    <>
      <div id="hero" className="hero">
        <h1>Welcome to Food Nutrition API</h1>
      </div>
      <Selections onSelectionsChange={onSelectionsChange} />

      {state.queryResult ? (
        <ResultDisplay queryResult={state.queryResult} />
      ) : null}

      {state.error ? <ErrorDisplay error={state.error} /> : null}
    </>
  );
};

export default App;
