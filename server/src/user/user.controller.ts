import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { Response, Request } from 'express';
import { multerUpload } from 'src/config/multer.config';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
@Controller('/api/v1/users')
export class UsersController {
  constructor(public usersService: UsersService) {}
  // @UseInterceptors(ClassSerializerInterceptor) // phải có thêm đoạn này để thực hiện ẩn filed mong muốn
  @Get()
  getUsers() {
    return this.usersService.findAllUsers();
  }
  @Get('/:id')
  getUsersById(@Param('id') id) {
    return this.usersService.findUsersById(id);
  }
  @Get('/search')
  getUserByEmail(@Query('email') email: string) {
    return this.usersService.findUserByEmail(email);
  }
  @Post('/register')
  registerUser(@Body() body) {
    return this.usersService.register(body);
  }
  @Post('/login')
  loginUser(@Body() body, @Res() res) {
    return this.usersService.handleLogin(body, res);
  }
  @Patch('update/:id')
  async updateUser(
    @Body() body: any,
    @Param('id') id: string,
  ) {
    const updateUser = await this.usersService.handleUpdateUser(body, id);
    return updateUser;
  }
  @Patch('/upload-one/:id')
  @UseInterceptors(
      FileFieldsInterceptor([{name : 'avatar', maxCount: 1}], multerUpload)
    )
  async updateAvatar(
    @UploadedFiles() files: any,
    @Body() body: any,
    @Param('id') id: string,
  ) {
     if(files.avatar){
      body.avatar = files.avatar[0].path
    }
    const updateUser = await this.usersService.handleUpdateAvatar(body, id);
    return updateUser;
  }
  @Post('/logout') // Ensure the path is correct
  logOutAccount(@Req() req: Request, @Res() res: Response) {
    return this.usersService.handleLogout(req, res);
  }
  @Post('/refresh-token')
  refreshToken(@Req() req: Request, @Res() res: Response) {
    return this.usersService.handleRefreshToken(req, res);
  }
}
