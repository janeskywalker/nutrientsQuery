import React, { useState } from 'react';
import './App.css';
import Selections from './components/Selections';
import ResultDisplay from './components/ResultDisplay';

const App = () => {
  const [state, setState] = useState({
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
    <main>
      <div className="greeting-wrapper">
        <h1>Welcome to Food Nutrition API</h1>
      </div>
      <div className="content-wrapper">
        <Selections onSelectionsChange={onSelectionsChange} />

        {state.queryResult ? (
          <ResultDisplay queryResult={state.queryResult} />
        ) : null}
      </div>
    </main>
  );
};

export default App;
