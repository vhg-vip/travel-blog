export class Post{
    id: string;
    image: string;
    title: string;
    caption: string;
    type: string;
    detail: string;
    comments?: Array<any>;
    countLike: number;
    intro?: string;
}