import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions, ToastAndroid, Button } from 'react-native';
import MazeSettings from '../../mazeSettings'
import {connect} from "react-redux";

class TrapsTreasure extends Component {

  state: {
    message: string,
    maze: array,
  }

  constructor(props: Props) {
    super(props);
    let mazeCopy = props.TrapsTreasure.map((x) => x);
    this.state = {
      maze: mazeCopy.reverse() // Visually correct collision
    };

    // TODO: Initialisation
  }

  renderMazeUI(cell, turn) {
    switch (cell) {
      case 'StaticSpike':
        return <Image
          style={styles.mazething}
          source={require('../../assets/Spike_Block.png')}
        />
      case 'FireBridge': // 3
        if (turn % MazeSettings.fireBridgeTurn === 0) {
          return <Image
            style={styles.mazething}
            source={require('../../assets/Fire_Block.png')}
          />
        } else if (turn % MazeSettings.fireBridgeTurn === MazeSettings.fireBridgeTurn - 1) {
          return <Image
            style={styles.hint}
            source={require('../../assets/Question_Mark.png')}
          />;
        } else {
          return <Image style={styles.transparent}/>;
        }
      case 'DynamicSpike': // 5
        if (turn % MazeSettings.dynamicSpikeTurn === 0) {
          return <Image
            style={styles.mazething}
            source={require('../../assets/ghost.png')}
            />
        } else if (turn % MazeSettings.dynamicSpikeTurn === MazeSettings.dynamicSpikeTurn - 1) {
          return <Image
            style={styles.hint}
            source={require('../../assets/Question_Mark.png')}
          />;
        } else {
          return <Image style={styles.transparent}/>;
        }
      case 'Armor':
      case 'BonusExit' : // 3, Called Armor but functions as a teleport key!
        if (turn % MazeSettings.armorTurn === 0) {
          return <Image
            style={styles.mazething}
            source={require('../../assets/Milk_Block.png')}
          />
        } else if (turn % MazeSettings.armorTurn === MazeSettings.armorTurn - 1) {
          return <Image
            style={styles.hint}
            source={require('../../assets/Question_Mark.png')}
          />;
        } else {
          return <Image style={styles.transparent}/>;
        }
      default:
        return <Image style={styles.transparent}/>;
    }
  }

  render() {
    return (<SafeAreaView style={styles.container}>
        {this.state.maze.map((row) => row.map((cell) => this.renderMazeUI(cell, this.props.maze.turn)))}
      </SafeAreaView>);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.isFetching === true) {
      let mazeCopy = this.props.maze.TrapsTreasure.map((x) => x);
      this.setState = ({
        maze: mazeCopy.reverse() // Visually correct collision
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
  hint: {
    opacity: 0.7,
    backgroundColor: 'transparent',
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1
  },
  transparent: {
    opacity: 0,
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1,
  },
  mazething: {
    opacity: 1,
    backgroundColor: 'transparent',
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1,
    resizeMode: 'contain'
  }
});

const mapStateToProps = (state) => {
  const { maze } = state
  return { maze }
};

// ({
//   specificProperty: state.specificProperty,
//   // any props you need else
// })


export default connect(mapStateToProps)(TrapsTreasure);