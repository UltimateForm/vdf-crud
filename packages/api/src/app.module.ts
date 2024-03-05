import { Module } from "@nestjs/common";
import { DevicesController } from "controllers/DevicesController";
import { DevicesService } from "services";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongoService } from "services/db/Mongo";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { DevicesResolver } from "resolvers/DevicesResolver";

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => {
				return {
					uri: configService.get<string>("MONGODB_URI")
				};
			},
			inject: [ConfigService]
		}),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: join(process.cwd(), "src/schema.gql")
		})
	],
	controllers: [DevicesController],
	providers: [DevicesService, MongoService, DevicesResolver]
})
export class AppModule {}
