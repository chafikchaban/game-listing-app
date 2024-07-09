import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { StackNavigation } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { Game } from 'src/types/Game';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { addFavourite, removeFavourite } from '../store/slices/gameSlice';

export interface GameCardComponentProps {
    item: Game
}

const GameCardComponent: React.FC<GameCardComponentProps> = ({ item }) => {
    const navigation = useNavigation<StackNavigation>();
    const dispatch = useDispatch<AppDispatch>();

    const favourites = useSelector((state: RootState) => state.games.favourites)
    const isFavorited = favourites.some(fav => fav.id === item.id);

    const handleFavourite = () => {
        if (!item) {
            return;
        }
        if (favourites.some(fav => fav.id === item.id)) {
            dispatch(removeFavourite(item.id));
        } else {
            dispatch(addFavourite(item));
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.cardHeader}>
                <Image source={{ uri: item.iconURL }} style={styles.icon} />
                <View>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text>Rating: {item.rating}/5</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.detailsCta} onPress={() => navigation.navigate('DetailsScreen', { id: item.id })}>
                <Text style={styles.detailsCtaText}>Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.favouriteCta} onPress={handleFavourite}>
                <MaterialCommunityIcons name={isFavorited ? 'heart' : 'heart-outline'} size={22} color={Colors.primary} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    cardHeader: {
        marginBottom: 16,
        flexDirection: 'row',
        gap: 24
    },
    cardTitle: {
        color: '#000',
        fontWeight: '700',
        fontSize: 24,
    },
    icon: {
        width: 80,
        height: 80,
        borderRadius: 8,

    },
    favouriteCta: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
    detailsCta: {
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
    },
    detailsCtaText: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: '700'
    }
});

export default GameCardComponent;
