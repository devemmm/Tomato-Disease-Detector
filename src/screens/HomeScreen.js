import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { APP_GREEN_COLOR } from "../contansts/constants";
import AdHome from "../components/AdHome";
import FarmerHome from "../components/FarmerHome";
import RabHome from "../components/RabHome";
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor={APP_GREEN_COLOR} />
      {/* <AdHome navigation={navigation} /> */}
      {/* <FarmerHome navigation={navigation} /> */}
      <RabHome navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default HomeScreen;
