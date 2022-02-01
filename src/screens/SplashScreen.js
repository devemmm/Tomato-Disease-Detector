import React, { useState, useEffect, useContext } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { HEIGHT, WIDTH } from '../contansts/constants'
import { Context as DataContext } from '../context/AppContext'

const SplashScreen = ({ navigation }) => {
  const [showActivityIndictor, setShowActivityIndicator] = useState(true)
  const { tryLocalSignin } = useContext(DataContext)

  useEffect(() => {
    tryLocalSignin({ navigation })
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: '#ff' }}>
      {showActivityIndictor ? (
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

export default SplashScreen
