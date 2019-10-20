import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions, ToastAndroid, Button } from 'react-native';
import { connect } from 'react-redux';

class Grid extends Component {

  state: {
    message: string,
  }

  constructor(props: Props) {
    super(props);
    let mazeCopy = props.maze.BaseMaze.map((x) => x);
    this.state = {
      message: 'ABC',
      maze: mazeCopy.reverse() // visually correct maze because the maze is render max y at the top
    };
  }

  renderMazeUI(cell) {
    switch (cell) {
      case 'Wall':
        return <Image
          style={styles.wall}
          source={require('../../assets/Brick_Wall.png')}
        />
      case 'Path':
        return <Image
          style={styles.image}
          source={require('../../assets/Grass_Block.png')}
        />
      case 'Exit':
        return <Image
          style={styles.exit}
          source={require('../../assets/Milk_Block.png')}
        />
      default: // Default are walls
        return <Image
          style={styles.image}
          source={require('../../assets/Grass_Block.png')}
        />
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
  wall: {
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1,
    resizeMode: 'contain'
  },
  exit: {
    backgroundColor: 'transparent',
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1,
    resizeMode: 'contain'
  },
  image: {
    backgroundColor: 'transparent',
    opacity: 1,
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1,
    resizeMode: 'contain'
  },
  entrance: {
    backgroundColor: 'blue', // this is the feedback colour
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1
  }
});

const mapStateToProps = (state) => {
  const { maze } = state
  return { maze }
};

export default connect(mapStateToProps)(Grid);

