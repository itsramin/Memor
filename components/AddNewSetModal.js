import { useEffect, useRef, useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { dbNewSet } from "../store/database";
import { AllColors } from "../UI/AllColors";
import PrimaryButton from "../UI/PrimaryButton";

const AddNewSetModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const nameRef = useRef();
  const [setName, setSetName] = useState("");
  const [nameInvalid, setNameInvalid] = useState(false);
  const nameChangeHandler = (value) => {
    setSetName(value);
    setNameInvalid(false);
  };
  const addNewSetHandler = () => {
    if (setName.trim().length < 1) {
      setNameInvalid(true);
      return;
    }

    dbNewSet(setName);
    hideModel();
    nameRef.current.blur();
    setSetName("");
  };
  const hideModel = () => {
    setModalVisible(false);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  return (
    <>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={hideModel}
        onShow={() => {
          setTimeout(() => {
            nameRef.current.focus();
          }, 100);
        }}
        statusBarTranslucent={true}
      >
        <KeyboardAvoidingView behavior="padding" style={styles.avoid}>
          <Pressable style={styles.grey} onPress={hideModel}>
            <View style={styles.modalView}>
              <View style={styles.container}>
                <TextInput
                  style={[styles.input, nameInvalid && styles.nameInvalid]}
                  onChangeText={nameChangeHandler}
                  value={setName}
                  ref={nameRef}
                  autoCapitalize="none"
                  placeholder="Set name"
                />
                <PrimaryButton
                  title="Create"
                  icon="check"
                  onPress={addNewSetHandler}
                />
              </View>
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </Modal>

      <View style={styles.addBtn}>
        <PrimaryButton title="Create new Set" icon="add" onPress={showModal} />
      </View>
    </>
  );
};

export default AddNewSetModal;
const styles = StyleSheet.create({
  avoid: {
    flex: 1,
    backgroundColor: " rgba(0, 0, 0, 0.7)",
  },
  grey: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  modalView: {
    padding: 24,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "white",
    width: "100%",
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    marginRight: 10,
    paddingVertical: 4,
    paddingHorizontal: 6,
    color: AllColors.primary500,
    borderBottomWidth: 1,
    borderBottomColor: AllColors.primary400,
    fontSize: 16,
    marginBottom: 10,
    width: "80%",
  },
  nameInvalid: {
    borderBottomWidth: 2,
    borderBottomColor: AllColors.red400,
    backgroundColor: AllColors.red100,
  },
  addBtn: {
    alignItems: "center",
    justifyContent: "center",
  },
});
