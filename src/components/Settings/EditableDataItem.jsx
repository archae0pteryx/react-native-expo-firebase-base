import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'

import { BasicText, BasicInput, LittleButton } from '../common'

export default function EditableDataItem(props) {
  const [edit, setEdit] = useState(false)
  const [value, setValue] = useState(props.v.toString())
  const handleSavePress = () => {
    setEdit(false)
    props.handleSave(props.k, value)
  }
  let contentType
  switch (props.k) {
    case 'email':
      contentType = 'email'
    case 'location':
      contentType = 'location'
    case 'phone':
      contentType = 'telephoneNumber'
    default:
      contentType = 'none'
  }
  return (
    <View style={styles.container}>
      {edit ? (
        <>
          <TextInput
            style={styles.input}
            textContentType={contentType}
            onChangeText={setValue}
            value={value}
          />
          <LittleButton title='save' onPress={handleSavePress} />
        </>
      ) : (
        <>
          <Text style={styles.text}>{props.v}</Text>
          <LittleButton title='edit' onPress={setEdit} />
        </>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    margin: 5,
    padding: 5,
  },
  input: {
    backgroundColor: 'cornsilk',
    margin: 5,
    padding: 5,
    color: 'coral',
  },
})
