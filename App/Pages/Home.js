import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, Dimensions, TextInput,TouchableOpacity, ScrollView} from "react-native"
import {StatusBar} from "expo-status-bar"
import MapView, {PROVIDER_GOOGLE, Marker, Polyline, Polygon} from "react-native-maps"
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"

import { useSelector } from 'react-redux';

import * as Location from "expo-location"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import {GOOGLE_MAPS_APIKEY} from "@env"

export function Home({navigation}) {
  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState({
    coords:{
      latitude:0,
      longitude:0}
  });
  const [origin, setOrigin] = useState(null)
  const [destination, setDestination] = useState(null)
  const completeUser = useSelector(state => state.userRedux.user)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location)
      setLocation(location);
    })();
    // console.log(completeUser)
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <View style={styles.container}>
        <Text style={styles.texto}>Bienvenida, {completeUser.name}</Text>
        </View>
        <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/foto_perfil.jpeg')}></Image>
        </View>
      </View>

      <MapView style={styles.map} provider={PROVIDER_GOOGLE}
       region={{
        latitude: location.coords.latitude,
         longitude: location.coords.longitude,
         latitudeDelta:0.001,
         longitudeDelta:0.002,
         }
         }
         > 
            <Marker coordinate={{latitude:location.coords.latitude,longitude:location.coords.longitude}} title="Mi locación"/>

            {destination?.location && (
                <Marker 
                  coordinate={{
                      latitude: destination.location.lat,
                      longitude: destination.location.lng,}}
                  title='destination'
                  description={destination.description}
                  identifier='destination'
                />
            )
        }
        {location && destination && (
          <MapViewDirections
            origin={origin}
            destination = {destination.description}
            apikey={GOOGLE_MAPS_APIKEY}
            lineDashPattern={[0]}
            strokeWidth={3}
            strokeColor='black'
          />
      )}
          </MapView>

        <GooglePlacesAutocomplete 
             placeholder="Punto de destino"
            styles={
                {
                container:{
                  flex:0,
                  borderColor:'#DBDBDB',
                  width:300,
                  marginTop:12,
                  marginBottom:12,
                  borderWidth:1,
                  borderRadius: 5,
            },
            textInput:{
                fontSize:14
            }
          }
        }
            onPress={(data, details = null )=> {
              setDestination({
                location: details.geometry.location,
                description: data.description
              })
              setOrigin({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
              })

              // dispatch(
              //     setOrigin({
              //       location: details.geometry.location,
              //   })
              // )
              // dispatch(setDestination(null))
            }}
            fetchDetails={true}
            enablePoweredByContainer={false}
             minLength={2}
             query={{
                 key: GOOGLE_MAPS_APIKEY,
                 language: 'en'
                }}
                nearbyPlacesAPI="GooglePlacesSearch"
                 debounce={400}
                />
        <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Empezar</Text>
        </TouchableOpacity>
    
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
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },  
    map:{
      width:Dimensions.get("window").width,
      height:'50%',
    },
    user:{
      flex:1,
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems:'center'
    },
    texto:{
      color:'#787272',
    },
    image:{
      width:60,
      height:60,
      borderRadius:99
    },
    
    button:{
      backgroundColor:'#FF3131',
      height: 40,
      width:115,
      marginBottom:10,
      borderRadius:5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonText:{
      color: '#ffff',
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

  });