import { useLayoutEffect } from "react";
import { View, StyleSheet, Text, Switch } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setsActions } from "../store/sets";
import { AllColors } from "../UI/AllColors";

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const shuffle = useSelector((state) => state.sets.shuffle);

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Settings" });
  }, []);

  const changeShuffleHandler = () => {
    dispatch(setsActions.changeShuffle(!shuffle));
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
    </View>
  );
};

export default SettingsScreen;
const styles = StyleSheet.create({
  screen: { textAlign: "center" },
  optionRow: {
    paddingVertical: 5,
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
});
