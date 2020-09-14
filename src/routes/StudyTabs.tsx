import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import TeacherList from '../pages/Questions';

const { Navigator, Screen } = createStackNavigator();

function StudyTabs() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="TeacherList" component={TeacherList} />
    </Navigator>
  );
}

export default StudyTabs;
