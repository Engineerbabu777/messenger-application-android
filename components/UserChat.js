import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function UserChat({ user }) {
	const navigation = useNavigation();

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
				<Text style={{ marginTop: 3, color: "gray", fontWeight: "500" }}>
					last message comes here
				</Text>
			</View>

			<View>
				<Text style={{ fontSize: 11, fontWeight: "400", color: "#585858" }}>
					3:00 am
				</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({});