import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";

import { LoadingScreen, palette, PrimaryButton, SectionHeading } from "@/components/clearpath-ui";
import { ScreenContainer } from "@/components/screen-container";
import { useClearPath } from "@/lib/clearpath-context";
import { dateKey, dayCount, type CheckInLevel } from "@/lib/clearpath-storage";

const checkInOptions: { level: CheckInLevel; label: string; body: string; color: string }[] = [
  { level: "steady", label: "Steady", body: "I feel present", color: "#DDF5EC" },
  { level: "uneasy", label: "Uneasy", body: "I need a pause", color: "#F9EDCB" },
  { level: "overloaded", label: "Overloaded", body: "I need support", color: "#FBE5E0" },
];

export default function HomeScreen() {
  const router = useRouter();
  const { data, isReady, submitCheckIn } = useClearPath();
  const [selected, setSelected] = useState<CheckInLevel | null>(null);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  if (!isReady) return <LoadingScreen />;

  const completedToday = data.checkIns.some((entry) => dateKey(entry.createdAt) === dateKey(new Date()));
  const onSave = async () => {
    if (!selected) return;
    await submitCheckIn(selected, note);
    setNote("");
    setSaved(true);
  };

  return (
    <ScreenContainer containerClassName="bg-background">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.topLine}>
          <View style={styles.wordmarkWrap}>
            <View style={styles.wordmarkMark}><View style={styles.wordmarkPath} /></View>
            <Text style={styles.wordmark}>ClearPath</Text>
          </View>
          <Text style={styles.privateLabel}>PRIVATE</Text>
        </View>

        <View style={styles.hero}>
          <Text style={styles.dayLabel}>DAY {dayCount(data.startedAt)}</Text>
          <Text style={styles.heroTitle}>Make space for what matters.</Text>
          <Text style={styles.heroBody}>A small pause can change the next ten minutes. You do not have to figure it all out at once.</Text>
        </View>

        <View style={styles.resetCard}>
          <View style={styles.resetHeader}>
            <View style={styles.resetIcon}><Text style={styles.resetIconText}>↗</Text></View>
            <View style={styles.resetCopy}><Text style={styles.resetTitle}>Feeling pulled off course?</Text><Text style={styles.resetBody}>Take a short, private reset.</Text></View>
          </View>
          <PrimaryButton label="Reset now" onPress={() => router.push("/reset")} tone="coral" />
        </View>

        <View style={styles.checkInSection}>
          <SectionHeading eyebrow="Daily check-in" title={completedToday ? "You checked in today." : "How are you arriving?"} body={completedToday ? "You can add another reflection anytime." : "Choose the closest match. There is no wrong answer."} />
          <View style={styles.optionList}>
            {checkInOptions.map((option) => {
              const active = selected === option.level;
              return (
                <Pressable
                  key={option.level}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  accessibilityLabel={`${option.label}: ${option.body}`}
                  onPress={() => { setSelected(option.level); setSaved(false); }}
                  style={({ pressed }) => [styles.checkOption, active && { borderColor: palette.spruce, backgroundColor: option.color }, pressed && styles.optionPressed]}
                >
                  <View style={[styles.optionDot, { backgroundColor: option.color }]} />
                  <View style={styles.optionCopy}><Text style={styles.optionTitle}>{option.label}</Text><Text style={styles.optionBody}>{option.body}</Text></View>
                  <View style={[styles.radio, active && styles.radioActive]}>{active ? <View style={styles.radioFill} /> : null}</View>
                </Pressable>
              );
            })}
          </View>

          <TextInput
            accessibilityLabel="Optional private note"
            multiline
            onChangeText={(value) => { setNote(value); setSaved(false); }}
            placeholder="A few words for yourself (optional)"
            placeholderTextColor="#8A9490"
            style={styles.noteInput}
            value={note}
          />
          <PrimaryButton label={saved ? "Check-in saved" : "Save check-in"} onPress={onSave} disabled={!selected || saved} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { gap: 24, padding: 20, paddingBottom: 34 },
  topLine: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", paddingTop: 4 },
  wordmarkWrap: { alignItems: "center", flexDirection: "row", gap: 8 },
  wordmarkMark: { alignItems: "center", backgroundColor: palette.spruce, borderRadius: 11, height: 26, justifyContent: "center", overflow: "hidden", width: 26 },
  wordmarkPath: { backgroundColor: palette.seaGlass, borderRadius: 8, height: 30, transform: [{ rotate: "-37deg" }], width: 8 },
  wordmark: { color: palette.ink, fontSize: 18, fontWeight: "800", letterSpacing: -0.4 },
  privateLabel: { color: palette.slate, fontSize: 10, fontWeight: "800", letterSpacing: 1.3 },
  hero: { gap: 8, paddingTop: 12 },
  dayLabel: { color: palette.spruceLight, fontSize: 12, fontWeight: "800", letterSpacing: 1.2 },
  heroTitle: { color: palette.ink, fontSize: 34, fontWeight: "800", letterSpacing: -1.15, lineHeight: 39, maxWidth: 330 },
  heroBody: { color: palette.slate, fontSize: 16, lineHeight: 24, maxWidth: 340 },
  resetCard: { backgroundColor: palette.spruce, borderRadius: 24, gap: 20, padding: 20 },
  resetHeader: { alignItems: "center", flexDirection: "row", gap: 13 },
  resetIcon: { alignItems: "center", backgroundColor: palette.seaGlass, borderRadius: 17, height: 48, justifyContent: "center", width: 48 },
  resetIconText: { color: palette.spruce, fontSize: 25, fontWeight: "900", marginTop: -2 },
  resetCopy: { flex: 1, gap: 3 },
  resetTitle: { color: palette.paper, fontSize: 17, fontWeight: "800" },
  resetBody: { color: "#C5DBD4", fontSize: 14 },
  checkInSection: { gap: 14 },
  optionList: { gap: 9 },
  checkOption: { alignItems: "center", backgroundColor: palette.paper, borderColor: palette.line, borderRadius: 17, borderWidth: 1, flexDirection: "row", gap: 12, minHeight: 67, paddingHorizontal: 14 },
  optionPressed: { opacity: 0.84 },
  optionDot: { borderRadius: 9, height: 18, width: 18 },
  optionCopy: { flex: 1, gap: 2 },
  optionTitle: { color: palette.ink, fontSize: 15, fontWeight: "800" },
  optionBody: { color: palette.slate, fontSize: 13 },
  radio: { alignItems: "center", borderColor: "#ACB5B1", borderRadius: 12, borderWidth: 1.5, height: 22, justifyContent: "center", width: 22 },
  radioActive: { borderColor: palette.spruce },
  radioFill: { backgroundColor: palette.spruce, borderRadius: 6, height: 12, width: 12 },
  noteInput: { backgroundColor: palette.paper, borderColor: palette.line, borderRadius: 17, borderWidth: 1, color: palette.ink, fontSize: 15, lineHeight: 21, minHeight: 92, padding: 14, textAlignVertical: "top" },
});
