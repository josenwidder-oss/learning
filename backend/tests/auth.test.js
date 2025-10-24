import request from 'supertest';
import app from '../index.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Auth API', () => {
  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  test('Registro exitoso', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('testuser@example.com');
  });

  test('Registro falla por email duplicado', async () => {
    await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'duplicate@example.com',
        password: 'password123'
      }
    });
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'duplicate@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'El usuario ya existe');
  });

  test('Registro falla por contraseña corta', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Short Pass',
        email: 'shortpass@example.com',
        password: '123'
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors[0].msg).toBe('La contraseña debe tener al menos 4 caracteres');
  });
});