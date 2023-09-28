import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";

import {
	KeyboardAvoidingView,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";

const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigation = useNavigation();

	// LOGIN FUNCTION!
	const loginHandler = async() => {
		const user = {
			email,password,
		}

		// MAKE A POST REQUEST!
		const response = await axios.post('http://192.168.199.2:8080/login',user);
		

	}

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "white",
				padding: 10,
				alignItems: "center",
			}}
		>
			<KeyboardAvoidingView>
				<View
					style={{
						marginTop: 100,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Text style={{ color: "#4A55A2", fontSize: 17, fontWeight: "700" }}>
						Sign In
					</Text>
					<Text style={{ marginTop: 15, fontSize: 17, fontWeight: "600" }}>
						Sign In to your account
					</Text>
				</View>
				<View style={{ marginTop: 50 }}>
					<View>
						<Text style={{ fontSize: 18, color: "grey", fontWeight: "600" }}>
							Email
						</Text>
						<TextInput
							value={email}
							onChange={(text) => setEmail(text)}
							placeholder="Enter Your Email"
							style={{
								borderBottomWidth: 1,
								width: 300,
								marginVertical: 10,
								fontSize: email ? 18 : 18,
							}}
							placeholderTextColor={"black"}
						/>
					</View>
					<View>
						<Text style={{ fontSize: 18, color: "grey", fontWeight: "600" }}>
							Password
						</Text>
						<TextInput
							secureTextEntry
							value={password}
							onChange={(password) => setPassword(password)}
							placeholder="Enter Your Password"
							style={{
								borderBottomWidth: 1,
								width: 300,
								marginVertical: 10,
								fontSize: password ? 18 : 18,
							}}
							placeholderTextColor={"black"}
						/>
					</View>
				</View>
				<Pressable onPress={loginHandler}
					style={{
						backgroundColor: "#4A55A2",
						width: 200,
						padding: 15,
						marginTop: 50,
						marginLeft: "auto",
						marginRight: "auto",
						borderRadius: 6,
					}}
				>
					<Text
						style={{
							textAlign: "center",
							fontSize: 16,
							fontWeight: "bold",
							color: "white",
						}}
					>
						Login
					</Text>
				</Pressable>
				<Pressable
					style={{ marginTop: 15 }}
					onPress={() => navigation.navigate("Register")}
				>
					<Text style={{ textAlign: "center", fontSize: 16, color: "gray" }}>
						Don't have an account? Sign Up
					</Text>
				</Pressable>
			</KeyboardAvoidingView>
		</View>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({});
