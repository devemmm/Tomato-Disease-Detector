import React from 'react';
import { View, Text,TouchableOpacity, Alert, Image, StyleSheet } from 'react-native';
import { APP_GREEN_COLOR, HEIGHT, WIDTH } from '../contansts/constants';

const ResultScreen = ({navigation})=>{
    return(
        <View style={styles.container}>
            <Image source={require('../../assets/search_result.png')} style={styles.icon_result}/>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: APP_GREEN_COLOR}}>Identified</Text>
            <Text style= {styles.disease_result}>Blister Rust</Text>
            <View style={styles.disease_desciption}>
                <Text style={styles.disease_desciption_text}>Cronartium ribicola is a species of rust fungus in the family Cronartiaceae that causes the disease white pine blister rust</Text>
            </View>

            <View style={styles.btn_group}>
                <TouchableOpacity 
                    style={styles.btn_ok}
                    onPress = {()=>navigation.goBack()}
                >
                    <Text style = {styles.btn_ok_text}>okey</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.btn_ask_export]}
                    onPress ={()=>{
                        Alert.alert(
                            "System Message",
                            "Your report to the Agronomist expert is well recieved, you should consult your nearest agriculture clinic for the advise.",
                            [
                                {
                                    text: "oK",
                                    style: "cancel"
                                }
                            ]
                        )
                    }}                
                >   
                    <Text style = {[styles.btn_ok_text, {color: APP_GREEN_COLOR}]}>Ask expert</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon_result:{
        height: 100,
        width: 100,
        marginBottom: 40
    },
    disease_result:{
        fontSize: 30,
        fontWeight: 'bold',
        color: APP_GREEN_COLOR,
        marginVertical: HEIGHT * .05
    },
    disease_desciption:{
        width : WIDTH - 60
    },
    disease_desciption_text:{
        fontSize: 18
    },
    btn_group:{
        flexDirection: 'row',
        alignItems: 'center',
        width: WIDTH -40,
        justifyContent: 'space-between',
        marginTop: HEIGHT * .1
    },
    btn_ok:{
        backgroundColor: APP_GREEN_COLOR,
        height: 50,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    btn_ok_text:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textTransform: 'uppercase'
    },
    btn_ask_export:{
        borderRadius: APP_GREEN_COLOR,
        borderWidth: 2,
        height: 50,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
});

export default ResultScreen;