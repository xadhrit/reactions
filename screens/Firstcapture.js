import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import React, { useState , useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, Image,StyleSheet } from 'react-native';
import Icon  from "react-native-vector-icons/Ionicons"
import * as ImagePicker from "expo-image-picker";
//import ViewShot from 'react-native-view-shot';


export const ration = "16:9"

const initialState = {
    zoomValue: 0,
}

const reducer = ({initialState,action:{ type:string, payload: any }}) => {
    switch(action.type){
        case "ZOOM":
            return {
                ...initialState,
                zoomValue: action.payload
            };
        default:
            return {...initialState}
    }

}

const Firstcapture = ({navigation}) => {
    const [cameraPermission, setCameraPermission] = useState(null);
    
    const [galleryPermission, setGalleryPermission] = useState(null);

    const [camera, setCamera] = useState(null);
    
    const [imageUri, setImageUri] = useState(null);
    
    const [type, setType] = useState(Camera.Constants.Type.back);
    
    //const { zoomValue } = state; 

    const getPermissionAsync = async () => {
        const cameraPermission = await Camera.requestPermissionsAsync();
        setCameraPermission(cameraPermission.status === 'granted');

        const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
        setGalleryPermission(imagePermission.status === 'granted')

        if (imagePermission.status !== 'granted' && cameraPermission.status !== 'granted' ){
            alert('You need to give access to camera and gallery');
        }
    };
    
    useEffect(() => {
        getPermissionAsync();
    },[]); 

    const onCapture = async () => {
        try{
            if (camera){
                const data = await camera.takePictureAsync(null);
                console.log(data.uri);
                setImageUri(data.uri);
                navigation.navigate('React', { uri: data.uri })
            }
        } 
        catch (err){
            console.log(err);
        }
    }


    return(
        <View style={{flex: 1}}> 
             <Camera  ref={(ref) => setCamera(ref)} type={type}  style={styles.fixedRatio} ratio={ration}>  
             <TouchableOpacity activeOpacity={0.7} onPressIn={onCapture} >
                 <Icon name="ios-radio-button-on" style={{color: "white" , fontSize: 75, marginTop:"150%", alignSelf:"center"}} />   
             </TouchableOpacity>                 
            </Camera>
        
        </View>
    )
} 

export default Firstcapture;

const styles = StyleSheet.create({
    
    fixedRatio: {
        flex: 1,
        justifyContent:"space-around"
    } 
})
