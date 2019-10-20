import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions, ToastAndroid, Button } from 'react-native';
import MazeSettings from '../../mazeSettings'
import {connect} from "react-redux";

class VisionCone extends Component {

  state: {
    message: string,
    count: number,
    maze: array,
    visibleXStart: number,
    visibleXEnd: number,
    visibleYStart: number,
    visibleYEnd: number
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      message: 'ABC',
      visibleXStart: 0,
      visibleXEnd: 3,
      visibleYStart: 0,
      visibleYEnd: 3,
      maze: [
        ["Dark", "Dark", "Dark", "Dark", "Dark","Dark", "Dark", "Dark", "Dark", "Dark"],
        ["Dark", "Dark", "Dark", "Dark", "Dark","Dark", "Dark", "Dark", "Dark", "Dark"],
        ["Dark", "Dark", "Dark", "Dark", "Dark","Dark", "Dark", "Dark", "Dark", "Dark"],
        ["Dark", "Dark", "Dark", "Dark", "Dark","Dark", "Dark", "Dark", "Dark", "Dark"],
        ["Dark", "Dark", "Dark", "Dark", "Dark","Dark", "Dark", "Dark", "Dark", "Dark"],
        ["Dark", "Dark", "Dark", "Dark", "Dark","Dark", "Dark", "Dark", "Dark", "Dark"],
        ["Light", "Light", "Light", "Light", "Dark","Dark", "Dark", "Dark", "Dark", "Dark"],
        ["Light", "Light", "Light", "Light", "Dark","Dark", "Dark", "Dark", "Dark", "Dark"],
        ["Light", "Light", "Light", "Light", "Dark","Dark", "Dark", "Dark", "Dark", "Dark"],
        ["User", "Light", "Light", "Light", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark"]
      ]
    };

    // TODO: Initialisation
  }

  renderMazeUI(cell) {
    switch (cell) {
      case 'User':
        return <Image
          style={styles.user}
          source={require('../../assets/down-arrow.png')}
        />;
      case 'Light':
        return <Text style={styles.light}></Text>;
      case 'Dark':
        return <Text style={styles.dark}></Text>;
      default:
        return <Image
          style={styles.entrance}
          source={require('../../assets/left-arrow.png')}
        />;
    }
  }

  drawVisibilityCone() {

  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {
          this.state.maze.map((row) =>
            row.map((cell) =>
              this.renderMazeUI(cell)
            )
          )
        }
        <Text>visibleXStart: { this.state.visibleXStart }</Text>
        <Text>visibleXEnd: { this.state.visibleXEnd }</Text>
        <Text>visibleYStart: { this.state.visibleYStart }</Text>
        <Text>visibleYEnd: { this.state.visibleYEnd }</Text>
      </SafeAreaView>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.position.userPositionX !== this.props.position.userPositionX || prevProps.position.userPositionY !== this.props.position.userPositionY) {

      let temp = []
      for (let i = 0; i < MazeSettings.gridSize; i++) {
        temp.push(["Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark", "Dark"])
      }

      // Draws visibility cone
      let visibleXStart = this.props.position.userPositionX - 3
      if (visibleXStart < 0) {
        visibleXStart = 0
      }

      let visibleXEnd = this.props.position.userPositionX + 3
      if (visibleXEnd > MazeSettings.gridSize - 1) {
        visibleXEnd = MazeSettings.gridSize - 1
      }

      let visibleYStart = this.props.position.userPositionY - 3
      if (visibleYStart < 0) {
        visibleYStart = 0
      }

      let visibleYEnd = this.props.position.userPositionY + 3
      if (visibleYEnd >= MazeSettings.gridSize - 1) {
        visibleYEnd = MazeSettings.gridSize - 1
      }

      for (let yCounter = visibleYStart; yCounter <= visibleYEnd; yCounter++) {
        for (let xCounter = visibleXStart; xCounter <= visibleXEnd; xCounter++) {
          temp[yCounter][xCounter] = "Light"
        }
      }

      // Draws the user
      // x: 9, y: 0
      temp[this.props.position.userPositionY][this.props.position.userPositionX] = "User"

      // Redraws the full map
      this.setState((state) => {
        return {
          visibleXStart: visibleXStart,
          visibleXEnd: visibleXEnd,
          visibleYStart: visibleYStart,
          visibleYEnd: visibleYEnd,
          maze: temp.reverse()};
      });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Dimensions.get('window').width * -1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  light: {
    opacity: 0,
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1,
  },
  dark: {
    opacity: 1,
    backgroundColor: 'black', // this is the feedback colour
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1
  },
  user: {
    backgroundColor: 'blue', // this is the feedback colour
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1,
    borderRadius: 10,
    resizeMode: 'contain'
  }
});

const mapStateToProps = (state) => {
  const { position } = state
  return { position }
};

// ({
//   specificProperty: state.specificProperty,
//   // any props you need else
// })


export default connect(mapStateToProps)(VisionCone);