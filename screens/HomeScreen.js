import { FlatList, Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import SetNameRow from "../components/SetNameRow";
import { AllColors } from "../UI/AllColors";
import PrimaryButton from "../UI/PrimaryButton";

const HomeScreen = ({ navigation }) => {
  const allSets = useSelector((state) => state.sets.allSets);

  const renderHandler = (itemDate) => {
    const pressHandler = () => {
      navigation.navigate("setOverview", { setId: itemDate.item.setId });
    };

    return <SetNameRow name={itemDate.item.name} onPress={pressHandler} />;
  };
  const newSetHandler = () => {
    navigation.navigate("newSetForm");
  };
  return (
    <View>
      <PrimaryButton title="Add New Set" onPress={newSetHandler} />

      <View style={styles.allSetBox}>
        <Text style={styles.allSetTitle}>All sets:</Text>
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
    padding: 16,
  },
  allSetBox: {
    marginVertical: 16,
    marginHorizontal: 10,
    backgroundColor: AllColors.primary100,
    borderRadius: 10,
    padding: 16,
  },
  allSetTitle: {
    color: AllColors.primary500,
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
});
