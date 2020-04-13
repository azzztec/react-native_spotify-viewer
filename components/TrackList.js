import React from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { Audio } from 'expo-av';

import BottomTrackBar from './BottomTrackBar';

export default class TrackList extends React.Component {
    constructor(props) {
      super(props)
  
      this._handleResumePlayTrack = this.handleResumePlayTrack.bind(this);
      this._handlePauseTrack = this.handlePauseTrack.bind(this);
      this.soundObject = new Audio.Sound();
      this.state = {
        isTrackPlaying: false,
        isFirstTrack: false,
        currentTrackName: '',
        currentTrackAuthor: '',
        isPrevTrackPlaying: this.props.prevSoundObject.isFirstTrack,
        isPrevTrackPlayingNow: this.props.prevSoundObject.isTrackPlayingNow
      }
    }
  
    handleResumePlayTrack = (soundObject) => {
      soundObject.playAsync()

      this.setState({
        isPrevTrackPlayingNow: true,
        isTrackPlaying: true,
      })
      this.props.setNewSoundObject({
        soundObject: soundObject,
        currentTrackName: this.state.currentTrackName,
        currentTrackAuthor: this.state.currentTrackAuthor,
        isTrackPlayingNow: true,
        isTrackPlaying: true,
        isFirstTrack: true
      })
    }
  
    handlePauseTrack = (soundObject) => {
      soundObject.pauseAsync()

      this.setState({
        isPrevTrackPlayingNow: false,
        isTrackPlaying: false,
      })
      this.props.setNewSoundObject({
        soundObject: soundObject,
        currentTrackName: this.state.currentTrackName,
        currentTrackAuthor: this.state.currentTrackAuthor,
        isTrackPlayingNow: false,
        isTrackPlaying: true,
        isFirstTrack: true
      })
      
    }
  
    _handlePlayTrack = async (url, trackName, trackAuthor) => {
      if(this.props.prevSoundObject.soundObject) {
        this.props.prevSoundObject.soundObject.stopAsync()
      }
  
      this.soundObject.unloadAsync()
      this.soundObject.setOnPlaybackStatusUpdate();
      await this.soundObject.loadAsync({uri: url});
      await this.soundObject.playAsync();
  
      this.setState({
        currentTrackName: trackName,
        currentTrackAuthor: trackAuthor,
        isTrackPlaying: true,
        isFirstTrack: true,
        isPrevTrackPlaying: false,
        isPrevTrackPlayingNow: true
      })
  
      this.props.setNewSoundObject({
        soundObject: this.soundObject,
        currentTrackName: this.state.currentTrackName,
        currentTrackAuthor: this.state.currentTrackAuthor,
        isTrackPlayingNow: true,
        isTrackPlaying: true,
        isFirstTrack: true,
      })
    }
    
    render() {
      return (
        <View style={styles.tracksContainer}>
          {
            console.log('isPrevTrackPlayingNow: ' + this.state.isPrevTrackPlayingNow)
          }
          {(!this.state.isFirstTrack && this.props.prevSoundObject.isTrackPlaying) &&
            <BottomTrackBar 
              pauseTrack = {this.handlePauseTrack}
              resumePlayTrack = {this.handleResumePlayTrack}
              isTrackPlaying = {this.state.isPrevTrackPlayingNow}
              currentTrackName = {this.props.prevSoundObject.currentTrackName}
              currentTrackAuthor = {this.props.prevSoundObject.currentTrackAuthor}
              soundObject = {this.props.prevSoundObject.soundObject}
            />}
          {this.state.isFirstTrack &&
            <BottomTrackBar 
              pauseTrack = {this.handlePauseTrack}
              resumePlayTrack = {this.handleResumePlayTrack}
              isTrackPlaying = {this.state.isTrackPlaying}
              currentTrackName = {this.state.currentTrackName}
              currentTrackAuthor = {this.state.currentTrackAuthor}
              soundObject = {this.soundObject}
            />}
          <FlatList
            data={this.props.tracks}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View>
                {!item.track.preview_url ? (
                  <View style={styles.track}>
                    <FontAwesomeIcon icon={faMusic} style={styles.unavailableIcon} size={32}/>
                    <View>
                      <Text style={styles.unavailableTrackName}>{item.track.name}</Text>
                      <Text style={styles.unavailableAuthor}>{item.track.artists[0].name}</Text>
                    </View>
                  </View>
                ) : 
                  <TouchableOpacity onPress={() =>  {
                    this._handlePlayTrack(item.track.preview_url, item.track.name, item.track.artists[0].name)}}
                  >
                    <View style={styles.track}>
                      <FontAwesomeIcon icon={faMusic} style={styles.availableIcon} size={32}/>
                      <View>
                        <Text style={styles.availableTrackName}>{item.track.name}</Text>
                        <Text style={styles.availableAuthor}>{item.track.artists[0].name}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                }
              </View>
            )}
          />
        </View>
      )
    }
  }

const styles = StyleSheet.create({
	track: {
			marginTop: '2%',
			flexDirection: 'row',
			alignItems: 'center'
	},
	availableAuthor: {
			color: '#848484'
	},
	unavailableAuthor: {
			color: '#444444'
	},
	availableTrackName: {
			color: '#ffffff'
	},
	unavailableTrackName: {
			color: '#444444'
	},
	availableIcon: {
			color: '#ffffff',
			marginRight: '2%'
	},
	unavailableIcon: {
			color: '#444444',
			marginRight: '2%'
	}
});