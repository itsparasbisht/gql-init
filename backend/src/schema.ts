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
  }

  """
  A group of related products.
  """
  type Category {
    id: ID!
    name: String!
    products: [Product!]
  }

  """
  A user account in the system.
  """
  type User {
    id: ID!
    username: String!
    email: String!
    orders: [Order!]
    reviews: [Review!]
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
    Get all registered users.
    """
    users: [User!]!
    """
    Get a specific user by its ID.
    """
    user(id: ID!): User
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

  type Mutation {
    addProduct(product: AddProductInput): Product
    addCategory(name: String!): Category
    updateProduct(product: UpdateProductInput): Product
    deleteProduct(id: ID!): Boolean
  }
`;
