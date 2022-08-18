import React from 'react';

const App = () => {
  const tittle = React.useRef('MyProject');
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="border-red-600 border-solid border-2 rounded-xl p-2 m-3">
          {tittle.current}
        </h1>
      </header>
    </div>
  );
};

export default App;
