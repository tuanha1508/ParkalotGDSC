import { Test, TestingModule } from '@nestjs/testing';
import { GoogleRoutesController } from './google-routes.controller';

describe('GoogleMapsController', () => {
  let controller: GoogleRoutesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoogleRoutesController],
    }).compile();

    controller = module.get<GoogleRoutesController>(GoogleRoutesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
