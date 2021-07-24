import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import React, { useState , useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import Icon  from "react-native-vector-icons/Ionicons"
import * as ImagePicker from "expo-image-picker";



const ReactScreen = ({navigation}) => {
    const [cameraPermission, setCameraPermission] = useState(null);
    const [galleryPermission, setGalleryPermission] = useState(null);

    const [camera, setCamera] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.front);
    const [clicked, setClicked] = useState(true);

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
    
    const onCapture = async () => {
        if (camera){
            const data = await camera.takePictureAsync(null);
            console.log(data.uri);
            setImageUri(data.uri);
        }
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
      <View style={{flex:1}}>
        <Camera 
        ref={(ref) => setCamera(ref)} 
        type={type}
        style = {styles.fixedRatio}>
            <TouchableOpacity activeOpacity={0.7} onPressIn={onCapture}>
            <Icon name="ios-radio-button-on" style={{color: "white" , fontSize: 75, marginTop:"150%", alignSelf:"center"}} /> 
            </TouchableOpacity>
        </Camera>
      </View>
    )
}

export default ReactScreen;

const styles = StyleSheet.create({
    fixedRatio: {
        flex: 1,
    } 
})