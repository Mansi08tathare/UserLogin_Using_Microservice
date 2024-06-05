import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "./user.dto";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CommonService } from "src/common-service/common-service";
import { HttpStatus } from "@nestjs/common";
import { CONSTANT_MSG } from "src/common-dto/common-dto";
import { hash } from 'bcrypt';

export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly commonService: CommonService,

  ) { }


  async addUser(body:UserDto) {
    try {
      console.log("body", body)
      const { Name,Email,Password} = body;
      let hashedPassword = await hash(body.Password, 10);
      
        let user = await this.userRepository.create({Name,Email,Password:hashedPassword});
        let resp = await this.userRepository.save(user);

        if (!resp) {
          return this.commonService.errorMessage('', CONSTANT_MSG.FAIL_TOADD_USER, HttpStatus.BAD_REQUEST)
        }
        else {
          return this.commonService.successMessage(resp, CONSTANT_MSG.USER_ADDED_SUCCESSFULLY, HttpStatus.CREATED)
        }
    }
    catch (error) {
      console.log(error);
      return this.commonService.errorMessage('', CONSTANT_MSG.INTERNAL_SERVER_ERR, HttpStatus.INTERNAL_SERVER_ERROR)

    }

  }

  





 


}