import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { StackNavigation } from 'src/navigation/AppNavigator';

const GamesScreen = () => {

    const navigation = useNavigation<StackNavigation>()

    const navigateToDetails = () => {
        navigation.navigate('DetailsScreen');
    };

    return (
        <View style={styles.container}>
            <Text>
                Games list
            </Text>
            <Button title="Details" onPress={() => navigateToDetails()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default GamesScreen;
