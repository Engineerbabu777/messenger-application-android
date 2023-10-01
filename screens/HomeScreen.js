import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { UserType } from "../UserContext";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import User from "../components/User";

export default function HomeScreen() {
	const navigation = useNavigation();
	const { userId, setUserId } = useContext(UserType);
	const [users, setUsers] = useState([]);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: "",
			headerLeft: () => (
				<Text style={{ fontSize: 20, fontWeight: "bold" }}>Babu Chat</Text>
			),
			headerRight: () => (
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						gap: 8,
						alignItems: "center",
					}}
				>
					<Ionicons
						onPress={() => navigation.navigate("Chat")}
						name="chatbox-ellipses-outline"
						size={24}
						color="black"
					/>
					<MaterialIcons
						onPress={() => navigation.navigate("Friends")}
						name="people-outline"
						size={24}
						color="black"
					/>
				</View>
			),
		});
	}, []);

	useEffect(() => {
		const fetchUsers = async () => {
			const token = await AsyncStorage.getItem("authToken");
			const decode = jwtDecode(token);
			const userId = decode.userId;
			console.log("Data-> ", userId, decode);
			setUserId(userId);
			// MAKE A REQUEST!
			const response = await axios.get(
				"http://192.168.99.146:8080/users/" + userId
			);
			if (response.data.error) {
				console.log("GETTING USERS ERROR !", response.data.message);
			}
			// ELSE EVERYTHING IS OK!
			setUsers(response.data.userDocs);
			console.log("ALL USERS-> ", response.data.userDocs);
		};
		fetchUsers();
	}, []);

	return (
		<View>
			<View>
				{users.map((user, ind) => (
					<View key={ind} style={{ padding: 10 }}>
						<User user={user} />
					</View>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({});
