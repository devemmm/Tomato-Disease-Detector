import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Alert,
  Modal,
  FlatList,
} from "react-native";
import { APP_GREEN_COLOR, HEIGHT } from "../contansts/constants";
import { AntDesign, MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import apApi from "../api/apApi";
import { Context as AuthContext } from "../context/AppContext";
import { getSingleGif } from "../helpers/download";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
const filename = "Tomato-Disease-Detector-user-list.xlsx";

const saveFile = async (fileUri) => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status === "granted") {
    const asset = await MediaLibrary.createAssetAsync(fileUri);
    await MediaLibrary.createAlbumAsync("Download", asset, false);
  }
};

const UserListScreen = ({ navigation }) => {
  const { state, setSelectedUser } = useContext(AuthContext);
  const [users, setUser] = useState({
    famer: [],
    sector: [],
    district: [],
    rab: [],
  });
  const [showActivityIndicator, setshowActivityIndicator] = useState(false);
  const [modalUserVisible, setModalUserVisible] = useState(false);
  const [phone, setPhone] = useState(
    state?.selectedUser?.phone ? state?.selectedUser?.phone : ""
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setshowActivityIndicator(true);
      fetch(`${apApi}/rab/user`, {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          const { users } = res;

          if (res.error) {
            setshowActivityIndicator(false);
            Alert.alert("error", res.error.message);
          } else {
            setshowActivityIndicator(false);

            setUser({
              ...users,
              famer: users.filter((user) => user.userType === "famer"),
              sector: users.filter((user) => user.userType === "sector"),
              district: users.filter((user) => user.userType === "district"),
              rab: users.filter((user) => user.userType === "rab"),
            });
          }
        })
        .catch((error) => {
          setshowActivityIndicator(false);
          Alert.alert("error", "check your network connection");
        });
    });
    return unsubscribe;
  }, [navigation]);

  // const downloadFile = () => {
  //   const uri = "http://techslides.com/demos/sample-videos/small.mp4";
  //   let fileUri = FileSystem.documentDirectory + "small.mp4";
  //   FileSystem.downloadAsync(uri, fileUri)
  //     .then(({ uri }) => {
  //       console.log("file downloaded");
  //       // this.saveFile(uri);
  //     })
  //     .catch((error) => {
  //       console.log("something went wrong");
  //       console.error(error);
  //     });
  // };

  const handleDownload = () => {
    // getSingleGif("YsTs5ltWtEhnq")
    //   .then((res) => console.log("downloaded"))
    //   .catch((erro) => console.log("something went wrong"));
    // alert("under development");

    FileSystem.downloadAsync(
      "http://techslides.com/demos/sample-videos/small.mp4",
      FileSystem.documentDirectory + "small.mp4"
    )
      .then((pro) => {
        console.log("Finished downloading to ", pro.uri);
        saveFile()
          .then((respo) => console.log("save"))
          .catch((errorr) => console.log("not saved"));
      })
      .catch((error) => {
        console.error(error);
      }),
      console.log("development");
  };



  const generateReport = ({ type }) => {

    setshowActivityIndicator(true);
    fetch(`${apApi}/admin/pushreport?type=${type}`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.user.token}`,
      }
    })
      .then((response) => response.json())
      .then((res) => {
        setshowActivityIndicator(false);
        Alert.alert("success", "User list sent please check your Email !!!");
      })
      .catch((error) => {
        setshowActivityIndicator(false);
        Alert.alert("error", "something went wrong");
      });
  }


  const handleOnClickUser = ({ item }) => {
    setPhone(item.phone);
    setSelectedUser(item);
    setModalUserVisible(true);
  };

  const handleCreateUser = () => {
    setModalUserVisible(false);
    navigation.navigate("User");
  };

  const handleDeleteUser = () => {
    if (phone.length !== 10) {
      Alert.alert("error", "phone number must be 10 in length");
    } else {
      setshowActivityIndicator(true);
      fetch(`${apApi}/rab/user/${phone}`, {
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          setshowActivityIndicator(false);

          const { error, status } = res;
          if (error) {
            return Alert.alert(
              "error",
              res.errorMessage ? res.errorMessage : error.message
            );
          }

          if (status !== 400) {
            setModalUserVisible(!modalUserVisible);
            Alert.alert("success", "user deleted successfull");
            return navigation.navigate("MainFlow");
          }
        })
        .catch((error) => {
          setshowActivityIndicator(false);
          Alert.alert("error", "something went wrong");
        });
    }
  };

  const handleChangeUserType = ({ type }) => {
    try {
      if (!phone) {
        throw new Error("user phone number must be required");
      }

      if (phone.length < 10 || phone.length > 10) {
        throw new Error("user phone number should be 10 in length");
      }

      setshowActivityIndicator(true);
      fetch(`${apApi}/users/profile?type=userType`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify({
          phone,
          userType: type,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          setshowActivityIndicator(false);
          if (res.error) {
            setModalUserVisible(!modalUserVisible);
            return Alert.alert("error", `${res.error.message}`);
          }

          setPhone("");
          setModalUserVisible(!modalUserVisible);
          Alert.alert("successfull", "user account modified successfull");
          navigation.navigate("MainFlow");
        })
        .catch((error) => {
          setshowActivityIndicator(false);
          Alert.alert("error", "check your network connection");
        });
    } catch (error) {
      Alert.alert("error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            width: "80%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.headerTxt}>TDD USERS</Text>
        </View>
        <TouchableOpacity onPress={() => generateReport({ type: 'user' })}>
          <AntDesign name="clouddownload" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.th}>
          <Text>No</Text>
          <Text>Names</Text>
          <Text>Gender</Text>
          <Text>Phone</Text>
          <Text>Role</Text>
        </View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
            borderBottomColor: "grey",
            borderBottomWidth: 1,
            color: APP_GREEN_COLOR,
            paddingBottom: 10,
          }}
        >
          Famer -- List
        </Text>
        <FlatList
          style={{ marginTop: 15 }}
          data={users.famer}
          keyExtractor={(user) => user.phone}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={[
                  styles.tr,
                  {
                    backgroundColor: (index + 1) % 2 === 0 ? "#e0d8d7" : null,
                    marginBottom: 5,
                  },
                ]}
                onPress={() => handleOnClickUser({ item })}
              >
                <Text>{index + 1}</Text>
                <Text>{item.fname + " " + item.lname}</Text>
                <Text>{item.gender}</Text>
                <Text>{item.phone}</Text>
                <Text>{item.userType}</Text>
              </TouchableOpacity>
            );
          }}
        ></FlatList>
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
            borderBottomColor: "grey",
            borderBottomWidth: 1,
            marginTop: 10,
            color: APP_GREEN_COLOR,
            paddingBottom: 10,
          }}
        >
          Sector Agronomist -- List
        </Text>
        <FlatList
          style={{ marginTop: 15 }}
          data={users.sector}
          keyExtractor={(user) => user.phone}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={[
                  styles.tr,
                  {
                    backgroundColor: (index + 1) % 2 === 0 ? "#e0d8d7" : null,
                    marginBottom: 5,
                  },
                ]}
                onPress={() => handleOnClickUser({ item })}
              >
                <Text>{index + 1}</Text>
                <Text>{item.fname + " " + item.lname}</Text>
                <Text>{item.gender}</Text>
                <Text>{item.phone}</Text>
                <Text>{item.userType}</Text>
              </TouchableOpacity>
            );
          }}
        ></FlatList>
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
            borderBottomColor: "grey",
            borderBottomWidth: 1,
            marginTop: 10,
            color: APP_GREEN_COLOR,
            paddingBottom: 10,
          }}
        >
          District Agronomist -- List
        </Text>
        <FlatList
          style={{ marginTop: 15 }}
          data={users.district}
          keyExtractor={(user) => user.phone}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={[
                  styles.tr,
                  {
                    backgroundColor: (index + 1) % 2 === 0 ? "#e0d8d7" : null,
                    marginBottom: 5,
                  },
                ]}
                onPress={() => handleOnClickUser({ item })}
              >
                <Text>{index + 1}</Text>
                <Text>{item.fname + " " + item.lname}</Text>
                <Text>{item.gender}</Text>
                <Text>{item.phone}</Text>
                <Text>{item.userType}</Text>
              </TouchableOpacity>
            );
          }}
        ></FlatList>

        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
            borderBottomColor: "grey",
            borderBottomWidth: 1,
            marginTop: 10,
            color: APP_GREEN_COLOR,
            paddingBottom: 10,
          }}
        >
          RAB List -- Admins
        </Text>
        <FlatList
          style={{ marginTop: 15 }}
          data={users.rab}
          keyExtractor={(user) => user.phone}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={[
                  styles.tr,
                  {
                    backgroundColor: (index + 1) % 2 === 0 ? "#e0d8d7" : null,
                    marginBottom: 5,
                  },
                ]}
                onPress={() => handleOnClickUser({ item })}
              >
                <Text>{index + 1}</Text>
                <Text>{item.fname + " " + item.lname}</Text>
                <Text>{item.gender}</Text>
                <Text>{item.phone}</Text>
                <Text>{item.userType}</Text>
              </TouchableOpacity>
            );
          }}
        ></FlatList>

        {showActivityIndicator ? (
          <View
            style={{
              height: HEIGHT,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size="large" color="green" />
          </View>
        ) : null}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalUserVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalUserVisible(!modalUserVisible);
        }}
      >
        <ScrollView>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ height: 200, width: "100%" }}>
                <View style={styles.createBtn}>
                  <Entypo
                    name="add-user"
                    size={24}
                    color="black"
                    onPress={handleCreateUser}
                  />

                  {phone.length === 10 ? (
                    <MaterialIcons
                      style={{ marginLeft: 10 }}
                      name="delete"
                      size={24}
                      color="red"
                      onPress={handleDeleteUser}
                    />
                  ) : null}
                </View>
                {phone.length === 0 ? (
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      textAlign: "center",
                      textTransform: "capitalize",
                      color: "red",
                      // marginBottom: ,
                    }}
                  >
                    update user account here
                  </Text>
                ) : null}
                <TextInput
                  style={{
                    borderColor: "grey",
                    borderWidth: 1,
                    paddingVertical: 10,
                    borderRadius: 10,
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                  placeholder="phone number"
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  maxLength={10}
                  value={phone}
                  editable={false}
                  onChangeText={(value) => setPhone(value)}
                />

                <View
                  style={{
                    flex: 1,
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  {showActivityIndicator ? (
                    <ActivityIndicator size="large" color="red" />
                  ) : null}

                  {showActivityIndicator ? null : (
                    <>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: 40,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            handleChangeUserType({ type: "farmer" })
                          }
                          style={styles.actionButton}
                        >
                          <Text style={styles.actionButtonText}>Farmer</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() =>
                            handleChangeUserType({ type: "sector" })
                          }
                          style={styles.actionButton}
                        >
                          <Text style={styles.actionButtonText}>Sector</Text>
                        </TouchableOpacity>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: 20,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            handleChangeUserType({ type: "district" })
                          }
                          style={styles.actionButton}
                        >
                          <Text style={styles.actionButtonText}>District</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => handleChangeUserType({ type: "rab" })}
                          style={styles.actionButton}
                        >
                          <Text style={styles.actionButtonText}>Rab</Text>
                        </TouchableOpacity>
                      </View>

                      <TouchableOpacity
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: 10,
                          backgroundColor: "pink",
                          borderRadius: 5,
                          height: 30,
                        }}
                        onPress={() => setModalUserVisible(false)}
                      >
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                          Cancel
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    backgroundColor: APP_GREEN_COLOR,
    width: "100%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  headerTxt: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  th: {
    backgroundColor: APP_GREEN_COLOR,
    borderColor: "grey",
    borderWidth: 1,
    marginBottom: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  tr: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  centeredView: {},
  modalView: {
    margin: 20,
    height: 300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginTop: "40%",
  },
  createBtn: {
    paddingLeft: 10,
    borderRadius: 8,
    height: 20,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginBottom: 20,
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
  actionButton: {
    backgroundColor: "red",
    width: "40%",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default UserListScreen;
