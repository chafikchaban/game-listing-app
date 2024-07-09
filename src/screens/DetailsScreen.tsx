import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { GameDetailsPayload } from 'src/types/Game';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../constants/Colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/navigation/AppNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/store';
import axios from 'axios';
import { addFavourite, removeFavourite } from '../store/slices/gameSlice';

type GameDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'DetailsScreen'>;

const DetailsScreen: React.FC<GameDetailsScreenProps> = ({ route }) => {
    const { id } = route.params;

    const dispatch = useDispatch<AppDispatch>();

    const [game, setGame] = useState<GameDetailsPayload | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<boolean | null>(null);
    const favourites = useSelector((state: RootState) => state.games.favourites)


    useEffect(() => {
        const fetchGameDetails = async () => {
            try {
                const response = await axios.get(`https://mock-game-api-9a408f047f23.herokuapp.com/api/games/${id}`, {
                    headers: { 'X-API-Key': '' }, // API_KEY goes here
                });
                setGame(response.data);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchGameDetails();
    }, [id]);

    const handleFavourite = () => {

        if (!game) {
            return;
        }
        if (favourites.some(fav => fav.id === game.id)) {
            dispatch(removeFavourite(game.id));
        } else {
            dispatch(addFavourite(game));
        }
    };

    if (loading) {
        return (<ActivityIndicator size="large" color={Colors.primary} />)
    }

    if (!game) {
        return <Text>No game found.</Text>;
    }

    const renderFavoriteCta = () => {
        const isFavorited = favourites.some(fav => fav.id === game.id);

        return (
            <TouchableOpacity style={styles.favouriteCta} onPress={handleFavourite}>
                <MaterialCommunityIcons name={isFavorited ? 'heart' : 'heart-outline'} size={32} color={Colors.primary} />
            </TouchableOpacity>
        );
    };

    return (
        <>
            {loading && <ActivityIndicator size="large" color={Colors.primary} />}
            {error && <Text>something went wrong. please try again.</Text>}
            <ScrollView style={styles.contentContainer}>
                <View style={styles.header}>
                    <Image source={{ uri: game.bannerURL }} style={styles.banner} />
                    <Image source={{ uri: game.iconURL }} style={styles.icon} />
                    {renderFavoriteCta()}
                </View>
                <View style={styles.container}>
                    <Text style={styles.title}>{game.title}</Text>
                    <Text style={styles.description}>{game.description}</Text>
                    <Text style={styles.rating}>Rating: {game.rating}/5</Text>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1
    },
    container: {
        flexGrow: 1,
        padding: 20,
        alignItems: 'center',
    },
    header: {
        position: 'relative',
        width: '100%',
        alignItems: 'center',
        marginBottom: 60
    },
    banner: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        resizeMode: 'cover',
    },
    icon: {
        position: 'absolute',
        bottom: -60,
        width: 100,
        height: 100,
        borderRadius: 16,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: Colors.light
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        textAlign: 'center',
        marginBottom: 10,
    },
    rating: {
        fontSize: 18,
        marginBottom: 10,
        position: 'absolute',
        top: 0,
        right: 8,
    },
    favouriteCta: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
});

export default DetailsScreen;
