import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import appApi from "../api/apApi";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "add_token":
      return { ...state, token: action.payload };

    case "signin":
      return { ...state, user: action.payload };

    case "reset_context":
      return { ...state, user: {}, disease: [] };

    case "add_disease":
      return { ...state, disease: action.payload };

    case "update_disease":
      const existingDisease = state.disease;
      const remainsDisease = existingDisease.filter(
        (dis) => dis._id !== action.payload
      );
      return { ...state, disease: remainsDisease };

    case "add_selected_user":
      return { ...state, selectedUser: action.payload };

    case "reset_selected_user":
      return { ...state, selectedUser: {} };
    default:
      return state;
  }
};

const signin =
  (dispatch) =>
  async ({ phone, password, Alert, setActivityIndictor, navigation }) => {
    try {
      setActivityIndictor(true);
      fetch(`${appApi}/users/signin`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          password,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          const { user } = res;

          if (res.error) {
            setActivityIndictor(false);
            Alert.alert("error", res.error.message);
          } else {
            AsyncStorage.setItem("@TOMATO", JSON.stringify(user));
            dispatch({ type: "signin", payload: user });
            navigation.navigate("MainFlow");
          }
        })
        .catch((error) => {
          setActivityIndictor(false);
          Alert.alert("error", "check your network connection");
        });
    } catch (error) {
      setActivityIndictor(false);
      Alert.alert("error", `something went wrong ${error.message}`);
    }
  };

const signup =
  (dispatch) =>
  ({ person, location, Alert, setActivityIndictor, navigation }) => {
    try {
      setActivityIndictor(true);
      fetch(`${appApi}/users/signup`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...person,
          location,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          const { message, user, status, statusCode } = res;
          if (res.error) {
            setActivityIndictor(false);
            Alert.alert("error", res.error.message);
          } else {
            dispatch({ type: "add_token", payload: user.token });

            Alert.alert(
              "successfull",
              `${message}, now you can login with you phone number and password`
            );
          }
          navigation.navigate("Signin");
        })
        .catch((error) => {
          setActivityIndictor(false);
          Alert.alert("error", "check your network connection");
        });
    } catch (error) {
      setActivityIndictor(false);
      Alert.alert("error", `something went wrong ${error.message}`);
    }
  };

const tryLocalSignin =
  (dispatch) =>
  async ({ navigation }) => {
    dispatch({ type: "reset_context" });
    const data = await AsyncStorage.getItem("@TOMATO");
    const user = JSON.parse(data);

    if (data) {
      dispatch({ type: "signin", payload: user });

      navigation.navigate("MainFlow");
    } else {
      navigation.navigate("Signin");
    }
  };

const signout =
  (dispatch) =>
  async ({ token, navigation, setshowActivityIndicator }) => {
    try {
      setshowActivityIndicator(true);
      await AsyncStorage.removeItem("@TOMATO");
      // dispatch({ type: 'reset_context' })
      setshowActivityIndicator(false);
      navigation.navigate("Signin");
    } catch (error) {
      setshowActivityIndicator(false);
      console.log(error.message);
    }
  };

const viewReportedDisease =
  (dispatch) =>
  async ({ token, Alert, setshowActivityIndicator }) => {
    try {
      setshowActivityIndicator(true);
      fetch(`${appApi}/users/tomato/disease`, {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          const { disease } = res;

          if (res.error) {
            setshowActivityIndicator(false);
            Alert.alert("error", res.error.message);
          } else {
            setshowActivityIndicator(false);
            dispatch({ type: "add_disease", payload: disease });
          }
        })
        .catch((error) => {
          setshowActivityIndicator(false);
          Alert.alert("error", "check your network connection");
        });
    } catch (error) {
      setshowActivityIndicator(false);
      console.log(error.message);
    }
  };

const aproveReport =
  (dispatch) =>
  async ({ token, comments, reportId, Alert, setshowActivityIndicator }) => {
    try {
      setshowActivityIndicator(true);
      fetch(`${appApi}/users/tomato/disease/approve/${reportId}`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          canSolve: true,
          comments,
          admitted: true,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.error) {
            setshowActivityIndicator(false);
            Alert.alert("error", res.error.message);
          } else {
            setshowActivityIndicator(false);
            dispatch({ type: "update_disease", payload: reportId });
          }
        })
        .catch((error) => {
          setshowActivityIndicator(false);
          Alert.alert("error", "check your network connection");
        });
    } catch (error) {
      setshowActivityIndicator(false);
      console.log(error.message);
    }
  };

const setSelectedUser = (dispatch) => async (user) =>
  dispatch({ type: "add_selected_user", payload: user });

const resetSelectedUser = (dispatch) => async (user) =>
  dispatch({ type: "reset_selected_user" });

export const { Context, Provider } = createDataContext(
  AuthReducer,
  {
    signin,
    signup,
    tryLocalSignin,
    signout,
    viewReportedDisease,
    aproveReport,
    setSelectedUser,
    resetSelectedUser,
  },
  { user: {}, disease: [], selectedUser: {} }
);
