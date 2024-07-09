import React from 'react';
import { View, Text, Image, Button, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { GameDetailsPayload } from 'src/types/Game';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../constants/Colors';


const DetailsScreen: React.FC = () => {
    const route = useRoute();
    console.log(route.params);

    const game: GameDetailsPayload = {
        id: 1,
        title: "Dice Dreams",
        iconURL: "https://play-lh.googleusercontent.com/QUzf9m4noU2CG79uaSZjmWNQnRgUxE7k3P1vyrJ4G35qMPvjfP8CR-YW-UuOeHrSSsI=w480-h960-rw",
        bannerURL: "https://static1.squarespace.com/static/58af450eb3db2b0582612f1d/58af55d29a6bf733a4093aaa/62b233eaff33276b43244a9d/1658131859711/Screenshot+2022-06-21+at+22.23.30.png?format=1500w",
        rating: 4.5,
        description: "Welcome to Dice Dreams! Join millions of players around the world! Roll the Dice on the magical board, Steal Coins, Attack your friends, build your Epic Kingdom and Embark on an adventurous journey! Roll & Win - Roll the dice on the board, Win Golden Coins to build your kingdom, become the Dice King and master the dice board game! Features: Play for FREE with your friends and enjoy a variety of kingdoms. Join the action with players from around the world and play with your social network. Steal from other boards and show them who's the Dice Dream King. Invite your Facebook friends to join the epic fun and become the master of the dice boards! Protect your treasure and build the most magical kingdom! Roll and play to collect cards by completing challenges and move up in levels! The Legend Behind The Dice: Bob returned to his kingdom after a journey visiting the Piggy King, only to find that his beloved home had been attacked! Brave Bob decided to roll the dice and clash his enemies head on. He gathered his fellow peons, and together they went on an adventure to rebuild his kingdom, get revenge, and once again become the Kings of the hyper magical dice board game. Will you help Bob and his friends on their quest to regain their throne as the Dice Dreams Kings? Will you travel through Peon Islands and other dreamy boards to bring them back to glory in this thrilling board game? Has your kingdom been attacked by a friend? It's time for revenge! Steal coins from them and upgrade your kingdom with the perfect bonus. Expand your kingdom by building more and making the Peons happy! Don't wait any longer, start building your kingdom and win amazing prizes in this captivating board game! Raid your enemies or friends. Just aim your slingshot, fire, and loot away! Earn gold by stealing from other kingdoms and making their treasure- YOURS! Get revenge on those who attacked your kingdom and rule the dice board game! Become the master of the dice board and help the Peons restore their kingdom! You never know what treasures you can find in your friend’s kingdom. Attack and be surprised! Get ready to go on an epic adventure with Dice Dreams! Build your empire, attack your friends' boards, and earn awesome prizes and coins! Will you be the master of the dice board game? With a variety of exciting challenges, there's always something new and thrilling to go for in Dice Dreams. So start building and become the ultimate Dice Dreams champion!",
        isFavourite: true
    }


    const handleFavourite = () => {

    };

    const renderFavoriteCta = () => {
        return (
            <TouchableOpacity style={styles.favouriteCta} onPress={handleFavourite}>
                <MaterialCommunityIcons name={game.isFavourite ? 'heart' : 'heart-outline'} size={32} color={Colors.primary} />
            </TouchableOpacity>
        )
    }

    if (!game) {
        return <Text>No game found.</Text>;
    }

    return (
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
