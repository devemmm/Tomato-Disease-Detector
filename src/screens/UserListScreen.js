import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { APP_GREEN_COLOR } from "../contansts/constants";
import { AntDesign } from "@expo/vector-icons";

const UserListScreen = () => {
  const users = [
    {
      fname: "Olive",
      lname: "NIREBA",
      gender: "Male",
      phone: "0783230879",
      location: {
        country: "Rwanda",
        province: "Kigali City",
        district: "NYARUGENGE",
        sector: "NYAMIRAMBO",
        cell: "MUGI",
      },
      email: "rab@gmail.com",
      userType: "district",
      password: "12345",
    },
    {
      fname: "Emmanuel",
      lname: "Ntivug",
      gender: "Male",
      phone: "078596281",
      location: {
        country: "Rwanda",
        province: "Kigali City",
        district: "NYARUGENGE",
        sector: "NYAMIRAMBO",
        cell: "MUGI",
      },
      email: "rab@gmail.com",
      userType: "district",
      password: "12345",
    },
  ];

  const handleDownload = () => {
    alert("this functionality is under developent");
  };

  const handleOnClickUser = () => {
    alert("this functionality is under developent");
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
        <TouchableOpacity onPress={handleDownload}>
          <AntDesign name="clouddownload" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%" }}>
        <View style={styles.th}>
          <Text>No</Text>
          <Text>Names</Text>
          <Text>Gender</Text>
          <Text>Phone</Text>
          <Text>Role</Text>
        </View>
        <FlatList
          data={users}
          keyExtractor={(user) => user.id}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={[
                  styles.tr,
                  { backgroundColor: (index + 1) % 2 === 0 ? "#e0d8d7" : null },
                ]}
                onPress={handleOnClickUser}
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
      </View>
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
});
export default UserListScreen;
