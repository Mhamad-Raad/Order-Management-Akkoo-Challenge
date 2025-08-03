import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAcwSWFlVRTjxX_zIlYy-LTaQriaA3mHWs',
  authDomain: 'order-management-724c7.firebaseapp.com',
  projectId: 'order-management-724c7',
  storageBucket: 'order-management-724c7.firebasestorage.app',
  messagingSenderId: '495145564783',
  appId: '1:495145564783:web:e2223c2c456fe10afc6b9a',
  measurementId: 'G-R5E5Q7ZDVK',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
