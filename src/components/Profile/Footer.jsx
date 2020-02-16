import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

export default function Footer(props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.buttonFlex}>
        <Icon name='home' reverse color='#f50' />
        <Icon name='account-box' reverse color='#f50' />
        <Icon name='settings' reverse color='#f50' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
  buttonFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
})
