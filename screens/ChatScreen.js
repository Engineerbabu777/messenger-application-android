import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../UserContext";
import axios from "axios";
import UserChat from "../components/UserChat";

export default function ChatScreen() {
	const { userId, setUserId } = useContext(UserType);
	const [friends, setFriends] = useState([]);

	useEffect(() => {
		const getFriends = async () => {
			try {
				console.log("USERID-> ", userId);
				const response = await axios.get(
					"http://192.168.99.146:8080/get-friends/" + userId
				);

				const allFriends = response.data.friends.map((friend, ind) => {
					return {
						_id: friend._id,
						name: friend.name,
						email: friend.email,
						image: friend.image,
					};
				});

				setFriends(allFriends);

				console.log("ALL FRIENDS-> ", allFriends);
			} catch (err) {
				console.log("ERROR WHILE GETTING FRIENDS: ", err.message);
			}
		};
		getFriends();
	}, []);
	return (
		<ScrollView>
			<Pressable>
				{friends?.length > 0 &&
					friends.map((friend, ind) => {
						return <UserChat user={friend} key={ind} />;
					})}
			</Pressable>
		</ScrollView>
	);
}

const styles = StyleSheet.create({});
