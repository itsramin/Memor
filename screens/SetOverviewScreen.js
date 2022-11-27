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
    // Papa.parse(data, {
    //   delimiter: ",",
    //   complete: (results) => console.log(results),
    // });
    const convertArr = data
      .split(/\r?\n|\r|\n/g)
      .filter((el) => el)
      .map((item) => {
        const cardItem = item.split(",");
        return { question: cardItem[0], answer: cardItem[1], setId };
      })
      .slice(1);

    convertArr.forEach(async (card) => {
      await dbAddCard(card);
    });
    setLoadAgain((prev) => !prev);
    Alert.alert("Great", "Import successfully done!");
    // console.log(convert);
    // readFile(res.uri).then((res) => {
    //   const wb = XLSX.read(res);
    //   const wsName = wb.SheetNames[0];
    //   const ws = wb.Sheets[wsName];
    //   const data = XLSX.utils.sheet_add_json(ws, { header: 1 });
    //   for (let i = 1; i < data.length; i++) {
    //     array.push({ question: data[i][0], answer: data[i][1] });
    //   }
    //   console.log(array);
    // });
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

    // const correctUri = encode(res.uri);
    // console.log(res);
    // const file = res.uri.slice(7);
    // Papa.parse(res.uri, {
    //   download: true,
    //   delimiter: ",",
    //   complete: (results) => console.log(results),
    // });

    // readRemoteFile(res.uri, {
    //   // rest of config ...
    //   download: true,
    //   complete: (results) => {
    //     console.log(results.data);
    //   },
    // });
  };

  const exportHandler = async () => {
    const data = cards.map((card) => {
      return { question: card.question, answer: card.answer };
    });
    const CSV = jsonToCSV(data);

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
    // let directoryUri = FileSystem.documentDirectory;

    // let fileUri = directoryUri + "name.csv";
    // console.log(fileUri);

    // await FileSystem.writeAsStringAsync(fileUri, CSV);
    // console.log(permissionResponse.status);
    // const hasPermission = await verifyPermissions();
    // if (!hasPermission) return;

    // await FileSystem.writeAsStringAsync(fileUri, CSV, {
    //   encoding: FileSystem.EncodingType.UTF8,
    // });
    // const asset = await MediaLibrary.createAssetAsync(fileUri);
    // await MediaLibrary.createAlbumAsync("Download", asset, false);

    //////////////////////////////

    // if (permissionResponse.status === "undetermined") {
    //   const permissionResponse = await requestPermission();
    //   console.log(permissionResponse.approve);
    //   if (permissionResponse.granted === "granted") {
    //     hasPer = true;
    //   }
    // }
    // if (!hasPer) return console.log("no permission");

    // const { status } = await requestPermission();
    // console.log(status);
    // if (status === "granted") {
    //   await FileSystem.writeAsStringAsync(fileUri, CSV, {
    //     encoding: FileSystem.EncodingType.UTF8,
    //   });
    //   const asset = await MediaLibrary.createAssetAsync(fileUri);
    //   await MediaLibrary.createAlbumAsync("Download", asset, false);
    // }

    // // Ask permission (if not granted)
    // const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    // if (perm.status != "granted") {
    //   console.log("Permission not Granted!");
    //   return;
    // }

    // // Write the file to system
    // FileSystem.writeAsStringAsync(fileUri, CSV);

    // try {
    //   const asset = await MediaLibrary.createAssetAsync(fileUri);
    //   const album = await MediaLibrary.getAlbumAsync("forms");
    //   console.log(album);
    //   if (album == null) {
    //     await MediaLibrary.createAlbumAsync("forms", asset, true);
    //   } else {
    //     await MediaLibrary.addAssetsToAlbumAsync([asset], album, true);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
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
