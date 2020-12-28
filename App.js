import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import Todo from './Todo';

const App = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [gigs, setGigs] = useState([
    {
      description: 'Freelance job with Qazi',
      amount: 499.99,
    },
  ]);

  const addGig = () => {
    setGigs([
      ...gigs,
      {
        description: description,
        amount: amount,
      },
    ]);
    setDescription('');
    setAmount('');
  };

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.firstLabel}>Hello World! 💫</Text>
      </View>

      <TextInput
        style={styles.input}
        value={description}
        keyboardType="numeric"
        placeholder="Enter a description"
        onChangeText={(text) => setDescription(text)}
      />

      <TextInput
        style={styles.input}
        value={amount}
        keyboardType="numeric"
        placeholder="Enter the amount you made in USD ($)"
        onChangeText={(text) => setAmount(text)}
      />
      <Button onPress={addGig} title="Add Gig 🚀" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 20,
    padding: 20,
    height: 40,
    borderColor: 'red',
    borderWidth: 1,
  },
  firstLabel: {
    backgroundColor: 'red',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default App;
