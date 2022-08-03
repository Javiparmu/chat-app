import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import CustomListItem from '../components/CustomListItem'
import { Avatar } from 'react-native-elements'
import { auth, db } from '../firebase'
import { signOut } from 'firebase/auth'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { collection, onSnapshot } from 'firebase/firestore'

const HomeScreen = ({ navigation }) => {
    const [chats, setChats] = useState([])

    const signOutUser = () => {
        signOut(auth).then(() => {
            navigation.replace('Login')
        }
        ).catch(error => {
            alert(error.message)
        })
    }

    useEffect(() => {
        let unsub

        const fetchChats = async () => {
            unsub = onSnapshot(collection(db, 'chats'), (snapshot) => {
                setChats(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
        }

        fetchChats()
        return unsub
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'ChatApp',
            headerStyle: { backgroundColor: '#fff' },
            headerTitleStyle: { color: '#000' },
            headerLeft: () => (
                <View style={{ marginRight: 10 }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }}></Avatar>
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 10
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AddChat')} activeOpacity={0.5}>
                       <SimpleLineIcons name='pencil' size={24} color='#000'></SimpleLineIcons>
                    </TouchableOpacity>
                </View>
            ),
        })
    }, [navigation])

    const enterChat = (id, chatName) => {
        navigation.navigate('Chat', { 
            id: id,
            chatName: chatName,
        })
    }

  return (
    <SafeAreaView>
        <ScrollView style={styles.container}>
            {chats.map(({id, data: { chatName }}) => (
                <CustomListItem key={id} id={id} enterChat={enterChat} chatName={chatName} />
            ))}
        </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
    }
})