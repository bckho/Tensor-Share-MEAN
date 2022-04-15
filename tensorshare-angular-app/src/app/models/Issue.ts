import { Comment } from "./Comment";
import { User } from "./User";

export class Issue {
    _id: string;
    title: string;
    description: string;
    postDate: Date;
    isSolved: boolean;
    closedDate: Date;
    user: User;

    constructor(
        _id: string,
        title: string,
        description: string,
        postDate: Date,
        isSolved: boolean,
        closedDate: Date,
        user: User,
    ) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.postDate = postDate;
        this.isSolved = isSolved;
        this.closedDate = closedDate;
        this.user = user;
    }
}