import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AllColors } from "../UI/AllColors";
import { MaterialIcons } from "@expo/vector-icons";
const InfoScreen = () => {
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.box}>
        <Text style={styles.header}>Memor</Text>
        <Text style={styles.text}>
          Memor is a flashcard application to create your own cards or use
          online cards based on Leitner system.
        </Text>
      </View>
      <View style={styles.box}>
        <View style={styles.titleView}>
          <MaterialIcons
            name="play-arrow"
            color={AllColors.primary400}
            size={20}
          />
          <Text style={styles.title}>Memorize</Text>
        </View>
        <Text style={styles.text}>
          Each time you start, the app shows you some cards. If you remember, it
          will be asked you 2 days later but if you don't remember, it will be
          asked you tommorrow.
        </Text>
      </View>
      <View style={styles.box}>
        <View style={styles.titleView}>
          <MaterialIcons
            name="cloud-download"
            color={AllColors.primary400}
            size={20}
          />
          <Text style={styles.title}>Import</Text>
        </View>
        <Text style={styles.text}>
          You can import cards from CSV (Utf-8) comma delimited file. First
          Column must be questions and the second one, answers without any
          headers.
        </Text>
      </View>
      <View style={styles.box}>
        <View style={styles.titleView}>
          <MaterialIcons
            name="cloud-upload"
            color={AllColors.primary400}
            size={20}
          />
          <Text style={styles.title}>Export</Text>
        </View>
        <Text style={styles.text}>
          All cards of set will export to a CSV file. You can import it anytime.
          Question and answer will save only!
        </Text>
      </View>
      <View style={styles.box}>
        <View style={styles.titleView}>
          <MaterialIcons name="store" color={AllColors.primary400} size={20} />
          <Text style={styles.title}>Market</Text>
        </View>
        <Text style={styles.text}>
          You can find some online flashcards here and add it to your sets.
        </Text>
      </View>
    </ScrollView>
  );
};

export default InfoScreen;
const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 10 },
  box: { marginVertical: 10 },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    color: AllColors.primary400,
    textAlign: "center",
    marginBottom: 10,
  },
  titleView: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: AllColors.primary400,
    marginBottom: 5,
    marginLeft: 10,
  },
  text: { fontSize: 15, color: AllColors.grey400 },
});
