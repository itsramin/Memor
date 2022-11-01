import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const NumBox = (props) => {
  const [enteredNum, setEnteredNum] = useState("");

  const changeInputHandler = (value) => {
    setEnteredNum(value);
  };

  const submitHandler = () => {
    props.onSetNum(enteredNum);
  };
  return (
    <View style={styles.boxView}>
      <Text style={styles.boxText}>Enter a Number</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={enteredNum}
        onChangeText={changeInputHandler}
      />
      <View style={styles.actions}>
        <View style={styles.btn}>
          <Button title="Reset" color="violet" />
        </View>
        <View style={styles.btn}>
          <Button title="Confirm" color="violet" onPress={submitHandler} />
        </View>
      </View>
    </View>
  );
};

export default NumBox;

const styles = StyleSheet.create({
  boxView: {
    backgroundColor: "darkviolet",
    margin: 16,
    padding: 16,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  boxText: { color: "yellow" },
  input: {
    color: "yellow",
    borderColor: "yellow",
    borderBottomWidth: 1,
    textAlign: "center",
    fontSize: 30,
    width: 50,
    marginTop: 10,
  },
  actions: {
    flexDirection: "row",
    marginTop: 16,
    marginHorizontal: 10,
  },
  btn: {
    marginHorizontal: 8,
    flex: 1,
  },
});
