export const products = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation.",
    price: 199.99,
    imageUrl: "https://example.com/images/headphones.jpg",
    categoryId: "1",
    stock: 50,
  },
  {
    id: "2",
    name: "Smartphone",
    description: "Latest model smartphone with advanced features.",
    price: 699.99,
    imageUrl: "https://example.com/images/phone.jpg",
    categoryId: "1",
    stock: 25,
  },
  {
    id: "3",
    name: "Laptop",
    description: "Powerful laptop for work and gaming.",
    price: 1299.99,
    imageUrl: "https://example.com/images/laptop.jpg",
    categoryId: "1",
    stock: 10,
  },
  {
    id: "4",
    name: "Coffee Maker",
    description: "Brew the perfect cup of coffee every time.",
    price: 89.99,
    imageUrl: "https://example.com/images/coffeemaker.jpg",
    categoryId: "2",
    stock: 30,
  },
];

export const categories = [
  {
    id: "1",
    name: "Electronics",
  },
  {
    id: "2",
    name: "Home & Kitchen",
  },
  {
    id: "3",
    name: "Clothes",
  },
];

export const users = [
  {
    id: "1",
    username: "john_doe",
    email: "john.doe@example.com",
  },
  {
    id: "2",
    username: "jane_smith",
    email: "jane.smith@example.com",
  },
];

export const reviews = [
  {
    id: "1",
    productId: "1",
    userId: "1",
    rating: 5,
    comment: "Amazing sound quality!",
  },
  {
    id: "2",
    productId: "1",
    userId: "2",
    rating: 4,
    comment: "Good battery life.",
  },
  {
    id: "3",
    productId: "2",
    userId: "1",
    rating: 4,
  },
];

export const orders = [
  {
    id: "1",
    userId: "1",
    items: [
      {
        productId: "1",
        quantity: 2,
        priceAtOrder: 199.99,
      },
    ],
  },
  {
    id: "2",
    userId: "2",
    items: [
      {
        productId: "2",
        quantity: 1,
        priceAtOrder: 699.99,
      },
    ],
  },
];
