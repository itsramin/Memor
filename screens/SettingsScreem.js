import { useState } from "react";
import { View, StyleSheet, Text, Switch } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setsActions } from "../store/sets";
import { AllColors } from "../UI/AllColors";

const SettingsScreen = () => {
  const dispatch = useDispatch();

  const shuffle = useSelector((state) => state.sets.shuffle);

  //   const [shuffle, setShuffle] = useState(initShuffle);

  const changeShuffleHandler = () => {
    dispatch(setsActions.changeShuffle(!shuffle));
  };

  return (
    <View>
      <View style={styles.optionRow}>
        <Text>Shuffle cards</Text>
        <Switch
          value={shuffle}
          onValueChange={changeShuffleHandler}
          trackColor={{ true: AllColors.primary200, false: AllColors.grey100 }}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
