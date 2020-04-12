import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Image } from 'react-native';

import TrackList from './TrackList';

export default class TracksScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoadingComplete: false,
      tracks: [],
      playlist: []
    }
  }

  componentDidMount() {
    const playlistId = this.props.route.params.playlistId;

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
          />}
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
    height: '100%',
    
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
    backgroundColor: '#1DB954',
    paddingTop: '7%'
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
});