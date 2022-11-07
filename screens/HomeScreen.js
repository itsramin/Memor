import { FlatList, Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import SetNameRow from "../components/SetNameRow";

const HomeScreen = ({ navigation }) => {
  const allSets = useSelector((state) => state.sets.allSets);

  const renderHandler = (itemDate) => {
    const pressHandler = () => {
      navigation.navigate("setOverview", { setId: itemDate.item.setId });
    };

    return <SetNameRow name={itemDate.item.name} onPress={pressHandler} />;
  };
  return (
    <View>
      <Text>add new set</Text>

      <FlatList
        data={allSets}
        renderItem={renderHandler}
        keyExtractor={(item) => item.setId}
      />
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  screen: {
    padding: 16,
  },
});
