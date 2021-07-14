import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import React, { useState , useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import Icon  from "react-native-vector-icons/Ionicons"
import * as ImagePicker from "expo-image-picker";




const Firstcapture = ({navigation}) => {
    const [cameraPermission, setCameraPermission] = useState(null);
    const [galleryPermission, setGalleryPermission] = useState(null);

    const [camera, setCamera] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [clicked, setClicked] = useState(true);

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
        if (camera) {
            const data = await camera.takePictureAsync(null);
            console.log(data.uri);
            setImageUri(data.uri);
          }
    }; 

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
      
          console.log(result);
          if (!result.cancelled) {
            setImageUri(result.uri);
          }
    }
    
    return(
        <View style={{flex: 1}}>
           <Camera 
           ref={(ref) => setCamera(ref)}
           type={type}
           style={styles.fixedRatio}>
               
               <TouchableOpacity onPress={pickImage} >
                <Icon name="wallet-outline" style={{color:"white", fontSize:40, marginTop:10}} />
                </TouchableOpacity> 
                {clicked ?
                <TouchableOpacity activeOpacity={0.7} onPressIn={onCapture} >
                <Icon name="ios-radio-button-on" style={{color: "white" , fontSize: 75, marginTop:"150%", alignSelf:"center"}} />   
                </TouchableOpacity> : 
                 <TouchableOpacity activeOpacity={0.7}  >
                 <Icon name="checkmark-circle-outline" style={{color: "white" , fontSize: 75, marginTop:"150%", alignSelf:"center"}} />   
                 
                 </TouchableOpacity>    
            }
              
               
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

/* export default class Firstcapture extends React.Component{
        state = {
            hasPermissions: null,
            type: Camera.Constants.Type.back
        }
        async componentDidMount(){
            this.getPermissionAsync();
        }    
        getPermissionAsync = async () => {   
            // camera roll permissions
            if (Platform.OS === 'ios'){
                const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY_WRITE_ONLY);
                if (status !== 'granted'){
                    alert('Sorry, you need to give permissions!')
                }
            }
           
            const {status} = await Permissions.askAsync(Permissions.CAMERA);
                this.setState({hasPermissions: status === 'granted'});
        }
       ref = () => {
           this.camera = ref;
       }
    onCapture = async () => {
        if (this.camera){
            let pic = await this.camera.takePictureAsync()
        } 
    }

    render(){
        const {hasPermissions} = this.state;
        if (hasPermissions === null){
            return(
                <View>
                    <Text>Please Grant Camera Access to reactions</Text>
                </View>
            );
        }
        
    } 
}
*/