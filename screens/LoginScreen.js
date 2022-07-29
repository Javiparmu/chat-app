import { StyleSheet, View, Text, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Image } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { KeyboardAvoidingView } from 'react-native'
import { auth } from '../firebase'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                navigation.replace('Home')
            }
        })

        return unsubscribe
    }, [])

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .catch(error => {
                alert(error.message)
            })
    }

  return (
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : undefined} style={styles.container}>
        <StatusBar style="light" />
        <Image 
            source={{
                uri:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Circle-icons-chat.svg/2048px-Circle-icons-chat.svg.png",
            }}
            style={{ width: 120, height: 120, marginBottom: 20}} />
        <View style={styles.inputContainer}>
            <Input 
                placeholder="Email" 
                autoFocus 
                type="email" 
                value={email} 
                onChangeText={text => setEmail(text)}
            />
            <Input 
                placeholder="Password" 
                secureTextEntry 
                type="password"
                value={password} 
                onChangeText={text => setPassword(text)}
                onSubmitEditing={signIn}
            />
        </View>

        <Button containerStyle={styles.button} onPress={signIn} title="Login" />
        <Button onPress={() => navigation.navigate("Register")} containerStyle={styles.button} type="outline" title="Register" />
        {
            Platform.OS == 'ios'
                ? <View style={{height: 100}} />
                : null
        }
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
})