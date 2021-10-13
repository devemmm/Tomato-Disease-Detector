import React from 'react';
import {View, Text, TextInput, TouchableOpacity,SafeAreaView,StyleSheet, Image} from 'react-native';
import { HEIGHT, WIDTH, APP_GREEN_COLOR} from '../contansts/constants';

const SigninScreen = ({navigation})=>{
    return(
        <View style={styles.container}>
            <View style = {styles.header}>
                <Image
                    source = {require('../../assets/logo.png')}
                    style = {styles.logo}
                />
                <Text style = {styles.screen_title}>Login into your account</Text>
            </View>
            <View style={styles.login_form}>
                <View>
                    <Text style={styles.label}>Phone Number</Text>
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

                <View style={styles.xx}>
                    <Text>Forgot Password</Text>
                    <TouchableOpacity 
                        style = {styles.btn_signin}
                        onPress = {()=>navigation.navigate("mainFlow")}
                    >
                        <Text style = {styles.signin_text}>Sign in</Text>
                    </TouchableOpacity>
                </View>

                <View style = {styles.footer}>
                    <Text>Dont you have account? </Text>
                    <TouchableOpacity onPress = {()=>navigation.navigate("Signup")}>
                        <Text style = {styles.btn_signup}> Signup</Text>
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
        height: HEIGHT * .4,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    logo: {
        height: HEIGHT * .15,
        width: WIDTH * .8,
        resizeMode: 'stretch',
        // backgroundColor: 'red'
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
    login_form:{
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
    signin_text:{
        color: '#fff',
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    footer:{
        width: WIDTH - 60,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: HEIGHT * .12
    },
    btn_signup:{
        color: APP_GREEN_COLOR
    }
});

export default SigninScreen