import type { GraphQLResolveInfo } from 'graphql';
import type { IProduct, ICategory, IUser, IReview, IOrder } from '../database/models.js';
import type { Context } from '../graphql/context.js';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddProductInput = {
  categoryId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  stock: Scalars['Int']['input'];
};

export type AddReviewInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['ID']['input'];
  rating: Scalars['Int']['input'];
};

/** Payload returned after successful authentication. */
export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
};

/** A group of related products. */
export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  products?: Maybe<Array<Product>>;
  updatedAt: Scalars['String']['output'];
};

export type CreateOrderInput = {
  items: Array<OrderItemInput>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCategory?: Maybe<Category>;
  addProduct?: Maybe<Product>;
  addReview?: Maybe<Review>;
  createOrder?: Maybe<Order>;
  deleteProduct?: Maybe<Scalars['Boolean']['output']>;
  deleteReview?: Maybe<Scalars['Boolean']['output']>;
  login: AuthPayload;
  register: AuthPayload;
  updateOrderStatus?: Maybe<Order>;
  updateProduct?: Maybe<Product>;
};


export type MutationAddCategoryArgs = {
  name: Scalars['String']['input'];
};


export type MutationAddProductArgs = {
  product?: InputMaybe<AddProductInput>;
};


export type MutationAddReviewArgs = {
  input: AddReviewInput;
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteReviewArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationUpdateOrderStatusArgs = {
  id: Scalars['ID']['input'];
  status: OrderStatus;
};


export type MutationUpdateProductArgs = {
  product?: InputMaybe<UpdateProductInput>;
};

/** An order placed by a user. */
export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  items?: Maybe<Array<OrderItem>>;
  status: OrderStatus;
  totalAmount: Scalars['Float']['output'];
  updatedAt: Scalars['String']['output'];
  user: User;
};

/** An item within an order. */
export type OrderItem = {
  __typename?: 'OrderItem';
  priceAtOrder: Scalars['Float']['output'];
  product: Product;
  quantity: Scalars['Int']['output'];
};

export type OrderItemInput = {
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};

/** Possible statuses for an order. */
export enum OrderStatus {
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
  Pending = 'PENDING',
  Shipped = 'SHIPPED'
}

/** A product available for purchase. */
export type Product = {
  __typename?: 'Product';
  category: Category;
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  reviews?: Maybe<Array<Review>>;
  stock: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

/** Root query type. */
export type Query = {
  __typename?: 'Query';
  /** Get all categories. */
  categories: Array<Category>;
  /** Get a specific category by its ID. */
  category?: Maybe<Category>;
  /** Get the order history of the currently authenticated user. */
  myOrders: Array<Order>;
  /** Get a specific product by its ID. */
  product?: Maybe<Product>;
  /** Get all products. */
  products: Array<Product>;
  /** Get the currently authenticated user's profile. */
  profile?: Maybe<User>;
};


/** Root query type. */
export type QueryCategoryArgs = {
  id: Scalars['ID']['input'];
};


/** Root query type. */
export type QueryProductArgs = {
  id: Scalars['ID']['input'];
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

/** A customer's review for a product. */
export type Review = {
  __typename?: 'Review';
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  product: Product;
  rating: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
  user: User;
};

export type UpdateProductInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
};

/** A user account in the system. */
export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  orders?: Maybe<Array<Order>>;
  reviews?: Maybe<Array<Review>>;
  updatedAt: Scalars['String']['output'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AddProductInput: AddProductInput;
  AddReviewInput: AddReviewInput;
  AuthPayload: ResolverTypeWrapper<Omit<AuthPayload, 'user'> & { user: ResolversTypes['User'] }>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Category: ResolverTypeWrapper<ICategory>;
  CreateOrderInput: CreateOrderInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LoginInput: LoginInput;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Order: ResolverTypeWrapper<IOrder>;
  OrderItem: ResolverTypeWrapper<Omit<OrderItem, 'product'> & { product: ResolversTypes['Product'] }>;
  OrderItemInput: OrderItemInput;
  OrderStatus: OrderStatus;
  Product: ResolverTypeWrapper<IProduct>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  RegisterInput: RegisterInput;
  Review: ResolverTypeWrapper<IReview>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateProductInput: UpdateProductInput;
  User: ResolverTypeWrapper<IUser>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddProductInput: AddProductInput;
  AddReviewInput: AddReviewInput;
  AuthPayload: Omit<AuthPayload, 'user'> & { user: ResolversParentTypes['User'] };
  Boolean: Scalars['Boolean']['output'];
  Category: ICategory;
  CreateOrderInput: CreateOrderInput;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  LoginInput: LoginInput;
  Mutation: Record<PropertyKey, never>;
  Order: IOrder;
  OrderItem: Omit<OrderItem, 'product'> & { product: ResolversParentTypes['Product'] };
  OrderItemInput: OrderItemInput;
  Product: IProduct;
  Query: Record<PropertyKey, never>;
  RegisterInput: RegisterInput;
  Review: IReview;
  String: Scalars['String']['output'];
  UpdateProductInput: UpdateProductInput;
  User: IUser;
}>;

export type AuthPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
}>;

export type CategoryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  products?: Resolver<Maybe<Array<ResolversTypes['Product']>>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addCategory?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<MutationAddCategoryArgs, 'name'>>;
  addProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, Partial<MutationAddProductArgs>>;
  addReview?: Resolver<Maybe<ResolversTypes['Review']>, ParentType, ContextType, RequireFields<MutationAddReviewArgs, 'input'>>;
  createOrder?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationCreateOrderArgs, 'input'>>;
  deleteProduct?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteProductArgs, 'id'>>;
  deleteReview?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteReviewArgs, 'id'>>;
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  register?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'input'>>;
  updateOrderStatus?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationUpdateOrderStatusArgs, 'id' | 'status'>>;
  updateProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, Partial<MutationUpdateProductArgs>>;
}>;

export type OrderResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<ResolversTypes['OrderItem']>>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['OrderStatus'], ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
}>;

export type OrderItemResolvers<ContextType = Context, ParentType extends ResolversParentTypes['OrderItem'] = ResolversParentTypes['OrderItem']> = ResolversObject<{
  priceAtOrder?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type ProductResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = ResolversObject<{
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  reviews?: Resolver<Maybe<Array<ResolversTypes['Review']>>, ParentType, ContextType>;
  stock?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<QueryCategoryArgs, 'id'>>;
  myOrders?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryProductArgs, 'id'>>;
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
}>;

export type ReviewResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = ResolversObject<{
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  orders?: Resolver<Maybe<Array<ResolversTypes['Order']>>, ParentType, ContextType>;
  reviews?: Resolver<Maybe<Array<ResolversTypes['Review']>>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  OrderItem?: OrderItemResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

