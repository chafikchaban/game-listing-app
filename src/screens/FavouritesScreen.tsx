import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const FavouritesScreen = () => {

    return (
        <View style={styles.container}>
            <Text>
                Favourites list
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default FavouritesScreen;
