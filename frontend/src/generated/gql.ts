/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation Register($input: RegisterInput!) {\n    register(input: $input) {\n      token\n      user {\n        id\n        email\n      }\n    }\n  }\n": typeof types.RegisterDocument,
    "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      token\n      user {\n        id\n        email\n      }\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation AddReview($input: AddReviewInput!) {\n    addReview(input: $input) {\n      id\n      rating\n      comment\n      createdAt\n    }\n  }\n": typeof types.AddReviewDocument,
    "\n  mutation CreateOrder($input: CreateOrderInput!) {\n    createOrder(input: $input) {\n      id\n      totalAmount\n      status\n    }\n  }\n": typeof types.CreateOrderDocument,
    "\n  mutation AddProduct($product: AddProductInput!) {\n    addProduct(product: $product) {\n      id\n      name\n      price\n    }\n  }\n": typeof types.AddProductDocument,
    "\n  query GetProfile {\n    profile {\n      id\n      email\n      createdAt\n    }\n  }\n": typeof types.GetProfileDocument,
    "\n  query GetMyOrders {\n    myOrders {\n      id\n      totalAmount\n      status\n      createdAt\n      items {\n        product {\n          name\n        }\n        quantity\n        priceAtOrder\n      }\n    }\n  }\n": typeof types.GetMyOrdersDocument,
    "\n  query GetProducts {\n    products {\n      id\n      name\n      description\n      price\n      imageUrl\n      category {\n        id\n        name\n      }\n      stock\n    }\n  }\n": typeof types.GetProductsDocument,
    "\n  query GetProduct($id: ID!) {\n    product(id: $id) {\n      id\n      name\n      description\n      price\n      imageUrl\n      stock\n      category {\n        name\n      }\n      reviews {\n        id\n        rating\n        comment\n        user {\n          email\n        }\n        createdAt\n      }\n    }\n  }\n": typeof types.GetProductDocument,
    "\n  query GetCategories {\n    categories {\n      id\n      name\n    }\n  }\n": typeof types.GetCategoriesDocument,
};
const documents: Documents = {
    "\n  mutation Register($input: RegisterInput!) {\n    register(input: $input) {\n      token\n      user {\n        id\n        email\n      }\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      token\n      user {\n        id\n        email\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation AddReview($input: AddReviewInput!) {\n    addReview(input: $input) {\n      id\n      rating\n      comment\n      createdAt\n    }\n  }\n": types.AddReviewDocument,
    "\n  mutation CreateOrder($input: CreateOrderInput!) {\n    createOrder(input: $input) {\n      id\n      totalAmount\n      status\n    }\n  }\n": types.CreateOrderDocument,
    "\n  mutation AddProduct($product: AddProductInput!) {\n    addProduct(product: $product) {\n      id\n      name\n      price\n    }\n  }\n": types.AddProductDocument,
    "\n  query GetProfile {\n    profile {\n      id\n      email\n      createdAt\n    }\n  }\n": types.GetProfileDocument,
    "\n  query GetMyOrders {\n    myOrders {\n      id\n      totalAmount\n      status\n      createdAt\n      items {\n        product {\n          name\n        }\n        quantity\n        priceAtOrder\n      }\n    }\n  }\n": types.GetMyOrdersDocument,
    "\n  query GetProducts {\n    products {\n      id\n      name\n      description\n      price\n      imageUrl\n      category {\n        id\n        name\n      }\n      stock\n    }\n  }\n": types.GetProductsDocument,
    "\n  query GetProduct($id: ID!) {\n    product(id: $id) {\n      id\n      name\n      description\n      price\n      imageUrl\n      stock\n      category {\n        name\n      }\n      reviews {\n        id\n        rating\n        comment\n        user {\n          email\n        }\n        createdAt\n      }\n    }\n  }\n": types.GetProductDocument,
    "\n  query GetCategories {\n    categories {\n      id\n      name\n    }\n  }\n": types.GetCategoriesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Register($input: RegisterInput!) {\n    register(input: $input) {\n      token\n      user {\n        id\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Register($input: RegisterInput!) {\n    register(input: $input) {\n      token\n      user {\n        id\n        email\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      token\n      user {\n        id\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      token\n      user {\n        id\n        email\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddReview($input: AddReviewInput!) {\n    addReview(input: $input) {\n      id\n      rating\n      comment\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation AddReview($input: AddReviewInput!) {\n    addReview(input: $input) {\n      id\n      rating\n      comment\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateOrder($input: CreateOrderInput!) {\n    createOrder(input: $input) {\n      id\n      totalAmount\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOrder($input: CreateOrderInput!) {\n    createOrder(input: $input) {\n      id\n      totalAmount\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddProduct($product: AddProductInput!) {\n    addProduct(product: $product) {\n      id\n      name\n      price\n    }\n  }\n"): (typeof documents)["\n  mutation AddProduct($product: AddProductInput!) {\n    addProduct(product: $product) {\n      id\n      name\n      price\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetProfile {\n    profile {\n      id\n      email\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetProfile {\n    profile {\n      id\n      email\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMyOrders {\n    myOrders {\n      id\n      totalAmount\n      status\n      createdAt\n      items {\n        product {\n          name\n        }\n        quantity\n        priceAtOrder\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMyOrders {\n    myOrders {\n      id\n      totalAmount\n      status\n      createdAt\n      items {\n        product {\n          name\n        }\n        quantity\n        priceAtOrder\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetProducts {\n    products {\n      id\n      name\n      description\n      price\n      imageUrl\n      category {\n        id\n        name\n      }\n      stock\n    }\n  }\n"): (typeof documents)["\n  query GetProducts {\n    products {\n      id\n      name\n      description\n      price\n      imageUrl\n      category {\n        id\n        name\n      }\n      stock\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetProduct($id: ID!) {\n    product(id: $id) {\n      id\n      name\n      description\n      price\n      imageUrl\n      stock\n      category {\n        name\n      }\n      reviews {\n        id\n        rating\n        comment\n        user {\n          email\n        }\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProduct($id: ID!) {\n    product(id: $id) {\n      id\n      name\n      description\n      price\n      imageUrl\n      stock\n      category {\n        name\n      }\n      reviews {\n        id\n        rating\n        comment\n        user {\n          email\n        }\n        createdAt\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCategories {\n    categories {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetCategories {\n    categories {\n      id\n      name\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;