import React, { useState, useContext, useEffect, useReducer } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { APP_GREEN_COLOR, WIDTH } from '../contansts/constants'
import { Context as DataContext } from '../context/AppContext'

const ReportScreen = ({ route }) => {
  const { state } = useContext(DataContext)
  const [disease, setDisease] = useState(state.disease)
  const [farmer, setFarmer] = useState({ admited: [], unAdmited: [] })
  const [sector, setSector] = useState({ admited: [], unAdmited: [] })
  const [district, setDistrict] = useState({ admited: [], unAdmited: [] })

  const filterReport = ({ type }) => {
    let unresolvedDisease = []
    let resolvedDisease = []
    let filteredReport = []

    switch (type) {
      case 'farmer':
        unresolvedDisease = disease.filter(
          (dis) => dis.observation.sector.admitted === false
        )
        resolvedDisease = disease.filter(
          (dis) => dis.observation.sector.admitted === true
        )

        setFarmer((prev) => {
          return {
            ...prev,
            unAdmited: unresolvedDisease,
            admited: resolvedDisease,
          }
        })
        break

      case 'sector':
        unresolvedDisease = disease.filter(
          (dis) => dis.observation.sector.admitted === false
        )
        resolvedDisease = disease.filter(
          (dis) => dis.observation.sector.admitted === true
        )

        setSector((prev) => {
          return {
            ...prev,
            unAdmited: unresolvedDisease,
            admited: resolvedDisease,
          }
        })

        break

      case 'district':
        unresolvedDisease = disease.filter(
          (dis) => dis.observation.district.admitted === false
        )
        resolvedDisease = disease.filter(
          (dis) => dis.observation.district.admitted === true
        )

        filteredReport = disease.filter(
          (dis) => dis.observation.sector.admitted === true
        )

        setDistrict((prev) => {
          return {
            ...prev,
            unAdmited: unresolvedDisease,
            admited: resolvedDisease,
          }
        })

        setDisease(filteredReport)
        break
      default:
        break
    }
  }

  useEffect(() => {
    filterReport({ type: route.params.type })
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          height: 100,
          width: WIDTH,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          marginTop: 20,
        }}
      >
        <View
          style={{
            backgroundColor: 'red',
            height: 80,
            width: '40%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}
        >
          <Text style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 16 }}>
            Admited Repport
          </Text>
          {route.params.type === 'farmer' ? (
            <Text style={{ fontSize: 20 }}>
              {farmer.admited.length}/{' '}
              {farmer.admited.length + farmer.unAdmited.length}
            </Text>
          ) : route.params.type === 'sector' ? (
            <Text style={{ fontSize: 20 }}>
              {sector.admited.length}/{' '}
              {sector.admited.length + sector.unAdmited.length}
            </Text>
          ) : route.params.type === 'district' ? (
            <Text style={{ fontSize: 20 }}>
              {district.admited.length} /{' '}
              {district.admited.length + district.unAdmited.length}
            </Text>
          ) : (
            <Text style={{ fontSize: 20 }}>0 / 0</Text>
          )}
        </View>
        <View
          style={{
            backgroundColor: 'red',
            height: 80,
            width: '40%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}
        >
          <Text style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 16 }}>
            unAdmited Repport
          </Text>
          {route.params.type === 'farmer' ? (
            <Text style={{ fontSize: 20 }}>
              {farmer.unAdmited.length} /{' '}
              {farmer.admited.length + farmer.unAdmited.length}
            </Text>
          ) : route.params.type === 'sector' ? (
            <Text style={{ fontSize: 20 }}>
              {sector.unAdmited.length}/{' '}
              {sector.admited.length + sector.unAdmited.length}
            </Text>
          ) : route.params.type === 'district' ? (
            <Text style={{ fontSize: 20 }}>
              {district.unAdmited.length} /{' '}
              {district.admited.length + district.unAdmited.length}
            </Text>
          ) : (
            <Text style={{ fontSize: 20 }}>0 / 0</Text>
          )}
        </View>
      </View>

      <FlatList
        data={disease}
        keyExtractor={(disease) => disease._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View style={{ flex: 1, width: '90%', marginTop: 20 }}>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Text style={styles.famerLabel}>Famer</Text>
                  <Text style={styles.famerValue}>
                    {item.farmer.fname} {item.farmer.lname}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.famerLabel}>Plant:</Text>
                  <Text style={styles.famerValue}>Tomato</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.famerLabel}>Location:</Text>
                  <Text style={styles.famerValue}>
                    {item.location.district}, {item.location.sector},
                    {item.location.cell}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.famerLabel}>Admitted:</Text>
                  {(route.params.type === 'farmer' ||
                    route.params.type === 'sector') &&
                  item.observation.sector.admitted === true ? (
                    <Text style={styles.famerValue}>Yes</Text>
                  ) : route.params.type === 'district' &&
                    item.observation.district.admitted === true ? (
                    <Text style={styles.famerValue}>Yes</Text>
                  ) : (
                    <Text style={styles.famerValue}>No</Text>
                  )}
                </View>
              </View>

              <View
                style={{
                  height: 120,
                  width: WIDTH - 40,
                  backgroundColor: 'pink',
                  marginTop: 10,
                  borderRadius: 5,
                  paddingVertical: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
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
                      color: 'black',
                      fontSize: 17,
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                    }}
                  >
                    {item.disease.name}
                  </Text>
                </View>

                <Text style={{ marginHorizontal: 10, fontSize: 16 }}>
                  {item.disease.description}
                </Text>
              </View>
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  famerLabel: {
    color: APP_GREEN_COLOR,
    marginRight: 10,
    fontSize: 16,
  },
  famerValue: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default ReportScreen
