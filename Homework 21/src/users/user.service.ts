import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import { IUserDTO } from './DTO/create.userdto'

@Injectable()
export class UserService {
    users = [
        {
            id: 1,
            name: "Murtaz",
            age: 19
        },
        {
            id: 2,
            name: "Nino",
            age: 19
        },
        {
            id: 3,
            name: "Gega",
            age: 20
        }
    ]

    getUsers() {
        return this.users
    }

    getUserById(id: number) {
        const user = this.users.find(el => el.id === Number(id))
        if (!user) {
            throw new HttpException('user not found', HttpStatus.NOT_FOUND)
        }
        return user
    }

    createUser(body: IUserDTO) {
        const lastId = this.users[this.users.length - 1]?.id || 0
        const newObj = {
            id: lastId + 1,
            name: body.name,
            age: body.age
        }
        this.users.push(newObj)
        return {message:"User created successfully", data:newObj}
    }

    deleteUserById(id: number) {
        const deletedUser = this.users.find(el => el.id !== Number(id))
        if (!deletedUser) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND)
        }
        this.users = this.users.filter(el => el.id === Number(id))
        return {message:"User deleted successfully", data:deletedUser}
    }

    updateUserById(id: number, body: IUserDTO) {
        const userIndex = this.users.findIndex(el => el.id === Number(id))
        if (userIndex === -1) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND)
        }
        this.users[userIndex] = {
            ...this.users[userIndex],
            name: body.name || this.users[userIndex].name,
            age: body.age || this.users[userIndex].age
        }
        return {message:"User updated succesfully", data:this.users[userIndex]}
    }
}