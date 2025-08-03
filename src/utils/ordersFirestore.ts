import {
  collection,
  onSnapshot,
  QuerySnapshot,
  type DocumentData,
} from 'firebase/firestore';
import { db } from '../firebase';
import { type Order } from '../store/OrderSlices/orderTypes';

export const subscribeToOrders = (onUpdate: (orders: Order[]) => void) => {
  const ordersRef = collection(db, 'orders');
  const unsubscribe = onSnapshot(
    ordersRef,
    (snapshot: QuerySnapshot<DocumentData>) => {
      const orders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];
      onUpdate(orders);
    }
  );
  return unsubscribe;
};
