export class CreateIssue {
    title: string;
    description: string;
    tensorModelId: string;

    constructor(
        title: string,
        description: string,
        tensorModelId: string
    ) {
        this.title = title;
        this.description = description;
        this.tensorModelId = tensorModelId;
    }
}