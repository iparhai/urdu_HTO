import React from "react";
import AnswerModal from "./AnswerModal";
import { MathHelper } from "../utils";
import './Quiz.css'
import sessionData from "../utils/sessionData.js"
import $ from "min-jquery";

// import NumberLineMove from './NumberLineMove.jsx'



import "animate.css"
import Alphabets from "./Alphabets";
import HTO from "./HTO";
import { func, number } from "prop-types";

const queryParams = new URLSearchParams(window.location.search);

let learn =  queryParams.get('learn') ? queryParams.get('learn').toLowerCase().includes("true") ? true : false : true;
let exampleCount = 0

class Quiz extends React.Component {
  _isMounted = false;
  _secondsIntervalRef;
  state = {
    // problem: "",
    // firstNumber: 0,
    // secondNumber: 0,
    // symbol: "",
    // answer: 0,
    number: "",
    modal: "",
    modalShowing: false,
    streaks: 0,
    randomImage: null,
    data: [],
    possibleQuestions: ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth"],
    possibleAnswers: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    answer: "",
    correctAnswer: "",
    images: [],
    totalProblems: 1,
    quizMounted: false
  };

  earnLife = () => {
    this.props.onEarnLife();
    this.showModal("success", "STREAK!! You won a life ♥");
    this.setState({
      streaks: 0
    });
  };
  getLearnProblem = () => {
    const newNumber = "718"
    // this.getImage(newNumber);
    const newCorrectAnswer = newNumber.charAt(exampleCount)
    this._isMounted &&
      this.setState({
        number: newNumber,
        correctAnswer: newCorrectAnswer
      });
  }
  nextLearnProblem = () => {
    setTimeout(() => {
      this.getLearnProblem()
      this._isMounted &&
        this.setState({
          modalShowing: false,
          answer: 0,
        })
      // if (this.props.lifes > 0) (this.answerInput && this.answerInput.focus());
    }, 2500);
  }

  correctAnswer = () => {
    if (this.state.streaks > 2) {
      this.earnLife();
    } else {
      this.showModal("success");
    }
    if (exampleCount < 2) {
      exampleCount += 1
      this.nextLearnProblem()
    }
    else {
      learn = false
      this._isMounted && this.props.onCorretAnswer();
      this.setState(state => {
        return {
          streaks: state.streaks + 1
        };
      });
      this.nextProblem();
    }
  };

  componentDidMount() {
    this._isMounted = true;
    learn ? this.getLearnProblem() : this.getProblem();
    this.setState({ quizMounted: true })
    console.log(this.props)
    // if (learn == true) {
    //   var event = $(document).onClick(function (e) {
    //     e.stopPropagation();
    //     e.preventDefault();
    //     e.stopImmediatePropagation();
    //     return false;
    //   });

    //   // disable right click
    //   $(document).bind('contextmenu', function (e) {
    //     e.stopPropagation();
    //     e.preventDefault();
    //     e.stopImmediatePropagation();
    //     return false;
    //   });
    // }
    // else {
    //   $(document).unbind('click');
    //   $(document).unbind('contextmenu');
    // }
    // this.populateHover();

    // this.answerInput.focus();
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.lifes < 1) {
      this.props.onEndGame(this.state.points);
      return false;
    }
    return nextProps.lifes > -1;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidUpdate() {
    if (this.state.totalProblems > sessionData.limit) {
      this.props.onEndGame(this.state.points)
    }
  }

  wrongAnswer = () => {
    this._isMounted && this.props.onWrongAnswer();
    this.setState({
      streaks: 0
    });
    this.showModal("error", this.state.possibleAnswers[this.state.number]);
    this.nextProblem();
  };

  nextProblem = () => {
    setTimeout(() => {
      this.getProblem();
      this._isMounted &&
        this.setState({
          modalShowing: false,
          answer: 0,
        })
      if (learn == false) {
        this.setState({
          totalProblems: this.state.totalProblems + 1
        })
      }
      if (this.props.lifes > 0) (this.answerInput && this.answerInput.focus());
    }, 2500);
  };

  evaluateProblem = () => {
    // const answer = MathHelper.solve(this.state.problem);

    // const problem = this.state.firstNumber + "!" + this.state.secondNumber
    // sessionData.setData(problem, attemptedAnswer, answer)
    // sessionData.sendData()
    if (this.state.answer == this.state.correctAnswer) {
      return this.correctAnswer();
    }
    // if (this.state.possibleAnswers[this.state.number] === this.state.answer.toString()) {
    //   return this.correctAnswer();
    // }
    return this.wrongAnswer();
  };

  keyingUp = ev => {
    if (ev.key === "Enter") {
      this.evaluateProblem();
    }
    // const val = ev.target.value;

    // this.setState({
    //   answer: Number(val.match(/((-?)\d+)/g)) // accept just numbers and the minus symbol
    // });

  };

  showModal = (type, text) => {
    this.setState({
      modal: <AnswerModal type={type} text={text} />,
      modalShowing: true
    });
  };
  getPlaceValueNumber = (number) => {
    const index = MathHelper.getRandomInt(0, 2);

    return number.charAt(index)
  }

  getProblem = () => {
    // const newProblemSet = MathHelper.generateAdditionProblem(this.props.points);
    // const newProblemSet = MathHelper.generateAdditionProblem(this.props.points);
    // const newNumber = MathHelper.generateOrdinalNumberWithinTen();
    const newNumber = MathHelper.getHTONumber()
    // this.getImage(newNumber);
    const newCorrectAnswer = this.getPlaceValueNumber(newNumber)
    this._isMounted &&
      this.setState({
        // problem: newProblemSet.problem,
        // firstNumber: newProblemSet.firstNumber,
        // secondNumber: newProblemSet.secondNumber,
        // symbol: newProblemSet.symbol,
        number: newNumber,
        correctAnswer: newCorrectAnswer
      });
  };

  handleInputChange = (e) => {
    this.setState({
      answer: e.target.value
    })
  }
  getImage = (number) => {
    this.setState({ randomImage: this.state.images[number] })
  }



  render() {
    // const images = [...Array(parseInt(this.state.firstNumber))].map((e, i) => {
    //   return <img key={i} src={bowl} style={{ width: "100px", height: "80px" }} />
    // });

    return (
      <section className="show-up" style={{ width: "100%", height: "100vh" }}>
        {/* <Hints currentProblem={this.state.problem}/> */}
        <div >
          {this.state.modalShowing ? (
            this.state.modal
          ) : (
            <div style={{ marginTop: "10vh" }}>
              <h1 style={{ fontSize: "1.5em", display: "flex" }}> Place Value Of &nbsp;<h1 style={{ marginTop: "-13px", color: "red" }}>
                {this.state.correctAnswer} &nbsp;
              </h1>
                in {this.state.number} ?</h1>

              {/* <Alphabets setAnswer={(answer) => { this.setState({ answer: answer }) }} onClick={this.evaluateProblem} /> */}

              {this.state.quizMounted && <HTO setAnswer={(index) => { this.setState({ answer: this.state.number.charAt(index) }) }} correctAnswer={this.state.correctAnswer} number={this.state.number} onClick={this.evaluateProblem} callCorrectAnswer={this.correctAnswer} learn={learn} />}
              {/* <input
                className="App-input"
                type="text"
                placeholder="Enter"
                onChange={e => this.handleInputChange(e)}
                onKeyUp={this.keyingUp}

              /> */}
              {/* <input
                ref={input => {
                  this.answerInput = input;
                }}
                className=""
                type="number"
                placeholder="Enter"
                value={this.state.answer}
                onKeyUp={this.keyingUp}
              /> */}
              {/* <button className="btn fourth answerButton" onClick={this.evaluateProblem}> check </button> */}
            </div>
          )}
        </div>
      </section>

    );
  }
}
function getLearn() {
  return learn
}
export { getLearn };
export default Quiz;
