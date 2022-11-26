import { View } from "react-native";
import MemorizeCards from "../components/MemorizeCards";

const MemorizeScreen = ({ route, navigation }) => {
  const { setId, cards } = route.params;
  return <MemorizeCards cards={cards} setId={setId} />;
};

export default MemorizeScreen;
