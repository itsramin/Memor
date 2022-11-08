import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SettingIcon = () => {
  const navigation = useNavigation();
  const pressHandler = () => {
    navigation.navigate("settings");
  };

  return (
    <Ionicons name="settings" color="white" size={24} onPress={pressHandler} />
  );
};

export default SettingIcon;
