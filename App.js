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

// dataset needs to be in a state (variable)

const App = () => {
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

  // Every time data changes, this useEffect hook will run.
  useEffect(() => {
    setTransformedData(transformData(groupBy(data, 'date')));
  }, [data]);

  // Below is what we get when we use the groupBy function
  // [
  // { [moment()]: 2000 },
  // { [moment().subtract(1, 'days')]: 9500 },
  // { [moment().subtract(2, 'days')]: 11000 },
  // ]

  const groupBy = (array, key) =>
    array.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  // example of what the code above does, in the example, it groups by the number of letters
  // console.log(groupBy(['one', 'two', 'three'], 'length));
  // => {3: ["one", "two"], 5: ["three"]}

  // The output currently looks like the code below
  //   The GROUPED values are--->
  // {December 27, 2020: Array(1), December 26, 2020: Array(2), December 25, 2020: Array(2)}
  // December 25, 2020: (2) [{…}, {…}]
  // December 26, 2020: (2) [{…}, {…}]
  // December 27, 2020: [{…}]

  // We want the code to look like this
  // December 25, 2020: 2000
  // December 26, 2020: 9500
  // December 27, 2020: 4000

  const [gigs, setGigs] = useState([
    {
      description: 'Freelance job with Qazi',
      amount: 499.99,
      timestamp: new Date(),
    },
  ]);

  const getDates = () => transformedData.map((pair) => pair.date);
  // what we want ---> [date1, date2, date3, date4, date5]
  // we're using the 0 so that we get '12/28/2020'. The date is the first value in the array. ['12/28/2020'] ---> '12/28/2020'. If we didn't use [0], we would get back an array of arrays
  const getAmounts = () => transformedData.map((pair) => pair.amount);
  // Create a new array with the date as the key and value as the sum of the amounts for each date (if it's a grouped date, meaning multiple amounts for a single date, we should see the sum of all of the amounts for that day)
  const transformData = (groupedData) => {
    const transformedArray = [];

    Object.entries(groupedData).forEach((entry) => {
      // Entry[1] is an array of objects that holds all of the amounts (entry[0] holds the date).
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

  console.log('DEBUG-->', data);
  console.log('Dates--->', getDates());
  console.log('Amounts--->', getAmounts());
  console.log(
    'The GROUPED values are--->',
    Object.entries(groupBy(data, 'date'))
  );
  console.log(
    'The Total grouped value 👽--->',
    transformData(groupBy(data, 'date'))
  );

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
            datasets: [
              {
                data: getAmounts(),
              },
            ],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: null, // optional, defaults to 2dp
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

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 20,
    paddingLeft: 5,
    height: 40,
    borderColor: 'red',
    borderWidth: 1,
  },
  titleText: {
    backgroundColor: 'red',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default App;
