import React from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Image, Button, TouchableHighlight } from 'react-native';
import { Audio } from 'expo-av';

import BottomTrackBar from './BottomTrackBar'

export default class PlaylistsScreen extends React.Component {
  constructor() {
    super();

    // this.trackName = '';
    // this.trackAuthor = '';
    this.soundObject = null;
    this._handlePress = this._handlePress.bind(this);
    this.setNewSoundObject = this.setNewSoundObject.bind(this);
    // this.showBottomTrackBar = this.showBottomTrackBar.bind(this);
    this.state = {
      isLoadingComplete: false,
      dataSource: null,
      isTrackPlaying: false,
      soundObject: null
    }
  }

  setNewSoundObject = (newSoundObject) => {
    this.soundObject = newSoundObject;
  }

  // showBottomTrackBar = (isTrackPlaying, soundObject, currentTrackName, currentTrackAuthor) => {
  //   this.trackName = currentTrackName;
  //   this.trackAuthor = currentTrackAuthor;
  //   this.soundObject = soundObject;
  //   this.setState({
  //     isTrackPlaying: isTrackPlaying,
  //   });
  // }

  _handlePress(playlistId, imageUrl) {
    this.props.navigation.navigate('TracksScreen', {
      playlistId: playlistId,
      imageUrl: imageUrl,
      soundObject: this.soundObject,
      setNewSoundObject: this.setNewSoundObject
      // showBottomTrackBar: this.showBottomTrackBar
    });
  }

  componentDidMount() {
    fetch('https://afternoon-waters-49321.herokuapp.com/v1/browse/featured-playlists')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ dataSource: json.playlists.items });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoadingComplete: true });
      });
  }

  render() {
    const { dataSource, isLoadingComplete } = this.state;

    return (
        <View style={styles.container}>
          {/* {this.state.isTrackPlaying &&
            <View>
              <BottomTrackBar 
                isTrackPlaying = {this.state.isTrackPlaying}
                currentTrackName = {this.trackName}
                currentTrackAuthor = {this.trackAuthor}
                soundObject = {this.soundObject}
              />
              <BottomTrackBar />
            </View>
          } */}
            {!isLoadingComplete ? <ActivityIndicator size='large'/> : (
            <View style={styles.readyScreenContainer}>
                <Text style={styles.title}>Editor's picks</Text>
                <FlatList
                  data={dataSource}
                  numColumns='2'
                  columnWrapperStyle={styles.listRow}
                  keyExtractor={({ id }, index) => id}
                  renderItem={({ item }) => (
                    <PlaylistImage 
                      imageUrl={item.images[0].url} 
                      onPress={this._handlePress}
                      playlistId={item.id}
                    />
                  )}
                />
            </View>
            )}
        </View>
    )
  }
}

function PlaylistImage(props) {

  return (
    <TouchableHighlight onPress={() => props.onPress(props.playlistId, props.imageUrl)}>
      <Image 
        style={styles.image}
        source={{uri: props.imageUrl}}
      />
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  readyScreenContainer: {
    paddingTop: '7%',
    backgroundColor: '#000000'
  },
  image: {
    width: 190,
    height: 190,
  },
  listRow: {
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  title: {
    marginBottom: '7%',
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  }
});