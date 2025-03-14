import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"
import { getAnalytics } from "firebase/analytics"

// 환경 변수를 사용하여 Firebase 설정
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

// Firebase 초기화
const app = initializeApp(firebaseConfig)

// Analytics는 클라이언트 사이드에서만 초기화
let _analytics = null
if (typeof window !== 'undefined') {
  _analytics = getAnalytics(app)
}

export const storage = getStorage(app) 