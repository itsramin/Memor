import { useEffect, useLayoutEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import {
  dbFetchSetName,
  dbDeleteSet,
  dbUpdateSetName,
} from "../store/database";
import { AllColors } from "../UI/AllColors";
import PrimaryButton from "../UI/PrimaryButton";
import { MaterialIcons } from "@expo/vector-icons";
const SetSettingsScreen = ({ route, navigation }) => {
  const { setId } = route.params;

  const [newName, setNewName] = useState("");

  useEffect(() => {
    const fetchHandler = async () => {
      const targetSetName = await dbFetchSetName(setId);
      setNewName(targetSetName);
    };
    fetchHandler();
  }, [setId]);

  const nameChangeHandler = (value) => {
    setNewName(value);
  };
  const deleteSetHandler = () => {
    Alert.alert(
      "Delete Set",
      "Are you sure you want to delete this flashcard set?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            await dbDeleteSet(setId);

            navigation.navigate("HomePage");
          },
        },
      ]
    );
  };
  const saveSettingsHandler = async () => {
    await dbUpdateSetName({ newName: newName, setId });

    navigation.goBack();
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => {
        return (
          <MaterialIcons
            name="save"
            color={tintColor}
            size={20}
            onPress={saveSettingsHandler}
          />
        );
      },
    });
  }, [navigation, saveSettingsHandler]);
  return (
    <ScrollView>
      <View style={styles.control}>
        <Text style={styles.label}>Set name</Text>
        <TextInput
          //   defaultValue={setName}
          value={newName}
          onChangeText={nameChangeHandler}
          style={styles.input}
        />
      </View>
      <View style={styles.actions}>
        <PrimaryButton
          icon="delete"
          title="Delete set"
          bgcolor={AllColors.red400}
          onPress={deleteSetHandler}
        />
      </View>
    </ScrollView>
  );
};

export default SetSettingsScreen;
const styles = StyleSheet.create({
  control: {
    marginVertical: 8,
  },
  label: {
    color: AllColors.primary500,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    backgroundColor: AllColors.primary100,
    borderRadius: 10,
    padding: 10,
  },
  actions: {
    marginTop: 16,
  },
  error: { color: AllColors.red400, fontWeight: "normal", fontSize: 14 },
});
