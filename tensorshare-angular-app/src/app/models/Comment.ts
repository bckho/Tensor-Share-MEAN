import { CommentTypeEnum } from "./CommentTypeEnum";
import { User } from "./User";

export class Comment {
    _id: string;
    user: User;
    postDate: Date;
    content: string;
    commentType: CommentTypeEnum;
    isEdited: boolean;
    upvotes: string[];

    constructor(
        _id: string,
        user: User,
        postDate: Date,
        content: string,
        commentType: CommentTypeEnum,
        isEdited: boolean,
        upvotes: string[]
    ) {
        this._id = _id;
        this.user = user;
        this.postDate = postDate;
        this.content = content;
        this.commentType = commentType;
        this.isEdited = isEdited;
        this.upvotes = upvotes;
    }
}