import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SignUp({ navigation }) {
  return (
    <View style={styles.container}>
      <Text> This app is intended to be used with our site and for ease of cooking {"\n"} </Text>
      <Text>Visit the 
      {"\n"}
        <Text
        onPress={() => Linking.openURL('http://google.com')}
        >
        MegaBites 
        </Text>
      {"\n"}
      site to register an account with us!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
