import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ListItem, Avatar } from 'react-native-elements'
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'

const CustomListItem = ({ id, chatName, enterChat }) => {
    const [chatMessages, setChatMessages] = useState([])

    useEffect(() => {
        const queryCollection = query(collection(doc(collection(db, 'chats'), id), 'messages'), orderBy('timestamp', 'asc'))

        const unsubscribe = onSnapshot(queryCollection, (snapshot) => {
            setChatMessages(snapshot.docs.map(doc => 
              doc.data()
            ))
        })

        return unsubscribe
    })

  return (
    <ListItem key={id} onPress={() => enterChat(id, chatName)} bottomDivider>
        <Avatar 
            rounded
            source={{
                uri: chatMessages?.[chatMessages.length - 1]?.photoURL ||
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Circle-icons-chat.svg/2048px-Circle-icons-chat.svg.png' 
            }} 
        />
        <ListItem.Content>
            <ListItem.Title style={{ fontWeight: "800" }}>
                {chatName}
            </ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                {chatMessages?.[chatMessages.length - 1]?.displayName}: {chatMessages?.[chatMessages.length - 1]?.message}
            </ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})