import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { auth } from './App/model/firebase';
import MainStack from './Navigation/MainStack';

import configureStore from './App/store';
const store = configureStore()
export default function App() {

  return (
    <Provider store={store}>
    <SafeAreaView style={styles.container}>
      <MainStack/>
    </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
