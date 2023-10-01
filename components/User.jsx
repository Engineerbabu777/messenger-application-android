import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { UserType } from "../UserContext";
import axios from "axios";

export default function User({ user }) {
	const { userId, setUserId } = useContext(UserType);

	const sentRequest = async (selectedUserId) => {

        try{
            const response = await axios.post(
                "http://192.168.99.146:8080/send-request",
                { selectedUserId, currentUserId: userId }
            );

            console.log(response.data);

        } catch(err){
            console.log('ERROR WHILE SENDING REQUEST-> ',err);
        }
        
	};

	return (
		<Pressable
			style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}
		>
			<View style={{ width: 50, height: 50, borderRadius: 25 }}>
				<Image
					source={{ uri: user?.image }}
					style={{ width: 50, height: 50, borderRadius: 25 }}
				/>
			</View>

			<View style={{ marginLeft: 12, flex: 1 }}>
				<Text style={{ fontWeight: "bold" }}>{user.name}</Text>
				<Text style={{ color: "gray", marginTop: 4 }}>{user.email}</Text>
			</View>

			<Pressable
				onPress={() => sentRequest(user._id)}
				style={{
					backgroundColor: "#567189",
					padding: 10,
					borderRadius: 6,
					width: 105,
				}}
			>
				<Text style={{ fontSize: 13, color: "white", textAlign: "center" }}>
					Add Friend
				</Text>
			</Pressable>
		</Pressable>
	);
}

const styles = StyleSheet.create({});
