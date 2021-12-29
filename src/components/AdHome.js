import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { APP_GREEN_COLOR, HEIGHT, WIDTH } from "../contansts/constants";
import { Feather } from "@expo/vector-icons";

const AdHome = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [id, setId] = useState(null);
  const disease = [
    {
      _id: 1,
      farmer: {
        fname: "Emmanuel",
        lname: "NTIVUGURUZWA",
        phone: "0788596281",
      },
      location: {
        country: "Rwanda",
        province: "KIGALI",
        district: "Gasabo",
        sector: "Remera",
      },
      desease: {
        name: "Desease Name",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget feugiat sem, id viverra lectus. Vestibulum semper, ex a interdum tristique, est justo aliquam turpis, eget bibendum turpis leo sit amet eros. Sed nisl ligula, scelerisque in lacinia eu, lacinia vitae dui",
      },
      createdAt: "ewkfeej",
    },
    {
      _id: 2,
      farmer: {
        fname: "Jean",
        lname: "RUKUNDO",
        phone: "0788596281",
      },
      location: {
        country: "Rwanda",
        province: "KIGALI",
        district: "Gasabo",
        sector: "Remera",
      },
      desease: {
        name: "Desease Name",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget feugiat sem, id viverra lectus. Vestibulum semper, ex a interdum tristique, est justo aliquam turpis, eget bibendum turpis leo sit amet eros. Sed nisl ligula, scelerisque in lacinia eu, lacinia vitae dui",
      },
      createdAt: "ewkfjop",
    },
    {
      _id: 3,
      farmer: {
        fname: "Jean",
        lname: "RUKUNDO",
        phone: "0788596281",
      },
      location: {
        country: "Rwanda",
        province: "KIGALI",
        district: "Gasabo",
        sector: "Remera",
      },
      desease: {
        name: "Desease Name",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget feugiat sem, id viverra lectus. Vestibulum semper, ex a interdum tristique, est justo aliquam turpis, eget bibendum turpis leo sit amet eros. Sed nisl ligula, scelerisque in lacinia eu, lacinia vitae dui",
      },
      createdAt: "ewkfjjj",
    },
    {
      _id: 4,
      farmer: {
        fname: "Jean",
        lname: "RUKUNDO",
        phone: "0788596281",
      },
      location: {
        country: "Rwanda",
        province: "KIGALI",
        district: "Gasabo",
        sector: "Remera",
      },
      desease: {
        name: "Desease Name",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget feugiat sem, id viverra lectus. Vestibulum semper, ex a interdum tristique, est justo aliquam turpis, eget bibendum turpis leo sit amet eros. Sed nisl ligula, scelerisque in lacinia eu, lacinia vitae dui",
      },
      createdAt: "ewkfj",
    },
  ];
  return (
    <View>
      <FlatList
        data={disease}
        keyExtractor={(disease) => disease.createdAt}
        showsVerticalScrollIndicator={false}
        horizontal={false}
        renderItem={({ item, index }) => {
          return (
            <View>
              <View style={styles.main_box}>
                <View style={styles.box_1}>
                  <View style={styles.fam_item}>
                    <Text style={styles.fam_label}>Famer:</Text>
                    <Text style={{ fontWeight: "bold" }}>
                      {" "}
                      Emmanuel RUKUNDO
                    </Text>
                  </View>
                  <View style={styles.fam_item}>
                    <Text style={styles.fam_label}>Plant:</Text>
                    <Text style={{ fontWeight: "bold" }}> Tomato</Text>
                  </View>
                  <View style={styles.fam_item}>
                    <Text style={styles.fam_label}>Location:</Text>
                    <Text style={{ fontWeight: "bold" }}>
                      {" "}
                      Gasabo, Kimironko
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 10,
                    }}
                  >
                    <ScrollView
                      horizontal={false}
                      style={{ backgroundColor: "azure", borderRadius: 20 }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          marginVertical: 10,
                        }}
                      >
                        <Text style={{ fontSize: 16, color: "red" }}>
                          Disease:{" "}
                        </Text>
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: 16,
                            textTransform: "uppercase",
                            fontWeight: "bold",
                          }}
                        >
                          Disease Example
                        </Text>
                      </View>
                      <Text style={{ paddingLeft: 3, fontSize: 16 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Aenean eget feugiat sem, id viverra lectus. Vestibulum
                        semper, ex a interdum tristique, est justo aliquam
                        turpis, eget bibendum turpis leo sit amet eros
                      </Text>
                    </ScrollView>
                    <TouchableOpacity
                      style={{
                        height: "100%",
                        width: 60,
                        backgroundColor: "#ebeae8",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() => {
                        console.log(item._id);
                        setId(item._id);
                        setModalVisible(true);
                      }}
                    >
                      <Text style={{ fontWeight: "bold" }}>Admit</Text>
                      <Feather name="check-circle" size={30} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.box_2}></View>
              </View>
              <View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <TextInput
                        style={styles.TextInputStyleClass}
                        underlineColorAndroid="transparent"
                        placeholder={"write coment and solution here..."}
                        placeholderTextColor={"#9E9E9E"}
                        numberOfLines={10}
                        multiline={true}
                        value={message}
                        onChangeText={(message) => setMessage(message)}
                      />
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                          console.log({ message, id });
                          setModalVisible(!modalVisible);
                        }}
                      >
                        <Feather
                          name="check-circle"
                          size={25}
                          color="#fff"
                          style={{ paddingRight: 5 }}
                        />
                        <Text style={styles.textStyle}>Admit</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  main_box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    height: HEIGHT / 2.5,
  },
  box_1: {
    height: 200,
    width: "100%",
    paddingLeft: 10,
    // backgroundColor: "pink",
  },
  fam_item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  fam_label: {
    color: APP_GREEN_COLOR,
    fontSize: 16,
    fontWeight: "bold",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 20,
    height: 30,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonClose: {
    backgroundColor: APP_GREEN_COLOR,
    height: 40,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  TextInputStyleClass: {
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "#FFFFFF",
    height: HEIGHT * 0.3,
    width: "100%",
    marginBottom: 20,
  },
});

export default AdHome;
