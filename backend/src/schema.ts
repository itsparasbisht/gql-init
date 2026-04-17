import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    imageUrl: String
    category: Category!
    stock: Int!
    reviews: [Review!]
  }

  type Category {
    id: ID!
    name: String!
    products: [Product!]
  }

  type User {
    id: ID!
    username: String!
    email: String!
    orders: [Order!]
    reviews: [Review!]
  }

  type Review {
    id: ID!
    rating: Int!
    comment: String
    user: User!
    product: Product!
  }

  type Order {
    id: ID!
    user: User!
    items: [OrderItem!]
    totalAmount: Float!
    status: OrderStatus!
    createdAt: String!
  }

  enum OrderStatus {
    PENDING
    SHIPPED
    DELIVERED
    CANCELLED
  }

  type OrderItem {
    product: Product!
    quantity: Int!
    priceAtOrder: Float!
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
    users: [User!]!
    user(id: ID!): User
  }
`;
