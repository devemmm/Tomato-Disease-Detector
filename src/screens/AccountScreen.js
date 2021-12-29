import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import {
  APP_GREEN_COLOR,
  HEIGHT,
  WIDTH,
  about_us,
} from "../contansts/constants";
import { BottomSheet } from "react-native-btr";
import {
  AntDesign,
  Entypo,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const AccountScreen = ({ navigation }) => {
  const [profile, setProfile] = useState(false);
  const [about, setAbout] = useState(false);
  const [TermPrivacy, setTermPrivacy] = useState(false);
  const [help, setHelp] = useState(false);

  const profile_image =
    "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-image-icon-default-avatar-profile-icon-social-media-user-vector-image-209162840.jpg";
  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor={APP_GREEN_COLOR} />
      <View style={styles.header}>
        <Image source={{ uri: profile_image }} style={styles.profile_picture} />
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>CYIZA Joseph</Text>
          <View
            style={{ backgroundColor: "grey", width: 60, alignItems: "center" }}
          >
            <Text style={{ fontSize: 16 }}>Famer</Text>
          </View>
        </View>
      </View>
      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menu_op}
          onPress={() => setProfile(true)}
        >
          <MaterialCommunityIcons
            name="account-details"
            style={styles.menu_icon}
          />
          <View>
            <Text style={{ fontSize: 16 }}>Profile</Text>
            <Text style={{ color: "grey" }}>Comprete Profile here</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menu_op}
          onPress={() => setTermPrivacy(true)}
        >
          <MaterialIcons name="privacy-tip" style={styles.menu_icon} />
          <View>
            <Text style={{ fontSize: 16 }}>Term & Privacy</Text>
            <Text style={{ color: "grey" }}>ready the term and condition</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menu_op} onPress={() => setHelp(true)}>
          <Entypo name="help" style={styles.menu_icon} />
          <View>
            <Text style={{ fontSize: 16 }}>Help</Text>
            <Text style={{ color: "grey" }}>get support here</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menu_op} onPress={() => setAbout(true)}>
          <AntDesign name="infocirlce" style={styles.menu_icon} />
          <View>
            <Text style={{ fontSize: 16 }}>About Us</Text>
            <Text style={{ color: "grey" }}>Comprete Profile here</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logout_card}
          onPress={() => navigation.navigate("Signin")}
        >
          <View style={styles.logout_btn}>
            <FontAwesome name="sign-out" style={styles.menu_icon} />
            <View>
              <Text style={{ fontSize: 18, color: APP_GREEN_COLOR }}>
                Logout
              </Text>
              <Text style={{ color: "grey" }}>sign out in application</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* profile */}
      <BottomSheet visible={profile}>
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
                onPress={() => setProfile(false)}
                style={{ flex: 0.25, paddingVertical: 5, paddingRight: 10 }}
              >
                <Image
                  source={require("../../assets/arrow-left.png")}
                  style={{ height: 28, width: 28 }}
                />
              </TouchableOpacity>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Update Your Account
              </Text>
            </View>

            <View style={{ marginHorizontal: 15 }}>
              <View>
                <Text style={styles.label}>Names</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input_field}
                />
              </View>
              <View>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="decimal-pad"
                  style={styles.input_field}
                />
              </View>
              <View>
                <Text style={styles.label}>Province</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input_field}
                />
              </View>
              <View>
                <Text style={styles.label}>District</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input_field}
                />
              </View>
              <View>
                <Text style={styles.label}>Sector</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input_field}
                />
              </View>
              <View>
                <Text style={styles.label}>Village</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input_field}
                />
              </View>
              <View>
                <Text style={styles.label}>Cell</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input_field}
                />
              </View>
              <View>
                <Text style={styles.label}>Names</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input_field}
                />
              </View>
              <View style={{ alignItems: "center", marginTop: HEIGHT * 0.05 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: APP_GREEN_COLOR,
                    width: 80,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                  onPress={() => setProfile(false)}
                >
                  <Text
                    style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}
                  >
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ height: HEIGHT * 0.15 }} />
          </ScrollView>
        </View>
      </BottomSheet>
      {/* End of profile*/}

      {/* Term and Privacy*/}
      <BottomSheet visible={help}>
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
                justifyContent: "space-between",
                paddingHorizontal: 15,
              }}
            >
              <TouchableOpacity
                onPress={() => setHelp(false)}
                style={{ flex: 0.25, paddingVertical: 5, paddingRight: 10 }}
              >
                <Image
                  source={require("../../assets/arrow-left.png")}
                  style={{ height: 28, width: 28 }}
                />
              </TouchableOpacity>
              <View style={{ flex: 0.25 }} />
            </View>
            <View
              style={{
                paddingHorizontal: 15,
                paddingTop: HEIGHT * 0.03,
                paddingBottom: 20,
                width: "80%",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Tomato Disease Detector
              </Text>
            </View>

            <View style={{ marginHorizontal: 15 }}>
              <Text>{about_us}</Text>
            </View>

            <View style={{ height: HEIGHT * 0.15 }} />
          </ScrollView>
        </View>
      </BottomSheet>
      {/* Term and Privacy*/}

      {/* Help Center*/}
      <BottomSheet visible={TermPrivacy}>
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
                justifyContent: "space-between",
                paddingHorizontal: 15,
              }}
            >
              <TouchableOpacity
                onPress={() => setTermPrivacy(false)}
                style={{ flex: 0.25, paddingVertical: 5, paddingRight: 10 }}
              >
                <Image
                  source={require("../../assets/arrow-left.png")}
                  style={{ height: 28, width: 28 }}
                />
              </TouchableOpacity>
              <View style={{ flex: 0.25 }} />
            </View>
            <View
              style={{
                paddingHorizontal: 15,
                paddingTop: HEIGHT * 0.03,
                paddingBottom: 20,
                width: "80%",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Tomato Disease Detector
              </Text>
            </View>

            <View style={{ marginHorizontal: 15 }}>
              <Text>{about_us}</Text>
            </View>

            <View style={{ height: HEIGHT * 0.15 }} />
          </ScrollView>
        </View>
      </BottomSheet>
      {/* End of Help Center*/}

      {/* ABOUT US */}
      <BottomSheet visible={about}>
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
                justifyContent: "space-between",
                paddingHorizontal: 15,
              }}
            >
              <TouchableOpacity
                onPress={() => setAbout(false)}
                style={{ flex: 0.25, paddingVertical: 5, paddingRight: 10 }}
              >
                <Image
                  source={require("../../assets/arrow-left.png")}
                  style={{ height: 28, width: 28 }}
                />
              </TouchableOpacity>
              <View style={{ flex: 0.25 }} />
            </View>
            <View
              style={{
                paddingHorizontal: 15,
                paddingTop: HEIGHT * 0.03,
                paddingBottom: 20,
                width: "80%",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Tomato Disease Detector
              </Text>
            </View>

            <View style={{ marginHorizontal: 15 }}>
              <Text>{about_us}</Text>
            </View>

            <View style={{ height: HEIGHT * 0.15 }} />
          </ScrollView>
        </View>
      </BottomSheet>
      {/* End ABOUT US */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: WIDTH - 40,
    marginTop: HEIGHT * 0.04,
  },
  profile_picture: {
    height: 80,
    width: 80,
    borderRadius: 200,
    marginRight: 15,
    resizeMode: "stretch",
  },
  menu: {
    width: WIDTH - 40,
    marginTop: HEIGHT * 0.03,
    borderTopColor: "grey",
    borderTopWidth: 0.5,
    alignItems: "center",
  },
  menu_op: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 50,
    width: WIDTH - 20,
  },
  menu_icon: {
    fontSize: 20,
    color: APP_GREEN_COLOR,
    marginHorizontal: 20,
  },
  logout_card: {
    borderTopColor: "grey",
    borderTopWidth: 0.5,
    marginTop: HEIGHT * 0.05,
  },
  logout_btn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: HEIGHT * 0.03,
    backgroundColor: "#fff",
    width: WIDTH - 100,
    height: 60,
  },
  label: {
    fontSize: 18,
    color: "grey",
  },
  input_field: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
    fontSize: 16,
    marginBottom: 20,
  },
});

export default AccountScreen;
