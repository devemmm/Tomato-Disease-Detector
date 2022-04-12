import React, { useState, useContext } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { APP_GREEN_COLOR, HEIGHT, WIDTH } from '../contansts/constants'
import apApi from '../api/apApi'
import { Context as DataContext } from '../context/AppContext'
import { normal } from "../libs/constants"

const ResultScreen = ({ navigation, route, disease }) => {
  const { report } = route.params
  const [showActivityIndicator, setshowActivityIndicator] = useState(false)
  const { state } = useContext(DataContext)
  const { user } = state

  const handleAskExpert = ({}) => {
    try {
      setshowActivityIndicator(true)
      fetch(`${apApi}/users/askexpart`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(report.disease)
      })
        .then((response) => response.json())
        .then((res) => {
          setshowActivityIndicator(false)
          if (res.error) {            
            Alert.alert('error', res.error.message)
          } else {
            const { report } = res
            Alert.alert(
              'System Message',
              'Your report to the Agronomist expert is well recieved, you should consult your nearest agriculture clinic for the advise.',
              [
                {
                  text: 'oK',
                  style: 'cancel',
                },
              ]
            )

            navigation.goBack()
          }
        })
        .catch(() => {
          setshowActivityIndicator(false)
          setshowActivityIndicator(false)
          Alert.alert('error', 'check your network connection')
        })
    } catch (error) {
      console.log(error.message)
      setshowActivityIndicator(false)
      Alert.alert('error', 'Something went wrong please reflesh your app')
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/search_result.png')}
        style={styles.icon_result}
      />
      <Text
        style={{ fontSize: 18, fontWeight: 'bold', color: APP_GREEN_COLOR }}
      >
        Identified
      </Text>
      <Text style={styles.disease_result}>{report.disease.name}</Text>
      <View style={styles.disease_desciption}>
        <Text style = {{fontWeight: 'bold', fontSize: 20, textAlign: 'center', borderBottomColor: 'grey', borderBottomWidth: 0.5, paddingBottom: 10}}> Description</Text>
        <Text style={styles.disease_desciption_text}>
          {report.disease.description}
        </Text>
      </View>

      <View style={[styles.btn_group, { justifyContent:  report.disease.name === normal.name ? 'center' : 'space-between'}]}>
        <TouchableOpacity
          style={styles.btn_ok}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.btn_ok_text}>okey</Text>
        </TouchableOpacity>

        {
          report.disease.name === normal.name ? null :
          (
            <TouchableOpacity
              style={[styles.btn_ask_export]}
              onPress={handleAskExpert}
            >
              <Text style={[styles.btn_ok_text, { color: APP_GREEN_COLOR }]}>
                Ask expert
              </Text>
            </TouchableOpacity>
          )
        }
        
      </View>

      {showActivityIndicator ? (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            height: HEIGHT / 2.5,
          }}
        >
          <ActivityIndicator size='large' color='green' />
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon_result: {
    height: 100,
    width: 100,
    marginBottom: 40,
  },
  disease_result: {
    fontSize: 30,
    fontWeight: 'bold',
    color: APP_GREEN_COLOR,
    marginVertical: HEIGHT * 0.05,
    textAlign: 'center'
  },
  disease_desciption: {
    width: WIDTH - 60,
  },
  disease_desciption_text: {
    paddingTop: 10,
    fontSize: 18,
  },
  btn_group: {
    flexDirection: 'row',
    alignItems: 'center',
    width: WIDTH - 40,
    justifyContent: 'space-between',
    marginTop: HEIGHT * 0.1,
  },
  btn_ok: {
    backgroundColor: APP_GREEN_COLOR,
    height: 50,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btn_ok_text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
  },
  btn_ask_export: {
    borderRadius: APP_GREEN_COLOR,
    borderWidth: 2,
    height: 50,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
})

export default ResultScreen
