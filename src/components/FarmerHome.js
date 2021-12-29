import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  StyleSheet,
  StatusBar,
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
import { AntDesign } from "@expo/vector-icons";
import { BottomSheet } from "react-native-btr";
import * as ImagePicker from "expo-image-picker";

const perm = async () => {
  if (Platform.OS !== "web") {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  }
};

const FarmerHome = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [uploadModel, setUploadModel] = useState(false);

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

        <TouchableOpacity
          style={styles.btn_add_card}
          onPress={() => navigation.navigate("Image")}
          // onPress={()=>setUploadModel(true)}
        >
          <AntDesign name="pluscircle" style={styles.add_icon} />
        </TouchableOpacity>
      </View>

      {/* upload Model */}
      <BottomSheet visible={uploadModel}>
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            paddingTop: Platform.OS === "ios" ? StatusBarHeight : null,
          }}
        >
          <ScrollView>
            <View
              style={{
                height: 60,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingHorizontal: 15,
              }}
            >
              <TouchableOpacity
                onPress={() => setUploadModel(false)}
                style={{ flex: 0.25, paddingVertical: 5, paddingRight: 10 }}
              >
                <Image
                  source={require("../../assets/arrow-left.png")}
                  style={{ height: 28, width: 28 }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <View
                style={{
                  paddingHorizontal: 15,
                  paddingTop: HEIGHT * 0.03,
                  paddingBottom: 20,
                  width: "80%",
                  alignItems: "center",
                }}
              ></View>

              <TouchableOpacity onPress={PickImage}>
                <Text style={{ fontSize: 20 }}>Take Picture</Text>
              </TouchableOpacity>

              <View
                style={{
                  marginHorizontal: 15,
                  height: HEIGHT * 0.3,
                  width: WIDTH - 40,
                  borderRadius: 15,
                }}
              >
                {image && (
                  <Image
                    source={{ uri: image }}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                )}
              </View>

              <View style={styles.button_section}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height: 40,
                      width: 130,
                      borderColor: APP_GREEN_COLOR,
                      borderWidth: 1,
                      borderRadius: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={PickImage}
                  >
                    <Text
                      style={{
                        color: APP_GREEN_COLOR,
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      Choose Image
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      height: 40,
                      width: 120,
                      borderColor: APP_GREEN_COLOR,
                      borderWidth: 1,
                      borderRadius: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={captchImage}
                  >
                    <Text
                      style={{
                        color: APP_GREEN_COLOR,
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      Take Picture
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={{
                    height: 40,
                    width: "40%",
                    backgroundColor: APP_GREEN_COLOR,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 30,
                  }}
                  onPress={() => {
                    // setUploadModel(false)
                    // navigation.navigate("Result")
                    captchImage();
                  }}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}
                  >
                    Scan
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </BottomSheet>
      {/* <Text>hello</Text> */}
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
    fontSize: 50,
    color: APP_GREEN_COLOR,
  },
  button_section: {
    width: "90%",
    height: HEIGHT * 0.17,
    alignItems: "center",
    marginTop: HEIGHT * 0.05,
  },
});

export default FarmerHome;
