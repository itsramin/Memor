import { useLayoutEffect, useState } from "react";
import { View, StyleSheet, Text, Switch, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { settingsActions } from "../store/settings";
import { AllColors } from "../UI/AllColors";

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  const { shuffle, dailyCardsAmount } = settings;

  const [cardsAmount, setCardsAmount] = useState(dailyCardsAmount);
  useLayoutEffect(() => {
    navigation.setOptions({ title: "Settings" });
  }, []);

  const changeShuffleHandler = () => {
    dispatch(settingsActions.changeShuffle());
  };

  const dailyCardsChangeHandler = (value) => {
    setCardsAmount(value);
    dispatch(settingsActions.changeDailyCardsAmount(value));
  };

  return (
    <View>
      <View style={styles.optionRow}>
        <Text style={styles.optionText}>Shuffle cards</Text>
        <Switch
          value={shuffle}
          onValueChange={changeShuffleHandler}
          trackColor={{ true: AllColors.primary300, false: AllColors.grey100 }}
          thumbColor={shuffle ? AllColors.primary400 : AllColors.grey400}
        />
      </View>
      <View style={styles.optionRow}>
        <Text style={styles.optionText}>Cards daily added</Text>
        <TextInput
          defaultValue="6"
          value={cardsAmount}
          keyboardType="number-pad"
          style={styles.numberInput}
          onChangeText={dailyCardsChangeHandler}
        />
      </View>
    </View>
  );
};

export default SettingsScreen;
const styles = StyleSheet.create({
  screen: { textAlign: "center" },
  optionRow: {
    paddingVertical: 20,
    paddingHorizontal: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: AllColors.grey400,
    borderBottomWidth: 1,
  },
  optionText: {
    color: AllColors.grey500,
  },
  numberInput: {
    borderBottomWidth: 1,
    borderBottomColor: AllColors.primary300,
    fontSize: 16,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    textAlign: "center",
    color: AllColors.primary400,
  },
});
