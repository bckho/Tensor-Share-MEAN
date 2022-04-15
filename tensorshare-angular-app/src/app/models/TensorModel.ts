import { CategoryEnum } from "./CategoryEnum";
import { ModelTypeEnum } from "./ModelTypeEnum";
import { Comment } from "./Comment";
import { User } from "./User";

export class TensorModel {
    _id: string;
    name: string;
    postDate: Date;
    lastUpdatedDate: Date;
    description: string;
    category: CategoryEnum;
    modelType: ModelTypeEnum;
    configuration: string[];
    epochs: number;
    accuracy: number;
    loss: number;
    recall: number;
    user: User;
    upvotes: string[];

    constructor(
        _id: string,
        name: string,
        postDate: Date,
        lastUpdatedDate: Date,
        description: string,
        category: CategoryEnum,
        modelType: ModelTypeEnum,
        configuration: string[],
        epochs: number,
        accuracy: number,
        loss: number,
        recall: number,
        user: User,
        upvotes: string[],
    ) {
        this._id = _id;
        this.name = name;
        this.postDate = postDate;
        this.lastUpdatedDate = lastUpdatedDate;
        this.description = description;
        this.category = category;
        this.modelType = modelType;
        this.configuration = configuration;
        this.epochs = epochs;
        this.accuracy = accuracy;
        this.loss = loss;
        this.recall = recall;
        this.user = user;
        this.upvotes = upvotes;
    }
}