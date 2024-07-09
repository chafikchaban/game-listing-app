import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator, FlatList } from 'react-native';
import GameCardComponent from '../components/GameCardcomponent';
import { Game } from 'src/types/Game';
import { Colors } from '../constants/Colors';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const FavouritesScreen = () => {
    const { loading, error, favourites } = useSelector((state: RootState) => state.games);

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
                    data={favourites}
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

export default FavouritesScreen;
