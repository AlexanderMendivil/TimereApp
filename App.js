import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from './App/model/firebase';
import MainStack from './Navigation/MainStack';

export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <MainStack/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
