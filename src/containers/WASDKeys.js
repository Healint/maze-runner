import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions, ToastAndroid, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUserPosition } from '../../MazeActions';
import MazeSettings from '../../mazeSettings'

class WASD extends Component {

  state: {
    message: string,
    disabledState: boolean,
    isGameOver: boolean
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      message: 'Welcome to the Amazing Maze!',
      disabledState: false,
      isGameOver: false
    };
  }


  // TODO: API fetch call for Maze Calling and enemy calling!
  generateMaze = () => {
    this.props.updateUserPosition('RESET_MAZE') // TODO: call something else?
    this.setState ({ disabledState: false });
    this.setState ({ message: "New maze has been generated." });
    this.setState ({ isGameOver: false });
  };

  checkCollision = (x, y) => {
      switch (this.props.maze.BaseMaze[y][x]) {
        case 'Wall':
          return true
        default:
          return false
      }
  }

  attemptLeft = () => {
    if (this.props.maze.userPositionX === 0 ) {
      this.setState ({ message: "You hit the wall on your left!" });
    } else if (this.checkCollision(this.props.maze.userPositionX - 1, this.props.maze.userPositionY)) {
      this.setState ({ message: "Head-Wall collision detected." });
    } else {
      this.setState ({ disabledState: true });
      this.setState ({ message: "Find the milk." }); // TODO: Message should be set to be global universal
      this.props.updateUserPosition('SUB_X')
    }
  };

  attemptRight = () => {
    if (this.props.maze.userPositionX === MazeSettings.gridSize - 1) {
      this.setState ({ message: "You hit the wall on your right!" });
    } else if (this.checkCollision(this.props.maze.userPositionX + 1, this.props.maze.userPositionY)) {
      this.setState ({ message: "Head-Wall collision detected." });
    } else {
      this.setState ({ disabledState: true });
      this.setState ({ message: "Find the milk." });
      this.props.updateUserPosition('ADD_X')
    }
  };

  attemptTop = () => {
    if (this.props.maze.userPositionY === MazeSettings.gridSize - 1) {
      this.setState ({ message: "You hit the wall above!" });
    } else if (this.checkCollision(this.props.maze.userPositionX, this.props.maze.userPositionY + 1)) {
      this.setState ({ message: "Head-Wall collision detected." });
    } else {
      this.setState ({ disabledState: true });
      this.setState ({ message: "Find the milk." });
      this.props.updateUserPosition('ADD_Y')
    }
  };

  attemptBottom = () => {
    if (this.props.maze.userPositionY === 0) {
      this.setState ({ message: "You hit the wall below!" });
    } else if (this.checkCollision(this.props.maze.userPositionX, this.props.maze.userPositionY - 1)) {
      this.setState ({ message: "Head-Wall collision detected." });
    } else {
      this.setState ({ disabledState: true });
      this.setState ({ message: "Find the milk." });
      this.props.updateUserPosition('SUB_Y')
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>{ this.state.message }</Text>
        {
          this.state.isGameOver === true
            ? (<View style={[{ width: "100%"}]}>
              <Button style={ styles.resetMaze } title={ "Play Again?"} onPress={this.generateMaze}></Button>
            </View>)
            : null
        }
        <TouchableOpacity
          activeOpacity={ this.state.disabledState ? 1 : 0.5 }
          disabled={ this.state.disabledState }
          onPress={this.attemptLeft}
        >
          <Image
            style={styles.button}
            source={require('../../assets/left-arrow.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={ this.state.disabledState ? 1 : 0.5 }
          disabled={ this.state.disabledState }
          onPress={this.attemptTop}
        >
          <Image style={styles.button} source={require('../../assets/up-arrow.png')}/>
        </TouchableOpacity>


        <TouchableOpacity
          activeOpacity={ this.state.disabledState ? 1 : 0.5 }
          disabled={ this.state.disabledState }
          onPress={this.attemptBottom}
        >
          <Image style={styles.button} source={require('../../assets/down-arrow.png')}/>
        </TouchableOpacity>


        <TouchableOpacity
          activeOpacity={ this.state.disabledState ? 1 : 0.5 }
          disabled={ this.state.disabledState }
          onPress={this.attemptRight}
        >
          <Image style={styles.button} source={require('../../assets/right-arrow.png')}/>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.maze.userPositionX !== this.props.maze.userPositionX || prevProps.maze.userPositionY !== this.props.maze.userPositionY) {
      // check GameOverState
      let TT = this.props.maze.TrapsTreasure[this.props.maze.userPositionY][this.props.maze.userPositionX]
      let BM = this.props.maze.BaseMaze[this.props.maze.userPositionY][this.props.maze.userPositionX]

      if (TT === 'Armor' || TT === 'BonusExit') {
        if (this.props.maze.turn % MazeSettings.armorTurn === 0) {
          this.setState ({disabledState: true});
          this.setState ({message: 'You found the milk!'});
          this.setState ({isGameOver: true});
          return
        }
      } else if (TT === 'StaticSpike' || BM === 'StaticSpike') { // Cos I dunno which is it
        this.setState ({disabledState: true});
        this.setState ({message: 'You became a cat skewer!'});
        this.setState ({isGameOver: true});
        return
      } else if (TT === 'FireBridge') {
        if (this.props.maze.turn % MazeSettings.fireBridgeTurn === 0) {
          this.setState ({disabledState: true});
          this.setState ({message: 'You became a roasted milkless cat!'});
          this.setState ({isGameOver: true});
          return
        }
      } else if (TT === 'DynamicSpike') {
        if (this.props.maze.turn % MazeSettings.dynamicSpikeTurn === 0) {
          this.setState ({disabledState: true});
          this.setState ({message: 'You ascended to Ghostland without milk!'});
          this.setState ({isGameOver: true});
          return
        }
      }  else if (BM === 'Exit') {
        this.setState ({disabledState: true});
        this.setState ({message: 'You found the milk!'});
        this.setState ({isGameOver: true});
        return
      }

      setTimeout(() => this.setState ({ disabledState: false }), 250)

    }
  }
}


const styles = StyleSheet.create({
  message: {
    width: Dimensions.get('window').width,
    textAlign: 'center'
  },
  container: {
    backgroundColor: '#fff', // this is the feedback colour
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  button: {
    marginTop: Dimensions.get('window').width * 0.1,
    width: Dimensions.get('window').width * 0.25,
    height: Dimensions.get('window').width * 0.20,
    resizeMode: 'contain'
  },
  resetMaze: {
    alignSelf: 'stretch',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 0.1,
  }
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    updateUserPosition,
  }, dispatch)
);

const mapStateToProps = (state) => {
  const { maze } = state
  return { maze }
};

export default connect(mapStateToProps, mapDispatchToProps)(WASD);