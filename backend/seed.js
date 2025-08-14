const mongoose = require("mongoose");
const Restaurant = require("./models/Restaurant");
require("dotenv").config();

const seedData = [
  {
    name: "Injera House",
    location: { type: "Point", coordinates: [38.7578, 9.0346] },
    ownerId: "689b1accb49d7bbe1ed858a6",
    menu: [
      { name: "Doro Wat", price: 120, description: "Spicy chicken stew with egg", image: "", inStock: true },
      { name: "Tibs", price: 90, description: "Fried beef cubes with onions and spices", image: "", inStock: true }
    ],
    verified: true
  },
  {
    name: "Little Italy",
    location: { type: "Point", coordinates: [38.7489, 9.0302] },
    ownerId: "689b1ad8b49d7bbe1ed858a9",
    menu: [
      { name: "Lasagna", price: 150, description: "Layers of pasta with cheese and sauce", image: "", inStock: true },
      { name: "Garlic Bread", price: 40, description: "Crispy bread with garlic butter", image: "", inStock: true }
    ],
    verified: true
  },
  {
    name: "Sushi Zen",
    location: { type: "Point", coordinates: [38.7611, 9.0403] },
    ownerId: "689b1ae1b49d7bbe1ed858ac",
    menu: [
      { name: "California Roll", price: 180, description: "Crab, avocado, cucumber", image: "", inStock: true },
      { name: "Salmon Nigiri", price: 200, description: "Salmon over vinegared rice", image: "", inStock: true }
    ],
    verified: true
  },
  {
    name: "Burger Base",
    location: { type: "Point", coordinates: [38.7633, 9.0455] },
    ownerId: "689b1ae8b49d7bbe1ed858af",
    menu: [
      { name: "Classic Burger", price: 95, description: "Beef patty with lettuce and cheese", image: "", inStock: true },
      { name: "Fries", price: 30, description: "Crispy golden fries", image: "", inStock: true }
    ],
    verified: true
  },
  {
    name: "Vegan Vibes",
    location: { type: "Point", coordinates: [38.7592, 9.0390] },
    ownerId: "689b1af1b49d7bbe1ed858b2",
    menu: [
      { name: "Tofu Stir Fry", price: 110, description: "Tofu with mixed vegetables", image: "", inStock: true },
      { name: "Vegan Bowl", price: 125, description: "Grains, greens, and beans", image: "", inStock: true }
    ],
    verified: true
  },
  {
    name: "Shawarma King",
    location: { type: "Point", coordinates: [38.7660, 9.0480] },
    ownerId: "689b1af8b49d7bbe1ed858b5",
    menu: [
      { name: "Chicken Shawarma", price: 85, description: "Grilled chicken with garlic sauce", image: "", inStock: true },
      { name: "Falafel Wrap", price: 70, description: "Chickpea balls in pita bread", image: "", inStock: true }
    ],
    verified: true
  },
  {
    name: "Curry Spot",
    location: { type: "Point", coordinates: [38.7512, 9.0378] },
    ownerId: "689b1b04b49d7bbe1ed858b8",
    menu: [
      { name: "Chicken Curry", price: 130, description: "Spicy Indian-style curry", image: "", inStock: true },
      { name: "Naan Bread", price: 35, description: "Oven-baked flatbread", image: "", inStock: true }
    ],
    verified: true
  },
  {
    name: "MexiBites",
    location: { type: "Point", coordinates: [38.7644, 9.0321] },
    ownerId: "689b1b0fb49d7bbe1ed858bb",
    menu: [
      { name: "Tacos", price: 80, description: "Corn tortillas with beef and salsa", image: "", inStock: true },
      { name: "Burrito Bowl", price: 140, description: "Rice, beans, veggies, and meat", image: "", inStock: true }
    ],
    verified: true
  },
  {
    name: "Waffle World",
    location: { type: "Point", coordinates: [38.7493, 9.0356] },
    ownerId: "689b1b18b49d7bbe1ed858be",
    menu: [
      { name: "Belgian Waffle", price: 75, description: "Thick waffle with syrup", image: "", inStock: true },
      { name: "Strawberry Delight", price: 90, description: "Waffle topped with strawberries", image: "", inStock: true }
    ],
    verified: true
  },
  {
    name: "Fusion Feast",
    location: { type: "Point", coordinates: [38.7557, 9.0382] },
    ownerId: "689b1b21b49d7bbe1ed858c1",
    menu: [
      { name: "Korean BBQ Pizza", price: 160, description: "Pizza with Korean-style beef", image: "", inStock: true },
      { name: "Samosa Tacos", price: 85, description: "Fusion of Indian samosas and Mexican tacos", image: "", inStock: true }
    ],
    verified: true
  }
]

const seedRestaurants = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await Restaurant.deleteMany(); // Clear existing data
    await Restaurant.insertMany(seedData);

    console.log("🍽️ Seeded restaurants successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
};

seedRestaurants();
