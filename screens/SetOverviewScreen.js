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
import * as DocumentPicker from "expo-document-picker";
// import { MaterialIcons } from "@expo/vector-icons";
import Papa from "papaparse";

// import { readFile } from "react-native-fs";
// import { readRemoteFile } from "react-native-csv";
// import csv from "csvtojson";

const SetOverviewScreen = ({ route, navigation }) => {
  // const csv = require("csvtojson");
  const isFocused = useIsFocused();
  const { setId } = route.params;
  const [setName, setSetName] = useState();
  const [cards, setCards] = useState([]);
  // const [importedFile, setImportedFile] = useState();

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

  // const deleteSetHandler = () => {
  //   Alert.alert(
  //     "Delete Set",
  //     "Are you sure you want to delete this flashcard set?",
  //     [
  //       { text: "No", style: "cancel" },
  //       {
  //         text: "Yes",
  //         onPress: async () => {
  //           await dbDeleteSet(setId);
  //           navigation.goBack();
  //         },
  //       },
  //     ]
  //   );
  // };
  const addNewCardHandler = () => {
    navigation.navigate("CardFormScreen", { setId });
  };
  const setSettingsHandler = () => {
    navigation.navigate("SetSettingsScreen", { setId });
  };
  const viewHandler = async () => {
    navigation.navigate("CardListScreen", { setId, setName });
  };

  const importHandler = async () => {
    const res = await DocumentPicker.getDocumentAsync();
    // csv()
    //   .fromFile(res.uri)
    //   .then((jsonObj) => {
    //     console.log(jsonObj);
    //   });
    // console.log(res.uri);
    // setImportedFile(res.uri);
    // const file = readFile(res.uri);
    // Papa.parse(file, {
    //   delimiter: ",",
    //   complete: (results) => console.log(results),
    // });
    // console.log(res.uri);

    // readRemoteFile(res.uri, {
    //   // rest of config ...
    //   download: true,
    //   complete: (results) => {
    //     console.log(results.data);
    //   },
    // });
  };
  return (
    <ScrollView>
      <SetInfo name={setName} cards={cards} />
      <View>
        <PrimaryButton
          icon="add"
          title="Add new card"
          onPress={addNewCardHandler}
        />
        {cards.length > 0 && (
          <PrimaryButton
            icon="edit"
            title="View & edit Cards"
            onPress={viewHandler}
          />
        )}

        {/* <PrimaryButton
          icon="add"
          title="Import cards"
          onPress={importHandler}
        /> */}
        <PrimaryButton
          icon="tune"
          title="Settings"
          onPress={setSettingsHandler}
        />
        {/* <PrimaryButton
          icon="delete"
          title="Delete set"
          bgcolor={AllColors.red400}
          onPress={deleteSetHandler}
        /> */}
      </View>
    </ScrollView>
  );
};

export default SetOverviewScreen;
