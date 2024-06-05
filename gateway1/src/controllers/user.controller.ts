import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { CONSTANT_MSG } from "src/common-dto/const";
import { loginDto } from "src/dto/login.dto";
import { UserDto } from "src/dto/user.dto";
import { UserService } from "src/service/user.service";

@Controller('user')
export class UserController{
    constructor(private readonly userService:UserService,
     ){}
    @Post('/register')
    async addUser(@Body() body: UserDto, @Res() res: any,) {
        try {
          console.log("body ",body);
          let resp = await this.userService.addUser(body);
    
          if (resp.code === 'ECONNREFUSED') {
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .send({ error: 'Device Microservice ECONNREFUSED' });
          } else if (resp.statusCode === HttpStatus.CREATED) {
            res.status(resp.statusCode).send({ success: resp.message });
          } else {
            res.status(resp.statusCode).send({ error: resp.message });
          }
        } catch (error) {
         console.log(error);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
            statusCode: false,
          });
        }
      }



@Post('/signIn')
async signIn(@Body() body:loginDto,@Res() res:any) {
  try {
    console.log("body",body);
    const resp = await this.userService.signIn(body);

    if (resp.code == 'ECONNREFUSED') {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: 'Device Microservice ECONNREFUSED' });
    } else if (resp.statusCode === HttpStatus.OK) {
      res
        .status(resp.statusCode)
        .send({ status:resp.statusCode,message: resp.message,data:resp.data });
    } else {
      res.status(resp.statusCode).send({ status:resp.statusCode, error: resp.message });
    }
    console.log("resp",resp)
 
  } catch (err) {
    console.error('Login Error:', err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
      statusCode: false,
    });
 
  }

}







    


  




}