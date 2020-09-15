import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E90FF',
        justifyContent: 'center',
        padding: 40,
    },

    content: {
        flex: 1,
        justifyContent: 'center'
    },

    title: {
        fontFamily: 'Archivo_700Bold',
        color: '#FFF',
        fontSize: 28,
        lineHeight: 37,
        maxWidth: 180
    },

    description: {
        marginTop: 13,
        color: '#d4c2ff',
        fontSize: 12,
        lineHeight: 26,
        fontFamily: 'Poppins_400Regular',
        maxWidth: 240
    },

    okButton: {
        marginVertical: 40,
        backgroundColor: '#489EA9',
        height: 58,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },

    okButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Archivo_700Bold'
    }
});

export default styles;
