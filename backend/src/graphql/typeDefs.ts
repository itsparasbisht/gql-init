import { gql } from "graphql-tag";

export const typeDefs = gql`
  """
  A product available for purchase.
  """
  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    imageUrl: String
    category: Category!
    stock: Int!
    reviews: [Review!]
    createdAt: String!
    updatedAt: String!
  }

  """
  A group of related products.
  """
  type Category {
    id: ID!
    name: String!
    products: [Product!]
    createdAt: String!
    updatedAt: String!
  }

  """
  A user account in the system.
  """
  type User {
    id: ID!
    email: String!
    orders: [Order!]
    reviews: [Review!]
    createdAt: String!
    updatedAt: String!
  }

  """
  Payload returned after successful authentication.
  """
  type AuthPayload {
    token: String!
    user: User!
  }

  """
  A customer's review for a product.
  """
  type Review {
    id: ID!
    rating: Int!
    comment: String
    user: User!
    product: Product!
    createdAt: String!
    updatedAt: String!
  }

  """
  An order placed by a user.
  """
  type Order {
    id: ID!
    user: User!
    items: [OrderItem!]
    totalAmount: Float!
    status: OrderStatus!
    createdAt: String!
    updatedAt: String!
  }

  """
  Possible statuses for an order.
  """
  enum OrderStatus {
    PENDING
    SHIPPED
    DELIVERED
    CANCELLED
  }

  """
  An item within an order.
  """
  type OrderItem {
    product: Product!
    quantity: Int!
    priceAtOrder: Float!
  }

  """
  Root query type.
  """
  type Query {
    """
    Get all products.
    """
    products: [Product!]!
    """
    Get a specific product by its ID.
    """
    product(id: ID!): Product
    """
    Get all categories.
    """
    categories: [Category!]!
    """
    Get a specific category by its ID.
    """
    category(id: ID!): Category
    """
    Get the currently authenticated user's profile.
    """
    profile: User
    """
    Get the order history of the currently authenticated user.
    """
    myOrders: [Order!]!
  }

  input AddProductInput {
    name: String!
    description: String
    price: Float!
    imageUrl: String
    categoryId: ID!
    stock: Int!
  }

  input UpdateProductInput {
    id: ID!
    name: String
    description: String
    price: Float
    imageUrl: String
    categoryId: ID
    stock: Int
  }

  input RegisterInput {
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input AddReviewInput {
    productId: ID!
    rating: Int!
    comment: String
  }

  input OrderItemInput {
    productId: ID!
    quantity: Int!
  }

  input CreateOrderInput {
    items: [OrderItemInput!]!
  }

  type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    addProduct(product: AddProductInput): Product
    addCategory(name: String!): Category
    updateProduct(product: UpdateProductInput): Product
    deleteProduct(id: ID!): Boolean
    addReview(input: AddReviewInput!): Review
    deleteReview(id: ID!): Boolean
    createOrder(input: CreateOrderInput!): Order
    updateOrderStatus(id: ID!, status: OrderStatus!): Order
  }
`;
