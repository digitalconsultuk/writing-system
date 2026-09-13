
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Link } from "expo-router"

export default function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logging in with', email, password);
    // TODO: hook up to your auth logic
    // add service call
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-white rounded-lg drop-shadow-lg"
    >
      <View className="flex-1 justify-center px-6">
        <Text className="text-3xl font-bold text-black mb-2 text-center">
          Welcome Back
        </Text>
        <Text className="text-base text-gray-500 mb-8 text-center">
          Sign in to continue
        </Text>

        <View className="mb-4">
          <Text className="text-sm text-black mb-1">Email</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-base"
            placeholder="you@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View className="mb-6">
          <Text className="text-sm text-black mb-1">Password</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-base text-black"
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          className="bg-black rounded-lg py-4 items-center"
          onPress={handleLogin}
        >
          <Text className="text-white text-base font-semibold">Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity className="mt-4 items-center">
          <Text className="text-sm text-gray-500">
            Don't have an account? <Text className="text-black font-semibold">Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}