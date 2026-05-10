import { gql } from "@/generated";

export const GET_PROFILE = gql(`
  query GetProfile {
    profile {
      id
      email
      createdAt
    }
  }
`);

export const GET_MY_ORDERS = gql(`
  query GetMyOrders {
    myOrders {
      id
      totalAmount
      status
      createdAt
      items {
        product {
          name
        }
        quantity
        priceAtOrder
      }
    }
  }
`);

export const GET_PRODUCTS = gql(`
  query GetProducts {
    products {
      id
      name
      description
      price
      imageUrl
      category {
        id
        name
      }
      stock
    }
  }
`);

export const GET_PRODUCT = gql(`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      imageUrl
      stock
      category {
        name
      }
      reviews {
        id
        rating
        comment
        user {
          email
        }
        createdAt
      }
    }
  }
`);

export const GET_CATEGORIES = gql(`
  query GetCategories {
    categories {
      id
      name
    }
  }
`);
