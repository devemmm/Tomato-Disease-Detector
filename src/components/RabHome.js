import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Modal,
  Image,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native'
import {
  APP_GREEN_COLOR,
  HEIGHT,
  WIDTH,
  normalTomatoes,
  affectedTomatoes,
} from '../contansts/constants'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { Context as DataContext } from '../context/AppContext'
import appApi from "../api/apApi"

const RabHome = ({ navigation }) => {
  const [image, setImage] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalUserVisible, setModalUserVisible ] = useState(false)
  const [showActivityIndicator, setshowActivityIndicator] = useState(false)
  const { state, viewReportedDisease } = useContext(DataContext)
  const { user } = state
  const [phone, setPhone ] = useState('')

  useEffect(() => {
    viewReportedDisease({ token: user.token, Alert, setshowActivityIndicator })
    ;(async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!')
        }
      }
    })()
  }, [])

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const captchImage = async () => {
    setImage(null)
    let result = await ImagePicker.launchCameraAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      // aspect: [4, 3],
      // quality: 1
    })

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }


  // const handleChangeUserType = ({type})=>{
  //   try{

  //     if(!phone){
  //       throw new Error('user phone number must be required')
  //     }

  //     if(phone.length < 10 || phone.length > 10){
  //       throw new Error("user phone number should be 10 in length")
  //     }

  //     fetch(`${appApi}/users/profile?type=userType`, {
  //       method: 'PATCH',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //       body: JSON.stringify({
  //         phone: '0788596281',
  //         userType: 'admin'
  //       })
  //       .then((response)=> response.json())
  //       .then((res)=>{
  //         setshowActivityIndicator(false)
  //         if(res.error){
  //           return Alert.alert('error', res.error.message)
  //         }
          
  //         Alert.alert('successfull', res.message)
  //         setModalUserVisible(!modalUserVisible)
  //       })    
  //       .catch((error)=>{
  //         setshowActivityIndicator(false)
  //         Alert.alert('error', 'check your network connection')
  //       }) 
  //     })
  //   }catch(error){
  //     Alert.alert('error', error.message)
  //   }
  // }


  const handleChangeUserType = ({type})=>{
    try {
      if(!phone){
        throw new Error('user phone number must be required')
      }

      if(phone.length < 10 || phone.length > 10){
        throw new Error("user phone number should be 10 in length")
      }

      setshowActivityIndicator(true)
      fetch(`${appApi}/users/profile?type=userType`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          phone,
          userType: type
        })
      })
        .then((response)=> response.json())
        .then((res)=>{
          setshowActivityIndicator(false)
          if(res.error){
            setModalUserVisible(!modalUserVisible)
            return Alert.alert('error',`${res.error.message}`)
          }

          setPhone('');
          setModalUserVisible(!modalUserVisible)
          Alert.alert('successfull','user account modified successfull')
        })    
        .catch((error)=>{
          setshowActivityIndicator(false)
          Alert.alert('error', 'check your network connection')
        })  
    } catch (error) {
      Alert.alert('error', error.message)
    }
  }

  return (
    <View>
      <View style={styles.main_container}>
        <View style={styles.image_cover}>
          <FlatList
            data={normalTomatoes}
            keyExtractor={(tomato) => tomato.url}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <Image style={styles.image} source={{ uri: item.url }} />
                  <View style={styles.description_card}>
                    <Text>{item.title}</Text>
                    <Text>{item.description}</Text>
                  </View>
                </View>
              )
            }}
          />
        </View>
        <View style={{ flex: 1 }} />

        <View style={styles.image_cover}>
          <FlatList
            data={affectedTomatoes}
            keyExtractor={(tomato) => tomato.url}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <Image style={styles.image} source={{ uri: item.url }} />
                  <View style={styles.description_card}>
                    <Text>{item.title}</Text>
                    <Text>{item.description}</Text>
                  </View>
                </View>
              )
            }}
          />
        </View>

        <View
          style={{
            height: 100,
            width: WIDTH,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'pink',
              height: 50,
              width: 120,
              borderRadius: 10,
            }}
          >
            <Ionicons name='document' style={styles.add_icon} />
            <Text
              style={{
                color: 'red',
                textTransform: 'capitalize',
                fontSize: 20,
              }}
            >
              report
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=> setModalUserVisible(true)}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'pink',
              height: 50,
              width: 120,
              borderRadius: 10,
            }}
          >
            <AntDesign name='team' style={styles.add_icon} />
            <Text
              style={{
                color: 'red',
                textTransform: 'capitalize',
                fontSize: 20,
                marginLeft: 5,
              }}
            >
              Users
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ height: 200, width: '100%' }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible)
                  navigation.navigate('Report', { type: 'farmer' })
                }}
                style={styles.modelRepportBtn}
              >
                <Text style={styles.modelReportBtnText}>Farmer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible)
                  navigation.navigate('Report', { type: 'sector' })
                }}
                style={styles.modelRepportBtn}
              >
                <Text style={styles.modelReportBtnText}>Sector</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible)
                  navigation.navigate('Report', { type: 'district' })
                }}
                style={styles.modelRepportBtn}
              >
                <Text style={styles.modelReportBtnText}>District</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalUserVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          setModalUserVisible(!modalUserVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ height: 200, width: '100%' }}>
              <Text style={{fontSize: 15, fontWeight: 'bold', textAlign: 'center', textTransform: 'capitalize', marginBottom: 10}}>update user account here</Text>
              <TextInput
                style = {{
                  borderColor: 'grey',
                  borderWidth: 1,
                  paddingVertical: 10,
                  borderRadius: 10,
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: 'bold'
                }}
                placeholder="phone number"
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='number-pad'
                maxLength={10}
                value={phone}
                onChangeText={(value)=> setPhone(value)}
              />

              <View>
                {
                  showActivityIndicator ? <ActivityIndicator size='small' color='red' /> : null
                }
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 40
                  }}>
                  <TouchableOpacity 
                    onPress={()=> handleChangeUserType({type: 'farmer'})}
                    style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Farmer</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    onPress={()=> handleChangeUserType({type: 'sector'})}
                    style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Sector</Text>
                  </TouchableOpacity>
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 20
                  }}>
                  <TouchableOpacity 
                    onPress={()=> handleChangeUserType({type: 'district'})}
                    style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>District</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    onPress={()=> handleChangeUserType({type: 'rab'})}
                    style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Rab</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  main_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image_container: {
    backgroundColor: '#dadfe6',
    marginBottom: 10,
  },
  image_cover: {
    height: HEIGHT * 0.32,
    width: WIDTH - 20,
    marginTop: 10,
    borderRadius: 10,
  },
  image: {
    width: WIDTH - 20,
    height: HEIGHT * 0.25,
    resizeMode: 'stretch',
    borderRadius: 5,
    marginRight: 20,
  },
  description_card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_add_card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  add_icon: {
    fontSize: 25,
    color: APP_GREEN_COLOR,
  },
  button_section: {
    width: '90%',
    height: HEIGHT * 0.17,
    alignItems: 'center',
    marginTop: HEIGHT * 0.05,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: HEIGHT * 0.2,
  },
  modelRepportBtn: {
    backgroundColor: 'pink',
    height: 50,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modelReportBtnText: {
    fontSize: 25,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 20,
    height: 30,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonClose: {
    backgroundColor: APP_GREEN_COLOR,
    height: 40,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  TextInputStyleClass: {
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#FFFFFF',
    height: HEIGHT * 0.3,
    width: '100%',
    marginBottom: HEIGHT * 0.03,
  },
  actionButton: {
    backgroundColor: 'red',
    width: '40%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  actionButtonText:{
    fontSize: 18, 
    fontWeight: 'bold'
  }
})

export default RabHome
