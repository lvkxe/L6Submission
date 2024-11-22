import React from 'react';
import { StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { datasource } from './Data';

const Home = ({ navigation }) => {
    const renderItem = ({ item, index, section }) => {
        return (
            <TouchableOpacity
                style={styles.opacityStyle}
                onPress={() =>
                    navigation.navigate('Edit', { index: index, type: section.title, key: item.key })
                }
            >
                <Image
                    source={item.image}
                    style={styles.imageStyle}
                    resizeMode="contain" // Ensure the whole image is displayed
                />

                <Text style={styles.textStyle}>{item.key}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <StatusBar />
            <Button title="Add Pokémon" onPress={() => navigation.navigate("Add")} />
            <SectionList
                sections={datasource}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title, bgcolor } }) => (
                    <Text style={[styles.headerText, { backgroundColor: bgcolor }]}>
                        {title}
                    </Text>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        margin: 10,
        textAlign: 'left',
        flex: 1, // Allow the text to occupy the left side
    },
    opacityStyle: {
        borderWidth: 1,
        padding: 10,
        flexDirection: 'row', // Row layout for text and image
        alignItems: 'center',
        justifyContent: 'space-between', // Space out text and image
    },
    headerText: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    imageStyle: {
        width: 100, // Set a reasonable width for the image
        height: 100, // Set a reasonable height for the image
        marginLeft: 10, // Add spacing between text and image
        resizeMode: 'contain', // Ensure the entire image is visible
    },
});


export default Home;
