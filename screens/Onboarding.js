import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';

export default class Onboarding extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex center>
          <ImageBackground
            source={{  uri: 'https://source.unsplash.com/collection/4390575' }}  //1396742 //4390575
            style={{ height: height, width: width, marginTop: '-10%', zIndex: 1 }}
          />
        </Block>
        <Block flex space="between" style={styles.padded}>
          <Block flex space="around" style={{ zIndex: 2 }}>
            <Block>
              <Block>
                <Text color="white" size={40}>Click</Text>
              </Block>
              <Block row>
                <Text color="white" size={40}>React</Text>
              </Block>
              <Block row >
                <Text color="white" size={40}>Share!</Text>
              </Block>
              <Text size={16} color='rgba(255,255,255,0.6)'>
                Welcome to reactions
              </Text>
            
            </Block>
            <Block center>
              <Button
                shadowless
                style={styles.button}
                color={materialTheme.COLORS.BUTTON_COLOR}
                onPress={() => navigation.navigate('Firstcapture')}>
                GET STARTED
              </Button>
             
            </Block>
            <Text size={10} color='rgba(255,255,255,0.6)' >
              image source:  unsplash.com                app by: github.com/xadhrit  
            </Text>
              
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});
