import React from 'react';
import { View, ImageBackground, Text } from 'react-native';

import giveClassesBgImage from '../../assets/images/give-classes-background.png';

import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

function GiveClasses() {

    const {goBack} = useNavigation();

    function handleNavigateback(){
        goBack();
    }

    return (
        <View style={styles.container}>
            <ImageBackground resizeMode='contain' source={giveClassesBgImage} style={styles.content}>
                <Text style={styles.title}>GENARO ADVOCACIA</Text>
                <Text style={styles.description}>Entre em contato</Text>
                <Text style={styles.description}>Whatsapp: +55 11 95125-5125</Text>
                <Text style={styles.description}>Email: contato@genaroadvocacia.com.br</Text>
            </ImageBackground>

            <RectButton onPress={handleNavigateback} style={styles.okButton}>
                <Text style={styles.okButtonText}>Tudo bem</Text>
            </RectButton>
        </View>
    );

}

export default GiveClasses;
