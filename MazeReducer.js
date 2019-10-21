import { combineReducers } from 'redux';

const INITIAL_STATE = {
  isFetching: false,
  isGameOver: false,

  userPositionY: 0,
  userPositionX: 0,

  BaseMaze: [
    ["Entrance", "Path", "Path", "Path", "Path","Path", "Path", "Path", "Path", "Path"],
    ["Path", "Path", "Path", "Path", "Path","Path", "Path", "Path", "Path", "Path"],
    ["Path", "Wall", "Path", "Path", "Path","Path", "Path", "Path", "Path", "Path"],
    ["Path", "Wall", "Path", "Path", "Path","Path", "Path", "Path", "Path", "Path"],
    ["Path", "Wall", "Path", "Path", "Path","Path", "Path", "Path", "Path", "Path"],
    ["Path", "Wall", "Path", "Path", "Path","Path", "Path", "Path", "Path", "Path"],
    ["Path", "Wall", "Path", "Path", "Path","Path", "Path", "Path", "Path", "Path"],
    ["Path", "Path", "Path", "Path", "Path","Path", "Path", "Path", "Path", "Path"],
    ["Path", "Path", "Path", "Path", "Path","Path", "Path", "Path", "Path", "Path"],
    ["Path", "Path", "Path", "Path", "Path","Path", "Path", "Path", "Path", "Exit"],
  ],
  TrapsTreasure: [
    ["Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark"],
    ["Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark"],
    ["Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark"],
    ["Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark"],
    ["Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark"],
    ["Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark"],
    ["Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark"],
    ["Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark"],
    ["Dark", "Armor", "DynamicSpike", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark"],
    ["Dark", "StaticSpike", "FireBridge", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark"]
  ],

  initVisbilityCone: [],

  turn: 0
};

const maze = (state = INITIAL_STATE, action) => {
  var newTurn = state.turn + 1;

  switch (action.type) {
    // TODO: Reset Maze
    case 'UPDATE_Y':
      return Object.assign({}, state, {
        userPositionY: action.payload
      })

    case 'UPDATE_X':
      return Object.assign({}, state, {
        userPositionX: action.payload
      })

    case 'UPDATE_MAZE':
      return Object.assign({}, state, {
        BaseMaze: action.payload
      })

    case 'UPDATE_TRAPS':
      return Object.assign({}, state, {
        TrapsTreasure: action.payload
      })

    case 'RESET_MAZE':
      // TODO: This should be payload
      return Object.assign({}, state, {
        userPositionY: 0,
        userPositionX: 0,

        BaseMaze: [
          ["Entrance", "Path", "Path", "Path", "Path","Path", "Path", "Path", "Path", "Path"],
          ["Path", "Path", "Path", "Path", "Path","Path", "Path", "Path", "Path", "Path"],
          ["Path", "Wall", "Path", "Path", "Path","Path", "Path", "Path", "Path", "Path"],
          ["Path", "Wall", "Path", "Path", "Path","Path", "Path", "Path", "Path", "Path"],
          ["Path", "Wall", "Path", "Path", "Path","Path", "Path", "Path", "Path", "Path"],
          ["Path", "Wall", "Path", "Path", "Path","Path", "Path", "Path", "Path", "Path"],
          ["Path", "Wall", "Path", "Path", "Path","Path", "Path", "Path", "Path", "Path"],
          ["Path", "Path", "Path", "Path", "Path","Path", "Path", "Path", "Path", "Path"],
          ["Path", "Path", "Path", "Path", "Path","Path", "Path", "Path", "Path", "Path"],
          ["Path", "Path", "Path", "Path", "Path","Path", "Path", "Path", "Path", "Exit"],
        ],
        TrapsTreasure: [
          ["Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark"],
          ["Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark"],
          ["Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark"],
          ["Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark"],
          ["Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark"],
          ["Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark"],
          ["Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark"],
          ["Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark"],
          ["Dark", "Armor", "DynamicSpike", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark"],
          ["Dark", "StaticSpike", "FireBridge", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark"]
        ],
        turn: 0
      })

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
  maze: maze
});