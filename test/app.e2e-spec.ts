import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app/app.module';
import { HttpService } from '@nestjs/axios';
import { createMock } from '@golevelup/ts-jest';

describe('CourseController (e2e)', () => {
  let app: INestApplication;
  const httpService = createMock<HttpService>();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(HttpService)
      .useValue(httpService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/lepaya-courses/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/lepaya-courses/')
      .expect(200)
      .expect({});
  });

  it('/api/lepaya-courses/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/lepaya-courses/1')
      .expect(200)
      .expect({});
  });
});
