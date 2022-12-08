import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { getLevel } from "../helper/helper";
import { MaterialIcons } from "@expo/vector-icons";
import { AllColors } from "../UI/AllColors";

const CardItem = ({
  question,
  answer,
  cardId,
  setId,
  index,
  stage,
  multiSelectActive,
  onToggleMultiSelect,
  onAddToDeleteArr,
  onDeleteCards,
  onCleanCard,
  onCleanArr,
}) => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState();

  useEffect(() => {
    setSelected(false);
  }, [multiSelectActive]);

  const route = useRoute();
  const editable = route.params.editable;
  const multiSelectClose = () => {
    onCleanArr();
    onToggleMultiSelect();
  };
  const deleteSelectedCards = () => {
    onDeleteCards();
    onCleanArr();
    onToggleMultiSelect();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => {
        if (multiSelectActive) {
          return (
            <>
              <MaterialIcons
                name="close"
                color={tintColor}
                size={24}
                style={styles.iconBtn}
                onPress={multiSelectClose}
              />
              <MaterialIcons
                name="delete"
                color={tintColor}
                size={24}
                style={styles.iconBtn}
                onPress={deleteSelectedCards}
              />
            </>
          );
        }
      },
    });
  }, [multiSelectActive, navigation, multiSelectClose, deleteSelectedCards]);

  const pressCardHandler = () => {
    if (!editable) return;

    if (multiSelectActive) {
      if (!selected) {
        onAddToDeleteArr(cardId);
      } else {
        onCleanCard(cardId);
      }
      setSelected((prev) => !prev);
    } else {
      navigation.navigate("CardFormScreen", {
        cardId,
        question,
        answer,
        setId,
      });
    }
  };

  const longPressHandler = () => {
    if (!editable) return;
    // setSelected(false);
    onToggleMultiSelect();
  };
  return (
    <Pressable
      style={styles.outer}
      onPress={pressCardHandler}
      onLongPress={longPressHandler}
    >
      {multiSelectActive && (
        <View
          style={[
            styles.selectView,
            {
              backgroundColor: selected
                ? AllColors.primary400
                : AllColors.grey100,
            },
          ]}
        >
          <MaterialIcons
            name={selected ? "check-box" : "check-box-outline-blank"}
            size={20}
            color={selected ? AllColors.primary100 : AllColors.primary400}
          />
        </View>
      )}
      <View style={styles.card}>
        <View style={styles.question}>
          <Text style={styles.text}>{question}</Text>
        </View>
        <View>
          <Text style={styles.text}>{answer}</Text>
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.index}>#{index}</Text>
        {editable && (
          <View style={styles.stage}>
            <Text style={styles.stageNum}>{getLevel(stage)}</Text>
            <Text style={styles.stageLabel}>Level</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default CardItem;
const styles = StyleSheet.create({
  outer: {
    backgroundColor: AllColors.primary100,
    marginVertical: 8,
    borderRadius: 6,
    margin: 8,
    flexDirection: "row",
    overflow: "hidden",
  },
  question: {
    borderBottomColor: AllColors.primary300,
    borderBottomWidth: 1,
    marginBottom: 8,
    paddingBottom: 8,
  },
  text: {
    color: AllColors.primary500,
    margin: 5,
  },
  card: {
    flex: 1,
    padding: 8,
  },
  info: {
    backgroundColor: AllColors.primary200,
    alignItems: "center",
    justifyContent: "space-around",
    minWidth: 50,
  },
  index: { fontSize: 14, color: AllColors.primary400, marginVertical: 8 },
  stage: {
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 4,
    flex: 1,
  },
  stageNum: { fontSize: 20, color: AllColors.primary400, fontWeight: "bold" },
  stageLabel: {
    fontSize: 12,
    color: AllColors.primary400,
  },
  selectView: {
    alignItems: "center",
    justifyContent: "space-around",
    minWidth: 50,
  },
  iconBtn: {
    marginLeft: 25,
  },
});
