import { Body, ClassSerializerInterceptor, Controller, Get, Param, Patch, Post, Query, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserDTO } from './dto/user.dto';
import {Response, Request} from "express"
import { multerUpload } from 'src/config/multer.config';
import {FileFieldsInterceptor} from '@nestjs/platform-express'
@Controller('/api/v1/users')
export class UsersController {
  constructor(public usersService: UsersService) {
    //DONT DO THIS ON REAL APP
    //USE DEPENDENCY INJECTION
  }
  // @UseInterceptors(ClassSerializerInterceptor) // phải có thêm đoạn này để thực hiện ẩn filed mong muốn
  @Get()
  getUsers() {
    return this.usersService.findAllUsers();
  }
  @Get("/search")
  getUserByEmail(@Query('email') email: string) {
    return this.usersService.findUserByEmail(email);
  }
  @Post("/register")
  registerUser(@Body() body){
    return this.usersService.register(body);
  }
  @Post("/login")
  loginUser(@Body() body,@Res() res){
    return this.usersService.handleLogin(body, res);
  }
  @Patch("update/:id")
  @UseInterceptors(
    FileFieldsInterceptor([{name : 'avatar', maxCount: 1}], multerUpload)
  )
  async updateUser(@UploadedFiles() files: any,@Body() body : any,@Param("id") id : string){
    if(files.avatar){
      body.avatar = files.avatar[0].path
    }
    const updateUser = await this.usersService.handleUpdateUser(body,id);
    return updateUser
  }
  @Post('/logout') // Ensure the path is correct
  logOutAccount(@Req() req : Request, @Res() res : Response) {
     this.usersService.handleLogout(req, res);
  }
  @Post('/refresh-token')
  refreshToken(@Req() req : Request, @Res() res : Response) {
    this.usersService.handleRefreshToken(req, res);
  }
}
