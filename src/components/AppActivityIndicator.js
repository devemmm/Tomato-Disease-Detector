import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { HEIGHT } from '../contansts/constants'

const AppActivityIndicator = ({ showActivityIndicator }) => {
  return (
    <View style={{ flex: 1 }}>
      {showActivityIndicator === true ? (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            height: HEIGHT / 2.5,
          }}
        >
          <ActivityIndicator size='large' color='red' />
        </View>
      ) : null}
    </View>
  )
}

export default AppActivityIndicator
