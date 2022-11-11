import { Text, View, StyleSheet, FlatList, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MarketSetItem from "../components/MarketSetItem";
import { AllColors } from "../UI/AllColors";

const MarketScreen = () => {
  const Marketsets = useSelector((state) => state.market.allSets);

  const renderItem = (itemData) => {
    return <MarketSetItem {...itemData.item} />;
  };
  return (
    <View style={styles.screen}>
      <View>
        <Text style={styles.title}>Available Flashcards</Text>

        <FlatList
          data={Marketsets}
          keyExtractor={(item) => item.setId}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default MarketScreen;
const styles = StyleSheet.create({
  screen: {
    margin: 16,
  },
  title: {
    textAlign: "center",
    color: AllColors.primary500,
    fontWeight: "bold",
    marginVertical: 16,
    fontSize: 24,
  },
});
