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
  dbDeleteSet,
  dbUpdateSetName,
  dbDeleteSetAllCards,
  dbFetchSetSettings,
  dbUpdateSetDailyCount,
  dbStageReset,
  dbUpdateTodayDone,
  dbResetMemorizeStatus,
  dbUpdateLastMemorize,
} from "../store/database";
import { AllColors } from "../UI/AllColors";
import PrimaryButton from "../UI/PrimaryButton";
import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
const SetSettingsScreen = ({ route, navigation }) => {
  const { setId } = route.params;
  const idFocused = useIsFocused();
  const [newName, setNewName] = useState("");
  const [dailyCount, setDailyCount] = useState("");

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const targetSet = await dbFetchSetSettings(setId);

        setDailyCount(targetSet.daily_count.toString());
        setNewName(targetSet.set_name);
      } catch (error) {
        console.log(error);
      }
    };

    if (idFocused) {
      fetchHandler();
    }
  }, [setId, idFocused]);

  const nameChangeHandler = (value) => {
    setNewName(value);
  };
  const dailyChangeHandler = (value) => {
    setDailyCount(value);
  };
  const deleteSetHandler = () => {
    Alert.alert(
      "Warning",
      "Are you sure you want to delete this flashcard set?",
      [
        { text: "No" },
        {
          text: "Yes",
          onPress: async () => {
            await dbDeleteSet(setId);
            await dbDeleteSetAllCards(setId);
            navigation.navigate("HomePage");
          },
        },
      ]
    );
  };

  const saveSettingsHandler = async () => {
    if (newName === "") {
      Alert.alert("Error", "Set name can not be empty.");
      return;
    }
    if (dailyCount === "" || dailyCount < 0 || isNaN(dailyCount)) {
      Alert.alert("Error", "Daily cards must be an integer number.");
      return;
    }

    await dbUpdateSetName({ newName, setId });
    await dbUpdateSetDailyCount({ dailyCount, setId });
    navigation.goBack();
  };

  const resetStages = async () => {
    Alert.alert(
      "Warning",
      "Are you sure you want to reset levels? All levels will change to base level.",
      [
        { text: "No" },
        {
          text: "Yes",
          onPress: async () => {
            const yesterday = new Date(Date.now() - 864e5)
              .toISOString()
              .slice(0, 10);
            await dbStageReset(setId);
            await dbUpdateTodayDone(setId, 0);
            await dbResetMemorizeStatus(setId);
            await dbUpdateLastMemorize({
              date: yesterday,
              setId,
            });
            navigation.navigate("HomePage");
          },
        },
      ]
    );
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
          value={newName}
          onChangeText={nameChangeHandler}
          style={styles.input}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.control}>
        <Text style={styles.label}>Cards added daily</Text>
        <Text style={styles.description}>
          Amount of unseen cards added to memorize section everyday you open the
          app.
        </Text>

        <TextInput
          value={dailyCount}
          onChangeText={dailyChangeHandler}
          style={styles.input}
          keyboardType="number-pad"
        />
      </View>
      <View style={styles.actions}>
        <PrimaryButton
          icon="repeat"
          title="Reset levels"
          bgcolor={AllColors.red400}
          onPress={resetStages}
        />
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
    marginBottom: 4,
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
  description: {
    color: AllColors.grey400,
    fontSize: 13,
    marginBottom: 6,
    paddingHorizontal: 5,
  },
});
