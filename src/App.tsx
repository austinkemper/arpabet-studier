import React from 'react';
import './App.css';
import Quiz from './Quiz';

export default class App extends React.PureComponent<{}, {}> {

  render = () => {
    return (
      <div className="App">
        <Quiz quizWord="iconic" />

      </div>
    );
  }
}
