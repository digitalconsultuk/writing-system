import { Image } from "expo-image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Pressable, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import { SIGN_DATABASE, type MappedDataSet } from "@/data/MappedData";
import { colors } from "@/theme";

const ROUND_SECONDS = 30;

type Verdict = "idle" | "hit" | "miss";

/** Pick a sign that is not the one already on screen. */
function pickSign(exclude?: MappedDataSet): MappedDataSet {
  const pool = exclude
    ? SIGN_DATABASE.filter((entry) => entry.character !== exclude.character)
    : SIGN_DATABASE;
  // pool is never empty - SIGN_DATABASE has 26 entries and we drop at most one.
  return pool[Math.floor(Math.random() * pool.length)]!;
}

export default function CompareComponent() {
  const [value, setValue] = useState("");
  // One sign per round, not the whole database.
  const [sign, setSign] = useState<MappedDataSet>(() => pickSign());
  const [secondsLeft, setSecondsLeft] = useState(ROUND_SECONDS);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [verdict, setVerdict] = useState<Verdict>("idle");
  const [revealed, setRevealed] = useState(false);
  const [focused, setFocused] = useState(false);

  const shake = useRef(new Animated.Value(0)).current;
  const pop = useRef(new Animated.Value(1)).current;

  // One effect owns one round: new sign, fresh countdown, auto-advance.
  // Both timers are cleared when it re-runs, so nothing stacks up.
  useEffect(() => {
    setSign((current) => pickSign(current));
    setSecondsLeft(ROUND_SECONDS);
    setRevealed(false);
    setValue("");

    const tick = setInterval(
      () => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)),
      1000,
    );
    const advance = setTimeout(
      () => setRound((r) => r + 1),
      ROUND_SECONDS * 1000,
    ); 
     
    return () => {
      clearInterval(tick);
      clearTimeout(advance);
    };
  }, [round]);

  // Warm the cache once so swapping to the next sign is instant.
  useEffect(() => {
    Image.prefetch(SIGN_DATABASE.map((entry) => entry.sign));
  }, []);

  const nextRound = useCallback(() => setRound((r) => r + 1), []);

  const compareSignToLetter = () => {
    // A single letter is the whole answer, so normalise to one character.
    const guess = value.trim().slice(0, 1).toUpperCase();
    if (!guess) return;

    setValue("");
    

    // Compare against the character the sign maps to, not the object itself.
    if (guess === sign.character.toUpperCase()) {
      const nextStreak = streak + 1;
      setScore((s) => s + 10 + streak * 5);
      setStreak(nextStreak);
      setBest((b) => Math.max(b, nextStreak));
      setVerdict("hit");
      Animated.sequence([
        Animated.spring(pop, {
          toValue: 1.12,
          useNativeDriver: true,
          speed: 40,
        }),
        Animated.spring(pop, { toValue: 1, useNativeDriver: true, speed: 20 }),
      ]).start();
      nextRound();
    } else {
      setStreak(0);
      setVerdict("miss");
      Animated.sequence([
        Animated.timing(shake, {
          toValue: 8,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shake, {
          toValue: -8,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shake, {
          toValue: 6,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shake, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  // Clear the verdict banner shortly after it appears.
  useEffect(() => {
    if (verdict === "idle") return;
    const id = setTimeout(() => setVerdict("idle"), 1200);
    return () => clearTimeout(id);
  }, [verdict, round]);

  // Give the answer away in the last few seconds: the round is about to expire,
  // so the pairing is shown rather than lost. Derived instead of stored, so the
  // next round's reset can't race a `setRevealed` from the dying countdown.
  const showAnswer = revealed || secondsLeft < 4;

  const progress = Math.min(
    100,
    Math.max(0, (secondsLeft / ROUND_SECONDS) * 100),
  );
  const urgent = secondsLeft <= 5;
  const armed = value.trim().length > 0;

  return (
    // Android is edge-to-edge from SDK 54 on, so the system no longer pans or
    // resizes the window for the keyboard - the IME inset has to be read
    // directly. KeyboardAwareScrollView does that on both platforms and
    // scrolls the focused input clear of the keyboard.
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: colors.ink }}
      contentContainerStyle={{ flexGrow: 1 }}
      bottomOffset={24}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-1 px-6 pb-8 pt-16">
        {/* Title */}
        <Text className="text-center text-[11px] font-semibold uppercase tracking-[6px] text-gold-700">
          Round {round + 1}
        </Text>
        <Text className="mt-1 text-center text-3xl font-black uppercase tracking-[4px] text-gold">
          Sign Rush
        </Text>

        {/* Scoreboard */}
        <View className="mt-6 flex-row gap-3">
          <Stat label="Score" value={score} />
          <Stat label="Streak" value={streak} accent={streak > 0} />
          <Stat label="Best" value={best} />
        </View>

        {/* Sign card */}
        <Animated.View
          style={{
            marginTop: 28,
            transform: [{ translateX: shake }, { scale: pop }],
          }}
        >
          <View className="overflow-hidden rounded-3xl border-2 border-gold-700 bg-ink-800">
            <View className="items-center px-6 pb-6 pt-6">
              <Text className="text-[10px] font-semibold uppercase tracking-[4px] text-gold-700">
                Which letter is this?
              </Text>

              {/* The sign picture beside the alphabet character it maps to. */}
              <View className="mt-5 w-full flex-row items-center justify-center gap-4">
                <View className="overflow-hidden rounded-2xl border border-ink-600">
                  <Image
                    // recyclingKey clears the old picture before the next sign
                    // loads, so a stale image is never shown against a new letter.
                    recyclingKey={sign.character}
                    source={{ uri: sign.sign }}
                    style={{
                      width: 140,
                      height: 140,
                      backgroundColor: colors.inkSurface,
                    }}
                    contentFit="cover"
                    transition={200}
                    cachePolicy="memory-disk"
                    accessibilityLabel={
                      showAnswer
                        ? `Sign for the letter ${sign.character}`
                        : "Sign to identify"
                    }
                  />
                </View>

                <Text className="text-2xl font-black text-gold-700">=</Text>

                <View
                  className={`h-[140px] w-[100px] items-center justify-center rounded-2xl border ${
                    showAnswer
                      ? "border-gold bg-gold-900/30"
                      : "border-ink-600 bg-ink-700"
                  }`}
                >
                  <Text
                    className={`text-5xl font-black uppercase ${
                      showAnswer ? "text-gold-50" : "text-gold-900"
                    }`}
                  >
                    {showAnswer ? sign.character : "?"}
                  </Text>
                </View>
              </View>
            </View>

            {/* Countdown */}
            <View className="h-1.5 w-full bg-ink-600">
              <View
                className={urgent ? "h-full bg-rose-500" : "h-full bg-gold"}
                style={{ width: `${progress}%` }}
              />
            </View>
            <View className="flex-row items-center justify-between bg-ink-700 px-5 py-3">
              <Text className="text-[10px] font-semibold uppercase tracking-[3px] text-gold-700">
                New sign in
              </Text>
              <Text
                className={`text-sm font-black ${urgent ? "text-rose-400" : "text-gold-300"}`}
              >
                {String(secondsLeft).padStart(2, "0")}s
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Verdict banner - sits above the input so the keyboard can never
            cover it. Its height is always reserved, so nothing jumps when the
            message appears. */}
        <View className="mt-6 h-11 justify-center">
          {verdict !== "idle" && (
            <View
              className={`rounded-xl border px-4 py-2 ${
                verdict === "hit"
                  ? "border-gold bg-gold-900/40"
                  : "border-rose-500/60 bg-rose-950/40"
              }`}
            >
              <Text
                className={`text-center text-xs font-bold uppercase tracking-[2px] ${
                  verdict === "hit" ? "text-gold-300" : "text-rose-300"
                }`}
              >
                {verdict === "hit"
                  ? "Matched - next sign!"
                  : `Not a match`}
              </Text>
            </View>
          )}
        </View>

        {/* Input */}
        <Text className="mb-2 mt-4 text-[10px] font-semibold uppercase tracking-[3px] text-gold-700">
          Your answer
        </Text>
        <TextInput
          className={`rounded-2xl border-2 bg-ink-800 px-5 py-4 text-center text-lg font-black uppercase tracking-[6px] text-gold-50 ${
            focused ? "border-gold" : "border-ink-600"
          }`}
          placeholder="Your Answer"
          placeholderTextColor={colors.goldDark}
          autoCapitalize="characters"
          autoCorrect={false}
          autoComplete="off"
          maxLength={1}
          returnKeyType="go"
          submitBehavior="submit"
          value={value}
          onChangeText={setValue}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onSubmitEditing={compareSignToLetter}
        />

        <View className="flex-1" />

        {/* Actions */}
        <Pressable
          onPress={compareSignToLetter}
          disabled={!armed}
          accessibilityRole="button"
          className={`items-center rounded-2xl py-4 active:opacity-80 ${
            armed ? "bg-gold" : "bg-ink-700"
          }`}
        >
          <Text
            className={`text-sm font-black uppercase tracking-[3px] ${
              armed ? "text-ink" : "text-gold-900"
            }`}
          >
            Submit
          </Text>
        </Pressable>

        <View className="mt-3 flex-row items-center justify-center gap-6">
          <Pressable
            onPress={() => setRevealed(true)}
            disabled={showAnswer}
            accessibilityRole="button"
            className="items-center py-2 active:opacity-60"
          >
            <Text
              className={`text-[11px] font-semibold uppercase tracking-[3px] ${
                showAnswer ? "text-ink-600" : "text-gold-700"
              }`}
            >
              Reveal letter
            </Text>
          </Pressable>

          <Pressable
            onPress={nextRound}
            accessibilityRole="button"
            className="items-center py-2 active:opacity-60"
          >
            <Text className="text-[11px] font-semibold uppercase tracking-[3px] text-gold-700">
              Skip sign
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

function Stat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <View
      className={`flex-1 rounded-2xl border bg-ink-800 px-3 py-3 ${
        accent ? "border-gold" : "border-ink-600"
      }`}
    >
      <Text className="text-[9px] font-semibold uppercase tracking-[2px] text-gold-700">
        {label}
      </Text>
      <Text
        className={`mt-1 text-xl font-black ${accent ? "text-gold-300" : "text-gold-50"}`}
      >
        {value}
      </Text>
    </View>
  );
}
