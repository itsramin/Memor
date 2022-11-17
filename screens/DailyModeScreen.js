import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useState } from "react";
import MemorizeCards from "../components/MemorizeCards";

const DailyModeScreen = ({ route, navigation }) => {
  const { setId, cards } = route.params;

  const allSets = useSelector((state) => state.sets.allSets);
  const targetSet = allSets.find((item) => item.setId === setId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${targetSet.name}`,
    });
  }, []);

  return <MemorizeCards cards={cards} setId={setId} mode="daily" />;
};

export default DailyModeScreen;
