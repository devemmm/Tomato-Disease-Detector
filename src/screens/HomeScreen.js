import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, StatusBar } from 'react-native';
import { APP_GREEN_COLOR, HEIGHT, WIDTH, normalTomatoes, affectedTomatoes } from '../contansts/constants';
import { AntDesign } from '@expo/vector-icons';
const HomeScreen = ({navigation})=>{

    
    return(
        <View style={styles.container}>
            <StatusBar
                animated = {true}
                backgroundColor = {APP_GREEN_COLOR}
            />
            <View style={styles.main_container}>
                <View style={styles.image_cover}>
                    <FlatList
                        data = {normalTomatoes}
                        keyExtractor = {tomato => tomato.url}
                        horizontal
                        showsHorizontalScrollIndicator = {false}
                        renderItem = {({item, index})=>{
                            return(
                                <View>
                                    <Image
                                        style={styles.image}
                                        source={{uri: item.url}}
                                    />
                                    <View style ={styles.description_card}>
                                        <Text>{item.title}</Text>
                                        <Text>{item.description}</Text>
                                    </View>
                                </View>
                            )
                        }}
                    />
                </View>
                <View style={{flex: 1}}/>

                <View style={styles.image_cover}>
                    <FlatList
                        data = {affectedTomatoes}
                        keyExtractor = {tomato => tomato.url}
                        horizontal
                        showsHorizontalScrollIndicator = {false}
                        renderItem = {({item, index})=>{
                            return(
                                <View>
                                    <Image
                                        style={styles.image}
                                        source={{uri: item.url}}
                                    />
                                    <View style ={styles.description_card}>
                                        <Text>{item.title}</Text>
                                        <Text>{item.description}</Text>
                                    </View>
                                </View>
                            )
                        }}
                    />
                </View>

                <TouchableOpacity 
                    style = {styles.btn_add_card}
                    onPress ={()=>navigation.navigate("Result")}
                >
                    <AntDesign name="pluscircle" style = {styles.add_icon}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
    },
    main_container:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    image_container:{
        backgroundColor: '#dadfe6',
        marginBottom: 10
    },
    image_cover:{
        height: HEIGHT * .32,
        width: WIDTH - 20,
        marginTop: 10,
        borderRadius: 10
    },
    image:{
        width: WIDTH - 20,
        height: HEIGHT * .25,
        resizeMode: 'stretch',
        borderRadius: 5,
        marginRight: 20
    },
    description_card:{
        flex: 1, 
        // backgroundColor: '#dadfe6', 
        justifyContent: 'center', 
        alignItems: 'center'
    }, 
    btn_add_card:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 10
    },
    add_icon:{
        fontSize: 50,
        color: APP_GREEN_COLOR
    }
});


export default HomeScreen;