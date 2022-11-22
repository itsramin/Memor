import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import AddNewSet from "../components/AddNewSet";
import SetItem from "../components/SetItem";
import { dbFetchAllsets } from "../store/database";

import { AllColors } from "../UI/AllColors";

const HomeScreen = ({ navigation }) => {
  const [setsList, setSetsList] = useState([]);

  useEffect(() => {
    const fetchHandler = async () => {
      const fetchedSets = await dbFetchAllsets();
      setSetsList(fetchedSets);
    };

    fetchHandler();
  }, [setsList]);

  const renderItemHandler = (itemData) => {
    return (
      <SetItem
        set={itemData.item}
        onPress={() => {
          navigation.navigate("SetOverviewScreen", {
            setId: itemData.item.setId,
          });
        }}
      />
    );
  };

  let content = <Text style={styles.noSetText}>No set</Text>;

  if (setsList.length > 0) {
    content = (
      <FlatList
        data={setsList}
        keyExtractor={(item) => item.setId}
        renderItem={renderItemHandler}
      />
    );
  }
  return (
    <View style={styles.screen}>
      <AddNewSet />
      <View style={styles.allSetBox}>
        <Text style={styles.allSetTitle}>Your Sets</Text>
        {content}
      </View>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  screen: {
    margin: 16,
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
