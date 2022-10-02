import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View, Switch, Text, TextInput, Button } from 'react-native';

export default function App() {

  const [feet, onChangeFeet] = React.useState();
  const [inches, onChangeInches] = React.useState();
  const [pounds, onChangePounds] = React.useState();

  const [kilogram, onChangeKg] = React.useState();
  const [centimeter, onChangeCm] = React.useState();

  const [myText, setMyText] = React.useState();

  //For Standard Calulations
  const handlePress = ()=> {
    var parsedFeet = parseInt(feet)
    var parsedInches = parseInt(inches)

    var meter = (parsedFeet * 0.3048) + (parsedInches * 0.0254)
    var squaredMeter = meter * meter
    var kgs = parseInt(pounds) * 0.45359237
    var BMI = (kgs/squaredMeter)

    var roundedBmi = Math.round(BMI)

    if (roundedBmi < 18.5) {
      setMyText("Your BMI is " + roundedBmi + " You Are Underweight")
    } else if (roundedBmi > 18.5 && roundedBmi < 25) {
      setMyText("Your BMI is " + roundedBmi + " Your Weight is Normal")
      console.log("Normal Weight")
    } else if (roundedBmi >= 25 && roundedBmi < 30) {
      setMyText("Your BMI is " + roundedBmi + " You Are Over Weight")
    } else {
      setMyText("Your BMI is " + roundedBmi + " You Are Obeseve")
    }
  }

  //For Metric Calulations
  const handlePressMetric = ()=> {
    var kgs = parseInt(kilogram)
    var cm = parseInt(centimeter)

    var meter = cm * 0.01
    var squaredMeter = meter * meter

    var BMI = (kgs/squaredMeter)

    var roundedBmi = Math.round(BMI)

    if (roundedBmi < 18.5) {
      setMyText("Your BMI is " + roundedBmi + " You Are Underweight")
    } else if (roundedBmi > 18.5 && roundedBmi < 25) {
      setMyText("Your BMI is " + roundedBmi + " Your Weight is Normal")
      console.log("Normal Weight")
    } else if (roundedBmi >= 25 && roundedBmi < 30) {
      setMyText("Your BMI is " + roundedBmi + " You Are Over Weight")
    } else {
      setMyText("Your BMI is " + roundedBmi + " You Are Obeseve")
    }
  }



  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    onChangeFeet("")
    onChangeInches("")
    onChangePounds("")
    onChangeKg("")
    onChangeCm("")
    setMyText("")
    setIsEnabled(previousState => !previousState)
  };

  return (
    <View style={styles.container}>
      {headerView()}

      {isEnabled == false? (
        standardSystem()
      ) : (  
      metricSystem())
        }
    </View>
  );


  function metricSystem() {
    return <View style={styles.container}>
      <Text>Metric System</Text>
      <Text>Enter Your Height Centimeter</Text>
      <View style={styles.container_row}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeCm}
          placeholder="Centimeter"
          value={centimeter} />
      </View>
      <Text>Enter Your Weight in kilogram</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeKg}
        placeholder="Kilogram"
        value={kilogram} />
      <Button
        onPress={handlePressMetric}
        title="Compute BMI"
        color="#841584"
        accessibilityLabel="BMI" />
      <Text style={styles.normalText}>
        {myText}
      </Text>
    </View>;
  }

  function standardSystem() {
    return <View style={styles.container}>
      <Text>Standard System</Text>
      <Text>Enter Your Height in Feet and Inches</Text>
      <View style={styles.container_row}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeFeet}
          placeholder="Feet"
          value={feet} />
        <TextInput
          style={styles.input}
          onChangeText={onChangeInches}
          placeholder="Inches"
          value={inches} />
      </View>
      <Text>Enter Your Weight in Pounds</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangePounds}
        placeholder="Pounds"
        value={pounds} />
      <Button
        onPress={handlePress}
        title="Compute BMI"
        color="#841584"
        accessibilityLabel="BMI" />
      <Text style={styles.normalText}>
        {myText}
      </Text>
    </View>;
  }

  function headerView() {
    return <View style={styles.container_row}>
      <Text style={styles.titleText}>
        Standard System
      </Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled} />
      <Text style={styles.titleText}>
        Metric System
      </Text>
    </View>;
  }
}

const styles = StyleSheet.create({
  container_row: {
    
    marginTop: 10,
    flexDirection : 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleText : {
    padding: 10,
    fontSize: 17,
  },
  normalText : {
    padding: 10,
    marginTop: 20,
    fontSize: 15,
  },
  input: {
    height: 40,
    width:150,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

});
