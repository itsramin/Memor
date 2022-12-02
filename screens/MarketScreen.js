import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MarketSetItem from "../components/MarketSetItem";
import { dbFetchAllsets } from "../store/database";
import { AllColors } from "../UI/AllColors";

const MarketScreen = () => {
  const isFocused = useIsFocused();
  const [allSets, setAllSets] = useState([]);
  const [userSets, setUserSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        const res = await fetch(
          "https://memor-7e6bf-default-rtdb.asia-southeast1.firebasedatabase.app/marketSets.json"
        );
        const data = await res.json();
        const allSetsArr = [];
        for (const set in data) {
          allSetsArr.push({
            setName: data[set].name,
            marketId: set,
            description: data[set].description,
            cards: data[set].cards,
          });
        }
        setAllSets(allSetsArr);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };

    const fetchUserSets = async () => {
      const fetchedUserSets = await dbFetchAllsets();
      //   console.log(userSets);
      //   const marketSetIdArr = [];
      //   userSets.forEach((set) => {
      //     marketSetIdArr.push(set.marketId);
      //   });
      //   setMarketIds(marketSetIdArr);
      setUserSets(fetchedUserSets);
      //   console.log(userSets);
    };
    if (isFocused) {
      setError(null);
      setLoading(true);
      fetchMarket();
      fetchUserSets();
    }
  }, [isFocused]);

  const renderItem = (itemData) => {
    return <MarketSetItem set={itemData.item} userSets={userSets} />;
  };
  let content = (
    <View style={styles.center}>
      {loading && (
        <ActivityIndicator size="large" color={AllColors.primary400} />
      )}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );

  if (!loading && !error) {
    content = (
      <View style={styles.screen}>
        <FlatList
          data={allSets}
          keyExtractor={(item) => item.marketId}
          renderItem={renderItem}
        />
      </View>
    );
  }
  return content;
};

export default MarketScreen;
const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16 },
  center: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 16,
  },
  error: {
    color: AllColors.red400,
    fontSize: 16,
  },
});
