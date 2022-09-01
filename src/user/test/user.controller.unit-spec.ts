import { Test } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserController } from '../user.controller';
import { EditUserDto } from '../dto';
import { User } from '@prisma/client';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;


  const user: User = {
    id: 123,
    email: 'vlad@gmail.com',
    firstName: 'djndj',
    lastName: 'djsjd',
    createdAt:  new Date(2018, 11, 24),
    updatedAt: new Date(2018, 11, 24),
    hash: 'dsfhsj'
  }

  const dto: EditUserDto = {
    email: user.email,
    firstName: 'djndj',
    lastName: 'djsjd'
  };

  const mockProductsService = {
    editUser: jest.fn().mockResolvedValue(user),
 }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [UserService]
    }).overrideProvider(UserService).useValue(mockProductsService).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService =  moduleRef.get<UserService>(UserService);
    jest.clearAllMocks();
  }) 

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('editUser', () => {
    describe('when editUser in userController is called', () => {
      let userReturned: User;

      beforeEach(async () => {
        userReturned = await userController.editUser(user.id, dto)  
      })

      test('then it should call userService', () => {
        expect(userService.editUser).toBeCalledWith(user.id, dto);
      })

      test('then is should return a user', () => {
        expect(userReturned.email).toEqual(user.email);
        expect(userReturned.id).toEqual(user.id);
        expect(userReturned.firstName).toEqual(user.firstName);
        expect(userReturned.lastName).toEqual(user.lastName);
      })
    })
  })

})
