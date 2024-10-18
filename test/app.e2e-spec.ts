import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DatabaseModule } from '../src/database/database.module';
import { TestDatabaseModule } from './test-database.module';

jest.mock('uuid', () => ({ v4: () => 'mokUUID' }));

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const dto = { url: 'http://example.com' };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideModule(DatabaseModule)
      .useModule(TestDatabaseModule)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  it('POST /link-generator should crate a new link', async () => {
    return await request(app.getHttpServer())
      .post('/link-generator')
      .send(dto)
      .expect(201)
      .expect(({ body }) => {
        expect(body.link).toContain('mokUUID');
        expect(body.target).toBe(dto.url);
        expect(body.valid).toBe(true);
      });
  });

  it('GET /link-generator/:id -> should redirect to the original URL', async () => {
    const response = await request(app.getHttpServer())
      .get(`/link-generator/mokUUID`)
      .expect(302);

    expect(response.header.location).toBe(dto.url);
  });

  it('GET /link-generator/:id/stats -> should get the statistics', async () => {
    const response = await request(app.getHttpServer())
      .get(`/link-generator/mokUUID/stats`)
      .expect(200);

    expect(response.body).toEqual({
      redirectCount: 1,
      target: dto.url,
    });
  });

  it('PUT /link-generator/:id -> should invalidate the link', async () => {
    await request(app.getHttpServer())
      .post(`/link-generator`)
      .send(dto)
      .expect(201);
    await request(app.getHttpServer())
      .put(`/link-generator/mokUUID`)
      .expect(200);

    const statsResponse = await request(app.getHttpServer())
      .get(`/link-generator/mokUUID/stats`)
      .expect(200);

    expect(statsResponse.body).toEqual({
      redirectCount: 0,
      target: dto.url,
    });
  });

  it('GET /link-generator/:id -> should return a 404 error when an invalid link is passed.', async () => {
    await request(app.getHttpServer())
      .get(`/link-generator/fake-id`)
      .expect(404);
  });

  it('GET /link-generator/:id/stats -> should return a 404 error if the link does not exist.', async () => {
    await request(app.getHttpServer())
      .get('/link-generator/fake-id/stats')
      .expect(404);
  });

  it('POST /link-generator -> should return an error if the URL is invalid', async () => {
    await request(app.getHttpServer())
      .post('/link-generator')
      .send({ url: 'some' })
      .expect(400);

    await request(app.getHttpServer())
      .post('/link-generator')
      .send({ url: 'www.example.com' })
      .expect(400);
  });
});
