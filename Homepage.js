import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';

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
  },
});

const Homepage = ({ navigation }) => {
  // this lets us capture state
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([
    { date: moment().format('LL'), amount: 2000 },
    { date: moment().subtract(1, 'days').format('LL'), amount: 2500 },
    { date: moment().subtract(1, 'days').format('LL'), amount: 3500 },
    { date: moment().subtract(1, 'days').format('LL'), amount: 3500 },
    { date: moment().subtract(1, 'days').format('LL'), amount: 3500 },
    { date: moment().subtract(7, 'days').format('LL'), amount: 3500 },
    { date: moment().subtract(6, 'days').format('LL'), amount: 3500 },
    { date: moment().subtract(5, 'days').format('LL'), amount: 3500 },
    { date: moment().subtract(4, 'days').format('LL'), amount: 3500 },
    { date: moment().subtract(3, 'days').format('LL'), amount: 3500 },
    { date: moment().subtract(2, 'days').format('LL'), amount: 4500 },
    { date: moment().subtract(2, 'days').format('LL'), amount: 5500 },
  ]);
  const [transformedData, setTransformedData] = useState([]);

  useEffect(() => {
    setTransformedData(transformData(groupBy(data, 'date')));
  }, [data]);

  const groupBy = (array, key) =>
    array.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});

  const [gigs, setGigs] = useState([
    {
      description: 'Freelance job with G',
      amount: 499.99,
      timestamp: new Date(),
    },
  ]);

  const getDates = () => transformedData.map((pair) => pair.date);
  const getAmounts = () => transformedData.map((pair) => pair.amount);
  const transformData = (groupedData) => {
    const transformedArray = [];

    Object.entries(groupedData).forEach((entry) => {
      const total = entry[1].reduce((total, pair) => total + pair.amount, 0);
      transformedArray.push({
        date: moment(entry[0]).format('MM/DD'),
        amount: total,
      });
    });
    const sortedArray = transformedArray.sort((a, b) =>
      moment(a['date']).diff(moment(b['date']))
    );

    return sortedArray;
  };

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

    setData([
      ...data,
      {
        date: moment().format('LL'),
        amount: Number(amount),
      },
    ]);

    setDescription('');
    setAmount('');
  };

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.titleText}>Income Tracker! 💫</Text>
      </View>
      <View>
        <Text>Bezier Line Chart</Text>
        <LineChart
          data={{
            labels: getDates(),
            datasets: [{ data: getAmounts() }],
          }}
          width={Dimensions.get('window').width}
          height={220}
          yAxisLabel="$"
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: null,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
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
        placeholder="Enter the amount you made in USD ($)"
        keyboardType="numeric"
        onChangeText={(text) => setAmount(text)}
      />

      <Button
        disabled={!amount && !description}
        onPress={addGig}
        title="Add Gig 🚀"
      />

      {gigs.map((gig, idx) => (
        <View key={idx}>
          <Text>{gig.description}</Text>
          <Text>{gig.amount}</Text>
        </View>
      ))}
    </SafeAreaView>
  );
};

export default Homepage;
