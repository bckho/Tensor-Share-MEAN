import { CategoryEnum } from "src/app/models/CategoryEnum";
import { ModelTypeEnum } from "src/app/models/ModelTypeEnum";

export class UpdateTensorModelModel {
    tensorModelId: string;
    name: string;
    description: string;
    category: CategoryEnum;
    modelType: ModelTypeEnum;
    configuration: string[];
    epochs: number;
    accuracy: number;
    loss: number;
    recall: number;

    constructor(
        tensorModelId: string,
        name: string,
        description: string,
        category: CategoryEnum,
        modelType: ModelTypeEnum,
        configuration: string[],
        epochs: number,
        accuracy: number,
        loss: number,
        recall: number
    ) {
        this.tensorModelId = tensorModelId;
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