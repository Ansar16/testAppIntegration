import {
  Controller,
  Post,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../../logics/user/user.service';

@Controller('api/user')
export class ApiUserController {
  constructor(private userService: UserService) {}


  @Get('getUsers')
  public async getUsers(@Req() req, @Res() res) {
    let allUsers = await this.userService.findAllUsers('user')
    res.json(allUsers)
  }

  @Get('getAccessOfArray')
  public async getAccessOfArray(@Req() req, @Res() res) {
    let user = await this.userService.findOne(req.originalUrl.split("=")[1])
    res.json(user.has_access_of)
  }

  @Post('updatePlatformAccess')
  public async updatePlatformAccess(@Req() req, @Res() res) {
    let updateUser = await this.userService.updatePlatformAccess(req.body.id, req.body.hasAccessOf)
    res.json(updateUser)
  }
}
