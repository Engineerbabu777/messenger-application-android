import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../UserContext";
import axios from "axios";

export default function UserChat({ user }) {
	const navigation = useNavigation();

	const { userId, setUserId } = useContext(UserType);
	const [messages, setMessages] = React.useState([]);

	const fetchMessages = async () => {
		try {
			const response = await axios.get(
				"http://192.168.244.130:8080/messages/" + userId + "/" + user._id
			);

			setMessages(response.data.messages);

			console.log("MESSAGES", response.data);
		} catch (error) {
			console.log(error);
		}
	};

	// FETCH MESSAGES!
	useEffect(() => {
		fetchMessages();
	}, []);

	// GET LAST MESSAGES!
	const getLastMessage = () => {
		const userMessages = messages.filter(
			(message) => message.messageType === "text"
		);

		const n = userMessages.length;

		return userMessages[n - 1];
	};

	const formatTime = (time) => {
		const options = { hours: "numeric", minutes: "numeric" };
		return new Date(time).toLocaleTimeString("en-US", options);
	};

	const lastMessage = getLastMessage();

	return (
		<Pressable
			onPress={() => navigation.navigate("Message", { recepientId: user._id })}
			style={{
				flexDirection: "row",
				alignItems: "center",
				gap: 10,
				borderWidth: 0.7,
				borderColor: "#D0D0D0",
				borderTopWidth: 0,
				borderLeftWidth: 0,
				borderRightWidth: 0,
				padding: 10,
			}}
		>
			<Image
				source={{ uri: user.image }}
				style={{ width: 50, height: 50, borderRadius: 25, resizeMode: "cover" }}
			/>
			<View style={{ flex: 1 }}>
				<Text style={{ fontSize: 15, fontWeight: "800" }}>{user?.name}</Text>

				{lastMessage?.messageText && (
					<Text style={{ marginTop: 3, color: "gray", fontWeight: "500" }}>
						{lastMessage?.messageText}
					</Text>
				)}
			</View>

			<View>
				{lastMessage?.messageText && (
					<Text style={{ fontSize: 11, fontWeight: "400", color: "#585858" }}>
						{formatTime(lastMessage?.createdAt)}
					</Text>
				)}
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({});
