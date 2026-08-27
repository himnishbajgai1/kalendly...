import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { LoadingScreen, palette, PrimaryButton, SecondaryButton } from "@/components/clearpath-ui";
import { ScreenContainer } from "@/components/screen-container";
import { useClearPath } from "@/lib/clearpath-context";

const resetSteps = [
  { eyebrow: "Step 1 of 3", title: "Name the moment.", body: "You are noticing an urge, not becoming it. Let this moment be here without acting right away.", prompt: "Try saying: “I can wait ten minutes.”" },
  { eyebrow: "Step 2 of 3", title: "Slow your pace.", body: "Breathe in for four counts. Hold gently. Breathe out for six. Repeat four times.", prompt: "Your only job is to make the next breath a little slower." },
  { eyebrow: "Step 3 of 3", title: "Choose your next kind action.", body: "Move toward something that gives you a little distance and a little care.", prompt: "Your saved plan is ready below when you need it." },
];

const actions = ["Put my phone away", "Take a short walk", "Drink water", "Message a trusted adult"];

export default function ResetScreen() {
  const { data, isReady, recordResetWin } = useClearPath();
  const [step, setStep] = useState(0);
  const [action, setAction] = useState(data.plan.replacementAction);
  const [complete, setComplete] = useState(false);

  if (!isReady) return <LoadingScreen />;
  const current = resetSteps[step];

  const completeReset = async () => {
    await recordResetWin(action);
    setComplete(true);
  };

  const startAgain = () => {
    setStep(0);
    setAction(data.plan.replacementAction);
    setComplete(false);
  };

  return (
    <ScreenContainer containerClassName="bg-background">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topRow}><Text style={styles.pageLabel}>RESET SPACE</Text><Text style={styles.private}>PRIVATE</Text></View>
        {complete ? (
          <View style={styles.completeCard}>
            <View style={styles.completeMark}><Text style={styles.completeMarkText}>✓</Text></View>
            <Text style={styles.completeTitle}>You made space.</Text>
            <Text style={styles.completeBody}>You chose {action.toLowerCase()}. One intentional moment is worth noticing.</Text>
            <PrimaryButton label="Start a fresh reset" onPress={startAgain} />
          </View>
        ) : (
          <>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${((step + 1) / 3) * 100}%` }]} />
            </View>
            <View style={styles.stepCard}>
              <Text style={styles.stepEyebrow}>{current.eyebrow}</Text>
              <Text style={styles.stepTitle}>{current.title}</Text>
              <Text style={styles.stepBody}>{current.body}</Text>
              <View style={styles.prompt}><Text style={styles.promptText}>{current.prompt}</Text></View>
            </View>
            {step === 2 ? (
              <View style={styles.actionSection}>
                <Text style={styles.actionHeading}>What feels possible right now?</Text>
                <View style={styles.actionList}>
                  {actions.map((item) => {
                    const active = action === item;
                    return <Pressable key={item} accessibilityRole="button" accessibilityState={{ selected: active }} onPress={() => setAction(item)} style={({ pressed }) => [styles.actionOption, active && styles.actionOptionActive, pressed && styles.pressed]}><Text style={[styles.actionText, active && styles.actionTextActive]}>{item}</Text><View style={[styles.optionCheck, active && styles.optionCheckActive]}>{active ? <Text style={styles.checkText}>✓</Text> : null}</View></Pressable>;
                  })}
                </View>
                <View style={styles.planReminder}><Text style={styles.planReminderLabel}>YOUR PERSONAL PLAN</Text><Text style={styles.planReminderText}>{data.plan.reason}</Text></View>
              </View>
            ) : null}
            <View style={styles.footerButtons}>
              {step > 0 ? <SecondaryButton label="Back" onPress={() => setStep((value) => value - 1)} /> : null}
              <View style={styles.buttonGrow}><PrimaryButton label={step === 2 ? "I chose my next step" : "Continue"} onPress={step === 2 ? completeReset : () => setStep((value) => value + 1)} /></View>
            </View>
          </>
        )}
        <Text style={styles.supportNote}>If this feels hard to manage alone, reaching out to a trusted adult or qualified professional is a strong next step.</Text>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, gap: 22, justifyContent: "center", padding: 20, paddingBottom: 32 },
  topRow: { alignItems: "center", flexDirection: "row", justifyContent: "space-between" },
  pageLabel: { color: palette.spruceLight, fontSize: 12, fontWeight: "800", letterSpacing: 1.2 },
  private: { color: palette.slate, fontSize: 10, fontWeight: "800", letterSpacing: 1.2 },
  progressTrack: { backgroundColor: "#D8DDD8", borderRadius: 4, height: 5, overflow: "hidden" },
  progressFill: { backgroundColor: palette.seaGlass, borderRadius: 4, height: "100%" },
  stepCard: { backgroundColor: palette.paper, borderColor: palette.line, borderRadius: 25, borderWidth: 1, gap: 16, padding: 24 },
  stepEyebrow: { color: palette.spruceLight, fontSize: 12, fontWeight: "800", letterSpacing: 1.1 },
  stepTitle: { color: palette.ink, fontSize: 31, fontWeight: "800", letterSpacing: -0.9, lineHeight: 37 },
  stepBody: { color: palette.slate, fontSize: 17, lineHeight: 25 },
  prompt: { backgroundColor: palette.seaGlassPale, borderRadius: 15, padding: 15 },
  promptText: { color: palette.spruce, fontSize: 14, fontWeight: "700", lineHeight: 20 },
  actionSection: { gap: 12 },
  actionHeading: { color: palette.ink, fontSize: 18, fontWeight: "800" },
  actionList: { gap: 8 },
  actionOption: { alignItems: "center", backgroundColor: palette.paper, borderColor: palette.line, borderRadius: 15, borderWidth: 1, flexDirection: "row", justifyContent: "space-between", minHeight: 54, paddingHorizontal: 15 },
  actionOptionActive: { backgroundColor: palette.seaGlassPale, borderColor: palette.spruce },
  actionText: { color: palette.ink, fontSize: 15, fontWeight: "700" },
  actionTextActive: { color: palette.spruce },
  optionCheck: { alignItems: "center", borderColor: "#A7B1AD", borderRadius: 10, borderWidth: 1, height: 20, justifyContent: "center", width: 20 },
  optionCheckActive: { backgroundColor: palette.spruce, borderColor: palette.spruce },
  checkText: { color: palette.paper, fontSize: 13, fontWeight: "900" },
  planReminder: { backgroundColor: "#EEEAE3", borderRadius: 15, gap: 5, padding: 14 },
  planReminderLabel: { color: palette.slate, fontSize: 10, fontWeight: "800", letterSpacing: 1 },
  planReminderText: { color: palette.ink, fontSize: 14, fontWeight: "600", lineHeight: 20 },
  footerButtons: { flexDirection: "row", gap: 10 },
  buttonGrow: { flex: 1 },
  completeCard: { alignItems: "center", backgroundColor: palette.spruce, borderRadius: 26, gap: 15, padding: 26 },
  completeMark: { alignItems: "center", backgroundColor: palette.seaGlass, borderRadius: 30, height: 60, justifyContent: "center", width: 60 },
  completeMarkText: { color: palette.spruce, fontSize: 31, fontWeight: "900" },
  completeTitle: { color: palette.paper, fontSize: 29, fontWeight: "800", letterSpacing: -0.7 },
  completeBody: { color: "#D0E2DC", fontSize: 16, lineHeight: 23, textAlign: "center" },
  supportNote: { color: palette.slate, fontSize: 13, lineHeight: 19, paddingHorizontal: 8, textAlign: "center" },
  pressed: { opacity: 0.86 },
});
