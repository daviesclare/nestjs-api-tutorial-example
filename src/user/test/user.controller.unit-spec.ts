import { Test } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserController } from '../user.controller';
import { EditUserDto } from '../dto';
import { User } from '@prisma/client';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const dto: EditUserDto = {
    email: 'vlad@gmail.com',
    firstName: 'djndj',
    lastName: 'djsjd'
  };

  const mockProductsService = {
    editUser: jest.fn().mockResolvedValue(dto),
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
      let dtoEdit: EditUserDto;
      let userId = 123;
      let user: User;

      beforeEach(async () => {
        user = await userController.editUser(userId, dto)  
      })

      test('then it should call userService', () => {
        expect(userService.editUser).toBeCalledWith(userId, dto);
      })

      test('then is should return a user', () => {
        expect(user.email).toEqual(dto.email);
      })
    })
  })

})
