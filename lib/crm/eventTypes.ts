export const EVENT_TYPES = {
  NOTE: {
    key: "NOTE",
    title: "یادداشت",
    icon: "📝",
    color: "blue",
  },

  STATUS_CHANGED: {
    key: "STATUS_CHANGED",
    title: "تغییر وضعیت",
    icon: "🔄",
    color: "purple",
  },

  CALL: {
    key: "CALL",
    title: "تماس",
    icon: "📞",
    color: "green",
  },

  SMS: {
    key: "SMS",
    title: "پیامک",
    icon: "💬",
    color: "cyan",
  },

  WHATSAPP: {
    key: "WHATSAPP",
    title: "واتساپ",
    icon: "🟢",
    color: "emerald",
  },

  EMAIL: {
    key: "EMAIL",
    title: "ایمیل",
    icon: "📧",
    color: "indigo",
  },

  FILE: {
    key: "FILE",
    title: "فایل",
    icon: "📎",
    color: "orange",
  },

  TASK: {
    key: "TASK",
    title: "وظیفه",
    icon: "✅",
    color: "teal",
  },

  REMINDER: {
    key: "REMINDER",
    title: "یادآوری",
    icon: "⏰",
    color: "amber",
  },

  ASSIGNED: {
    key: "ASSIGNED",
    title: "واگذاری پرونده",
    icon: "👤",
    color: "rose",
  },
} as const;

export type EventType = keyof typeof EVENT_TYPES;