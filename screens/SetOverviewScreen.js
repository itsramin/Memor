import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import SetInfo from "../components/SetInfo";
import { dbDeleteSet, dbFetchSetName } from "../store/database";
import { AllColors } from "../UI/AllColors";
import PrimaryButton from "../UI/PrimaryButton";

const SetOverviewScreen = ({ route, navigation }) => {
  const { setId } = route.params;
  const [curSetName, setCurSetName] = useState();

  useEffect(() => {
    const fetchHandler = async () => {
      const setName = await dbFetchSetName(setId);
      setCurSetName(setName);
    };
    fetchHandler();

    navigation.setOptions({ title: curSetName });
  }, [curSetName]);

  const deleteSetHandler = async () => {
    await dbDeleteSet(setId);
    navigation.goBack();
  };
  const addNewCardHandler = async () => {
    navigation.navigate("CardFormScreen", { setId });
  };
  const viewHandler = async () => {
    navigation.navigate("CardListScreen", { setId });
  };
  return (
    <ScrollView>
      <SetInfo name={curSetName} />
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
