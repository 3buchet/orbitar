import APIBase from './APIBase';
import {UserInfo} from '../Types/UserInfo';
import {SiteInfo} from '../Types/SiteInfo';
import {CommentInfo, PostInfo} from '../Types/PostInfo';

interface PostResponseItem {
    id: number;
    site: string;
    author: number;
    created: string;
    title?: string;
    content?: string;
    rating: number;
    comments: number;
    newComments: number;
    vote?: number;
}

interface FeedResponse {
    posts: PostResponseItem[];
    users: Record<number, UserInfo>;
    total: number;
    site: SiteInfo;
}

interface PostResponse {
    post: PostInfo;
    site: SiteInfo;
    comments: CommentInfo[];
    users: Record<number, UserInfo>;
}

interface CommentResponse {
    comment: CommentInfo[];
    users: Record<number, UserInfo>;
}

interface CreateResponse {
    post: PostInfo;
}

export default class PostAPI {
    private api: APIBase;
    constructor(api: APIBase) {
        this.api = api;
    }

    async create(site: string, title: string | undefined, content: string) {
        try {
            let result = await this.api.request('/post/create', { site: site, title: title, content: content }) as CreateResponse;
            console.log('CREATE POST', result);
            return result;
        }
        catch (err) {
            console.log('CREATE POST ERR', err);
            throw err;
        }
    }

    async feed(site: string, page: number): Promise<FeedResponse> {
        try {
            let result = await this.api.request('/post/feed', { site: site, page: page, perpage: 10, format: 'html' }) as FeedResponse;
            console.log('FEED', result);
            return result;
        }
        catch (err) {
            console.log('FEED ERR', err);
            throw err;
        }
    }

    async get(postId: number): Promise<PostResponse> {
        try {
            let result = await this.api.request('/post/get', { id: postId }) as PostResponse;
            console.log('POST', result);
            return result;
        }
        catch (err) {
            console.log('POST ERR', err);
            throw err;
        }
    }

    async comment(content: string, postId: number, commentId?: number): Promise<CommentResponse> {
        try {
            let result = await this.api.request('/post/comment', { post_id: postId, comment_id: commentId, content: content }) as CommentResponse;
            console.log('COMMENT', result);
            return result;
        }
        catch (err) {
            console.log('COMMENT ERROR', err);
            throw err;
        }
    }
}