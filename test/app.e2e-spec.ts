import { INestApplication } from '@nestjs/common';
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
    await app.init();
  });

  it('POST /link-generator -> crea un nuevo link', async () => {
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

  it('GET /link-generator/:id -> redirige a la URL original', async () => {
    const response = await request(app.getHttpServer())
      .get(`/link-generator/mokUUID`)
      .expect(302);

    return expect(response.header.location).toBe(dto.url);
  });

  it('GET /link-generator/:id/stats -> obtiene estadísticas', async () => {
    const response = await request(app.getHttpServer())
      .get(`/link-generator/mokUUID/stats`)
      .expect(200);

    return expect(response.body).toEqual({
      redirectCount: 1,
      target: dto.url,
    });
  });

  it('PUT /link-generator/:id -> invalida el link', async () => {
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

    return expect(statsResponse.body).toEqual({
      redirectCount: 0,
      target: dto.url,
    });
  });

  it('GET /link-generator/:id -> retorna 404 si el link es inválido', async () => {
    return await request(app.getHttpServer())
      .get(`/link-generator/fake-id`)
      .expect(404);
  });

  it('GET /link-generator/:id/stats -> retorna 404 si el link no existe', async () => {
    return await request(app.getHttpServer())
      .get('/link-generator/fake-id/stats')
      .expect(404);
  });
});
