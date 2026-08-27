import { Pressable, StyleSheet, Text, View, type ViewStyle } from "react-native";

export const palette = {
  spruce: "#173F3A",
  spruceLight: "#23574F",
  seaGlass: "#8FD7C4",
  seaGlassPale: "#DDF5EC",
  sand: "#F5F0E8",
  paper: "#FFFDF9",
  ink: "#18221F",
  slate: "#66736F",
  line: "#DED8CE",
  coral: "#D86A5B",
  coralPale: "#FBE5E0",
  gold: "#E8B455",
};

export function PrimaryButton({
  label,
  onPress,
  disabled = false,
  tone = "spruce",
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  tone?: "spruce" | "coral";
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.primaryButton,
        tone === "coral" && styles.coralButton,
        disabled && styles.disabledButton,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text style={styles.primaryLabel}>{label}</Text>
    </Pressable>
  );
}

export function SecondaryButton({
  label,
  onPress,
  style,
}: {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.secondaryButton, style, pressed && styles.secondaryPressed]}
    >
      <Text style={styles.secondaryLabel}>{label}</Text>
    </Pressable>
  );
}

export function SectionHeading({ eyebrow, title, body }: { eyebrow?: string; title: string; body?: string }) {
  return (
    <View style={styles.sectionHeading}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.sectionTitle}>{title}</Text>
      {body ? <Text style={styles.sectionBody}>{body}</Text> : null}
    </View>
  );
}

export function LoadingScreen() {
  return (
    <View style={styles.loading}>
      <View style={styles.loadingMark} />
      <Text style={styles.loadingLabel}>Opening your private space…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    alignItems: "center",
    backgroundColor: palette.spruce,
    borderRadius: 16,
    justifyContent: "center",
    minHeight: 54,
    paddingHorizontal: 18,
  },
  coralButton: { backgroundColor: palette.coral },
  disabledButton: { opacity: 0.45 },
  pressed: { opacity: 0.92, transform: [{ scale: 0.98 }] },
  primaryLabel: { color: palette.paper, fontSize: 16, fontWeight: "700", letterSpacing: 0.1 },
  secondaryButton: {
    alignItems: "center",
    backgroundColor: palette.paper,
    borderColor: palette.line,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 52,
    paddingHorizontal: 16,
  },
  secondaryPressed: { backgroundColor: "#F0ECE5", opacity: 0.9 },
  secondaryLabel: { color: palette.spruce, fontSize: 15, fontWeight: "700" },
  sectionHeading: { gap: 7 },
  eyebrow: { color: palette.spruceLight, fontSize: 12, fontWeight: "800", letterSpacing: 1.1, textTransform: "uppercase" },
  sectionTitle: { color: palette.ink, fontSize: 24, fontWeight: "800", letterSpacing: -0.45, lineHeight: 29 },
  sectionBody: { color: palette.slate, fontSize: 15, lineHeight: 22 },
  loading: { alignItems: "center", backgroundColor: palette.sand, flex: 1, gap: 15, justifyContent: "center" },
  loadingMark: { backgroundColor: palette.seaGlass, borderRadius: 50, height: 44, width: 44 },
  loadingLabel: { color: palette.slate, fontSize: 15, fontWeight: "600" },
});
