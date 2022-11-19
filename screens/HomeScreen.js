import { View, StyleSheet } from "react-native";

import { AllColors } from "../UI/AllColors";

const HomeScreen = ({ navigation }) => {
  return <View style={styles.screen}></View>;
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
