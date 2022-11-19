import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useState } from "react";
import MemorizeCards from "../components/MemorizeCards";
import { setsActions } from "../store/sets";
import { useIsFocused } from "@react-navigation/native";

const DailyModeScreen = ({ route, navigation }) => {
  const { setId } = route.params;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const allSets = useSelector((state) => state.sets.allSets);

  const targetSet = allSets.find((item) => item.setId === setId);

  const isDailyCardsCreateToday = targetSet.isDailyCardsCreateToday;
  const dailyCardsAmount = useSelector(
    (state) => state.settings.dailyCardsAmount
  );

  useEffect(() => {
    if (!isDailyCardsCreateToday) {
      dispatch(setsActions.createDailyCards({ setId, dailyCardsAmount }));
      dispatch(setsActions.stageUpAllCards({ setId }));
      dispatch(setsActions.changeCreationStatus({ setId }));
    }
  }, [isDailyCardsCreateToday, setId, dailyCardsAmount, isFocused]);

  const todayCards = targetSet.dailyCards;

  const [dailyCards, setDailyCards] = useState(todayCards);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: targetSet.name,
    });
  }, []);

  return <MemorizeCards cards={dailyCards} setId={setId} />;
};

export default DailyModeScreen;
