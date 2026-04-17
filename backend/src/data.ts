export const products = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation.",
    price: 199.99,
    imageUrl: "https://example.com/images/headphones.jpg",
    category: {
      id: "1",
      name: "Electronics",
    },
    stock: 50,
    reviews: [
      {
        id: "1",
        rating: 5,
        comment: "Amazing sound quality!",
        user: {
          id: "1",
          username: "john_doe",
          email: "john.doe@example.com",
        },
      },
      {
        id: "2",
        rating: 4,
        comment: "Good battery life.",
        user: {
          id: "2",
          username: "jane_smith",
          email: "jane.smith@example.com",
        },
      },
    ],
  },
  {
    id: "2",
    name: "Smartphone",
    description: "Latest model smartphone with advanced features.",
    price: 699.99,
    imageUrl: "https://example.com/images/phone.jpg",
    category: {
      id: "1",
      name: "Electronics",
    },
    stock: 25,
    reviews: [
      {
        id: "3",
        rating: 4,
        user: {
          id: "1",
          username: "john_doe",
          email: "john.doe@example.com",
        },
      },
    ],
  },
  {
    id: "3",
    name: "Laptop",
    description: "Powerful laptop for work and gaming.",
    price: 1299.99,
    imageUrl: "https://example.com/images/laptop.jpg",
    category: {
      id: "1",
      name: "Electronics",
    },
    stock: 10,
    reviews: [],
  },
  {
    id: "4",
    name: "Coffee Maker",
    description: "Brew the perfect cup of coffee every time.",
    price: 89.99,
    imageUrl: "https://example.com/images/coffeemaker.jpg",
    category: {
      id: "2",
      name: "Home & Kitchen",
    },
    stock: 30,
    reviews: [],
  },
];

export const categories = [
  {
    id: "1",
    name: "Electronics",
    products: products.filter((product) => product.category.id === "1"),
  },
  {
    id: "2",
    name: "Home & Kitchen",
    products: products.filter((product) => product.category.id === "2"),
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
