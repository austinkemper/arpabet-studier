import React from 'react';
import { strippedPhonesForWord } from './util';
import correctIcon from './assets/correct.png';
import incorrectIcon from './assets/incorrect.png';

interface Props {
  quizWord: string;
}

interface State {
  answers?: string[];
  guess?: string;
  isCorrect?: boolean;
}

export default class Quiz extends React.PureComponent<Props, State> {

  input: React.RefObject<HTMLInputElement> = React.createRef();

  constructor(props: Props) {
    super(props);
    this.state = {
    }
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let guess = this.input.current?.value.toUpperCase();
    if (!guess) {
      guess = '';
    }

    const answers = strippedPhonesForWord(this.props.quizWord);
    const isCorrect = answers.includes(guess);

    this.setState({answers, guess, isCorrect});
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
          <input autoFocus={true} ref={this.input}></input>
          </label>

          <input type="submit" value="Submit" />
        </form>
        {this.renderAnswers()}
      </div>
    );
  }
}