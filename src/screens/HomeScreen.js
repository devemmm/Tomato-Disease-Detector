import React, { useContext } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import { APP_GREEN_COLOR } from '../contansts/constants'
import AdHome from '../components/AdHome'
import FarmerHome from '../components/FarmerHome'
import RabHome from '../components/RabHome'
import { Context as DataContext } from '../context/AppContext'

const HomeScreen = ({ navigation }) => {
  const { state } = useContext(DataContext)
  const { user } = state

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor={APP_GREEN_COLOR} />

      {user.userType === 'farmer' ? (
        <FarmerHome navigation={navigation} />
      ) : user.userType === 'sector' || user.userType === 'district' ? (
        <AdHome navigation={navigation} />
      ) : user.userType === 'rab' ? (
        <RabHome navigation={navigation} />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
})

export default HomeScreen
