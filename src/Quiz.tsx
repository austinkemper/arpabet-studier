import React from 'react';
import { strippedPhonesForWord } from './util';
import correctIcon from './assets/correct.png';
import incorrectIcon from './assets/incorrect.png';

interface Props {
  quizWord: string;
  onNext: () => void;
}

interface State {
  answers?: string[];
  guess: string;
  isCorrect?: boolean;
}

export default class Quiz extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      guess: '',
    }
  }

  onChangeGuess = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      guess: e.target.value.toUpperCase()
    });
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const answers = strippedPhonesForWord(this.props.quizWord);
    const isCorrect = answers.includes(this.state.guess);

    this.setState({answers, isCorrect});
  }

  onClickNext = () => {
    this.props.onNext();
    this.setState({
      answers: undefined,
      guess: '',
      isCorrect: undefined,
    });

    // Hacky not using ref
    document.getElementById('guess')?.focus()
  }

  renderAnswers = () => {
    if (this.state.answers === undefined) {
      return;
    }

    if (this.state.answers.length === 0) {
      return (<div>quizWord does not exist</div>);
    }

    let icon = incorrectIcon;
    let alt = 'incorrect';
    if (this.state.isCorrect === true) {
      icon = correctIcon
      alt = 'correct';
    }

    return (
      <div>
        <img id="isCorrectImage" src={icon} alt={alt} />
        <h3>Answers</h3>
        {this.state.answers.map((ans) => (
          <li key={ans}>{ans}</li>
        ))}
      </div>
    )
  }

  render = () => {
    return (
      <div className="Quiz">
        <form onSubmit={this.handleSubmit} >

          <label>
            Enter the Arpabet for "{this.props.quizWord}":{" "}
          <input id="guess" autoFocus={true} value={this.state.guess} onChange={this.onChangeGuess}></input>
          </label>

          <input type="submit" value="Submit" />
        </form>
        <button onClick={this.onClickNext}>Next</button>
        {this.renderAnswers()}
      </div>
    );
  }
}