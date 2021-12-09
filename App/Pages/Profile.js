import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Image,Text, TextInput, TouchableOpacity, Dimensions} from "react-native"
import { StatusBar } from 'expo-status-bar';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { auth } from '../model/firebase';
import { useNavigation } from '@react-navigation/core';
import { useSelector } from 'react-redux';
import {getActualUser} from "../controler/profileController"

export function Profile() {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const navigation = useNavigation()
    const userId = useSelector(state => state.userRedux.userId)
    
    useEffect(()=>{
        console.log(getUser())
    },[])

    const getUser = () =>{
         let user = getActualUser(userId)
        user.then(users => {
            setEmail(users.data()["email"])
            setName(users.data()["name"])
            setPhoneNumber(users.data()["phoneNumber"])
        }).catch(err => console.log(err))
    }
    

    const logOut = () =>{
        auth.signOut()
        .then(()=>{
            navigation.reset({
                index:0,
                routes: [{name:"login"}]
            })
        })
        .catch(err => alert(err.message))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.subtext}>Aquí puedes ver y modificar la información de tu perfil.</Text>    
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/foto_perfil.jpeg')}/>
                <FontAwesome5 name="camera" color="#FF3131" size={30} iconStyle={{marginRight: 20}}/>
                <StatusBar style="auto"/>
            </View>
            <View style={styles.formContaier}>
                <Text>Nombre:</Text>
                <TextInput style={styles.input} placeholder="Nombre" value={name} onChangeText={setName}/>
                <Text>Email:</Text>
                <TextInput style={styles.input} placeholder="ejemplo@outlook.com" value={email} onChangeText={setEmail}/>
                <Text>Numer de telefono:</Text>
                <TextInput style={styles.input}  value={phoneNumber} onChangeText={setPhoneNumber}/>
            </View>
            <View style={styles.account}>
                <TouchableOpacity style={styles.button} onPress={getUser}>
                    <Text style={styles.buttonText}>Guardar</Text>
                    </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={logOut}>
                    <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
            </View>

            <View style={styles.menu}>
                <FontAwesome5 size={20} name="user" style={styles.icon} onPress={()=> navigation.navigate("Perfil")}/>
                <FontAwesome5 size={20} name="home" style={styles.icon} onPress={()=> navigation.navigate("Toma una ruta")}/>
                <FontAwesome5 size={20} name="address-book" style={styles.icon} onPress={()=> navigation.navigate("Contactos")}/>
            </View>
        </View>
    );
    
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        // justifyContent:'center',
        alignItems:'center'
    },
    logoContainer:{
        flexDirection:'row',
        alignItems: 'flex-end',
        justifyContent:'center',
        marginTop:10
    },
    logo:{
        width:200,
        height:200,
        borderRadius:99
    },
    title:{
        fontSize:24,
        color:'#E51B23'
    },
    formContaier:{
        padding: 40,
        marginBottom: '40%',
    },
    subtext:{
        color: '#787272',
        marginTop:20
    },
    input:{
        borderColor:'#DBDBDB',
        width:300,
        height:40,
        marginTop:5,
        borderWidth:1,
        borderRadius: 5,
    },
    button:{
        backgroundColor:'#FF3131',
        height: 40,
        width:115,
        marginBottom:10,
        marginLeft: 35,
        borderRadius:5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText:{
        color: '#ffff',
    },
    account:{
        flexDirection:"row",
        justifyContent:'center',
        alignItems: 'center',
        marginTop: -170
    },
    register:{
        color:'#FF3131'
    },
    menu:{
        flex:1,
        width:Dimensions.get("window").width,
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems:'flex-end',
        marginBottom:20,
        borderTopColor:'#787272'
      },
      icon:{
        color: '#787272'
      }
})
