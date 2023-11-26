import { useState } from "react";
import { Text, View, TextInput, Pressable } from "react-native";
import { io } from "socket.io-client";

export const socket = io("http://192.168.0.8:3000");

export default function App() {
  const [name, setName] = useState("Someone");

  const handleSubmit = () => {
    const data = {
      name: name.trim(),
      selectedIcon: 1,
    };
    socket.username = name;
    socket.icon = 1;
    socket.emit("userConnected", data);
  };

  return (
    <View className="bg-zinc-800 h-screen flex justify-center items-center">
      <Text className="text-white">Hello World</Text>
      <TextInput
        className="h-14 w-3/4 m-4 p-4 rounded-md bg-white"
        placeholder="@Username"
        onChangeText={(newText) => setName(newText)}
      ></TextInput>
      <Pressable className="bg-amber-500 p-4 rounded-md" onPress={handleSubmit}>
        <Text>Ready?</Text>
      </Pressable>
    </View>
  );
}
