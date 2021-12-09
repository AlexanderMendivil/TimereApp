import React from 'react';
import {View, StyleSheet, Image,Text, TextInput, TouchableOpacity, Dimensions} from "react-native"
import { StatusBar } from 'expo-status-bar';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
export function Contacts({navigation}) {


    return (
        <View style={styles.container}>
            <Text style={styles.subtext}>Aquí puedes ver tus contactos de confianza.</Text>    
            <View style={styles.contactContainer}>   
                <FontAwesome5 name="trash" color="#FF3131" size={20} iconStyle={{marginRight: 20}}/>
                <View style={styles.information}>
                    <Text style={styles.subtext}>Joseph Antuan Mendez Gallego</Text>    
                    <Text style={styles.subtext}>+52 6623546754</Text>    
                </View>
                <Image style={styles.contacto} source={require('../assets/contacto1.jpeg')}/>
            </View>
            <View style={styles.contactContainer}>   
                <FontAwesome5 name="trash" color="#FF3131" size={20} iconStyle={{marginRight: 20}}/>
                <View style={styles.information}>
                    <Text style={styles.subtext}>Alexandra Galil </Text>    
                    <Text style={styles.subtext}>+52 6623456814</Text>    
                </View>
                <Image style={styles.contacto} source={require('../assets/contacto2.jpg')}/>
            </View>
            <View style={styles.formContaier}>
                <Text>Nombre:</Text>
                <TextInput style={styles.input} placeholder="Maria Jose Gonzalez Vasquez"/>
                <Text>Numero:</Text>
                <TextInput style={styles.input} placeholder="+52 6624657587"/>
                <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Toma una ruta")}><Text style={styles.buttonText}>Agregar</Text></TouchableOpacity>
                
            </View>
            {/* <View style={styles.account}>
            </View> */}

            <View style={styles.menu}>
                  <FontAwesome5 size={20} name="user" style={styles.icon} onPress={()=> navigation.navigate("Perfil")}/>
                  <FontAwesome5 size={20} name="home" style={styles.icon} onPress={()=> navigation.navigate("Toma una ruta")}/>
                  <FontAwesome5 size={20} name="address-book" style={styles.icon} onPress={()=> navigation.navigate("Contactos")}/>
            </View>
            <StatusBar style="auto"/>
        </View>
    );

}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        // justifyContent:'center',
        alignItems:'center'
    },
    contactContainer:{
        flex:1,
        width:'80%',
        flexDirection:'row',
        alignItems: 'flex-end',
        // justifyContent:'center',
        marginTop:10,
        borderBottomColor:'#787272',
        borderBottomWidth:1
    },
    information:{
        flex:1,
        marginLeft:5,
    },
    contacto:{
        width:50,
        height:50,
        borderRadius:99
    },
    title:{
        fontSize:24,
        color:'#E51B23'
    },
    formContaier:{
        flex:1,
        padding: 40,
        marginBottom: '40%',
    },
    subtext:{
        color: '#787272',
        marginTop:5
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
        marginTop:10,
        borderRadius:5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText:{
        color: '#ffff',
    },
    // account:{
    //     justifyContent:'center',
    //     alignItems: 'center',
    //     // marginTop: -50
    // },
    // register:{
    //     color:'#FF3131'
    // },
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
