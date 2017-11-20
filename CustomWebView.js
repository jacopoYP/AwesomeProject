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
  // static propTypes = {
  //   ...WebView.propTypes,
  //   finalUrl: PropTypes.string
  // };
  //
  // static defaultProps = {
  //   finalUrl: 'about:blank',
  // };

  onWebViewMessage(event) {
        // post back reply as soon as possible to enable sending the next message
        console.log("oui");
        this.myWebView.postMessage(event.nativeEvent.data);

        let msgData;
        try {
            msgData = JSON.parse(event.nativeEvent.data);
        }
        catch(err) {
            console.warn(err);
            return;
        }

        // invoke target function
        const response = this[msgData.targetFunc].apply(this, [msgData]);
        // var myModule = myData.application.modules[msgData.targetFunc]
        // this.applyMyModule(myModule, msgData.data)
        //const response = this[msgData.targetFunc].apply(this, [msgData.data]);

        // trigger success callback

        msgData.isSuccessfull = true;
        msgData.args = [response];
        this.myWebView.postMessage(JSON.stringify(msgData))
      }

  render() {
    return (
      <WebView
        ref={(myWebView) => { this.myWebView = myWebView; }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        {...this.props}
        source={{uri: "http://192.168.0.157:8080"}}
        nativeConfig={{
          component: RCTCustomWebView,
          viewManager: CustomWebViewManager
        }}
        onMessage={this.onWebViewMessage.bind(this)}
        startInLoadingState={true}
      />

    );
  }

  showToast(myModule, message) {
    console.log("showToast");
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
