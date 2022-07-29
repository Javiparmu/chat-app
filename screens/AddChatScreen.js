import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'

const AddChat = ({ navigation }) => {
    const [input, setInput] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Add a new chat',
            headerBackTitle: 'Chats',
        })
    }, [navigation])

    const createChat = async () => {
        await addDoc(collection(db, 'chats'), {
            chatName: input,
        })
        .then(() => {
            navigation.goBack()
        })
        .catch(error => {
            alert(error.message)
        })
    }

  return (
    <View style={styles.container}>
        <Input 
            placeholder='Enter a chat name' 
            value={input}
            onChangeText={(text) => setInput(text)} 
            onSubmitEditing={createChat}
            leftIcon={
                <Icon name='wechat' type='antdesign' size={24} color='#000' />
            }
        />
        <Button disabled={!input} onPress={createChat} title='Create new Chat' />
    </View>
  )
}

export default AddChat

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 30,
        height: '100%',
    }
})