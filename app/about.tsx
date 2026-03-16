/**
 * about.tsx — FhazTech About & Contact Page
 *
 * Taruh di: app/(tabs)/about.tsx  atau  app/(tools)/about.tsx
 * Tambahkan entry di TabLayout atau index.tsx sesuai struktur lo
 *
 * Tidak ada dependency tambahan — pakai expo-linking yang sudah built-in Expo.
 */

import * as Linking from "expo-linking";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// ─── DATA ────────────────────────────────────────────────────────────────────

const SOCIALS = [
  {
    id: "ig",
    icon: "📸",
    label: "Instagram",
    handle: "@f.zvvn_",
    url: "https://www.instagram.com/f.zvvn_/",
    color: "#E1306C",
  },
  {
    id: "tiktok",
    icon: "🎵",
    label: "TikTok",
    handle: "@eksrovertselalu",
    url: "https://tiktok.com/@eksrovertselalu",
    color: "#69C9D0",
  },
  {
    id: "wa",
    icon: "💬",
    label: "WhatsApp",
    handle: "+62 895-403-891-152",
    url: "https://wa.me/62895403891152",
    color: "#25D366",
  },
  {
    id: "discord",
    icon: "🎮",
    label: "Discord",
    handle: "@zxyninety",
    // ⚠️ GANTI dengan invite link yang valid: https://discord.gg/xxxxxxx
    url: "https://discord.com/channels/@zxyninety",
    color: "#5865F2",
  },
  {
    id: "telegram",
    icon: "✈️",
    label: "Telegram",
    handle: "@Art_zwn",
    url: "https://t.me/Art_zwn",
    color: "#229ED9",
  },
  {
    id: "email",
    icon: "📧",
    label: "Email",
    handle: "siswayangtidakmencolook@gmail.com",
    url: "mailto:siswayangtidakmencolook@gmail.com",
    color: "#94a3b8",
    copyable: true,
  },
];

const PROJECTS = [
  {
    id: "globe",
    icon: "🌐",
    name: "3D Solar Globe",
    desc: "Interactive 3D globe & solar system built for the web.",
    url: "https://globe3d-byfhaz.netlify.app/", // ⚠️ cek URL-nya
    tag: "Three.js",
    accent: "#22c55e",
  },
  {
    id: "food",
    icon: "🍔",
    name: "Food Order Online",
    desc: "Modern online food ordering experience.",
    url: "https://app-pemesananmakanan.vercel.app/", // ⚠️ ganti URL
    tag: "React-Native",
    accent: "#f59e0b",
  },
  {
    id: "frieren",
    icon: "⚔️",
    name: "Frieren Gallery",
    desc: "Gallery experience — Frieren: Beyond Journey's End.",
    url: "https://siswayangtidakmencolok-afk.github.io/website-frieren/", // ⚠️ ganti URL
    tag: "Web",
    accent: "#818cf8",
  },
  {
    id: "absence",
    icon: "🏫",
    name: "Pendaftaran Siswa",
    desc: "Web absensi & pendaftaran siswa berbasis digital.",
    url: "https://student-registration-sage-delta.vercel.app/", // ⚠️ ganti URL
    tag: "Front-End",
    accent: "#38bdf8",
  },
  {
    id: "timeclock",
    icon: "⏱",
    name: "Absence System",
    desc: "aplikasi absensi yang bisa digunakan guru untuk daftar hadir",
    url: "https://teacher-absence-byfhaz.up.railway.app/",
    tag: "Full-Stack",
    accent: "#1E88E5",
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

function SocialCard({ item }: { item: (typeof SOCIALS)[0] }) {
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    if (item.copyable) {
      Linking.openURL(item.url).catch(() =>
        Alert.alert("Email", item.handle)
      );
      return;
    }
    Linking.openURL(item.url).catch(() =>
      Alert.alert("Tidak bisa membuka link", item.url)
    );
  };

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={handlePress}
      style={[
        styles.socialCard,
        pressed && { borderColor: item.color, backgroundColor: `${item.color}12` },
      ]}
    >
      <Text style={styles.socialIcon}>{item.icon}</Text>
      <View style={styles.socialInfo}>
        <Text style={styles.socialLabel}>{item.label}</Text>
        <Text style={[styles.socialHandle, { color: item.color }]}>{item.handle}</Text>
      </View>
      <Text style={styles.socialArrow}>{item.copyable ? "📋" : "→"}</Text>
    </Pressable>
  );
}

function ProjectCard({ item }: { item: (typeof PROJECTS)[0] }) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={() => Linking.openURL(item.url)}
      style={[
        styles.projectCard,
        pressed && { borderColor: item.accent, backgroundColor: `${item.accent}10` },
      ]}
    >
      <View style={styles.projectTop}>
        <Text style={styles.projectIcon}>{item.icon}</Text>
        <View style={[styles.projectTag, { backgroundColor: `${item.accent}20` }]}>
          <Text style={[styles.projectTagText, { color: item.accent }]}>{item.tag}</Text>
        </View>
      </View>
      <Text style={styles.projectName}>{item.name}</Text>
      <Text style={styles.projectDesc}>{item.desc}</Text>
      <Text style={[styles.projectLink, { color: item.accent }]}>Buka →</Text>
    </Pressable>
  );
}

// ─── MAIN SCREEN ─────────────────────────────────────────────────────────────

export default function About() {
  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.avatarRing}>
          <Text style={styles.avatarText}>FT</Text>
        </View>
        <Text style={styles.brandName}>FhazTech</Text>
        <Text style={styles.tagline}>Building things with code & curiosity.</Text>
        <View style={styles.divider} />
      </View>

      {/* ── Contact / Socials ── */}
      <Text style={styles.sectionTitle}>CONNECT</Text>
      <View style={styles.socialList}>
        {SOCIALS.map((item) => (
          <SocialCard key={item.id} item={item} />
        ))}
      </View>

      {/* ── Projects ── */}
      <Text style={styles.sectionTitle}>PROJECTS</Text>
      <View style={styles.projectGrid}>
        {PROJECTS.map((item) => (
          <ProjectCard key={item.id} item={item} />
        ))}
      </View>

      {/* ── Footer ── */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 FhazTech</Text>
        <Text style={styles.footerSub}>World Clock & Timer — v2.0</Text>
      </View>

    </ScrollView>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────

const C = {
  bg: "#0a0f1a",
  surface: "#111827",
  border: "#1e293b",
  textPrimary: "#f1f5f9",
  textMuted: "#64748b",
  accent: "#1E88E5",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
  },
  content: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },

  // Header
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  avatarRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: C.accent,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: `${C.accent}18`,
    marginBottom: 14,
  },
  avatarText: {
    color: C.accent,
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  brandName: {
    color: C.textPrimary,
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: 1,
  },
  tagline: {
    color: C.textMuted,
    fontSize: 14,
    marginTop: 6,
    letterSpacing: 0.5,
  },
  divider: {
    width: 40,
    height: 2,
    backgroundColor: C.accent,
    borderRadius: 2,
    marginTop: 20,
  },

  // Section title
  sectionTitle: {
    color: C.textMuted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 3,
    marginBottom: 14,
    marginTop: 8,
  },

  // Social cards
  socialList: {
    gap: 10,
    marginBottom: 36,
  },
  socialCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: C.border,
    gap: 14,
  },
  socialIcon: {
    fontSize: 20,
    width: 28,
    textAlign: "center",
  },
  socialInfo: {
    flex: 1,
  },
  socialLabel: {
    color: C.textMuted,
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  socialHandle: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 2,
  },
  socialArrow: {
    color: C.textMuted,
    fontSize: 16,
  },

  // Project grid
  projectGrid: {
    gap: 12,
    marginBottom: 40,
  },
  projectCard: {
    backgroundColor: C.surface,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: C.border,
  },
  projectTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  projectIcon: {
    fontSize: 24,
  },
  projectTag: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  projectTagText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  projectName: {
    color: C.textPrimary,
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 4,
  },
  projectDesc: {
    color: C.textMuted,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  projectLink: {
    fontSize: 13,
    fontWeight: "600",
  },

  // Footer
  footer: {
    alignItems: "center",
    gap: 4,
  },
  footerText: {
    color: C.textMuted,
    fontSize: 13,
  },
  footerSub: {
    color: `${C.textMuted}80`,
    fontSize: 11,
    letterSpacing: 0.5,
  },
});