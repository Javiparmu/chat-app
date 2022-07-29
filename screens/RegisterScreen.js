import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Input, Text } from 'react-native-elements'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'Back to Login',
        })
    }, [navigation])

    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(authUser => {
                const user = authUser.user
                updateProfile(user, {
                    displayName: name,
                    photoURL: imageUrl || 'https://freesvg.org/img/abstract-user-flat-4.png',
                })
            })
            .catch(error => {
                console.log(error)
            })
            .catch(error => {
                alert(error.message)
            })
    }

  return (
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : undefined} style={styles.container}>
        <StatusBar style='light' />
        <Text h3 style={{marginBottom: 30}}>
            Create a Signal account
        </Text>

        <View style={styles.inputContainer}>
            <Input 
                placeholder="Full Name"
                autoFocus
                type="text"
                value={name}
                onChangeText={text => setName(text)}/>
            <Input
                placeholder="Email"
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
            />
            <Input
                placeholder="Profile Pircture URL (optional)"
                type="text"
                value={imageUrl}
                onChangeText={text => setImageUrl(text)}
                onSubmitEditing={register}
            />
        </View>

        <Button
            raised
            onPress={register}
            title="Register"
            containerStyle={styles.button}
        />
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#fff',
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
})