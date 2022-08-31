import { Test } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthService } from '../auth.service';
import { AppModule } from '../../app.module';
import { AuthDto } from '../dto';

describe('AuthService Int', () => {
  let prisma: PrismaService;
  let authService: AuthService;

  const dto: AuthDto = {
    email: 'vlad@gmail.com',
    password: '123',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    authService = moduleRef.get(AuthService);
    await prisma.cleanDb();
  });

  describe('signup()', () => {
    it('should sign up', async () => {
      const userToken = await authService.signin(dto);
      expect(userToken).toBe(authService.signToken);
    });

    it('should throw on duplicate email', async () => {
      try {
        await authService.signin(dto);
      } catch (error) {
        expect(error.status).toBe(403);
      }
    });
});
});
