import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ordersData from '../data/mock-orders.json';
import { type Order } from '../types/orderTypes';

const uploadMockOrders = async () => {
  const orders: Order[] = (ordersData as any).orders;
  for (const order of orders) {
    try {
      const { id, ...rest } = order;
      await addDoc(collection(db, 'orders'), rest);
      console.log('Uploaded:', order.customerName);
    } catch (error) {
      console.error('Error uploading:', order.customerName, error);
    }
  }
};

export default uploadMockOrders;

// change App/tsx to the following code when ran for the first time
// import { useEffect } from 'react';
// import { uploadMockOrders } from './scripts/uploadOrders';

// const App = () => {
//   useEffect(() => {
//     uploadMockOrders();
//   }, []);

//   return <div>Uploading mock orders to Firestore...</div>;
// };

// export default App;
