import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { LoadingScreen, palette, SectionHeading } from "@/components/clearpath-ui";
import { ScreenContainer } from "@/components/screen-container";
import { useClearPath } from "@/lib/clearpath-context";
import { formatShortDate } from "@/lib/clearpath-storage";

export default function ProfileScreen() {
  const router = useRouter();
  const { data, isReady, clearLocalData } = useClearPath();
  if (!isReady) return <LoadingScreen />;

  const confirmReset = () => {
    Alert.alert("Clear local data?", "This removes your check-ins, reset wins, and personal plan from this device. This cannot be undone.", [
      { text: "Keep my data", style: "cancel" },
      { text: "Clear data", style: "destructive", onPress: () => { void clearLocalData(); } },
    ]);
  };

  return (
    <ScreenContainer containerClassName="bg-background">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionHeading eyebrow="Profile & privacy" title="Your space, your pace." body="ClearPath keeps this prototype simple and private by default." />
        <View style={styles.identityCard}><View style={styles.avatar}><Text style={styles.avatarText}>C</Text></View><View style={styles.identityCopy}><Text style={styles.identityTitle}>Private profile</Text><Text style={styles.identitySub}>Started {formatShortDate(data.startedAt)}</Text></View></View>
        <View style={styles.infoCard}><View style={styles.lockCircle}><Text style={styles.lockText}>⌁</Text></View><View style={styles.infoCopy}><Text style={styles.infoTitle}>Stored on this device</Text><Text style={styles.infoBody}>Your plan, check-ins, and reset moments are saved locally. There is no account, feed, or cloud sync in this prototype.</Text></View></View>
        <View style={styles.menuGroup}>
          <MenuItem label="Review my plan" detail="Edit your response plan" onPress={() => router.push("/plan")} />
          <MenuItem label="Clear local data" detail="Remove all saved reflections" danger onPress={confirmReset} />
        </View>
        <View style={styles.supportCard}><Text style={styles.supportTitle}>A note about support</Text><Text style={styles.supportBody}>ClearPath is a wellbeing tool, not medical care. If you feel overwhelmed or unsafe, talk with a trusted adult or qualified professional right away.</Text></View>
      </ScrollView>
    </ScreenContainer>
  );
}

function MenuItem({ label, detail, onPress, danger = false }: { label: string; detail: string; onPress: () => void; danger?: boolean }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={({ pressed }) => [styles.menuItem, pressed && styles.pressed]}><View style={styles.menuCopy}><Text style={[styles.menuLabel, danger && styles.dangerText]}>{label}</Text><Text style={styles.menuDetail}>{detail}</Text></View><Text style={[styles.arrow, danger && styles.dangerText]}>›</Text></Pressable>;
}

const styles = StyleSheet.create({
  content: { gap: 18, padding: 20, paddingBottom: 32 },
  identityCard: { alignItems: "center", backgroundColor: palette.spruce, borderRadius: 22, flexDirection: "row", gap: 14, padding: 18 },
  avatar: { alignItems: "center", backgroundColor: palette.seaGlass, borderRadius: 23, height: 46, justifyContent: "center", width: 46 },
  avatarText: { color: palette.spruce, fontSize: 21, fontWeight: "900" },
  identityCopy: { gap: 3 },
  identityTitle: { color: palette.paper, fontSize: 17, fontWeight: "800" },
  identitySub: { color: "#C6D9D3", fontSize: 13 },
  infoCard: { alignItems: "flex-start", backgroundColor: palette.paper, borderColor: palette.line, borderRadius: 21, borderWidth: 1, flexDirection: "row", gap: 13, padding: 17 },
  lockCircle: { alignItems: "center", backgroundColor: palette.seaGlassPale, borderRadius: 17, height: 34, justifyContent: "center", width: 34 },
  lockText: { color: palette.spruce, fontSize: 20, fontWeight: "900" },
  infoCopy: { flex: 1, gap: 4 },
  infoTitle: { color: palette.ink, fontSize: 15, fontWeight: "800" },
  infoBody: { color: palette.slate, fontSize: 13, lineHeight: 19 },
  menuGroup: { backgroundColor: palette.paper, borderColor: palette.line, borderRadius: 18, borderWidth: 1, overflow: "hidden" },
  menuItem: { alignItems: "center", borderBottomColor: palette.line, borderBottomWidth: 1, flexDirection: "row", minHeight: 68, paddingHorizontal: 16 },
  menuCopy: { flex: 1, gap: 3 },
  menuLabel: { color: palette.ink, fontSize: 15, fontWeight: "800" },
  menuDetail: { color: palette.slate, fontSize: 12 },
  arrow: { color: palette.slate, fontSize: 28, fontWeight: "300", lineHeight: 28 },
  dangerText: { color: "#B74C40" },
  supportCard: { backgroundColor: palette.coralPale, borderRadius: 19, gap: 6, padding: 17 },
  supportTitle: { color: "#913D34", fontSize: 15, fontWeight: "800" },
  supportBody: { color: "#6C413A", fontSize: 13, lineHeight: 19 },
  pressed: { backgroundColor: "#F0ECE5", opacity: 0.9 },
});
