// Dummy data for testing
const dummyOrders = [
  { 
    id: 101, 
    customer: "John Doe", 
    items: [{ name: "Pizza", qty: 2, price: 350 }], 
    status: "pending", 
    time: "09:15" 
  },
  { 
    id: 102, 
    customer: "Sarah", 
    items: [
      { name: "Burger", qty: 1, price: 250 }, 
      { name: "Fries", qty: 2, price: 80 }
    ], 
    status: "pending", 
    time: "12:40" 
  },
  { 
    id: 103, 
    customer: "Alex", 
    items: [{ name: "Shawarma", qty: 3, price: 180 }], 
    status: "in-progress", 
    time: "18:10" 
  },
  { 
    id: 104, 
    customer: "Mia", 
    items: [{ name: "Pasta", qty: 2, price: 220 }], 
    status: "completed", 
    time: "22:30" 
  },
];

export default dummyOrders;
