import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { datasource } from './Data';

const Add = ({ navigation }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('💦 Water');
    const [imageNumber, setImageNumber] = useState(''); // Pokémon number
    const [image, setImage] = useState(null);

    const handleImageSelection = (number) => {
        setImageNumber(number);
        const selectedSection = datasource.find((ds) => ds.title === type);
        if (selectedSection && selectedSection.images[number]) {
            setImage(selectedSection.images[number]);
        } else {
            setImage(null);
        }
    };

    return (
        <View style={{ padding: 10 }}>
            {/* Pokémon Name Input */}
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Pokémon name:</Text>
                <TextInput
                    style={{ borderWidth: 1, padding: 5 }}
                    onChangeText={(text) => setName(text)}
                />
            </View>

            {/* Pokémon Type Picker */}
            <View style={{ padding: 10 }}>
                <RNPickerSelect
                    value={type}
                    onValueChange={(value) => setType(value)}
                    items={[
                        { label: "⚡️ Electric", value: "⚡️ Electric" },
                        { label: "🔥 Fire", value: "🔥 Fire" },
                        { label: "💦 Water", value: "💦 Water" },
                    ]}
                />
            </View>

            {/* Pokémon Image Selection */}
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Pokémon Number:</Text>
                <TextInput
                    style={{ borderWidth: 1, padding: 5 }}
                    keyboardType="numeric"
                    onChangeText={(number) => handleImageSelection(number)}
                />
                {image ? (
                    <Image
                        source={image}
                        style={{ width: 100, height: 100, marginTop: 10 }}
                    />
                ) : (
                    <Text style={{ color: 'red', marginTop: 10 }}>
                        Invalid Pokémon number!
                    </Text>
                )}
            </View>

            {/* Submit Button */}
            <Button
                title="Submit"
                onPress={() => {
                    const selectedSection = datasource.find((ds) => ds.title === type);
                    if (!selectedSection) {
                        alert("Invalid Pokémon type!");
                        return;
                    }
                    const isDuplicate = selectedSection.data.some(
                        (dataItem) => dataItem.key === name.trim()
                    );
                    if (isDuplicate) {
                        alert("This Pokémon name already exists in the selected category!");
                    } else if (name.trim() === "" || imageNumber === "" || !image) {
                        alert("Pokémon name and valid number are required!");
                    } else {
                        selectedSection.data.push({ key: name.trim(), image });
                        navigation.navigate("Home");
                    }
                }}
            />
        </View>
    );
};

export default Add;
