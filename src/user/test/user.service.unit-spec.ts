import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { EditUserDto } from '../dto';

describe('UserService Unit Test', () => {
  let prisma: PrismaService;
  let service: UserService;

  beforeEach(async () => {
    const dto: EditUserDto = {
      email: 'vlad@gmail.com',
      firstName: 'djndj',
      lastName: 'djsjd'
    };
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, 
        {
        provide: PrismaService,
        // notice that only the functions we call from the model are mocked
        useValue: {
          new: jest.fn().mockResolvedValue(dto),
          constructor: jest.fn().mockResolvedValue(dto),
          find: jest.fn(),
          findOne: jest.fn(),
          update: jest.fn(),
          create: jest.fn(),
          remove: jest.fn(),
          exec: jest.fn(),
        },
      },],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
