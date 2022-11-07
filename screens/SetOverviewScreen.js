import { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import PrimaryButton from "../UI/PrimaryButton";

const SetOverviewScreen = ({ route, navigation }) => {
  const curSetId = route.params.setId;

  const allSets = useSelector((state) => state.sets.allSets);

  const targetSet = allSets.find((item) => item.setId === curSetId);

  useLayoutEffect(() => {
    navigation.setOptions({ title: targetSet.name });
  }, []);

  const reviewHandler = () => {
    navigation.navigate("viewCards", { setId: curSetId });
  };
  const memorizeHandler = () => {
    navigation.navigate("memorizeScreen", { setId: curSetId });
  };

  return (
    <View style={styles.screen}>
      <PrimaryButton title="View" onPress={reviewHandler} />
      <PrimaryButton title="Memorize" onPress={memorizeHandler} />
    </View>
  );
};

export default SetOverviewScreen;
const styles = StyleSheet.create({
  screen: {
    // flexDirection: "row",
    // flex: 1,
    // alignItems: "stretch",
    // justifyContent: "center",
  },
});
