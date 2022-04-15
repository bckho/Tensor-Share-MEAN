export class CreateTensorModelModel {
    name: string;
    description: string;
    category: number;
    modelType: number;
    configuration: string[];
    epochs: number;
    accuracy: number;
    loss: number;
    recall: number;

    constructor(
        name: string,
        description: string,
        category: number,
        modelType: number,
        configuration: string[],
        epochs: number,
        accuracy: number,
        loss: number,
        recall: number,
    ) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.modelType = modelType;
        this.configuration = configuration;
        this.epochs = epochs;
        this.accuracy = accuracy;
        this.loss = loss;
        this.recall = recall;
    }
}