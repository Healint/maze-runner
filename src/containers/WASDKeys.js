import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions, ToastAndroid, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUserPosition } from '../../PositionActions';
import MazeSettings from '../../mazeSettings'

class WASD extends Component {

  state: {
    message: string,
    disabledState: boolean
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      message: 'Welcome to the Amazing Maze!',
      disabledState: false
    };
  }

  attemptLeft = () => {
    if (this.props.position.userPositionX === 0) {
      this.setState ({ message: "You hit the wall on your left!" });
    } else {
      this.setState ({ disabledState: true });
      this.setState ({ message: "" }); // TODO: Message should be set to be global universal
      this.props.updateUserPosition('SUB_X')
    }
  };

  attemptRight = () => {
    if (this.props.position.userPositionX === MazeSettings.gridSize - 1) {
      this.setState ({ message: "You hit the wall on your right!" });
    } else {
      this.setState ({ disabledState: true });
      this.setState ({ message: "" });
      this.props.updateUserPosition('ADD_X')
    }
  };

  attemptTop = () => {
    if (this.props.position.userPositionY === MazeSettings.gridSize - 1) {
      this.setState ({ message: "You hit the wall above!" });
    } else {
      this.setState ({ disabledState: true });
      this.setState ({ message: "" });
      this.props.updateUserPosition('ADD_Y')
    }
  };

  attemptBottom = () => {
    if (this.props.position.userPositionY === 0) {
      this.setState ({ message: "You hit the wall below!" });
    } else {
      this.setState ({ disabledState: true });
      this.setState ({ message: "" });
      this.props.updateUserPosition('SUB_Y')
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>{ this.state.message }</Text>
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
    if (prevProps.position.userPositionX !== this.props.position.userPositionX || prevProps.position.userPositionY !== this.props.position.userPositionY) {
      this.setState ({ disabledState: false });
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
  }
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    updateUserPosition,
  }, dispatch)
);

const mapStateToProps = (state) => {
  const { position } = state
  return { position }
};

export default connect(mapStateToProps, mapDispatchToProps)(WASD);