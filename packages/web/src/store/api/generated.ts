import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { api } from 'store/api';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: { input: any; output: any; }
  /** Represents NULL values */
  Void: { input: any; output: any; }
};

export type DeviceCursor = {
  __typename?: 'DeviceCursor';
  count: Scalars['Int']['output'];
  items: Array<DeviceOutput>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type DeviceOutput = {
  __typename?: 'DeviceOutput';
  description: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  lastConnection?: Maybe<Scalars['BigInt']['output']>;
  lastName: Scalars['String']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  parentOrg: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  role: Scalars['String']['output'];
  type: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createDevice: DeviceOutput;
  deleteDevice?: Maybe<Scalars['Void']['output']>;
  updateDevice: DeviceOutput;
};


export type MutationCreateDeviceArgs = {
  description: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  parentOrg: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  role: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


export type MutationDeleteDeviceArgs = {
  userId: Scalars['String']['input'];
};


export type MutationUpdateDeviceArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  parentOrg?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  device: DeviceOutput;
  devices: DeviceCursor;
};


export type QueryDeviceArgs = {
  userId: Scalars['String']['input'];
};


export type QueryDevicesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateDeviceMutationVariables = Exact<{
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  description: Scalars['String']['input'];
  parentOrg: Scalars['String']['input'];
  role: Scalars['String']['input'];
  type: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
}>;


export type CreateDeviceMutation = { __typename?: 'Mutation', createDevice: { __typename?: 'DeviceOutput', userId: string, firstName: string, lastName: string, description: string, lastConnection?: any | null, phoneNumber: string, parentOrg: string, role: string, type: string, latitude?: number | null, longitude?: number | null } };

export type DevicesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DevicesQuery = { __typename?: 'Query', devices: { __typename?: 'DeviceCursor', limit: number, totalCount: number, skip: number, items: Array<{ __typename?: 'DeviceOutput', userId: string, firstName: string, lastName: string, description: string, lastConnection?: any | null, parentOrg: string, phoneNumber: string, role: string, type: string, latitude?: number | null, longitude?: number | null }> } };



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DeviceCursor: ResolverTypeWrapper<DeviceCursor>;
  DeviceOutput: ResolverTypeWrapper<DeviceOutput>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Void: ResolverTypeWrapper<Scalars['Void']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BigInt: Scalars['BigInt']['output'];
  Boolean: Scalars['Boolean']['output'];
  DeviceCursor: DeviceCursor;
  DeviceOutput: DeviceOutput;
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  Void: Scalars['Void']['output'];
};

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type DeviceCursorResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeviceCursor'] = ResolversParentTypes['DeviceCursor']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['DeviceOutput']>, ParentType, ContextType>;
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  skip?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeviceOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeviceOutput'] = ResolversParentTypes['DeviceOutput']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastConnection?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  parentOrg?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createDevice?: Resolver<ResolversTypes['DeviceOutput'], ParentType, ContextType, RequireFields<MutationCreateDeviceArgs, 'description' | 'firstName' | 'lastName' | 'parentOrg' | 'phoneNumber' | 'role' | 'type'>>;
  deleteDevice?: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, RequireFields<MutationDeleteDeviceArgs, 'userId'>>;
  updateDevice?: Resolver<ResolversTypes['DeviceOutput'], ParentType, ContextType, RequireFields<MutationUpdateDeviceArgs, 'userId'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  device?: Resolver<ResolversTypes['DeviceOutput'], ParentType, ContextType, RequireFields<QueryDeviceArgs, 'userId'>>;
  devices?: Resolver<ResolversTypes['DeviceCursor'], ParentType, ContextType, RequireFields<QueryDevicesArgs, 'limit' | 'skip'>>;
};

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void';
}

export type Resolvers<ContextType = any> = {
  BigInt?: GraphQLScalarType;
  DeviceCursor?: DeviceCursorResolvers<ContextType>;
  DeviceOutput?: DeviceOutputResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Void?: GraphQLScalarType;
};



export const CreateDeviceDocument = `
    mutation createDevice($firstName: String!, $lastName: String!, $description: String!, $parentOrg: String!, $role: String!, $type: String!, $phoneNumber: String!, $latitude: Float, $longitude: Float) {
  createDevice(
    firstName: $firstName
    lastName: $lastName
    description: $description
    parentOrg: $parentOrg
    role: $role
    type: $type
    phoneNumber: $phoneNumber
    latitude: $latitude
    longitude: $longitude
  ) {
    userId
    firstName
    lastName
    description
    lastConnection
    phoneNumber
    parentOrg
    role
    type
    latitude
    longitude
  }
}
    `;
export const DevicesDocument = `
    query devices($skip: Int, $limit: Int) {
  devices(limit: $limit, skip: $skip) {
    limit
    totalCount
    skip
    items {
      userId
      firstName
      lastName
      description
      lastConnection
      parentOrg
      phoneNumber
      role
      type
      latitude
      longitude
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    createDevice: build.mutation<CreateDeviceMutation, CreateDeviceMutationVariables>({
      query: (variables) => ({ document: CreateDeviceDocument, variables })
    }),
    devices: build.query<DevicesQuery, DevicesQueryVariables | void>({
      query: (variables) => ({ document: DevicesDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useCreateDeviceMutation, useDevicesQuery, useLazyDevicesQuery } = injectedRtkApi;

