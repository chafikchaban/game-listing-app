import React from 'react';
import { NavigationContainer, DefaultTheme, NavigationProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GamesScreen from '../screens/GamesScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import DetailsScreen from '../screens/DetailsScreen';


export type ScreenNames = ["MainTabNavigator", "DetailsScreen"]

export type RootStackParamList = {
    MainTabNavigator: undefined;
    DetailsScreen: undefined;
};

export type MainTabParamList = {
    Games: undefined;
    Favourites: undefined;
};

export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => (
    <Tab.Navigator>
        <Tab.Screen name="Games" component={GamesScreen} />
        <Tab.Screen name="Favourites" component={FavouritesScreen} />
    </Tab.Navigator>
);

const AppNavigator = () => {


    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="MainTabNavigator">
                <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="DetailsScreen" component={DetailsScreen} options={{ headerTitle: 'Game Details' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
