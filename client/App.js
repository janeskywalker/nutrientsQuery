import React, { useState } from 'react';
import './App.css';
import Selections from './components/Selections';
import ResultDisplay from './components/ResultDisplay';

const App = () => {
  const [state, setState] = useState({
    error: null,
    queryResult: null
  });

  const onSelectionsChange = queryResult => {
    console.log('onSelectionChanging');
    setState({
      ...state,
      queryResult: queryResult
    });

    console.log({ state });
  };
  return (
    <>
      <div id="hero" className="hero">
        <h1>Welcome to Food Nutrition API</h1>
      </div>
      <Selections
        onSelectionsChange={queryResult => onSelectionsChange(queryResult)}
      />
      <ResultDisplay />
    </>
  );
};

export default App;
