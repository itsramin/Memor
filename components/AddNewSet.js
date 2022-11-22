import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { dbNewSet } from "../store/database";
import { AllColors } from "../UI/AllColors";
import PrimaryButton from "../UI/PrimaryButton";

const AddNewSet = () => {
  const [setName, setSetName] = useState();
  const nameChangeHandler = (value) => {
    setSetName(value);
  };
  const addNewSetHandler = () => {
    if (setName === "") return;
    // onAddNewSet(setName);
    dbNewSet(setName);

    setSetName("");
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={nameChangeHandler}
        value={setName}
      />
      <PrimaryButton
        title="Add new set"
        icon="add"
        onPress={addNewSetHandler}
      />
    </View>
  );
};

export default AddNewSet;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 4,
    paddingHorizontal: 6,
    color: AllColors.primary500,
    borderBottomWidth: 1,
    borderBottomColor: AllColors.primary400,
  },
});
