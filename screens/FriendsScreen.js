import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../UserContext";
import axios from "axios";
import FriendRequest from "../components/FriendRequest";

export default function FriendsScreen() {
	const { userId, setUserId } = useContext(UserType);
	const [requests, setRequests] = useState([]);

    console.log(userId)

	useEffect(() => {
		const getRequests = async () => {
			try {
				console.log("USERID-> ", userId);
				const response = await axios.get(
					`http://192.168.99.146:8080/friend-requests/` + userId
				);

				const allRequests = response.data.friendRequests.map((friend, ind) => {
					return {
						_id: friend._id,
						name: friend.name,
						email: friend.email,
						image: friend.image,
					};
				});

				setRequests(allRequests);

				console.log('ALL REQUSTEST-> ',allRequests);
			} catch (err) {
				console.log("ERROR WHILE GETTING REQUESTS: ", err.message);
			}
		};
		getRequests();
	}, []);

	return (
		<View style={{ padding: 10, marginHorizontal: 12 }}>
			{requests?.length > 0 && (<Text>You requests Here!</Text>)}

			{requests.length > 0 &&
				requests.map((r, i) => {
					return (
						<FriendRequest
							key={i}
							item={r}
							FriendRequests={requests}
							setFriendRequests={setRequests}
						/>
					);
				})}
		</View>
	);
}

const styles = StyleSheet.create({});
