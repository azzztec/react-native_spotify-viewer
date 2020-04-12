import React from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import { Audio } from 'expo-av';

export default class BottomTrackBar extends React.Component {
  constructor(props) {
    super(props)

    // this.state = {
    //   isTrackPlaying: this.props.isTrackPlaying
    // }
  }

  // _handleResumeTrack = (soundObject) => {
  //   soundObject.playAsync();
  //   this.setState({
  //     isTrackPlaying: true
  //   })
  // }

  // _handlePauseTrack = (soundObject) => {
  //   soundObject.pauseAsync();
  //   this.setState({
  //     isTrackPlaying: false
  //   })
  // }

  render() {
    return (
      <View >
        <View style={styles.container}>
          <View>
            <Text style={styles.trackName}>{this.props.currentTrackName}</Text>
            <Text style={styles.author}>{this.props.currentTrackAuthor}</Text>
          </View>
          {
          this.props.isTrackPlaying ? (
            <FontAwesomeIcon 
              icon={ faPauseCircle } 
              style={styles.icon} 
              size={40}
              onPress={this.props.pauseTrack}
            />) : (
            <FontAwesomeIcon 
              icon={ faPlayCircle } 
              style={styles.icon} 
              size={40}
              onPress={this.props.resumePlayTrack}
            />)
          }
          {/* {
          this.state.isTrackPlaying ? (
            <FontAwesomeIcon 
              icon={ faPauseCircle } 
              style={styles.icon} 
              size={40}
              onPress={() => this._handlePauseTrack(this.props.soundObject)}
            />) : (
            <FontAwesomeIcon 
              icon={ faPlayCircle } 
              style={styles.icon} 
              size={40}
              onPress={() => this._handleResumeTrack(this.props.soundObject)}
            />)
          } */}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '4%',
    paddingTop: '1%',
    paddingBottom: '8%',
    justifyContent: 'space-between',
    zIndex: 100,
    borderBottomWidth: 2,
    borderBottomColor: '#1DB954',
    backgroundColor: '#000000',
  },
  icon: {
    color: '#ffffff'
  },
  trackName: {
    fontSize: 17,
    color: '#ffffff'
  },
  author: {
    fontSize: 15,
    color: '#848484'
  }
});