import { UserService } from "./user.service.js";
import { PostService } from "./post.service.js";
import { User as UserModel } from "./generated/prisma/client.js";
import { Post as PostModel } from "./generated/prisma/client.js";
export declare class AppController {
    private readonly UserService;
    private readonly postService;
    constructor(UserService: UserService, postService: PostService);
    getPostById(id: string): Promise<PostModel | null>;
    getPublishedPosts(): Promise<PostModel[]>;
    getFilteredPosts(searchString: string): Promise<PostModel[]>;
    createDraft(postData: {
        title: string;
        content?: string;
        authorEmail: string;
    }): Promise<PostModel>;
    signupUser(userData: {
        name?: string;
        email: string;
    }): Promise<UserModel>;
    publishPost(id: string): Promise<PostModel>;
    deletePost(id: string): Promise<PostModel>;
}
