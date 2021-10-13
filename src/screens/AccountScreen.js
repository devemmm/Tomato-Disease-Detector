import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { APP_GREEN_COLOR } from '../contansts/constants';

const AccountScreen = ()=>{
    return(
        <View style={styles.container}>
            <StatusBar
                animated = {true}
                backgroundColor = {APP_GREEN_COLOR}
            />
            <Text>Account Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'green'
    }
});


export default AccountScreen;