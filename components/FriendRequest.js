import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { UserType } from "../UserContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function FriendRequest({
	item,
	setFriendRequests,
	FriendRequests,
}) {
	const { userId, setUserId } = useContext(UserType);
	const navigation = useNavigation();

	const handleRequest = async () => {
		const response = await axios.post(
			"http://192.168.103.77:8080/accept-request/accept",
			{
				userId,
				acceptId: item._id,
			}
		);

		if (response.data.success === true) {
			setFriendRequests(
				FriendRequests.filter((friendRequest) => friendRequest._id !== item._id)
			);
            navigation.navigate("Chat")

		}
	};
	return (
		<Pressable
			style={{
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				marginVertical: 10,
			}}
		>
			<Image
				source={{ uri: item.image }}
				style={{ width: 50, height: 50, borderRadius: 25 }}
			/>
			<Text
				style={{ fontSize: 16, fontWeight: "700", marginLeft: 10, flex: 1 }}
			>
				{item?.name} has sent you a friend request!!
			</Text>
			<Pressable
				onPress={handleRequest}
				style={{ backgroundColor: "#0066b2", padding: 10, borderRadius: 6 }}
			>
				<Text style={{ textAlign: "center", color: "white" }}>Accept</Text>
			</Pressable>
		</Pressable>
	);
}

const styles = StyleSheet.create({});
