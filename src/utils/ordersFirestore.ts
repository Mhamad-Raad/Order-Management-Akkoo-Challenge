import {
  collection,
  onSnapshot,
  QuerySnapshot,
  type DocumentData,
} from 'firebase/firestore';
import { db } from '../firebase';
import { type Order } from '../types/orderTypes';

export const subscribeToOrders = (
  onUpdate: (orders: Order[]) => void,
  onError?: (error: unknown) => void
) => {
  const ordersRef = collection(db, 'orders');

  const unsubscribe = onSnapshot(
    ordersRef,
    (snapshot: QuerySnapshot<DocumentData>) => {
      try {
        const orders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Order[];
        onUpdate(orders);
      } catch (err) {
        console.error('Error processing orders snapshot:', err);
        onError?.(err);
      }
    },
    (error) => {
      console.error('Firestore subscription failed:', error);
      onError?.(error);
    }
  );

  return unsubscribe;
};
