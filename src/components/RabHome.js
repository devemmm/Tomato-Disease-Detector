import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
  Image,
  StyleSheet,
  StatusBar,
  Pressable,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import {
  APP_GREEN_COLOR,
  HEIGHT,
  WIDTH,
  normalTomatoes,
  affectedTomatoes,
} from "../contansts/constants";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { BottomSheet } from "react-native-btr";
import * as ImagePicker from "expo-image-picker";

const RabHome = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [uploadModel, setUploadModel] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const captchImage = async () => {
    setImage(null);
    let result = await ImagePicker.launchCameraAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      // aspect: [4, 3],
      // quality: 1
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
    <View>
      <View style={styles.main_container}>
        <View style={styles.image_cover}>
          <FlatList
            data={normalTomatoes}
            keyExtractor={(tomato) => tomato.url}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <Image style={styles.image} source={{ uri: item.url }} />
                  <View style={styles.description_card}>
                    <Text>{item.title}</Text>
                    <Text>{item.description}</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
        <View style={{ flex: 1 }} />

        <View style={styles.image_cover}>
          <FlatList
            data={affectedTomatoes}
            keyExtractor={(tomato) => tomato.url}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <Image style={styles.image} source={{ uri: item.url }} />
                  <View style={styles.description_card}>
                    <Text>{item.title}</Text>
                    <Text>{item.description}</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>

        <View
          style={{
            height: 100,
            width: WIDTH,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "pink",
              height: 50,
              width: 120,
              borderRadius: 10,
            }}
          >
            <Ionicons name="document" style={styles.add_icon} />
            <Text
              style={{
                color: "red",
                textTransform: "capitalize",
                fontSize: 20,
              }}
            >
              report
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "pink",
              height: 50,
              width: 120,
              borderRadius: 10,
            }}
          >
            <AntDesign name="team" style={styles.add_icon} />
            <Text
              style={{
                color: "red",
                textTransform: "capitalize",
                fontSize: 20,
                marginLeft: 5,
              }}
            >
              Users
            </Text>
          </TouchableOpacity>
        </View>
      </View>

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
            <View style={{ height: 200, width: "100%" }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate("Report", { type: "farmer" });
                }}
                style={styles.modelRepportBtn}
              >
                <Text style={styles.modelReportBtnText}>Farmer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate("Report", { type: "farmer" });
                }}
                style={styles.modelRepportBtn}
              >
                <Text style={styles.modelReportBtnText}>Sector</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate("Report", { type: "farmer" });
                }}
                style={styles.modelRepportBtn}
              >
                <Text style={styles.modelReportBtnText}>District</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  main_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  image_container: {
    backgroundColor: "#dadfe6",
    marginBottom: 10,
  },
  image_cover: {
    height: HEIGHT * 0.32,
    width: WIDTH - 20,
    marginTop: 10,
    borderRadius: 10,
  },
  image: {
    width: WIDTH - 20,
    height: HEIGHT * 0.25,
    resizeMode: "stretch",
    borderRadius: 5,
    marginRight: 20,
  },
  description_card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn_add_card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  add_icon: {
    fontSize: 25,
    color: APP_GREEN_COLOR,
  },
  button_section: {
    width: "90%",
    height: HEIGHT * 0.17,
    alignItems: "center",
    marginTop: HEIGHT * 0.05,
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
    marginTop: HEIGHT * 0.2,
  },
  modelRepportBtn: {
    backgroundColor: "pink",
    height: 50,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modelReportBtnText: {
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "capitalize",
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
    marginBottom: HEIGHT * 0.03,
  },
});

export default RabHome;
