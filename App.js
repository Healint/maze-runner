import React, { Component } from 'react';
import {
  AppRegistry, StyleSheet, Text, View, Button, TouchableOpacity, Dimensions
} from 'react-native';
import {connect, Provider} from 'react-redux';
import { createStore } from 'redux';
import MazeReducer from './MazeReducer';

import WASDKeys from './src/containers/WASDKeys';
import Grid from './src/containers/Grid';
import VisionCone from './src/containers/VisionCone';
import TrapsTreasure from './src/containers/TrapsTreasure';

const store = createStore(MazeReducer);

export default class App extends Component {

  state: {
    password: string,
    isPasswordHidden: boolean,
  }

  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

  // TODO: Make Grid and Vision Cone into Condition rendering
  // TODO: Pass In Maze Init Props into Grid and Vision Cone
  render() {
    return (

        <View>
          <Provider store={ store }>
            <Grid/>
            <TrapsTreasure/>
            <VisionCone/>
            <WASDKeys/>
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

