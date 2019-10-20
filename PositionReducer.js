import { combineReducers } from 'redux';

const INITIAL_STATE = {
  isFetching: false,
  userPositionY: 0,
  userPositionX: 0,
  turn: 0,
  now: 'cat'
};

const position = (state = INITIAL_STATE, action) => {
  var newTurn = state.turn + 1;

  switch (action.type) {
    case 'ADD_X':
      var newUserPositionX = state.userPositionX + 1;
      return Object.assign({}, state, {
        userPositionX: newUserPositionX,
        turn: newTurn
      })

    case 'SUB_X':
      var newUserPositionX = state.userPositionX - 1;
      return Object.assign({}, state, {
        userPositionX: newUserPositionX,
        turn: newTurn
      })

    case 'ADD_Y':
      var newUserPositionY = state.userPositionY + 1;
      return Object.assign({}, state, {
        userPositionY: newUserPositionY,
        turn: newTurn
      })

    case 'SUB_Y':
      var newUserPositionY = state.userPositionY - 1;
      return Object.assign({}, state, {
        userPositionY: newUserPositionY,
        turn: newTurn
      })

    default:
      return state
  }
};



export default combineReducers({
  position: position
});