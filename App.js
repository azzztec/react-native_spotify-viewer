import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, FlatList, ActivityIndicator, Image } from 'react-native';

import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoadingComplete: false,
      dataSource: null,
    }
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
        {!isLoadingComplete ? <ActivityIndicator/> : <AppNavigator />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 10,
    justifyContent: 'center',
  }
});