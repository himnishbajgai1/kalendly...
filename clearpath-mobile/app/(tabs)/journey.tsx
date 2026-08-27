import { FlatList, StyleSheet, Text, View } from "react-native";

import { LoadingScreen, palette, SectionHeading } from "@/components/clearpath-ui";
import { ScreenContainer } from "@/components/screen-container";
import { useClearPath } from "@/lib/clearpath-context";
import { dateKey, dayCount, formatShortDate, type CheckIn } from "@/lib/clearpath-storage";

function getPastWeek() {
  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date();
    day.setDate(day.getDate() - (6 - index));
    return day;
  });
}

const moodCopy = { steady: "Steady", uneasy: "Uneasy", overloaded: "Overloaded" } satisfies Record<CheckIn["level"], string>;

export default function JourneyScreen() {
  const { data, isReady } = useClearPath();
  if (!isReady) return <LoadingScreen />;

  const week = getPastWeek();
  const recent = data.checkIns.slice(0, 8);
  const header = (
    <View style={styles.header}>
      <SectionHeading eyebrow="Your journey" title="Progress can be quiet." body="Your private record reflects the moments you chose to notice." />
      <View style={styles.metricRow}>
        <View style={styles.metricCard}><Text style={styles.metricNumber}>{dayCount(data.startedAt)}</Text><Text style={styles.metricLabel}>days of intention</Text></View>
        <View style={styles.metricCard}><Text style={styles.metricNumber}>{data.resetWins.length}</Text><Text style={styles.metricLabel}>resets completed</Text></View>
      </View>
      <View style={styles.weekCard}>
        <Text style={styles.weekTitle}>This week</Text>
        <View style={styles.weekStrip}>
          {week.map((day) => {
            const hasCheckIn = data.checkIns.some((entry) => dateKey(entry.createdAt) === dateKey(day));
            return <View key={day.toISOString()} style={styles.weekDay}><View style={[styles.dayDot, hasCheckIn && styles.dayDotActive]}><Text style={[styles.dotText, hasCheckIn && styles.dotTextActive]}>{day.toLocaleDateString("en-US", { weekday: "narrow" })}</Text></View><Text style={styles.dayNumber}>{day.getDate()}</Text></View>;
          })}
        </View>
      </View>
      <Text style={styles.listTitle}>Recent check-ins</Text>
    </View>
  );

  return (
    <ScreenContainer containerClassName="bg-background">
      <FlatList
        contentContainerStyle={styles.content}
        data={recent}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={header}
        ListEmptyComponent={<View style={styles.emptyCard}><Text style={styles.emptyTitle}>Your first note can be simple.</Text><Text style={styles.emptyBody}>Check in from Today whenever you want a little clarity about the moment.</Text></View>}
        renderItem={({ item }) => <View style={styles.entry}><View style={[styles.entryMarker, item.level === "steady" ? styles.markerSteady : item.level === "uneasy" ? styles.markerUneasy : styles.markerOverloaded]} /><View style={styles.entryCopy}><Text style={styles.entryTitle}>{moodCopy[item.level]}</Text><Text numberOfLines={item.note ? 2 : 1} style={styles.entryBody}>{item.note || "No note added — you still showed up."}</Text></View><Text style={styles.entryDate}>{formatShortDate(item.createdAt)}</Text></View>}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { gap: 9, padding: 20, paddingBottom: 32 },
  header: { gap: 21, paddingBottom: 4 },
  metricRow: { flexDirection: "row", gap: 10 },
  metricCard: { backgroundColor: palette.paper, borderColor: palette.line, borderRadius: 19, borderWidth: 1, flex: 1, gap: 3, padding: 16 },
  metricNumber: { color: palette.spruce, fontSize: 27, fontWeight: "800", letterSpacing: -0.7 },
  metricLabel: { color: palette.slate, fontSize: 12, lineHeight: 16 },
  weekCard: { backgroundColor: palette.spruce, borderRadius: 22, gap: 16, padding: 19 },
  weekTitle: { color: palette.paper, fontSize: 16, fontWeight: "800" },
  weekStrip: { flexDirection: "row", justifyContent: "space-between" },
  weekDay: { alignItems: "center", gap: 7 },
  dayDot: { alignItems: "center", borderColor: "#71958C", borderRadius: 17, borderWidth: 1, height: 33, justifyContent: "center", width: 33 },
  dayDotActive: { backgroundColor: palette.seaGlass, borderColor: palette.seaGlass },
  dotText: { color: "#D0E2DC", fontSize: 12, fontWeight: "800" },
  dotTextActive: { color: palette.spruce },
  dayNumber: { color: "#C6D9D3", fontSize: 11, fontWeight: "700" },
  listTitle: { color: palette.ink, fontSize: 18, fontWeight: "800", marginTop: 1 },
  emptyCard: { backgroundColor: palette.paper, borderColor: palette.line, borderRadius: 19, borderWidth: 1, gap: 7, padding: 18 },
  emptyTitle: { color: palette.ink, fontSize: 16, fontWeight: "800" },
  emptyBody: { color: palette.slate, fontSize: 14, lineHeight: 20 },
  entry: { alignItems: "center", backgroundColor: palette.paper, borderColor: palette.line, borderRadius: 17, borderWidth: 1, flexDirection: "row", gap: 12, minHeight: 74, padding: 14 },
  entryMarker: { borderRadius: 6, height: 12, width: 12 },
  markerSteady: { backgroundColor: palette.seaGlass },
  markerUneasy: { backgroundColor: palette.gold },
  markerOverloaded: { backgroundColor: palette.coral },
  entryCopy: { flex: 1, gap: 3 },
  entryTitle: { color: palette.ink, fontSize: 15, fontWeight: "800" },
  entryBody: { color: palette.slate, fontSize: 13, lineHeight: 18 },
  entryDate: { color: palette.slate, fontSize: 12, fontWeight: "700" },
});
