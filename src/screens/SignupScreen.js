import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { HEIGHT, WIDTH, APP_GREEN_COLOR } from '../contansts/constants';


const SignupScreen = ({navigation})=>{
    return(
        <View style={styles.container}>
            <View style = {styles.header}>
                <Text style={styles.title}>tomato</Text>
                <Text style = {styles.screen_title}>Create new Account</Text>
            </View>
            <View style={styles.signup_form}>
                <View>
                    <Text style={styles.label}>Names</Text>
                    <TextInput
                        style = {styles.input_field}
                        autoCorrect = {false}
                        autoCapitalize = "none"
                    />
                </View>
                <View>
                    <Text style={styles.label}>Phone</Text>
                    <TextInput
                        style = {styles.input_field}
                        autoCorrect = {false}
                        autoCapitalize = "none"
                        keyboardType = "number-pad"
                        maxLength = {10}
                    />
                </View>
                <View >
                    <Text style = {styles.label}>Password</Text>
                    <TextInput
                        style = {styles.input_field}
                        autoCorrect = {false}
                        autoCapitalize = "none"
                        secureTextEntry
                    />
                </View>
                <View >
                    <Text style = {styles.label}>Confirm - Password</Text>
                    <TextInput
                        style = {styles.input_field}
                        autoCorrect = {false}
                        autoCapitalize = "none"
                        secureTextEntry
                    />
                </View>

                <View style={styles.xx}>
                    <TouchableOpacity onPress = {()=>navigation.goBack()}>  
                        <Text style={{fontSize: 18, color: APP_GREEN_COLOR}}>Login insted</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style = {styles.btn_signin}
                        onPress = {()=>console.log("OK")}
                    >
                        <Text style = {styles.signup_text}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center'
    },
    header:{
        paddingTop: 20,
        width: WIDTH,
        height: HEIGHT * .25,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    title:{
        fontSize: 35,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: APP_GREEN_COLOR
    },
    screen_title:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    signup_form:{
        width: WIDTH - 30,
        height: HEIGHT * .2
    },
    field:{
        marginBottom: HEIGHT * .05
    },
    label: {
        color: 'grey',
        fontSize: 18
    },
    input_field:{
        height: HEIGHT * .05,
        borderBottomColor: 'grey',
        borderBottomWidth: .5,
        fontSize: 20,
        marginBottom: 25
    },
    xx:{
        marginTop: HEIGHT * .05,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    btn_signin:{
        backgroundColor: APP_GREEN_COLOR,
        height: 50,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    signup_text:{
        color: '#fff',
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
});

export default SignupScreen