import { Block, Button, theme } from 'galio-framework';
import React, {useCallback, useState}  from 'react'
import { View, Image, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Alert, Share } from 'react-native'
import Icon from "react-native-vector-icons/Feather";
import materialTheme from '../constants/Theme';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system'

const {width, height} = Dimensions.get("screen");

const ReactionPreview = ({navigation, route}) => {
    const {uri} = route.params;
    console.log(JSON.stringify(uri));


    const saveImage = useCallback((FileSystem) => {
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
  const onShare = async () => {
      return Share.share({title:'Reaction', url:uri})
  }
  const back = () => {
    return(
      navigation.goBack(),
      setImageUri(null)
    )
  }
    return (
        <View>
            <Block flex >
            <ImageBackground source={{uri: uri}} style={{height:height, width: width}} >
                <TouchableOpacity onPress={back}>
                <Icon name="x" size={30} style={{color:"white", marginLeft:10, marginTop:3}} />
                </TouchableOpacity>
                <Button shadowless onPress={onShare} style={styles.button} color={materialTheme.COLORS.TRANSPARENT}> SHARE! </Button> 
            </ImageBackground>
            </Block>

        </View>
    )
}

export default ReactionPreview;

const styles = StyleSheet.create({
    button: {
        width: width - theme.SIZES.BASE * 15,
        shadowRadius: 0,
        shadowOpacity: 0,
        marginTop:-6+"%",
        marginLeft: 65  + "%",
        
    }
}) 