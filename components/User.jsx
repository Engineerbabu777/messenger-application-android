import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function User({ user }) {
	return (
		<Pressable style={{flexDirection:'row',alignItems:'center',marginVertical:10,}}>
            <View style={{width:50,height:50,borderRadius:25}}>
                <Image source={{uri:user?.image}} style={{ width:50, height:50,borderRadius:25}} />
            </View>

            <View style={{marginLeft:12,flex:1}}>
                <Text style={{fontWeight:'bold'}}>{user.name}</Text>
                <Text style={{color:'gray',marginTop:4}}>{user.email}</Text>
            </View>

            <Pressable style={{backgroundColor:'#567189',padding:10,borderRadius:6,width:105,}}>
                <Text style={{fontSize:13,color:'white',textAlign:'center'}}>Add Friend</Text>
            </Pressable>
        </Pressable>
	);
}

const styles = StyleSheet.create({});
