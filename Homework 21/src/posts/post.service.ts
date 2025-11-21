import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IPostDTO } from "./DTO/posts.dto";


@Injectable()
export class PostService {
    posts = [
        {
            id: 1,
            title: "post1",
            description: "I love js",
            userId: 1
        },
        {
            id:2,
            title: "post2",
            description: "My name is Murtaz",
            userId: 2
        }
    ]

    getPosts() {
        return this.posts
    }

    getPostById(id: number) {
        const findPost = this.posts.find(el => el.id === Number(id))
        if (!findPost) {
            throw new HttpException("Post not found", HttpStatus.NOT_FOUND)
        }
        return {message:"Post found successfully", data:findPost}
    }

    createPost(body: IPostDTO) {
        const lastId = this.posts[this.posts.length - 1]?.id || 0

        if (!body.title || !body.description) {
            throw new HttpException("Invalid arguments", HttpStatus.BAD_REQUEST)
        }

        const newObj = {
            id: lastId,
            title: body.title,
            description: body.description,
            userId: body.userId //Because this data is static I did not handle ON DELETE OF POST remove post id from user too because we need some database for it like MONGODB
        }
        this.posts.push(newObj)
        return {message:"Post created successfully", data: newObj}
    }

    deleteUserById(id: number) { 
        const findIndex = this.posts.findIndex(el => el.id === Number(id))

        if (findIndex === -1) {
            throw new HttpException("Post not found", HttpStatus.NOT_FOUND)
        }

        const [deletedPost] = this.posts.splice(findIndex, 1)
        return {message:"Post deleted successfully", data: deletedPost}
    }

    updateUserById(id: number, body: IPostDTO) {
        if (!body.description && !body.title) {
            throw new HttpException("At least title or description must be changed!", HttpStatus.BAD_REQUEST)
        }
        const findIndex = this.posts.findIndex(el => el.id === Number(id))
        if (findIndex === -1) {
            throw new HttpException("Post not found", HttpStatus.NOT_FOUND)
        }

        this.posts[findIndex] = {
            ...this.posts[findIndex],
            title: body.title || this.posts[findIndex].title,
            description: body.description || this.posts[findIndex].description,
            userId: this.posts[findIndex].userId
        }

        return {message:"Post Updated successfully", data: this.posts[findIndex]}
    }
}