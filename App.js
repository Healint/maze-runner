import React, { Component } from 'react';
import {
  AppRegistry, StyleSheet, Text, View, Button, TouchableOpacity, Dimensions
} from 'react-native';
import {connect, Provider} from 'react-redux';
import { createStore } from 'redux';
import MazeReducer from './MazeReducer';

import EventEmitter from 'EventEmitter';


import WASDKeys from './src/containers/WASDKeys';
import Grid from './src/containers/Grid';
import VisionCone from './src/containers/VisionCone';
import TrapsTreasure from './src/containers/TrapsTreasure';

const store = createStore(MazeReducer);

export default class App extends Component {

  state: {
    password: string,
    isPasswordHidden: boolean,
    userPositionX: number,
    BaseMaze: array
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      isFetching: true
    };
    this.generateMaze = this.generateMaze.bind(this);
  }

  generateMaze() {
    this.setState({ isFetching: true })
    fetch('http://eggplant.healint.com:5326/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "dimension": 10,
        "traps": {
          "FireBridge": 2,
          "DynamicSpike": 2,
          "StaticSpike": 2
        }
      })
    }, 7000)
      .then((resp) => resp.json())
      .then((data) => {
        let myJson = data
        this.setState({
          isFetching: false,
          userPositionY: myJson.user_position_y,
          userPositionX: myJson.user_position_x,
          BaseMaze: myJson.base_maze,
          TrapsTreasure: myJson.object_maze,
          turn: 0
        })
      })
  }

  componentDidMount() {
    this.generateMaze()
  }

  // TODO: Make Grid and Vision Cone into Condition rendering
  // TODO: Pass In Maze Init Props into Grid and Vision Cone
  render() {
    return (

        <View>
          <Provider store={ store }>
            {
              this.state.isFetching === false
                ? (<Grid BaseMaze={this.state.BaseMaze}/>)
                : null
            }
            {
              this.state.isFetching === false
                ? (<TrapsTreasure TrapsTreasure={this.state.TrapsTreasure}/>)
                : null
            }
            {
              this.state.isFetching === false
                ? (<VisionCone/>)
                : null
            }
            {
              this.state.isFetching === false
                ? (<WASDKeys
                  userPositionY={this.state.userPositionY}
                  userPositionX={this.state.userPositionX}
                  BaseMaze={this.state.BaseMaze}
                  TrapsTreasure={this.state.TrapsTreasure}
                  updateMaze={this.generateMaze}
                    />)
                : null
            }
          </Provider>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: Dimensions.get('window').width * 0.1 // doesn't work
  }
})

AppRegistry.registerComponent('App', () => App); // Not sure what this does

