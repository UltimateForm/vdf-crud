import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: "./src/graphql/schemas/schema.gql",
	documents: ["src/**/*.graphql"],
	generates: {
		"./src/store/api/generated.ts": {
			plugins: [
				"typescript",
				"typescript-operations",
				"typescript-resolvers",
				"typescript-rtk-query"
			],
			config: {
				importBaseApiFrom: "store/api"
			}
		}
	},
	ignoreNoDocuments: true
};

export default config;
