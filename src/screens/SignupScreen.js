import React, { useState, useContext } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native'
import { HEIGHT, WIDTH, APP_GREEN_COLOR } from '../contansts/constants'
import { Context as AuthContext } from '../context/AppContext'

const SignupScreen = ({ navigation }) => {
  const [person, setPerson] = useState({
    gender: 'male',
    fname: '',
    lname: '',
    email: '',
    phone: '',
    password: '',
    password2: '',
  })
  const [location, setLocation] = useState({
    country: 'Rwanda',
    province: '',
    district: '',
    sector: '',
    cell: '',
  })

  const [showActivityIndicator, setActivityIndictor] = useState(false)
  const { state, signup } = useContext(AuthContext)

  const handleSignup = () => {
    const { fname, lname, email, phone, password, password2 } = person
    const { country, province, district, sector, cell } = location
    if (
      !fname ||
      !lname ||
      !email ||
      !phone ||
      !password ||
      !password2 ||
      !country ||
      !province ||
      !district ||
      !sector ||
      !cell
    ) {
      Alert.alert(
        'error',
        'mising some required values please chech out your inputs'
      )
      return 'stop'
    } else if (password.length < 6) {
      Alert.alert('error', 'password length should be greather than 6')
      return 'stop'
    } else if (person.password !== person.password2) {
      Alert.alert('error', 'Password does not match')
      return 'stop'
    } else {
      return 'continue'
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>tomato</Text>
        <Text style={styles.screen_title}>Create new Account</Text>
      </View>
      <View style={styles.signup_form}>
        <ScrollView>
          <View>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input_field}
              autoCorrect={false}
              autoCapitalize='none'
              value={person.fname}
              onChangeText={(input) => {
                setPerson({ ...person, fname: input })
              }}
            />
          </View>
          <View>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input_field}
              autoCorrect={false}
              autoCapitalize='none'
              value={person.lname}
              onChangeText={(input) => {
                setPerson({ ...person, lname: input })
              }}
            />
          </View>
          <View>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input_field}
              autoCorrect={false}
              autoCapitalize='none'
              keyboardType='number-pad'
              maxLength={10}
              value={person.phone}
              onChangeText={(input) => {
                setPerson({ ...person, phone: input })
              }}
            />
          </View>
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input_field}
              autoCorrect={false}
              autoCapitalize='none'
              value={person.email}
              onChangeText={(input) => {
                setPerson({ ...person, email: input })
              }}
            />
          </View>

          <View>
            <Text style={styles.label}>Province</Text>
            <TextInput
              style={styles.input_field}
              autoCorrect={false}
              autoCapitalize='none'
              value={location.province}
              onChangeText={(input) => {
                setLocation({ ...location, province: input })
              }}
            />
          </View>

          <View>
            <Text style={styles.label}>District</Text>
            <TextInput
              style={styles.input_field}
              autoCorrect={false}
              autoCapitalize='none'
              value={location.district}
              onChangeText={(input) => {
                setLocation({ ...location, district: input })
              }}
            />
          </View>

          <View>
            <Text style={styles.label}>Sector</Text>
            <TextInput
              style={styles.input_field}
              autoCorrect={false}
              autoCapitalize='none'
              value={location.sector}
              onChangeText={(input) => {
                setLocation({ ...location, sector: input })
              }}
            />
          </View>

          <View>
            <Text style={styles.label}>Cell</Text>
            <TextInput
              style={styles.input_field}
              autoCorrect={false}
              autoCapitalize='none'
              value={location.cell}
              onChangeText={(input) => {
                setLocation({ ...location, cell: input })
              }}
            />
          </View>

          <View>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input_field}
              autoCorrect={false}
              autoCapitalize='none'
              secureTextEntry
              value={person.password}
              onChangeText={(input) => {
                setPerson({ ...person, password: input })
              }}
            />
          </View>
          <View>
            <Text style={styles.label}>Confirm - Password</Text>
            <TextInput
              style={styles.input_field}
              autoCorrect={false}
              autoCapitalize='none'
              secureTextEntry
              value={person.password2}
              onChangeText={(input) => {
                setPerson({ ...person, password2: input })
              }}
            />
          </View>
        </ScrollView>

        <View style={styles.xx}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ fontSize: 18, color: APP_GREEN_COLOR }}>
              Login insted
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn_signin}
            onPress={() => {
              if (handleSignup() === 'continue') {
                signup({
                  person,
                  location,
                  Alert,
                  setActivityIndictor,
                  navigation,
                })
              }
            }}
          >
            <Text style={styles.signup_text}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showActivityIndicator ? (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            height: HEIGHT / 2,
          }}
        >
          <ActivityIndicator size='large' color='red' />
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    paddingTop: 20,
    width: WIDTH,
    height: HEIGHT * 0.25,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: APP_GREEN_COLOR,
  },
  screen_title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  signup_form: {
    width: WIDTH - 30,
    height: HEIGHT * 0.7,
  },
  field: {
    marginBottom: HEIGHT * 0.05,
  },
  label: {
    color: 'grey',
    fontSize: 18,
  },
  input_field: {
    height: HEIGHT * 0.05,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    fontSize: 20,
    marginBottom: 25,
  },
  xx: {
    marginTop: HEIGHT * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn_signin: {
    backgroundColor: APP_GREEN_COLOR,
    height: 50,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  signup_text: {
    color: '#fff',
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
})

export default SignupScreen
