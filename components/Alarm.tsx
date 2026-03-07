import * as Notifications from "expo-notifications";

export async function setAlarm(seconds: number) {

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Alarm",
      body: "Waktu kamu sudah habis ⏰",
    },
    trigger: {
      seconds: seconds,
    } as Notifications.TimeIntervalTriggerInput,
  });

}