import ViewShot from 'react-native-view-shot';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import React, { useState , useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet, ImageBackground, Dimensions, Share } from 'react-native';
import Icon  from "react-native-vector-icons/Ionicons"
import * as ImagePicker from "expo-image-picker";
import { ration } from './Firstcapture';
import {Button, theme} from "galio-framework";
import materialTheme from "../constants/Theme";



export const navigationOptions = ({navigation}) => ({
    headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} >
           <Icon name="md-arrow-back" style={{color:"white", fontSize:20}} /> 
        </TouchableOpacity>
    )
})

const {width, height} = Dimensions.get("screen");
const ratio = "4:3"

const ReactScreen = ({navigation, route}) => {
    const [cameraPermission, setCameraPermission] = useState(null);
    const [galleryPermission, setGalleryPermission] = useState(null);
    const {uri} = route.params;
    const [camera, setCamera] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.front);

    const getPermissionAsync = async () => {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        setCameraPermission(cameraPermission.status === 'granted');

        const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
        setGalleryPermission(imagePermission.status === 'granted')

        if (imagePermission.status !== 'granted' && cameraPermission.status !== 'granted'){
            alert('You need to give access to camera and gallery');
        }
    };
    useEffect(() => {
        getPermissionAsync();
    },[])
    
    const viewShotRef = useRef();
    const [button, setButton] = useState(true);

    const onCapture = async () => {
        /*if (camera){
            const data = await camera.takePictureAsync(null);
            console.log(data.uri);
            setImageUri(data.uri);
        }*/
        setButton(false);
        const imageURI = await viewShotRef.current.capture();
        console.log(imageURI);
        setButton(true);
        navigation.navigate('Reaction', {uri: imageURI})
        //Share.share({title:'reaction', url: imageURI})
    };
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect:[1,1],
            quality: 1,
        });
        console.log(result);
        if (!result.cancelled){
            setImageUri(result.uri)
        }
    }
    return(
        <ViewShot ref={viewShotRef} style={{flex:1}} options={{format:'jpg',quality:1.0}} >
            <ImageBackground source={{uri:uri}} style={{height:height, width: width}} > 
                <Camera  ref={(ref) => setCamera(ref)}  type={type}  style = {styles.fixedRatio} ratio={ratio}></Camera>  
                <TouchableOpacity onPress={onCapture} >
                {button && <Icon name="ios-heart-circle-outline" style={{color: "white" , fontSize: 75, marginTop:20, alignSelf:"center"}} />   }
                </TouchableOpacity>
            </ImageBackground>
        </ViewShot>
    
    )
}

export default ReactScreen;

const styles = StyleSheet.create({
    fixedRatio: {
        marginTop: 80+"%",
        height: 230,
        width: 180,
        marginLeft: 170,
        borderTopRightRadius:30,
        borderBottomStartRadius:30,
        borderBottomRightRadius:30,
        borderBottomLeftRadius: 30
    },
 
})