import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const InfoIcon = () => {
  const navigation = useNavigation();
  const pressHandler = () => {
    navigation.navigate("InfoScreen");
  };

  return (
    <MaterialIcons
      name="info"
      color="white"
      style={{ opacity: 0.8 }}
      size={24}
      onPress={pressHandler}
    />
  );
};

export default InfoIcon;
