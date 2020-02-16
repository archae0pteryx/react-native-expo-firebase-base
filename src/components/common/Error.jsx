import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Overlay } from 'react-native-elements'

function ErrorPop ({ isVisible, message, setVisible }) {
  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={() => setVisible(false)}
      overlayBackgroundColor='red'
      width='auto'
      height='auto'
    >
      <View style={styles.container}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    textAlign: 'center'
  }
})

export default ErrorPop
