import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import { colors } from "@/theme";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [revealed, setRevealed] = useState(false);

  const ready = email.trim().length > 0 && password.length > 0;

  const handleLogin = () => {
    console.log("Logging in with", email, password);
    // TODO: hook up to your auth logic
    // add service call
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: colors.ink }}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      bottomOffset={24}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
      showsVerticalScrollIndicator={false}
    >
      <View className="px-6 py-10">
        {/* Brand mark */}
        <View className="mb-8 items-center">
          <View className="h-16 w-16 items-center justify-center rounded-2xl border-2 border-gold bg-ink-800">
            <Ionicons name="book-sharp" size={28} color={colors.gold} />
          </View>
        </View>

        <Text className="text-center text-3xl font-black uppercase tracking-[3px] text-gold">
          Welcome Back
        </Text>
        <Text className="mb-10 mt-2 text-center text-sm text-gold-700">
          Sign in to continue
        </Text>

        <Field
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          textContentType="emailAddress"
          returnKeyType="next"
        />

        <Field
          label="Password"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!revealed}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="password"
          returnKeyType="go"
          onSubmitEditing={handleLogin}
          accessory={
            <Pressable
              onPress={() => setRevealed((r) => !r)}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel={revealed ? "Hide password" : "Show password"}
            >
              <Ionicons
                name={revealed ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={colors.goldDim}
              />
            </Pressable>
          }
        />

        <Pressable className="mb-8 mt-1 self-end py-1 active:opacity-60">
          <Text className="text-xs font-semibold uppercase tracking-[2px] text-gold-700">
            Forgot password?
          </Text>
        </Pressable>

        <Pressable
          onPress={handleLogin}
          disabled={!ready}
          className={`items-center rounded-2xl py-4 active:opacity-80 ${
            ready ? "bg-gold" : "bg-ink-700"
          }`}
        >
          <Text
            className={`text-sm font-black uppercase tracking-[3px] ${
              ready ? "text-ink" : "text-gold-900"
            }`}
          >
            Log In
          </Text>
        </Pressable>

        <View className="mt-6 flex-row items-center justify-center">
          <Text className="text-sm text-gold-700">
            Don&apos;t have an account?{" "}
          </Text>
          <Link href="/RegisterScreen" asChild>
            <Pressable className="active:opacity-60">
              <Text className="text-sm font-bold text-gold">Sign up</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

type FieldProps = React.ComponentProps<typeof TextInput> & {
  label: string;
  /** Rendered inside the field box, e.g. a show/hide password toggle. */
  accessory?: React.ReactNode;
};

function Field({ label, accessory, ...inputProps }: FieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View className="mb-5">
      <Text className="mb-2 text-[10px] font-semibold uppercase tracking-[3px] text-gold-700">
        {label}
      </Text>
      <View
        className={`flex-row items-center rounded-2xl border-2 bg-ink-800 px-5 ${
          focused ? "border-gold" : "border-ink-600"
        }`}
      >
        <TextInput
          className="flex-1 py-4 text-base font-semibold text-gold-50"
          placeholderTextColor={colors.goldDark}
          {...inputProps}
          onFocus={(e) => {
            setFocused(true);
            inputProps.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            inputProps.onBlur?.(e);
          }}
        />
        {accessory ? <View className="pl-3">{accessory}</View> : null}
      </View>
    </View>
  );
}
