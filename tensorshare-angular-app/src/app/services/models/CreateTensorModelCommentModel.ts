export class CreateTensorModelComment {
    tensorModelId: string;
    content: string;

    constructor(
        tensorModelId: string,
        content: string
    ) {
        this.tensorModelId = tensorModelId;
        this.content = content;
    }
}