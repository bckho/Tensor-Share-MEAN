import { TensorModel } from "./TensorModel";

export class User {
    _id: string;
    username: string;
    password: string;
    email: string;
    dateRegistered: Date;
    tensorModels: TensorModel[];

    constructor(
        _id: string,
        username: string,
        password: string,
        email: string,
        dateRegistered: Date,
        tensorModels: TensorModel[]
    ) {
        this._id = _id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.dateRegistered = dateRegistered;
        this.tensorModels = tensorModels;
    };
}