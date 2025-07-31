/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.baseText}>
        I am bold
        <Text style={styles.innerText}> and red</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  // centre verticalement
    alignItems: 'center',      // centre horizontalement
    backgroundColor: 'white',  // fond blanc
  },
  baseText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  innerText: {
    color: 'red',
  },
});

export default App;
