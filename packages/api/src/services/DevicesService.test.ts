import { Test, TestingModule } from "@nestjs/testing";
import { DevicesService } from "./DevicesService";

describe("AppController", () => {
	let devicesService: DevicesService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			providers: [DevicesService],
		}).compile();

		devicesService = app.get<DevicesService>(DevicesService);
	});

	describe("root", () => {
		it('should return "Hello World!"', () => {
			expect(devicesService.getDevice("")).toBeDefined();
		});
	});
});
