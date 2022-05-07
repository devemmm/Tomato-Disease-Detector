import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { HEIGHT, WIDTH, APP_GREEN_COLOR } from "../contansts/constants";
import { Context as AuthContext } from "../context/AppContext";
import apApi from "../api/apApi";

const UserScreen = ({ navigation }) => {
  const [person, setPerson] = useState({
    gender: "male",
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
    userType: "",
  });
  const [location, setLocation] = useState({
    country: "Rwanda",
    province: "",
    district: "",
    sector: "",
    cell: "",
  });

  const [showActivityIndicator, setActivityIndictor] = useState(false);
  const { state, signup } = useContext(AuthContext);

  const cleanField = () => {
    setPerson({
      ...person,
      fname: "",
      lname: "",
      email: "",
      phone: "",
      password: "",
      userType: "",
    });

    setLocation({
      ...location,
      province: "",
      district: "",
      sector: "",
      cell: "",
    });
  };
  const handleSubmit = () => {
    const { fname, lname, email, phone, password, userType } = person;
    const { country, province, district, sector, cell } = location;
    if (
      !fname ||
      !lname ||
      !email ||
      !phone ||
      !password ||
      !country ||
      !province ||
      !district ||
      !sector ||
      !cell
    ) {
      Alert.alert(
        "error",
        "mising some required values please chech out your inputs"
      );
      return "stop";
    } else if (password.length < 6) {
      Alert.alert("error", "password length should be less than 6");
      return "stop";
    } else {
      setActivityIndictor(true);
      fetch(`${apApi}/users/signup`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify({
          ...person,
          location,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          setActivityIndictor(false);

          const { error, statusCode } = res;
          if (error) {
            return Alert.alert("error", error.message);
          }

          if (statusCode === 201) {
            cleanField();
            Alert.alert(
              "success",
              "System User account created successfull.. now he/she can login on any device throw Tomato Disease Ditector Application"
            );
            return navigation.navigate("MainFlow");
          }
        })
        .catch((error) => {
          setActivityIndictor(false);
          Alert.alert("error", "something went wrong");
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screen_title}>Create user Account</Text>
      </View>
      <View style={styles.signup_form}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input_field}
              autoCorrect={false}
              autoCapitalize="none"
              value={person.fname}
              onChangeText={(input) => {
                setPerson({ ...person, fname: input });
              }}
            />
          </View>
          <View>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input_field}
              autoCorrect={false}
              autoCapitalize="none"
              value={person.lname}
              onChangeText={(input) => {
                setPerson({ ...person, lname: input });
              }}
            />
          </View>
          <View>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input_field}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="number-pad"
              maxLength={10}
              value={person.phone}
              onChangeText={(input) => {
                setPerson({ ...person, phone: input });
              }}
            />
          </View>
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input_field}
              autoCorrect={false}
              autoCapitalize="none"
              value={person.email}
              onChangeText={(input) => {
                setPerson({ ...person, email: input });
              }}
            />
          </View>

          <View>
            <Text style={styles.label}>Province</Text>
            <TextInput
              style={styles.input_field}
              autoCorrect={false}
              autoCapitalize="none"
              value={location.province}
              onChangeText={(input) => {
                setLocation({ ...location, province: input });
              }}
            />
          </View>

          <View>
            <Text style={styles.label}>District</Text>
            <TextInput
              style={styles.input_field}
              autoCorrect={false}
              autoCapitalize="none"
              value={location.district}
              onChangeText={(input) => {
                setLocation({ ...location, district: input });
              }}
            />
          </View>

          <View>
            <Text style={styles.label}>Sector</Text>
            <TextInput
              style={styles.input_field}
              autoCorrect={false}
              autoCapitalize="none"
              value={location.sector}
              onChangeText={(input) => {
                setLocation({ ...location, sector: input });
              }}
            />
          </View>

          <View>
            <Text style={styles.label}>Cell</Text>
            <TextInput
              style={styles.input_field}
              autoCorrect={false}
              autoCapitalize="none"
              value={location.cell}
              onChangeText={(input) => {
                setLocation({ ...location, cell: input });
              }}
            />
          </View>

          <View>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input_field}
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry
              value={person.password}
              onChangeText={(input) => {
                setPerson({ ...person, password: input });
              }}
            />
          </View>
          <View
            style={{
              borderColor: "grey",
              borderWidth: 2,
              borderRadius: 2,
              paddingHorizontal: 20,
              paddingTop: 20,
              backgroundColor: "#d6d3c98C  ",
            }}
          >
            <Text style={styles.label}>User Type</Text>
            <TextInput
              style={styles.input_field}
              autoCorrect={false}
              autoCapitalize="none"
              value={person.userType}
              onChangeText={(value) =>
                setPerson({ ...person, userType: value })
              }
            />
          </View>
        </ScrollView>

        <TouchableOpacity
          style={{
            backgroundColor: "red",
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 20,
            borderRadius: 10,
            height: 40,
            marginTop: 20,
          }}
          onPress={handleSubmit}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            save
          </Text>
        </TouchableOpacity>
      </View>

      {showActivityIndicator ? (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            height: HEIGHT / 2,
          }}
        >
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    paddingTop: 20,
    width: WIDTH,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 40,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: APP_GREEN_COLOR,
  },
  screen_title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  signup_form: {
    width: WIDTH - 30,
    height: HEIGHT * 0.7,
  },
  field: {
    marginBottom: HEIGHT * 0.05,
  },
  label: {
    color: "grey",
    fontSize: 18,
  },
  input_field: {
    height: HEIGHT * 0.05,
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
    fontSize: 20,
    marginBottom: 25,
  },
  xx: {
    marginTop: HEIGHT * 0.05,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn_signin: {
    backgroundColor: APP_GREEN_COLOR,
    height: 50,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  signup_text: {
    color: "#fff",
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default UserScreen;
