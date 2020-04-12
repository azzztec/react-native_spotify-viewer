import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo-asset';
// import { corsProxy } from './constants/CorsProxy'
// import { FontAwesome } from '@expo/vector-icons';
// import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingComplete: false,
      dataSource: 'nulll',
    };
  }
  
  // componentDidMount() {
  //   return fetch('https://cors-anywhere.herokuapp.com/https://afternoon-waters-49321.herokuapp.com/v1/playlists/37i9dQZF1DWZd79rJ6a7lp')
  //           .then(response => response.json())
  //           .then(responseJson => this.setState({ dataSource: responseJson.playlists.items[0].description }))
  // }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <Text style={{color: '#ffffff'}}>asdfasdf</Text>
          {/* <AppNavigator /> */}
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/logo.png')
      ]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
