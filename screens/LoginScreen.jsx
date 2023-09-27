import React from "react";

import {
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";

const LoginScreen = () => {
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
					<Text style={{ color: "#4A55A2", fontSize: 17, fontWeight: "600" }}>
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
							placeholder="Enter your email"
							style={{ borderBottomWidth: 1, width: 300, marginVertical: 10 }}
							placeholderTextColor={"black"}
						/>
					</View>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({});
