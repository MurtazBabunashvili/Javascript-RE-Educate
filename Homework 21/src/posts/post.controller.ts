import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { IPostDTO } from "./DTO/posts.dto";
import { PostService } from "./post.service";

@Controller("posts")
export class PostController {
    constructor(private PostService:PostService){}

    @Get()
    getPost() {
        return this.PostService.getPosts()
    }

    @Get(":id")
    getPostById(@Param() param) {
        const id = param.id
        return this.PostService.getPostById(id)
    }

    @Post()
    createPost(@Body() body:IPostDTO) {
        return this.PostService.createPost(body)
    }

    @Delete(":id")
    deletePost(@Param() param) {
        const id = param.id
        return this.PostService.deleteUserById(id)
    }

    @Put(":id")
    updateUser(@Param() param, @Body() body) {
        const id = param.id
        return this.PostService.updateUserById(id, body)
    }
}