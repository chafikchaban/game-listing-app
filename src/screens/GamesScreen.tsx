import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchGames } from '../store/slices/gameSlice';

import { Game } from 'src/types/Game';
import GameCardComponent from '../components/GameCardcomponent';
import { Colors } from '../constants/Colors';

const GamesScreen: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { games, loading, error } = useSelector((state: RootState) => state.games);

    useEffect(() => {
        dispatch(fetchGames());
    }, [dispatch]);

    const renderItem = ({ item }: { item: Game }) => (
        <GameCardComponent item={item} />
    );

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator size="large" color={Colors.primary} />}
            {error && <Text>something went wrong. please try again.</Text>}
            {!error && !loading &&
                (<FlatList
                    style={styles.list}
                    data={games}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    removeClippedSubviews={true}
                />)
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.light,
    },
    list: {
        flex: 1,
        width: '100%',
    },
});

export default GamesScreen;
