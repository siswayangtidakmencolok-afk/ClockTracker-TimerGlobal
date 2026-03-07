import * as Notifications from "expo-notifications";

export async function scheduleAlarm(seconds: number) {

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Alarm",
      body: "Waktu yang kamu set sudah tiba"
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: seconds,
      repeats: false
    }
  });

}