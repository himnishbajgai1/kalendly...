import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { LoadingScreen, palette, PrimaryButton, SecondaryButton, SectionHeading } from "@/components/clearpath-ui";
import { ScreenContainer } from "@/components/screen-container";
import { useClearPath } from "@/lib/clearpath-context";
import { DEFAULT_PLAN, type PersonalPlan } from "@/lib/clearpath-storage";

const triggers = ["Late-night scrolling", "Feeling stressed", "Being alone", "Boredom"];
const actions = ["Put my phone away and take a short walk", "Take ten slow breaths", "Do a small task in another room", "Message a trusted adult"];

export default function PlanScreen() {
  const { data, isReady, updatePlan } = useClearPath();
  const [draft, setDraft] = useState<PersonalPlan>(data.plan);
  const [saved, setSaved] = useState(false);

  useEffect(() => setDraft(data.plan), [data.plan]);
  if (!isReady) return <LoadingScreen />;

  const setField = (key: keyof PersonalPlan, value: string) => {
    setSaved(false);
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const savePlan = async () => {
    await updatePlan(draft);
    setSaved(true);
  };

  return (
    <ScreenContainer containerClassName="bg-background">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <SectionHeading eyebrow="Your plan" title="Decide before the moment gets loud." body="Build a simple, private response you can return to when you need it." />
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>What are you making more room for?</Text>
          <TextInput accessibilityLabel="Your reason" multiline onChangeText={(value) => setField("reason", value)} placeholder="Write a reason that matters to you" placeholderTextColor="#8A9490" style={styles.reasonInput} value={draft.reason} />
        </View>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>A moment that can be hard</Text>
          <View style={styles.choiceList}>{triggers.map((item) => <Choice key={item} active={draft.trigger === item} label={item} onPress={() => setField("trigger", item)} />)}</View>
        </View>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>My next kind action</Text>
          <View style={styles.choiceList}>{actions.map((item) => <Choice key={item} active={draft.replacementAction === item} label={item} onPress={() => setField("replacementAction", item)} />)}</View>
        </View>
        <PrimaryButton label={saved ? "Plan saved on this device" : "Save my plan"} disabled={saved} onPress={savePlan} />
        <SecondaryButton label="Restore suggested plan" onPress={() => { setDraft({ ...DEFAULT_PLAN }); setSaved(false); }} />
        <Text style={styles.privacy}>Your plan is stored only on this device. You can change or clear it whenever you want.</Text>
      </ScrollView>
    </ScreenContainer>
  );
}

function Choice({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return <Pressable accessibilityRole="button" accessibilityState={{ selected: active }} onPress={onPress} style={({ pressed }) => [styles.choice, active && styles.choiceActive, pressed && styles.pressed]}><Text style={[styles.choiceText, active && styles.choiceTextActive]}>{label}</Text><View style={[styles.choiceMark, active && styles.choiceMarkActive]}>{active ? <Text style={styles.choiceCheck}>✓</Text> : null}</View></Pressable>;
}

const styles = StyleSheet.create({
  content: { gap: 21, padding: 20, paddingBottom: 32 },
  fieldGroup: { gap: 10 },
  label: { color: palette.ink, fontSize: 16, fontWeight: "800" },
  reasonInput: { backgroundColor: palette.paper, borderColor: palette.line, borderRadius: 17, borderWidth: 1, color: palette.ink, fontSize: 15, lineHeight: 21, minHeight: 104, padding: 14, textAlignVertical: "top" },
  choiceList: { gap: 8 },
  choice: { alignItems: "center", backgroundColor: palette.paper, borderColor: palette.line, borderRadius: 15, borderWidth: 1, flexDirection: "row", gap: 12, minHeight: 53, paddingHorizontal: 14 },
  choiceActive: { backgroundColor: palette.seaGlassPale, borderColor: palette.spruce },
  choiceText: { color: palette.ink, flex: 1, fontSize: 14, fontWeight: "700", lineHeight: 19 },
  choiceTextActive: { color: palette.spruce },
  choiceMark: { alignItems: "center", borderColor: "#A7B1AD", borderRadius: 10, borderWidth: 1, height: 20, justifyContent: "center", width: 20 },
  choiceMarkActive: { backgroundColor: palette.spruce, borderColor: palette.spruce },
  choiceCheck: { color: palette.paper, fontSize: 13, fontWeight: "900" },
  pressed: { opacity: 0.86 },
  privacy: { color: palette.slate, fontSize: 13, lineHeight: 19, paddingHorizontal: 9, textAlign: "center" },
});
