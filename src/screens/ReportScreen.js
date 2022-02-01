import React, { useState, useEffect, useReducer } from "react";
import { View, Text, ScrollView, StyleSheet, FlatList } from "react-native";
import { APP_GREEN_COLOR, WIDTH } from "../contansts/constants";
import { disease } from "../api/api";

const ReportScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View
        style={{
          height: 100,
          width: WIDTH,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          marginTop: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "red",
            height: 80,
            width: "40%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          }}
        >
          <Text style={{ fontWeight: "bold", marginBottom: 10, fontSize: 16 }}>
            Admited Repport
          </Text>
          <Text style={{ fontSize: 20 }}>5 / 190</Text>
        </View>
        <View
          style={{
            backgroundColor: "red",
            height: 80,
            width: "40%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          }}
        >
          <Text style={{ fontWeight: "bold", marginBottom: 10, fontSize: 16 }}>
            unAdmited Repport
          </Text>
          <Text style={{ fontSize: 20 }}>5 / 190</Text>
        </View>
      </View>

      {/* <View style={{ flex: 1, width: "85%", marginTop: 20 }}>
        <View
          style={{
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text style={styles.famerLabel}>Famer</Text>
            <Text style={styles.famerValue}>Emmanuel RUKUNDO</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.famerLabel}>Plant:</Text>
            <Text style={styles.famerValue}>Tomato</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.famerLabel}>Location:</Text>
            <Text style={styles.famerValue}>Gasabo, Kimironko</Text>
          </View>
        </View>

        <View
          style={{
            height: 120,
            width: "100%",
            backgroundColor: "pink",
            marginTop: 10,
            borderRadius: 5,
            paddingVertical: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 5,
            }}
          >
            <Text
              style={{ color: APP_GREEN_COLOR, fontSize: 17, marginRight: 10 }}
            >
              Disease
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 17,
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              DISEASE EXAMPLE
            </Text>
          </View>

          <Text style={{ marginHorizontal: 10, fontSize: 16 }}>
            kbger,kgb.tn.rkbkeghghwmvfkurjbglerkbnuilerkdngluriekdjnbtguilerknglrieukbngreuilgbriulkdbgreiulkgbuilekjgbilrjgbklrkjbgrlibgrilbgeruil
          </Text>
        </View>
      </View> */}

      <FlatList
        data={disease}
        keyExtractor={(disease) => disease.createdAt}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View style={{ flex: 1, width: "90%", marginTop: 20 }}>
              <View
                style={{
                  width: "100%",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Text style={styles.famerLabel}>Famer</Text>
                  <Text style={styles.famerValue}>Emmanuel RUKUNDO</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.famerLabel}>Plant:</Text>
                  <Text style={styles.famerValue}>Tomato</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.famerLabel}>Location:</Text>
                  <Text style={styles.famerValue}>Gasabo, Kimironko</Text>
                </View>
              </View>

              <View
                style={{
                  height: 120,
                  width: WIDTH - 40,
                  backgroundColor: "pink",
                  marginTop: 10,
                  borderRadius: 5,
                  paddingVertical: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      color: APP_GREEN_COLOR,
                      fontSize: 17,
                      marginRight: 10,
                    }}
                  >
                    Disease
                  </Text>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 17,
                      textTransform: "uppercase",
                      fontWeight: "bold",
                    }}
                  >
                    DISEASE EXAMPLE
                  </Text>
                </View>

                <Text style={{ marginHorizontal: 10, fontSize: 16 }}>
                  kbger,kgb.tn.rkbkeghghwmvfkurjbglerkbnuilerkdngluriekdjnbtguilerknglrieukbngreuilgbriulkdbgreiulkgbuilekjgbilrjgbklrkjbgrlibgrilbgeruil
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  famerLabel: {
    color: APP_GREEN_COLOR,
    marginRight: 10,
    fontSize: 16,
  },
  famerValue: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ReportScreen;
