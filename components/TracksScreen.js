import React from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { Audio } from 'expo-av';

import BottomTrackBar from './BottomTrackBar';

export default class TracksScreen extends React.Component {
  constructor() {
    super()

    this.state = {
      isLoadingComplete: false,
      tracks: [],
      playlist: []
    }
  }

  componentDidMount() {
    const playlistId = this.props.route.params.playlistId;
    console.log(this.props.route.params.soundObject)
    fetch(`https://afternoon-waters-49321.herokuapp.com/v1/playlists/${playlistId}`)
      .then((response) => response.json())
      .then((playlistJson) => {
        this.setState({ 
          tracks: playlistJson.tracks.items,
          playlist: playlistJson
        });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoadingComplete: true });
      });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.playlistInfo}>
          <Image 
            style={styles.image}
            source={{uri: this.props.route.params.imageUrl}}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {this.state.playlist.name}
            </Text>
            <Text style={styles.credits}>PlayList by Spotify</Text>
            <View style={styles.subText}>
              <Text style={styles.description}>
                {this.state.playlist.description}
              </Text>
              <Text style={styles.views}>
                {/* there is an error with getting followers value */}
                {/* {this.state.playlist.followers.total} */}
                5.2M
              </Text>
            </View>
          </View>
        </View>
        {!this.state.isLoadingComplete ? 
          <ActivityIndicator size='large'/> : 
          <TrackList
              tracks={this.state.tracks}
              prevSoundObject={this.props.route.params.soundObject}
              setNewSoundObject={this.props.route.params.setNewSoundObject}
              // showBottomTrackBarOnHomeScreen={this.props.route.params.showBottomTrackBar}
          />}
      </View>
    )
  }
}

class TrackList extends React.Component {
  constructor(props) {
    super(props)

    this._handleResumePlayTrack = this._handleResumePlayTrack.bind(this);
    this._handlePauseTrack = this._handlePauseTrack.bind(this);
    this.soundObject = new Audio.Sound();
    this.state = {
      isTrackPlaying: false,
      isFirstTrack: false,
      currentTrackName: '',
      currentTrackAuthor: '',
    }
  }

  _handleResumePlayTrack = () => {
    this.soundObject.playAsync();
    this.setState({
      isTrackPlaying: true
    })
  }

  _handlePauseTrack = () => {
    this.soundObject.pauseAsync();
    this.setState({
      isTrackPlaying: false
    })
  }

  _handlePlayTrack = async (url, trackName, trackAuthor) => {
    // console.log(this.props.prevSoundObject)
    if(this.props.prevSoundObject) {
      this.props.prevSoundObject.stopAsync()
    }

    this.soundObject.unloadAsync()
    this.soundObject.setOnPlaybackStatusUpdate();
    await this.soundObject.loadAsync({uri: url});
    await this.soundObject.playAsync();

    this.setState({
      currentTrackName: trackName,
      currentTrackAuthor: trackAuthor,
      isTrackPlaying: true,
      isFirstTrack: true
    })

    this.props.setNewSoundObject(this.soundObject)
    // this.props.showBottomTrackBarOnHomeScreen(
    //   this.state.isTrackPlaying,
    //   this.soundObject,
    //   this.state.currentTrackName,
    //   this.state.currentTrackAuthor
    // )
  }
  
  render() {
    return (
      <View style={styles.tracksContainer}>
        {this.state.isFirstTrack &&
          <BottomTrackBar 
            pauseTrack = {this._handlePauseTrack}
            resumePlayTrack = {this._handleResumePlayTrack}
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
  test: {
    height: 50,
    backgroundColor: 'pink'
  },  
  mainContainer: {
    backgroundColor: '#000000',
    height: '100%'
  },
  tracksContainer: {
    position: 'relative'
  },
  image: {
    width: 120,
    height: 120
  },
  playlistInfo: {
    flexDirection: 'row',
    paddingHorizontal: '4%',
    paddingVertical: '5%',
    backgroundColor: '#1DB954'
  },
  textContainer: {
    marginLeft: '2%'
  },
  title: {
    fontSize: 26,
    color: '#ffffff',
    fontWeight: '500'
  },
  credits: {
    fontSize: 13,
    color: '#848484'
  },
  description: {
    color: '#ffffff',
    fontSize: 14,
    maxWidth: '80%'
  },
  views: {
    fontSize: 13,
    color: '#848484'
  },
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