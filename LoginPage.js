import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 20,
    paddingLeft: 5,
    height: 40,
    borderColor: 'green',
    borderWidth: 1,
  },
  titleText: {
    backgroundColor: 'green',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 30,
  },
});

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    if (username === 'GretaD' && password === '12345') {
      navigation.navigate('Home');
    }
  };

  return (
    <View>
      <Text style={styles.titleText}>Login 💫</Text>
      <TextInput
        style={styles.input}
        value={username}
        placeholder="Enter your username"
        onChangeText={(text) => setUsername(text)}
      />

      <TextInput
        style={styles.input}
        value={password}
        secureTextEntry={true}
        placeholder="Enter your password"
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" onPress={login} />
    </View>
  );
};

export default LoginPage;
