import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, View, Alert, StyleSheet } from "react-native";
import SetInfo from "../components/SetInfo";
import {
  dbFetchSetName,
  dbFetchAllCards,
  dbAddCard,
  dbUpdateTodayDone,
  dbFetchStageZero,
  dbUpdateLastMemorize,
  dbStageUp,
  dbFetchStage,
  dbUpdateMemorizeStatus,
  dbStageUpAll,
  dbFetchTodayDone,
  dbFetchTodayCards,
  dbResetMemorizeStatus,
} from "../store/database";

import PrimaryButton from "../UI/PrimaryButton";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { jsonToCSV } from "react-native-csv";
import { AllColors } from "../UI/AllColors";

const SetOverviewScreen = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  const { setId, lastMemorize } = route.params;
  const [setName, setSetName] = useState();
  const [curLastMemorize, setCurLastMemorize] = useState(lastMemorize);
  const [cards, setCards] = useState([]);
  const [memorizeCards, setMemorizeCards] = useState([]);
  const [loadAgain, setLoadAgain] = useState(false);
  const [memorizeAllow, setMemorizeAllow] = useState(false);
  const today = new Date().toISOString().slice(0, 10);
  const cardsValid = cards.length > 0;

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const targetSetName = await dbFetchSetName(setId);
        setSetName(targetSetName);

        const targetCards = await dbFetchAllCards(setId);
        setCards(targetCards);
      } catch (error) {
        console.log(error);
      }
    };
    if (isFocused) {
      fetchHandler();
    }
  }, [setId, isFocused, loadAgain]);

  useEffect(() => {
    if (!cardsValid) return;

    const newDay = async () => {
      await dbUpdateTodayDone(setId, 0);
      await dbResetMemorizeStatus(setId);
      await dbUpdateLastMemorize({
        date: today,
        setId,
      });
      setCurLastMemorize(today);
      const stageZero = await dbFetchStageZero(setId);

      stageZero.forEach(async (card) => {
        await dbStageUp(card.cardId);
      });

      const todayCards = await dbFetchStage(setId);

      todayCards.forEach(async (card) => {
        await dbUpdateMemorizeStatus(card.cardId, 1);
      });

      await dbStageUpAll(setId);
      setLoadAgain((prev) => !prev);
      // setMemorizeCards(todayCards);
      // setMemorizeAllow(true);
      console.log("this is a new day");
    };

    if (curLastMemorize !== today) {
      newDay();
    }
  }, [curLastMemorize, today, isFocused, cardsValid]);

  useEffect(() => {
    if (!cardsValid) return;

    const fetchh = async () => {
      const todayCards = await dbFetchTodayCards(setId);
      setMemorizeCards(todayCards);
      const isDone = await dbFetchTodayDone(setId);

      if (isDone === 0) {
        setMemorizeAllow(true);
      } else {
        setMemorizeAllow(false);
      }
    };
    if (isFocused) {
      fetchh();
    }
  }, [cardsValid, isFocused, loadAgain]);

  const addNewCardHandler = () => {
    navigation.navigate("CardFormScreen", { setId });
  };
  const setSettingsHandler = () => {
    navigation.navigate("SetSettingsScreen", { setId });
  };
  const MemorizeHandler = () => {
    if (!memorizeAllow) return;
    navigation.navigate("MemorizeScreen", { setId, cards: memorizeCards });
  };
  const viewHandler = () => {
    if (!cardsValid) return;
    navigation.navigate("CardListScreen", { setId, setName });
  };

  const importHandler = async () => {
    const res = await DocumentPicker.getDocumentAsync({
      type: "text/comma-separated-values",
    });
    if (res.type === "cancel") return;

    const data = await FileSystem.readAsStringAsync(res.uri);

    const convertArr = data
      .split(/\r?\n|\r|\n/g)
      .filter((el) => el)
      .map((item) => {
        const cardItem = item.split(",");
        return {
          question: cardItem[0].replace(/"/g, ""),
          answer: cardItem[1].replace(/"/g, ""),
          setId,
        };
      });

    if (convertArr.length > 0) {
      convertArr.forEach(async (card) => {
        await dbAddCard(card);
      });
      setLoadAgain((prev) => !prev);
      Alert.alert("Great", "Import successfully done!");
    } else {
      Alert.alert("Error", "Something went wrong. Try again!");
    }
  };

  const exportHandler = async () => {
    const data = cards.map((card) => {
      return { question: card.question, answer: card.answer };
    });

    const CSV = jsonToCSV(data).slice(jsonToCSV(data).indexOf("\n") + 1);

    const permissions =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
      return;
    }

    try {
      await FileSystem.StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        `${setName}.csv`,
        "text/comma-separated-values"
      )
        .then(async (uri) => {
          await FileSystem.StorageAccessFramework.writeAsStringAsync(uri, CSV);
          Alert.alert("Great", "Export Successfully");
        })
        .catch((e) => {});
    } catch (e) {
      Alert.alert("Error", e.message);
    }
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

        <PrimaryButton
          icon="edit"
          title="View & edit Cards"
          onPress={viewHandler}
          bgcolor={cardsValid ? AllColors.primary400 : AllColors.grey200}
        />

        <PrimaryButton
          icon="wb-sunny"
          onPress={MemorizeHandler}
          title="Memorize"
          bgcolor={
            cardsValid && memorizeAllow
              ? AllColors.primary400
              : AllColors.grey200
          }
        />

        <View style={styles.row}>
          <PrimaryButton
            icon="cloud-download"
            title="Import cards"
            onPress={importHandler}
            style={styles.btn}
          />
          <PrimaryButton
            icon="cloud-upload"
            title="Export cards"
            onPress={exportHandler}
            bgcolor={cardsValid ? AllColors.primary400 : AllColors.grey200}
            style={styles.btn}
          />
        </View>

        <PrimaryButton
          icon="tune"
          title="Settings"
          onPress={setSettingsHandler}
        />
      </View>
    </ScrollView>
  );
};

export default SetOverviewScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  btn: {
    flex: 1,
  },
});
