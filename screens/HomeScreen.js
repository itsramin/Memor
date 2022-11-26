import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import AddNewSet from "../components/AddNewSet";
import SetItem from "../components/SetItem";
import { dbFetchAllsets } from "../store/database";

import { AllColors } from "../UI/AllColors";

const HomeScreen = ({ navigation }) => {
  const [setsList, setSetsList] = useState([]);
  const [blur, setBlur] = useState(false);

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const fetchedSets = await dbFetchAllsets();

        setSetsList(fetchedSets);
      } catch (error) {
        console.log("123", error);
      }
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

  const blurHandler = () => {
    setBlur((prev) => !prev);
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
    <TouchableWithoutFeedback onPress={blurHandler}>
      <View style={styles.screen}>
        <AddNewSet blur={blur} />
        <View style={styles.allSetBox}>
          <Text style={styles.allSetTitle}>Your Sets</Text>
          {content}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  all: { backgroundColor: "yellow", flex: 1 },
  screen: {
    margin: 16,
    flex: 1,
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
