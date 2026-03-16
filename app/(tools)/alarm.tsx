import * as Notifications from "expo-notifications";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

type AlarmItem = {
  id: string;
  time: string; // "HH:MM"
  label: string;
  enabled: boolean;
  notifId?: string;
};

export default function Alarm() {
  const [alarms, setAlarms] = useState<AlarmItem[]>([]);
  const [timeInput, setTimeInput] = useState("");
  const [labelInput, setLabelInput] = useState("");

  // Format input: auto-insert colon
  const handleTimeInput = (val: string) => {
    const digits = val.replace(/\D/g, "");
    if (digits.length <= 2) {
      setTimeInput(digits);
    } else {
      setTimeInput(`${digits.slice(0, 2)}:${digits.slice(2, 4)}`);
    }
  };

  const scheduleNotification = async (time: string, label: string): Promise<string | null> => {
    const [hours, minutes] = time.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes) || hours > 23 || minutes > 59) return null;

    const now = new Date();
    const alarmDate = new Date();
    alarmDate.setHours(hours, minutes, 0, 0);
    if (alarmDate <= now) {
      alarmDate.setDate(alarmDate.getDate() + 1);
    }

    const secondsUntil = Math.max(1, Math.floor((alarmDate.getTime() - now.getTime()) / 1000));

    try {
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: "⏰ Alarm",
          body: label || `Alarm ${time}`,
          sound: true,
        },
        trigger: { seconds: secondsUntil },
      });
      return id;
    } catch {
      return null;
    }
  };

  const cancelNotification = async (notifId?: string) => {
    if (notifId) {
      await Notifications.cancelScheduledNotificationAsync(notifId);
    }
  };

  const addAlarm = async () => {
    const trimmed = timeInput.trim();
    if (!/^\d{2}:\d{2}$/.test(trimmed)) {
      Alert.alert("Format salah", "Masukkan waktu dalam format HH:MM (contoh: 07:30)");
      return;
    }

    const [h, m] = trimmed.split(":").map(Number);
    if (h > 23 || m > 59) {
      Alert.alert("Waktu tidak valid", "Jam 0-23, menit 0-59");
      return;
    }

    const label = labelInput.trim() || `Alarm ${trimmed}`;
    const notifId = await scheduleNotification(trimmed, label);

    const newAlarm: AlarmItem = {
      id: Date.now().toString(),
      time: trimmed,
      label,
      enabled: true,
      notifId: notifId ?? undefined,
    };

    setAlarms((prev) =>
      [...prev, newAlarm].sort((a, b) => a.time.localeCompare(b.time))
    );

    setTimeInput("");
    setLabelInput("");
  };

  const toggleAlarm = async (id: string) => {
    setAlarms((prev) =>
      prev.map(async (a) => {
        if (a.id !== id) return a;
        if (a.enabled) {
          await cancelNotification(a.notifId);
          return { ...a, enabled: false, notifId: undefined };
        } else {
          const newNotifId = await scheduleNotification(a.time, a.label);
          return { ...a, enabled: true, notifId: newNotifId ?? undefined };
        }
      }) as any
    );

    // Simpler approach: just toggle UI, reschedule if turning on
    setAlarms((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
  };

  const deleteAlarm = async (alarm: AlarmItem) => {
    await cancelNotification(alarm.notifId);
    setAlarms((prev) => prev.filter((a) => a.id !== alarm.id));
  };

  const getTimeUntil = (timeStr: string) => {
    const [h, m] = timeStr.split(":").map(Number);
    const now = new Date();
    const target = new Date();
    target.setHours(h, m, 0, 0);
    if (target <= now) target.setDate(target.getDate() + 1);
    const diff = target.getTime() - now.getTime();
    const hours = Math.floor(diff / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    if (hours === 0) return `${mins} menit lagi`;
    return `${hours} jam ${mins} menit lagi`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⏰ Alarm</Text>

      {/* Input Card */}
      <View style={styles.inputCard}>
        <TextInput
          style={styles.timeField}
          placeholder="07:30"
          placeholderTextColor="#475569"
          value={timeInput}
          onChangeText={handleTimeInput}
          keyboardType="numeric"
          maxLength={5}
        />
        <TextInput
          style={styles.labelField}
          placeholder="Label alarm (opsional)"
          placeholderTextColor="#475569"
          value={labelInput}
          onChangeText={setLabelInput}
        />
        <Pressable style={styles.addBtn} onPress={addAlarm}>
          <Text style={styles.addBtnText}>+ Tambah Alarm</Text>
        </Pressable>
      </View>

      {alarms.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🔕</Text>
          <Text style={styles.emptyText}>Belum ada alarm</Text>
        </View>
      ) : (
        <FlatList
          data={alarms}
          keyExtractor={(item) => item.id}
          style={{ width: "100%" }}
          renderItem={({ item }) => (
            <View style={[styles.alarmCard, !item.enabled && styles.alarmDisabled]}>
              <View style={styles.alarmInfo}>
                <Text style={styles.alarmTime}>{item.time}</Text>
                <Text style={styles.alarmLabel}>{item.label}</Text>
                {item.enabled && (
                  <Text style={styles.alarmCountdown}>{getTimeUntil(item.time)}</Text>
                )}
              </View>
              <View style={styles.alarmActions}>
                <Switch
                  value={item.enabled}
                  onValueChange={() => toggleAlarm(item.id)}
                  trackColor={{ false: "#334155", true: "#1E88E5" }}
                  thumbColor="white"
                />
                <Pressable onPress={() => deleteAlarm(item)} style={styles.deleteBtn}>
                  <Text style={styles.deleteBtnText}>✕</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  inputCard: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    gap: 10,
  },
  timeField: {
    backgroundColor: "#0f172a",
    color: "white",
    padding: 14,
    borderRadius: 10,
    fontSize: 32,
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 4,
  },
  labelField: {
    backgroundColor: "#0f172a",
    color: "white",
    padding: 12,
    borderRadius: 10,
    fontSize: 15,
  },
  addBtn: {
    backgroundColor: "#1E88E5",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  addBtnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.4,
  },
  emptyIcon: { fontSize: 48, marginBottom: 10 },
  emptyText: { color: "white", fontSize: 16 },
  alarmCard: {
    backgroundColor: "#1e293b",
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  alarmDisabled: { opacity: 0.4 },
  alarmInfo: { flex: 1 },
  alarmTime: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  alarmLabel: {
    color: "#94a3b8",
    fontSize: 14,
    marginTop: 2,
  },
  alarmCountdown: {
    color: "#1E88E5",
    fontSize: 12,
    marginTop: 4,
  },
  alarmActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  deleteBtn: {
    padding: 8,
  },
  deleteBtnText: {
    color: "#ef4444",
    fontSize: 18,
    fontWeight: "bold",
  },
});