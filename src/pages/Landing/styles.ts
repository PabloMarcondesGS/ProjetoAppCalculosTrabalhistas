import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E90FF',
        justifyContent: 'center',
        padding: 40,
    },

    banner: {
        width: '100%',
        resizeMode: 'contain',
        marginTop: 40,
    },

    title: {
        fontFamily: 'Poppins_400Regular',
        color: '#FFF',
        fontSize: 20,
        lineHeight: 30,
        marginTop: 30,
    },

    titleBold: {
        fontFamily: 'Poppins_600SemiBold'
    },

    buttonsConteiner: {
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'space-between'
    },

    button: {
        height: 120,
        width: '48%',
        backgroundColor: '#333',
        borderRadius: 8,
        // marginLeft: 14,
        // marginRight: 14,
        padding: 24,
        justifyContent: 'space-between'
    },

    buttonPrimary: {
        backgroundColor: '#489EA9'
    },

    buttonSecondary: {
        backgroundColor: '#0A4D56'
    },

    buttonText: {
        fontFamily: 'Archivo_700Bold',
        color: '#FFF',
        // flex: 1,
        // justifyContent: 'center',
        fontSize: 20
    },

    // totalConnections: {
    //     fontFamily: 'Poppins_400Regular',
    //     color: '#d4c2ff',
    //     fontSize: 12,
    //     lineHeight: 20,
    //     maxWidth: 140,
    //     marginTop: 40,
    // }
});

export default styles;