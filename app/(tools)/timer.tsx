/**
 * TARUH DI: app/(tools)/timer.tsx
 */

import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const PRESETS = [
  { label: "1 min",  seconds: 60   },
  { label: "5 min",  seconds: 300  },
  { label: "10 min", seconds: 600  },
  { label: "25 min", seconds: 1500 },
  { label: "45 min", seconds: 2700 },
  { label: "1 jam",  seconds: 3600 },
];

export default function Timer() {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [customMin, setCustomMin] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const setTimer = (seconds: number) => {
    stopTimer();
    setTotalSeconds(seconds);
    setRemaining(seconds);
    setDone(false);
  };

  const startTimer = () => {
    if (remaining === 0 || running) return;
    setRunning(true);
    setDone(false);
    intervalRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setRunning(false);
          setDone(true);
          Notifications.scheduleNotificationAsync({
            content: { title: "⏳ Timer Selesai!", body: "Waktu habis.", sound: true },
            trigger: null,
          }).catch(() => {});
          return 0;
        }
        return r - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    setRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    setRemaining(totalSeconds);
    setDone(false);
  };

  const applyCustom = () => {
    const mins = parseInt(customMin, 10);
    if (!isNaN(mins) && mins > 0 && mins <= 999) {
      setTimer(mins * 60);
    }
    setCustomMin("");
  };

  const pad = (n: number) => String(n).padStart(2, "0");
  const format = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) return pad(h) + ":" + pad(m) + ":" + pad(sec);
    return pad(m) + ":" + pad(sec);
  };

  const ringColor = done ? "#22c55e" : remaining < 60 && remaining > 0 ? "#ef4444" : "#1E88E5";

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <Text style={styles.title}>⏳  COUNTDOWN TIMER</Text>

      {/* Ring */}
      <View style={[styles.ring, { borderColor: ringColor }]}>
        <Text style={styles.ringTime}>{done ? "✅" : format(remaining)}</Text>
        <Text style={styles.ringSub}>
          {done ? "Selesai!" : totalSeconds > 0 ? `${Math.round((1 - remaining / totalSeconds) * 100)}%` : "Pilih durasi"}
        </Text>
      </View>

      {/* Presets */}
      <View style={styles.presetRow}>
        {PRESETS.map((p) => (
          <TouchableOpacity
            key={p.label}
            style={[styles.preset, totalSeconds === p.seconds && styles.presetActive]}
            onPress={() => setTimer(p.seconds)}
            activeOpacity={0.7}
          >
            <Text style={[styles.presetText, totalSeconds === p.seconds && styles.presetTextActive]}>
              {p.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Custom Input */}
      <View style={styles.customRow}>
        <TextInput
          style={styles.customInput}
          placeholder="menit"
          placeholderTextColor="#475569"
          value={customMin}
          onChangeText={setCustomMin}
          keyboardType="numeric"
          maxLength={3}
          onSubmitEditing={applyCustom}
        />
        <TouchableOpacity style={styles.customSetBtn} onPress={applyCustom} activeOpacity={0.7}>
          <Text style={styles.customSetText}>Set</Text>
        </TouchableOpacity>
      </View>

      {/* Controls */}
      <View style={styles.btnRow}>
        {!running ? (
          <TouchableOpacity
            style={[styles.btn, styles.btnGreen, remaining === 0 && styles.btnDisabled]}
            onPress={startTimer}
            disabled={remaining === 0}
            activeOpacity={0.7}
          >
            <Text style={styles.btnText}>
              {remaining === totalSeconds && totalSeconds > 0 ? "▶  Mulai" : "▶  Lanjut"}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.btn, styles.btnYellow]} onPress={stopTimer} activeOpacity={0.7}>
            <Text style={styles.btnText}>⏸  Pause</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.btn, styles.btnGray]} onPress={resetTimer} activeOpacity={0.7}>
          <Text style={styles.btnText}>↺  Reset</Text>
        </TouchableOpacity>
      </View>

      {totalSeconds === 1500 && (
        <Text style={styles.pomodoroTip}>🍅 Pomodoro — 25 menit fokus, 5 menit istirahat</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0f172a" },
  content: { alignItems: "center", paddingTop: 56, paddingBottom: 40, paddingHorizontal: 20 },
  title: { color: "#475569", fontSize: 13, fontWeight: "700", letterSpacing: 4, marginBottom: 30 },
  ring: {
    width: 220, height: 220, borderRadius: 110,
    borderWidth: 8, justifyContent: "center", alignItems: "center",
    backgroundColor: "#1e293b", marginBottom: 30,
  },
  ringTime: { color: "white", fontSize: 44, fontWeight: "bold", letterSpacing: 2 },
  ringSub: { color: "#64748b", fontSize: 13, marginTop: 6 },
  presetRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginBottom: 20 },
  preset: {
    backgroundColor: "#1e293b", paddingVertical: 10, paddingHorizontal: 18,
    borderRadius: 20, borderWidth: 1, borderColor: "transparent",
    margin: 5,
  },
  presetActive: { borderColor: "#1E88E5", backgroundColor: "#1e3a5f" },
  presetText: { color: "#94a3b8", fontSize: 14 },
  presetTextActive: { color: "#1E88E5", fontWeight: "bold" },
  customRow: { flexDirection: "row", marginBottom: 30 },
  customInput: {
    backgroundColor: "#1e293b", color: "white",
    padding: 12, borderRadius: 10, width: 100,
    textAlign: "center", fontSize: 18, marginRight: 10,
  },
  customSetBtn: {
    backgroundColor: "#334155", paddingHorizontal: 24,
    borderRadius: 10, justifyContent: "center",
  },
  customSetText: { color: "white", fontWeight: "bold", fontSize: 16 },
  btnRow: { flexDirection: "row" },
  btn: {
    paddingVertical: 16, paddingHorizontal: 28, borderRadius: 50,
    marginHorizontal: 8, minWidth: 130, alignItems: "center", justifyContent: "center",
  },
  btnGreen: { backgroundColor: "#16a34a" },
  btnYellow: { backgroundColor: "#d97706" },
  btnGray: { backgroundColor: "#1e293b", borderWidth: 1, borderColor: "#334155" },
  btnDisabled: { opacity: 0.4 },
  btnText: { color: "white", fontWeight: "700", fontSize: 15 },
  pomodoroTip: { color: "#64748b", fontSize: 13, marginTop: 20, textAlign: "center" },
});