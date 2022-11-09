import { ScrollView, Text, TextInput, View } from "react-native";
import CardForm from "../components/CardForm";

const NewSetForm = () => {
  const submitCardHandler = (cardData) => {
    console.log(cardData, `${Math.random()}`);
  };
  return (
    <View>
      <View>
        <Text>Set name</Text>
        <TextInput placeholder="Set name" />
      </View>
      <ScrollView>
        <CardForm mode="new" submitCard={submitCardHandler} />
        <CardForm mode="new" submitCard={submitCardHandler} />
        <CardForm mode="new" submitCard={submitCardHandler} />
        <CardForm mode="new" submitCard={submitCardHandler} />
        <CardForm mode="new" submitCard={submitCardHandler} />
      </ScrollView>
    </View>
  );
};

export default NewSetForm;
