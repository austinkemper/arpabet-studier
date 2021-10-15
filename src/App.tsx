import React from 'react';
import './App.css';
import Quiz from './Quiz';
import { getNextQuizWordThatHasPhones } from './util';

interface Props {}
interface State {
  quizWord: string;
}

export default class App extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      quizWord: getNextQuizWordThatHasPhones(),
    };
  }

  onNextWord = () => {
    const newQuizWord = getNextQuizWordThatHasPhones();
    this.setState({quizWord: newQuizWord});
  }

  render = () => {
    return (
      <div className="App">
        <Quiz quizWord={this.state.quizWord} onNext={this.onNextWord} />
      </div>
    );
  }
}
