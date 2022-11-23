import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, View, Alert } from "react-native";
import SetInfo from "../components/SetInfo";
import {
  dbDeleteSet,
  dbFetchSetName,
  dbFetchAllCards,
} from "../store/database";
import { AllColors } from "../UI/AllColors";
import PrimaryButton from "../UI/PrimaryButton";

const SetOverviewScreen = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  const { setId } = route.params;
  const [setName, setSetName] = useState();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchHandler = async () => {
      const targetSetName = await dbFetchSetName(setId);
      setSetName(targetSetName);

      const targetCards = await dbFetchAllCards(setId);
      setCards(targetCards);
    };
    if (isFocused) {
      fetchHandler();
    }
  }, [setId, isFocused]);

  const deleteSetHandler = () => {
    Alert.alert(
      "Delete Set",
      "Are you sure you want to delete this flashcard set?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            await dbDeleteSet(setId);
            navigation.goBack();
          },
        },
      ]
    );
  };
  const addNewCardHandler = async () => {
    navigation.navigate("CardFormScreen", { setId });
  };
  const viewHandler = async () => {
    navigation.navigate("CardListScreen", { setId, setName });
  };
  return (
    <ScrollView>
      <SetInfo name={setName} cards={cards} />
      <View>
        <PrimaryButton
          icon="edit"
          title="View & edit Cards"
          onPress={viewHandler}
        />
        <PrimaryButton
          icon="add"
          title="Add new card"
          onPress={addNewCardHandler}
        />
        <PrimaryButton
          icon="delete"
          title="Delete set"
          bgcolor={AllColors.red400}
          onPress={deleteSetHandler}
        />
      </View>
    </ScrollView>
  );
};

export default SetOverviewScreen;
