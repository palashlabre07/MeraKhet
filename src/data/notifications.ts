export type NotificationType = "weather" | "pest" | "mandi" | "scheme" | "budget";

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: { en: string; hi: string };
  message: { en: string; hi: string };
  time: string;
}

export interface NotificationGroup {
  group: { en: string; hi: string };
  items: NotificationItem[];
}

export const notificationGroups: NotificationGroup[] = [
  {
    group: { en: "Today", hi: "आज" },
    items: [
      {
        id: "t1",
        type: "weather",
        title: { en: "Rain Alert", hi: "वर्षा चेतावनी" },
        message: {
          en: "Light showers expected by 5 PM in Sehore. Cover harvested crop.",
          hi: "सीहोर में शाम 5 बजे तक हल्की बौछारें। कटी फसल को ढकें।",
        },
        time: "2:30 PM",
      },
      {
        id: "t2",
        type: "mandi",
        title: { en: "Wheat Price Up", hi: "गेहूँ भाव बढ़ा" },
        message: {
          en: "Wheat at ₹2,420/quintal in Sehore Mandi, up ₹40 from yesterday.",
          hi: "सीहोर मंडी में गेहूँ ₹2,420/क्विंटल, कल से ₹40 अधिक।",
        },
        time: "11:00 AM",
      },
      {
        id: "t3",
        type: "budget",
        title: { en: "Budget Reminder", hi: "बजट अनुस्मारक" },
        message: {
          en: "You have spent ₹3,600 of ₹10,000 budget. ₹6,400 remaining.",
          hi: "आपने ₹10,000 बजट में से ₹3,600 खर्च किए। ₹6,400 शेष।",
        },
        time: "9:00 AM",
      },
    ],
  },
  {
    group: { en: "Yesterday", hi: "कल" },
    items: [
      {
        id: "y1",
        type: "pest",
        title: { en: "Pest Alert — Leaf Rust", hi: "कीट चेतावनी — पत्ती रतुआ" },
        message: {
          en: "Leaf rust risk detected in your wheat field. Apply Trichoderma bio-fungicide.",
          hi: "आपके गेहूँ खेत में पत्ती रतुआ जोखिम। ट्राइकोडर्मा जैव-फफूंदनाशी लगाएँ।",
        },
        time: "4:15 PM",
      },
      {
        id: "y2",
        type: "scheme",
        title: { en: "PM-KISAN Installment", hi: "पीएम-किसान किस्त" },
        message: {
          en: "₹2,000 installment credited to your bank account. Check your passbook.",
          hi: "₹2,000 किस्त आपके बैंक खाते में जमा। अपना पासबुक देखें।",
        },
        time: "10:30 AM",
      },
    ],
  },
  {
    group: { en: "Earlier", hi: "पहले" },
    items: [
      {
        id: "e1",
        type: "mandi",
        title: { en: "Soybean Price Drop", hi: "सोयाबीन भाव गिरा" },
        message: {
          en: "Soybean fell to ₹4,850/quintal in Bhopal Mandi. Hold sale for 2 days.",
          hi: "भोपाल मंडी में सोयाबीन ₹4,850/क्विंटल गिरी। 2 दिन बिक्री रोकें।",
        },
        time: "2 days ago",
      },
      {
        id: "e2",
        type: "weather",
        title: { en: "Heat Wave Warning", hi: "लू चेतावनी" },
        message: {
          en: "Temperature may reach 38°C. Irrigate in early morning or late evening.",
          hi: "तापमान 38°C तक जा सकता है। सुबह जल्दी या शाम सिंचाई करें।",
        },
        time: "3 days ago",
      },
      {
        id: "e3",
        type: "scheme",
        title: { en: "KCC Application Approved", hi: "केसीसी आवेदन स्वीकृत" },
        message: {
          en: "Your Kisan Credit Card application is approved. Visit your bank to collect.",
          hi: "आपका किसान क्रेडिट कार्ड आवेदन स्वीकृत। बैंक से कार्ड लेने जाएँ।",
        },
        time: "5 days ago",
      },
    ],
  },
];
