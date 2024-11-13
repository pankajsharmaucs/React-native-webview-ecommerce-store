



import React, { useState, useEffect, useRef } from 'react';
import { Platform, StyleSheet, View, Text, BackHandler, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';

// Define the type for navState manually
interface NavigationState {
  canGoBack: boolean;
  canGoForward: boolean;
  url: string;
  loading: boolean;
  title: string;
}

export default function App() {
  const WebUrl = `https://goolu.in?timestamp=${new Date().getTime()}`;
  
  const webviewRef = useRef<WebView | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      const backAction = () => {
        if (canGoBack && webviewRef.current) {
          webviewRef.current.goBack();
          return true; // Prevent default back action
        }
        return false; // Allow default back behavior (exit app)
      };

      BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }
  }, [canGoBack]);

  const onNavigationStateChange = (navState: NavigationState) => {
    setCanGoBack(navState.canGoBack);
  };

  const handleLoading = (state: boolean) => {
    setIsLoading(state);
  };

  return (
    <View style={styles.container}>
      {/* Header with Logo */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => webviewRef.current?.goBack()}>
          <Icon name="arrow-back" size={24} color="white" style={styles.backButton} />
        </TouchableOpacity>
        <Image source={{ uri: 'https://goolu.in/splash.png' }} style={styles.logo} />
        <Text style={styles.headerTitle}>Goolu Store</Text>
      </View>

      {/* WebView */}
      <WebView
        ref={webviewRef}
        source={{ uri: WebUrl }}
        style={styles.webview}
        startInLoadingState={true}
        onLoadStart={() => handleLoading(true)}
        onLoadEnd={() => handleLoading(false)}
        onError={() => handleLoading(false)}
        onNavigationStateChange={onNavigationStateChange} // Handle navigation state change
      />

      {/* Loading Indicator */}
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {/* Error UI */}
      {!isLoading && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>An error occurred while loading the page.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
  },
  header: {
    height: 60,
    backgroundColor: '#3498db',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  backButton: {
    padding: 10,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    resizeMode: 'contain',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  webview: {
    flex: 1,
  },
  loaderContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
  },
  errorContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -120 }, { translateY: -30 }],
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
