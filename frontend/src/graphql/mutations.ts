import { gql } from "@/generated";

export const REGISTER_MUTATION = gql(`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        id
        email
      }
    }
  }
`);

export const LOGIN_MUTATION = gql(`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        email
      }
    }
  }
`);

export const ADD_REVIEW_MUTATION = gql(`
  mutation AddReview($input: AddReviewInput!) {
    addReview(input: $input) {
      id
      rating
      comment
      createdAt
    }
  }
`);

export const CREATE_ORDER_MUTATION = gql(`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
      totalAmount
      status
    }
  }
`);

export const ADD_PRODUCT_MUTATION = gql(`
  mutation AddProduct($product: AddProductInput!) {
    addProduct(product: $product) {
      id
      name
      price
    }
  }
`);
