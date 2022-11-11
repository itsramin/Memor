import { useSelector } from "react-redux";
import ViewCardsList from "../components/VIewCardsList";

const ViewScreen = ({ route }) => {
  const { setId, source } = route.params;
  let allSets = useSelector((state) => state.sets.allSets);

  if (source === "market") {
    allSets = useSelector((state) => state.market.allSets);
  }

  const targetSet = allSets.find((item) => item.setId === setId);

  return (
    <ViewCardsList
      targetSet={targetSet}
      allowPress={source === "market" ? false : true}
    />
  );
};

export default ViewScreen;
