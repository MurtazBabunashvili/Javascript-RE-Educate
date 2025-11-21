import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { IUserDTO } from "./DTO/create.userdto";


@Controller("users")
export class UserController {
    constructor(private UserService:UserService){}
    @Get()
    getUsers() {
        return this.UserService.getUsers()
    }

    @Get(":id")
    getUserById(@Param() params) {
        const id = params.id
        return this.UserService.getUserById(id)
    }

    @Post()
    createUser(@Body() body:IUserDTO) {
        return this.UserService.createUser(body)
    }

    @Delete(":id")
    deleteUser(@Param() params) {
        const id = params.id
        return this.UserService.deleteUserById(id)
    }
    @Put(":id")
    updateUser(@Param() params, @Body() body:IUserDTO) {
        const id = params.id
        return this.UserService.updateUserById(id, body)
    }
}