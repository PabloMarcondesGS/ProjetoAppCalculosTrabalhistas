import React from 'react';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TeacherList from '../pages/Questions';
import Favorites from '../pages/FormToCalc';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

const { Navigator, Screen } = createBottomTabNavigator();

function StudyTabs() {
    return (
        <Navigator
            tabBarOptions= {{
                style: {
                    elevation: 0,
                    shadowOpacity: 0,
                    // height:64
                    height: Platform.OS === 'ios' ? 84 : 64,
                },

                tabStyle: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
                },

                safeAreaInsets: {
                    bottom: 0,
                },

                iconStyle: {
                    flex: 0,
                    width: 20,
                    height: Platform.OS === 'ios' ? 24 : 20,
                },

                labelStyle: {
                    fontFamily: 'Archivo_700Bold',
                    fontSize: 13,
                    marginLeft: 16,
                },

                inactiveBackgroundColor: '#fafafc',
                activeBackgroundColor: '#ebebf5',
                inactiveTintColor: '#c1bccc',
                activeTintColor: '#32264d'
            }}
        >
            <Screen
                name="TeacherList"
                component={TeacherList}
                options={{
                    tabBarLabel: 'Calcular',
                    tabBarIcon: ( { color, size, focused }) =>{
                        return(
                            <Ionicons name="ios-calculator" size={size} color={focused ? '#8257e5' : color}/>
                        );
                    }
                }}
            />
        </Navigator>
    );
}

export default StudyTabs;
