/**
 * TARUH DI: app/(tools)/stopwatch.tsx
 */

import { useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastLapRef = useRef(0);

  const handleStart = () => {
    if (running) return;
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((t) => t + 10);
    }, 10);
  };

  const handleStop = () => {
    setRunning(false);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleReset = () => {
    handleStop();
    setTime(0);
    setLaps([]);
    lastLapRef.current = 0;
  };

  const handleLap = () => {
    if (!running) return;
    const lapTime = time - lastLapRef.current;
    setLaps((prev) => [...prev, lapTime]);
    lastLapRef.current = time;
  };

  const pad = (n: number) => String(n).padStart(2, "0");
  const format = (ms: number) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const cs = Math.floor((ms % 1000) / 10);
    return pad(m) + ":" + pad(s) + "." + pad(cs);
  };

  const fastestLap = laps.length > 1 ? Math.min(...laps) : null;
  const slowestLap = laps.length > 1 ? Math.max(...laps) : null;

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <Text style={styles.title}>⏱  STOPWATCH</Text>

      <View style={styles.timeBox}>
        <Text style={styles.timeText}>{format(time)}</Text>
      </View>

      <Text style={styles.status}>
        {running ? "● Berjalan" : time > 0 ? "⏸ Dijeda" : "Siap mulai"}
      </Text>

      <View style={styles.btnRow}>
        {!running ? (
          <TouchableOpacity style={[styles.btn, styles.btnGreen]} onPress={handleStart} activeOpacity={0.7}>
            <Text style={styles.btnText}>{time === 0 ? "▶  Start" : "▶  Resume"}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.btn, styles.btnRed]} onPress={handleStop} activeOpacity={0.7}>
            <Text style={styles.btnText}>⏸  Stop</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.btn, styles.btnGray]}
          onPress={running ? handleLap : handleReset}
          activeOpacity={0.7}
        >
          <Text style={styles.btnText}>{running ? "🏁  Lap" : "↺  Reset"}</Text>
        </TouchableOpacity>
      </View>

      {laps.length > 0 && (
        <View style={styles.lapSection}>
          <View style={styles.lapHeaderRow}>
            <Text style={[styles.col1, styles.lapHeaderText]}>Lap</Text>
            <Text style={[styles.col2, styles.lapHeaderText]}>Split</Text>
            <Text style={[styles.col3, styles.lapHeaderText]}>Total</Text>
          </View>
          {[...laps].reverse().map((lapMs, idx) => {
            const lapNum = laps.length - idx;
            const isFastest = lapMs === fastestLap;
            const isSlowest = lapMs === slowestLap;
            const total = laps.slice(0, lapNum).reduce((a, b) => a + b, 0);
            return (
              <View key={String(lapNum)} style={styles.lapRow}>
                <View style={[styles.col1, styles.lapNumCell]}>
                  <View style={[styles.lapDot, {
                    backgroundColor: isFastest ? "#22c55e" : isSlowest ? "#ef4444" : "#475569"
                  }]} />
                  <Text style={styles.lapNumText}>{lapNum}</Text>
                </View>
                <Text style={[styles.col2, styles.lapSplitText,
                  isFastest ? { color: "#22c55e" } : isSlowest ? { color: "#ef4444" } : {}
                ]}>
                  {format(lapMs)}
                </Text>
                <Text style={[styles.col3, styles.lapTotalText]}>{format(total)}</Text>
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0f172a" },
  content: { alignItems: "center", paddingTop: 56, paddingBottom: 40, paddingHorizontal: 20 },
  title: { color: "#475569", fontSize: 13, fontWeight: "700", letterSpacing: 4, marginBottom: 36 },
  timeBox: {
    backgroundColor: "#1e293b", borderRadius: 20,
    paddingVertical: 28, paddingHorizontal: 36,
    marginBottom: 10, borderWidth: 1, borderColor: "#334155",
  },
  timeText: { color: "white", fontSize: 58, fontWeight: "bold", letterSpacing: 2 },
  status: { color: "#64748b", fontSize: 13, marginBottom: 28, letterSpacing: 1 },
  btnRow: { flexDirection: "row", marginBottom: 36 },
  btn: {
    paddingVertical: 16, paddingHorizontal: 28, borderRadius: 50,
    marginHorizontal: 8, minWidth: 130, alignItems: "center", justifyContent: "center",
  },
  btnGreen: { backgroundColor: "#16a34a" },
  btnRed: { backgroundColor: "#dc2626" },
  btnGray: { backgroundColor: "#1e293b", borderWidth: 1, borderColor: "#334155" },
  btnText: { color: "white", fontWeight: "700", fontSize: 15 },
  lapSection: { width: "100%", borderTopWidth: 1, borderTopColor: "#1e293b" },
  lapHeaderRow: { flexDirection: "row", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#1e293b" },
  lapHeaderText: { color: "#475569", fontSize: 11, fontWeight: "700", letterSpacing: 1 },
  lapRow: { flexDirection: "row", alignItems: "center", paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#1e293b" },
  col1: { flex: 1 },
  col2: { flex: 1.5, textAlign: "center" },
  col3: { flex: 1.5, textAlign: "right" },
  lapNumCell: { flexDirection: "row", alignItems: "center" },
  lapDot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  lapNumText: { color: "#94a3b8", fontSize: 14 },
  lapSplitText: { color: "white", fontSize: 14, fontWeight: "600", textAlign: "center" },
  lapTotalText: { color: "#64748b", fontSize: 13, textAlign: "right" },
});
