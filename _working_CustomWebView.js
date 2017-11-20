// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */
import React, { Component, PropTypes } from 'react';
import { WebView, requireNativeComponent, NativeModules, Platform, StyleSheet } from 'react-native';
const { CustomWebViewManager } = NativeModules;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

var WEBVIEW_REF = 'webview';

export default class CustomWebView extends Component<{}> {
  static propTypes = WebView.propTypes

  render() {
    return (
      <WebView
        // {...this.props}
        source={{uri: "http://www.bing.com"}}
        nativeConfig={{
          component: RCTCustomWebView,
          viewManager: CustomWebViewManager
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const RCTCustomWebView = requireNativeComponent(
  'RCTCustomWebView',
  CustomWebView,
  WebView.extraNativeComponentConfig
);
