import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator, FlatList } from 'react-native';
import GameCardComponent from '../components/GameCardcomponent';
import { Game } from 'src/types/Game';

const FavouritesScreen = () => {
    const loading = false;
    const error = false;

    // FAKE DATA
    const favourites: Game[] = [{
        id: 1,
        title: "Dice Dreams",
        iconURL: "https://play-lh.googleusercontent.com/QUzf9m4noU2CG79uaSZjmWNQnRgUxE7k3P1vyrJ4G35qMPvjfP8CR-YW-UuOeHrSSsI=w480-h960-rw",
        rating: 4.5,
        isFavourite: true
    },
    {
        id: 2,
        title: "Subway Surfers",
        iconURL: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/8b/ce/20/8bce202b-d8ac-23bd-73fd-4773bf1e423f/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/460x0w.webp",
        rating: 4.8,
        isFavourite: true

    },
    {
        id: 3,
        title: "Candy Crush Saga",
        iconURL: "https://play-lh.googleusercontent.com/TLUeelx8wcpEzf3hoqeLxPs3ai1tdGtAZTIFkNqy3gbDp1NPpNFTOzSFJDvZ9narFS0",
        rating: 4.7,
        isFavourite: true

    },];

    const renderItem = ({ item }: { item: Game }) => (
        <GameCardComponent item={item} />
    );

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            {error && <Text>something went wrong. please try again.</Text>}
            {!error && !loading &&
                (<FlatList
                    style={styles.list}
                    data={favourites}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
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
        backgroundColor: '#fff',

    },
    list: {
        flex: 1,
        width: '100%',
    },
});

export default FavouritesScreen;
