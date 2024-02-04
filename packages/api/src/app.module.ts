import { Module } from "@nestjs/common";
import { DevicesController } from "controllers/DevicesController";
import { DevicesService } from "services";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongoService } from "services/db/Mongo";

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => {
				return {
					uri: configService.get<string>("MONGODB_URI"),
				};
			},
			inject: [ConfigService],
		}),
	],
	controllers: [DevicesController],
	providers: [DevicesService, MongoService],
})
export class AppModule {}
