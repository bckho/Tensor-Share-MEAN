export class UpdateComment {
    commentId: string;
    content: string;

    constructor(commentId: string, content: string) {
        this.commentId = commentId;
        this.content = content;
    }
}