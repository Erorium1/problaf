import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported as isAnalyticsSupported } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Firebase web app configuration
// You can safely keep this in frontend; these keys are already public in your config
const firebaseConfig = {
  apiKey: 'AIzaSyC_7AuSAarIc-1_CaScAMCdWTgIDmELotI',
  authDomain: 'problaf.firebaseapp.com',
  projectId: 'problaf',
  storageBucket: 'problaf.firebasestorage.app',
  messagingSenderId: '767063044502',
  appId: '1:767063044502:web:b39c183ce20ab56a706db7',
  measurementId: 'G-LJ833TDP6K',
};

// Initialize Firebase app (singleton)
export const app = initializeApp(firebaseConfig);

// Analytics (guarded, чтобы не падало на SSR / старых браузерах)
export let analytics = null;
if (typeof window !== 'undefined') {
  isAnalyticsSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch(() => {
      // ignore analytics errors
    });
}

// Firestore, Storage & Auth instances
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);


