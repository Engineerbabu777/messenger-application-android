import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { UserType } from "../UserContext";
import axios from "axios";

export default function User({ user }) {
	const { userId, setUserId } = useContext(UserType);
	const [requestSent, setRequestSent] = useState([]);
	const [friends, setFriends] = useState([]);
	const [friendRequests, setFriendRequests] = useState([]);

	useEffect(() => {
		const fetchFriendRequests = async () => {
			try {
				const response = await axios.get(
					"http://192.168.99.146:8080/friends/request-sent/" + userId
				);
				if(response.data.success){
					setRequestSent(response.data.sentRequests);
				}

				console.log("SENT FRIEND REQUESTS-> ", response.data.sentRequests);
			} catch (error) {
				console.log("ERROR WHILE SENDING REQUEST-> ", error);
			}
		};

		fetchFriendRequests();
	}, []);

	useEffect(() => {
		const fetchFriends = async () => {
			try {
				const response = await axios.get(
					"http://192.168.99.146:8080/friends/" + userId
				);

				if(response.data.success){
					setFriends(response.data.userFriendIds);
				}

				console.log("SENT FRIEND REQUESTS-> ", response.data.userFriendIds);
			} catch (error) {
				console.log("ERROR WHILE SENDING REQUEST-> ", error);
			}
		};

		fetchFriends();
	}, []);

	const sentRequest = async (selectedUserId) => {
		try {
			const response = await axios.post(
				"http://192.168.99.146:8080/send-request",
				{ selectedUserId, currentUserId: userId }
			);

			console.log(response.data);
		} catch (err) {
			console.log("ERROR WHILE SENDING REQUEST-> ", err);
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
