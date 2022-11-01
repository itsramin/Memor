import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import PrimaryButton from "../Components/PrimaryButton";
import Title from "../Components/Title";
import Colors from "../constants/colors";

const StartScreen = (props) => {
  const [enteredNum, setEnteredNum] = useState("");

  const changeInputHandler = (value) => {
    setEnteredNum(value);
  };

  const submitHandler = () => {
    const chosenNum = parseInt(enteredNum);

    if (isNaN(chosenNum) || chosenNum <= 0 || chosenNum > 99) {
      Alert.alert(
        "Inavlid Number",
        "Number has to be a number between 1 to 99",
        [{ text: "Okay", style: "destructive", onPress: resetHandler }]
      );
    } else {
      props.onSetNum(enteredNum);
    }
  };
  const resetHandler = () => {
    setEnteredNum("");
  };
  return (
    <View style={styles.screen}>
      <Title>Guess My Number</Title>
      <View style={styles.boxView}>
        <Text style={styles.boxText}>Enter a Number</Text>

        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          value={enteredNum}
          onChangeText={changeInputHandler}
          maxLength={2}
        />
        <View style={styles.actions}>
          <View style={styles.btn}>
            <PrimaryButton onPress={resetHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.btn}>
            <PrimaryButton onPress={submitHandler}>Confirm</PrimaryButton>
          </View>

          {/* <View style={styles.btn}>
          <Button title="Reset" color="violet" />
        </View> */}
          {/* <View style={styles.btn}>
          <Button title="Confirm" color="violet" onPress={submitHandler} />
        </View> */}
        </View>
      </View>
    </View>
  );
};

export default StartScreen;
const styles = StyleSheet.create({
  screen: { flex: 1, marginTop: 36, alignItems: "center" },
  boxView: {
    backgroundColor: Colors.primary500,
    marginTop: 36,
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "black",
    shadowOffset: 2,
    shadowRadius: 10,
    shadowOpacity: 0.6,
  },
  boxText: {
    color: Colors.second500,
    fontSize: 25,
    fontWeight: "bold",
  },
  input: {
    color: Colors.second500,
    borderColor: Colors.second500,
    borderBottomWidth: 2,
    textAlign: "center",
    fontSize: 32,
    width: 50,
    marginVertical: 8,
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    marginTop: 16,
    marginHorizontal: 10,
  },
  btn: {
    flex: 1,
  },
});
