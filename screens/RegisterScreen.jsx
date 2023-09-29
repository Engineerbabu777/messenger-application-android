import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";

import {
	Alert,
	KeyboardAvoidingView,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";

const RegisterScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [image, setImage] = useState("");

	const navigation = useNavigation();

	// HANDLE REGISTER !
	const handleRegister = async () => {
		// MAE USER OBJECT!
		const user = {
			email: email,
			password: password,
			name: name,
			image: image,
		};

		// MAKE A POST REQUEST!
		const response = await axios.post(
			"http://192.168.103.155:8080/register",
			user
		);
		// response.then(({data}) => {
		if (response?.data?.success) {
			console.log(data);
			Alert.alert(
				"Registration Successful",
				"You have been registered successfully"
			);
		}
		// })

		// setName('');
		// setEmail('');
		// setPassword('');
		// setImage('');
	};

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
						Register
					</Text>
					<Text style={{ marginTop: 15, fontSize: 17, fontWeight: "600" }}>
						Register to your account
					</Text>
				</View>

				<View style={{ marginTop: 50 }}>
					<View>
						<Text style={{ fontSize: 18, color: "grey", fontWeight: "600" }}>
							Name
						</Text>
						<TextInput
							value={name}
							onChangeText={(name) => setName(name)}
							placeholder="Enter Your Name"
							style={{
								borderBottomWidth: 1,
								width: 300,
								marginVertical: 10,
								fontSize: name ? 18 : 18,
							}}
							placeholderTextColor={"black"}
						/>
					</View>
					<View>
						<Text style={{ fontSize: 18, color: "grey", fontWeight: "600" }}>
							Email
						</Text>
						<TextInput
							value={email}
							onChangeText={(text) => setEmail(text)}
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
							onChangeText={(password) => setPassword(password)}
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
					<View>
						<Text style={{ fontSize: 18, color: "grey", fontWeight: "600" }}>
							Image
						</Text>
						<TextInput
							secureTextEntry
							value={image}
							onChangeText={(image) => setImage(image)}
							placeholder="Enter Your Image"
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
				<Pressable
					onPress={handleRegister}
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
						Register
					</Text>
				</Pressable>
				<Pressable
					style={{ marginTop: 15 }}
					onPress={() => navigation.goBack()}
				>
					<Text style={{ textAlign: "center", fontSize: 16, color: "gray" }}>
						Already have an account? Login
					</Text>
				</Pressable>
			</KeyboardAvoidingView>
		</View>
	);
};

export default RegisterScreen;

const styles = StyleSheet.create({});
