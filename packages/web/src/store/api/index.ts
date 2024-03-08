import { createApi } from "@reduxjs/toolkit/query/react";
import { GraphQLClient } from "graphql-request";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";

export const client = new GraphQLClient(
	`${import.meta.env.VITE_API_URL}/graphql`
);

export const api = createApi({
	baseQuery: graphqlRequestBaseQuery({ client }),
	endpoints: () => ({})
});
