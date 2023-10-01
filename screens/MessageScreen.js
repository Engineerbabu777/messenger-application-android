import {
	Image,
	KeyboardAvoidingView,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import React, { useContext, useLayoutEffect, useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import EmojiSelector from "react-native-emoji-selector";
import { UserType } from "../UserContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

export default function MessageScreen() {
	const [showEmoji, setShowEmoji] = useState(false);
	const [selectedImage, setSelectedImage] = useState("");
	const [message, setMessage] = useState("");
	const { userId, setUserId } = useContext(UserType);
	const [messages, setMessages] = useState([]);
	const route = useRoute();
	const { recepientId } = route.params;
	const navigation = useNavigation();
	const [recepientData, setRecepientData] = useState(null);

	const fetchMessages = async () => {
		try {
			const response = await axios.get(
				"http://192.168.99.146:8080/messages/" + userId + "/" + recepientId
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

	useEffect(() => {
		const fetchRecepientData = async () => {
			try {
				const response = await axios.get(
					"http://192.168.99.146:8080/user/" + recepientId
				);

				console.log(response.data);

				setRecepientData(response.data.recepientId);
			} catch (error) {
				console.log("ERROR WHILE GETTING MESSAGE USER DATA!-> ", error.message);
			}
		};
		fetchRecepientData();
	}, [recepientId]);

	// HANDLER!
	const handleSendMessage = async (messageType, imageUri) => {
		try {
			console.log(
				"HERE SENDER-ID: ",
				userId,
				"HERE RECEIVER-ID: ",
				recepientId
			);
			const formData = new FormData();
			formData.append("senderId", userId);
			formData.append("recepientId", recepientId);

			// SEND MESSAGE ACCORDING TO MESSAGE TYPE!
			if (messageType === "image") {
				formData.append("messageType", "image");
				formData.append("imageFile", {
					uri: imageUri,
					name: "image.jpg",
					type: "image/jpg",
				});
			} else {
				formData.append("messageType", "text");
				formData.append("messageText", message);
			}

			const response = await axios.post(
				"http://192.168.99.146:8080/post-message",
				formData
			);

			console.log("MESSAGE DATA-> ", response?.data);
			if (response.data.success) {
				setMessage("");
				setSelectedImage("");
			}
			fetchMessages();
		} catch (error) {
			console.log("Some error Occur", error);
		}
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: "",
			headerLeft: () => (
				<View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
					<Ionicons
						onPress={() => navigation.goBack()}
						name="arrow-back"
						size={24}
						color="black"
					/>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Image
							source={{ uri: recepientData?.image }}
							style={{
								width: 30,
								height: 30,
								borderRadius: 15,
								resizeMode: "cover",
							}}
						/>
						<Text style={{ marginLeft: 5, fontSize: 15, fontWeight: "bold" }}>
							{recepientData?.name}
						</Text>
					</View>
				</View>
			),
		});
	}, [recepientData]);

	const formatTime = (time) => {
		const options = { hours: "numeric", minutes: "numeric" };
		return new Date(time).toLocaleTimeString("en-US", options);
	};

	return (
		<KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
			<ScrollView>
				{messages.length > 0 &&
					messages.map((item, index) => {
						if (item.messageType === "text") {
							return (
								<Pressable
									key={index}
									style={[
										item?.senderId?._id === userId
											? {
													alignSelf: "flex-end",
													padding: 8,
													maxWidth: "60%",
													borderRadius: 7,
													margin: 10,
													backgroundColor: "#DCF8C6",
											  }
											: {
													alignSelf: "flex-start",
													padding: 8,
													maxWidth: "60%",
													borderRadius: 7,
													margin: 10,
													backgroundColor: "white",
											  },
									]}
								>
									<Text style={{ fontSize: 13, textAlign: "left" }}>
										{item?.messageText}
									</Text>
									<Text
										style={{
											textAlign: "right",
											fontSize: 9,
											color: "gray",
											marginTop: 5,
										}}
									>
										{formatTime(item?.createdAt)}
									</Text>
								</Pressable>
							);
						}
					})}
			</ScrollView>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					paddingHorizontal: 10,
					paddingVertical: 10,
					borderTopWidth: 1,
					borderTopColor: "#dddddd",
					marginBottom: showEmoji ? 0 : 25,
				}}
			>
				<Entypo
					onPress={() => setShowEmoji(!showEmoji)}
					name="emoji-happy"
					style={{ marginRight: 5 }}
					size={24}
					color={"gray"}
				/>
				<TextInput
					value={message}
					onChangeText={(message) => setMessage(message)}
					style={{
						flex: 1,
						height: 40,
						borderWidth: 1,
						borderColor: "#dddddd",
						borderRadius: 20,
						paddingHorizontal: 10,
					}}
					placeholder="Type Your message..."
				/>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						gap: 7,
						marginHorizontal: 8,
					}}
				>
					<Entypo name="camera" size={24} color="gray" />
					<Feather name="mic" size={24} color="gray" />
				</View>
				<Pressable
					onPress={() => handleSendMessage("text")}
					style={{
						backgroundColor: "#007bff",
						paddingVertical: 8,
						paddingHorizontal: 12,
						borderRadius: 20,
					}}
				>
					<Text style={{ color: "white", fontWeight: "bold" }}>Send</Text>
				</Pressable>
			</View>
			{showEmoji && (
				<EmojiSelector
					style={{ height: 250 }}
					onEmojiSelected={(emoji) => setMessage(message + emoji)}
				/>
			)}
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({});
