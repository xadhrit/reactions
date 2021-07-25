import { Block, Button, theme } from 'galio-framework';
import React, {useCallback}  from 'react'
import { View, Image, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Alert } from 'react-native'
import Icon from "react-native-vector-icons/Feather";
import materialTheme from '../constants/Theme';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system'

const {width, height} = Dimensions.get("screen");

const FirstPreview = ({navigation, route}) => {
   
    const {uri} = route.params;
    console.log(JSON.stringify(uri));

    
  /*const saveImage = useCallback((FileSystem) => {
    MediaLibrary.requestPermissionsAsync().then(({ granted }) => {
      if (!granted) {
        Alert.alert(
          'Permission required',
          'Please allow the app to save photos to your device.'
        )
      } else {
        MediaLibrary.saveToLibraryAsync(FileSystem.uri).then(() => {
          Alert.alert('Success', 'Image successfully saved to library.')
        })
      }
    })
  }, [])
  useEffect(() => {
    FileSystem.downloadAsync(
      uri,
      FileSystem.cacheDirectory + 'sample_640×426.png'
    ).then(result => {
      setLocalFile({ ...result, mimeType: 'image/png' })
    })
  }, [])
  */
    const react = () => {
        navigation.navigate('React',{
            uri: uri
        })
    }
    return (
        <View>
            <Block flex >
            <ImageBackground source={{uri: uri}} style={{height:height, width: width}} >
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Icon name="x" size={30} style={{color:"white", marginLeft:10}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={saveImage} >
                <Icon name="image" size={30} style={{color:"white"}} />
                </TouchableOpacity>
               
                <Button
                shadowless
                style={styles.button}
                color={materialTheme.COLORS.TRANSPARENT}
                onPress={react}>
                REACT
              </Button>  
            </ImageBackground>
            </Block>
           
        </View>
    )
}

export default FirstPreview;

const styles = StyleSheet.create({
    button: {
        width: width - theme.SIZES.BASE * 15,
        height: theme.SIZES.BASE * 3,
        shadowRadius: 0,
        shadowOpacity: 0,
        marginTop:140 + "%",
        marginLeft: 30 +"%"
    },
})