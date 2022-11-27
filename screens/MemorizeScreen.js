import { View } from "react-native";
import MemorizeCards from "../components/MemorizeCards";

const MemorizeScreen = ({ route, navigation }) => {
  const { setId, cards } = route.params;
  console.log(cards);
  return <MemorizeCards cards={cards} setId={setId} />;
};

export default MemorizeScreen;
