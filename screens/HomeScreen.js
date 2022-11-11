import { useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TextInput,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SetNameRow from "../components/SetNameRow";
import { setsActions } from "../store/sets";
import { AllColors } from "../UI/AllColors";
import PrimaryButton from "../UI/PrimaryButton";

const HomeScreen = ({ navigation }) => {
  const allSets = useSelector((state) => state.sets.allSets);
  const [newName, setNewName] = useState("");
  const dispatch = useDispatch();

  const renderHandler = (itemDate) => {
    const pressHandler = () => {
      navigation.navigate("setOverview", {
        setId: itemDate.item.setId,
      });
    };

    return <SetNameRow name={itemDate.item.name} onPress={pressHandler} />;
  };
  const newNameHandler = (value) => {
    setNewName(value);
  };
  const newSetHandler = () => {
    Keyboard.dismiss();
    if (newName.trim().length === 0) return;

    dispatch(setsActions.addSet({ name: newName }));
    setNewName("");
  };

  return (
    <View style={styles.screen}>
      <View style={styles.newSetBox}>
        <TextInput
          placeholder="Enter a name"
          style={styles.newNameInput}
          onChangeText={newNameHandler}
          value={newName}
        />
        <PrimaryButton title="Add New Set" onPress={newSetHandler} icon="add" />
      </View>

      <View style={styles.allSetBox}>
        <Text style={styles.allSetTitle}>Your Flashcards</Text>
        {allSets.length === 0 && (
          <Text style={styles.noSetText}>There is no set.</Text>
        )}
        <FlatList
          data={allSets}
          renderItem={renderHandler}
          keyExtractor={(item) => item.setId}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  screen: {
    margin: 16,
  },
  newSetBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  allSetBox: {
    marginVertical: 16,
    marginHorizontal: 10,
    backgroundColor: AllColors.primary100,
    borderRadius: 10,
    padding: 16,
  },
  noSetText: { textAlign: "center", fontSize: 18, marginVertical: 8 },
  allSetTitle: {
    color: AllColors.primary500,
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    marginBottom: 16,
  },
  newNameInput: {
    marginHorizontal: 20,
    flex: 1,
    padding: 4,
    borderBottomWidth: 1,
    borderBottomColor: AllColors.primary400,
  },
});
