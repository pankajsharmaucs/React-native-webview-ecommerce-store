// import React from 'react';
// import { Platform, StyleSheet, View, Text } from 'react-native';
// import Constants from 'expo-constants';
// import { WebView } from 'react-native-webview';

// export default function App() {
//   // Append a timestamp query parameter to the URL to avoid caching
//   const WebUrl = `https://goolu.in?timestamp=${new Date().getTime()}`;

//   return (
//     <View style={styles.container}>
//       {Platform.OS === 'ios' || Platform.OS === 'android' ? (
//         // Use WebView for mobile platforms
//         <WebView source={{ uri: WebUrl }} style={{ flex: 1 }} />
//       ) : (
//         // Show message on unsupported platforms
//         <Text>WebView is not supported on this platform.</Text>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: Constants.statusBarHeight,
//   },
// });


import React, { useEffect } from 'react';
import { Platform, StyleSheet, View, Text, BackHandler } from 'react-native';
import Constants from 'expo-constants';
import { WebView } from 'react-native-webview';

export default function App() {
  // Append a timestamp query parameter to the URL to avoid caching
  const WebUrl = `https://goolu.in?timestamp=${new Date().getTime()}`;

  useEffect(() => {
    // Only apply this for Android devices
    if (Platform.OS === 'android') {
      const backAction = () => {
        // Prevent default back action (go back or exit the app)
        return true; // Return `true` to prevent the default back button behavior
      };

      // Add event listener for back button
      BackHandler.addEventListener('hardwareBackPress', backAction);

      // Cleanup the event listener when the component is unmounted
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }
  }, []);

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