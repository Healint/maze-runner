import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import positionReducer from './PositionReducer';

import WASDKeys from './src/containers/WASDKeys';
import Grid from './src/containers/Grid';
import VisionCone from './src/containers/VisionCone';

const store = createStore(positionReducer);

export default class GeeksForGeeks extends Component {

  state: {
    password: string,
    isPasswordHidden: boolean,
    toggleText: string,
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      password: '',
      isPasswordHidden: true,
      toggleText: 'Show',
    };
  }

  // TODO: make method calls here upfront for Maze Calling and enemy calling!
  handleToggle = () => {
    const { isPasswordHidden } = this.state;

    if (isPasswordHidden) {
      this.setState({ isPasswordHidden: false });
      this.setState({ toggleText: 'Hide' });
    } else {
      this.setState({ isPasswordHidden: true });
      this.setState({ toggleText: 'Show' });
    }
  };

  // TODO: Make Grid and Vision Cone into Condition rendering
  // TODO: Pass In Maze Init Props into Grid and Vision Cone
  render() {
    return (
        <View>
          <Provider store={ store }>
            <Grid/>
            <VisionCone/>
            <WASDKeys/>
          </Provider>
        </View>

    );
  }
}


AppRegistry.registerComponent('GeeksForGeeks', () => GeeksForGeeks);