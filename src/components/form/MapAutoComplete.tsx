import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GoogleLocationInput = () => {
    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
            
                placeholder=""
                onPress={(data, details = null) => {
                    // Handle the place selection
                    console.log(data.description);
                }}
                query={{
                    key: '',
                    language: 'en',
                }}
                styles={{
                    textInputContainer: {
                        width: '100%',
                    },
                    textInput: {
                        height: 40,
                        fontSize: 18,
                    },
                    listView: {
                        backgroundColor: 'white',
                    },
                }}
                fetchDetails={false} // Set this to true if you need more details about the place
                debounce={200} // Delay between typing and fetching suggestions
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
});

export default GoogleLocationInput;
