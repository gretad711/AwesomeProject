import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
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
  const [total, setTotal] = useState(0);
  const [gigs, setGigs] = useState([
    {
      description: 'Freelance job with Qazi',
      amount: 499.99,
    },
  ]);

  useEffect(() => {
    setTotal(gigs.reduce((total, gig) => total + Number(gig.amount), 0));
  }, [gigs]);

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

      <Text>Total Income: ${total}</Text>

      <TextInput
        style={styles.input}
        value={description}
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
      <Button
        disabled={!amount && !description}
        onPress={addGig}
        title="Add Gig 🚀"
      />

      {gigs.map((gig) => (
        <View>
          <Text>{gig.description}</Text>
          <Text>{gig.amount}</Text>
        </View>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 20,
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
