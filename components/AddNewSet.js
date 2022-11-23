import { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { dbNewSet } from "../store/database";
import { AllColors } from "../UI/AllColors";
import PrimaryButton from "../UI/PrimaryButton";

const AddNewSet = ({ blur }) => {
  const nameRef = useRef();
  const [setName, setSetName] = useState("");
  const [nameInvalid, setNameInvalid] = useState(false);
  const nameChangeHandler = (value) => {
    setSetName(value);
    setNameInvalid(false);
  };
  const addNewSetHandler = () => {
    if (setName.trim().length < 1) {
      setNameInvalid(true);
      return;
    }

    // onAddNewSet(setName);
    dbNewSet(setName);

    setSetName("");
  };

  useEffect(() => {
    nameRef.current.blur();
  }, [blur, nameRef]);
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, nameInvalid && styles.nameInvalid]}
        onChangeText={nameChangeHandler}
        value={setName}
        ref={nameRef}
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
  nameInvalid: {
    borderBottomWidth: 2,
    borderBottomColor: AllColors.red400,
  },
});
