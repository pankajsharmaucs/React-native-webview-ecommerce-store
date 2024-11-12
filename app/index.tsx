import React from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import Constants from 'expo-constants';
import { WebView } from 'react-native-webview';

export default function App() {

  const WebUrl="https://goolu.in";

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' || Platform.OS === 'android' ? (
        // Use WebView for mobile platforms
        <WebView source={{ uri: WebUrl }} style={{ flex: 1 }} />
      ) : (
        // Show message on unsupported platforms
        <Text>WebView is not supported on this platform.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
