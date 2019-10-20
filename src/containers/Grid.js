import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions, ToastAndroid, Button } from 'react-native';
import { connect } from 'react-redux';
import Cell from './Cell'

class Grid extends Component {

  state: {
    message: string,
    count: number,
    maze: array
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      message: 'ABC',
      maze: [
        ["Entrance", "Path", "Path", "Path", "Path","Path", "Path", "Path", "Path", "Path"],
        ["Path", "Path", "Path", "Path", "Path","Path", "Path", "Path", "Path", "Path"],
        ["Path", "Path", "Path", "Path", "Path","Path", "Path", "Path", "Path", "Path"],
        ["Path", "Path", "Path", "Path", "Path","Path", "Path", "Path", "Path", "Path"],
        ["Path", "Path", "Path", "Path", "Path","Path", "Path", "Path", "Path", "Path"],
        ["Path", "Path", "Path", "Path", "Path","Path", "Path", "Path", "Path", "Path"],
        ["Path", "Path", "Path", "Path", "Path","Path", "Path", "Path", "Path", "Path"],
        ["Path", "Path", "Path", "Path", "Path","Path", "Path", "Path", "Path", "Path"],
        ["Path", "Path", "Path", "Path", "Path","Path", "Path", "Path", "Path", "Path"],
        ["Path", "Path", "Path", "Path", "Path","Path", "Path", "Path", "Path", "Exit"],
      ]
    };
  }

  renderMazeUI(cell) {
    switch (cell) {
      case 'Entrance':
        return <Image
          style={styles.entrance}
          source={require('../../assets/right-arrow.png')}
        />;
      case 'Path':
        return <Image
          style={styles.path}
          source={require('../../assets/up-arrow.png')}
        />;
      case 'Exit':
        return <Image
          style={styles.exit}
          source={require('../../assets/down-arrow.png')}
        />;
      default:
        return <Image
          style={styles.button}
          source={require('../../assets/left-arrow.png')}
        />;
    }
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
      </SafeAreaView>
    );
  }
}

const container = {
  flex: 1,
  backgroundColor: '#fff', // this is the feedback colour
  flexDirection: 'row'
}

const styles = StyleSheet.create({
  container: {
    marginTop: Dimensions.get('window').width * 0.1,
    backgroundColor: '#fff', // this is the feedback colour
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  exit: {
    backgroundColor: 'green', // this is the feedback colour
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1,
    resizeMode: 'contain'
  },
  path: {
    backgroundColor: 'yellow', // this is the feedback colour
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1,
    resizeMode: 'contain'
  },
  entrance: {
    backgroundColor: 'blue', // this is the feedback colour
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1,
    resizeMode: 'contain'
  }
});

const mapStateToProps = (state) => {
  const { friends, position } = state
  return { friends, position }
};

export default connect(mapStateToProps)(Grid);

