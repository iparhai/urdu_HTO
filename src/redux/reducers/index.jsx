import {
  SET_TIME,
  GAIN_POINTS,
  REMOVE_LIVE,
  CORRECT_ANSWER,
  FINISH_GAME,
  RESTART_GAME,
  REBOOT_GAME,
  START_GAME,
  EARN_LIFE
} from "../constants";

const initialState = {
  points: 0,
  lifes: 10,
  seconds: 300,
  level: 1,
  isFinished: false,
  isStarted: false,
};

export const answerQuiz = (state = initialState, action = {}) => {
  switch (action.type) {
    case GAIN_POINTS:
      const newPonts = state.points + action.payload;
      return Object.assign({}, state, {
        points: newPonts,
      });
    case SET_TIME:
      return Object.assign({}, state, {
        seconds: action.payload
      });
    case CORRECT_ANSWER:
      const newCorrectState = {
        points: state.points + action.payload.points,
        level: state.level + action.payload.level,
        learn : false
      };
      return Object.assign({}, state, newCorrectState);
    case REMOVE_LIVE:
      const newLive = state.lifes - action.payload.lives;
      return Object.assign({}, state, {
        level : state.level - action.payload.level,
        lifes: newLive,
        learn : false
      });
    case FINISH_GAME:
      return Object.assign({}, state, {
        isFinished: action.payload,
        learn : false
      });
    case RESTART_GAME:
      return Object.assign({}, state, {
        points: 0,
        lifes: 10,
        seconds: 300,
        level: 1,
        isFinished: false,
        learn : false
      });
    case START_GAME:
      return Object.assign({}, state, {
        isStarted: true,
        learn : false
      });
    case EARN_LIFE:
      return Object.assign({}, state, {
        lifes: state.lifes + 1,
        learn : false
      });
    case REBOOT_GAME:
      return Object.assign({}, state, {
        points: 0,
        lifes: 10,
        seconds: 300,
        level: 1,
        isFinished: false,
        isStarted: false,
        learn : false
      });
    default:
      return state;
  }
};
