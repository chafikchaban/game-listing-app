import React from 'react';
import { NavigationContainer, DefaultTheme, NavigationProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import GamesScreen from '../screens/GamesScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import DetailsScreen from '../screens/DetailsScreen';
import { Colors } from '../constants/Colors';


export type ScreenNames = ["MainTabNavigator", "DetailsScreen"]

export type RootStackParamList = {
    MainTabNavigator: undefined;
    DetailsScreen: { id: number };
};

export type MainTabParamList = {
    Games: undefined;
    Favourites: undefined;
};

export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarInactiveTintColor: Colors.gray,
            tabBarActiveTintColor: Colors.secondary,
            tabBarIcon: ({ focused, color, size }) => {
                let iconName: string = '';

                if (route.name === 'Games') {
                    iconName = focused ? 'gamepad-variant' : 'gamepad-variant-outline';
                } else if (route.name === 'Favourites') {
                    iconName = focused ? 'heart' : 'heart-outline';
                }

                return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            },
        })}
    >
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
