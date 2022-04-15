export class UpdateIssue {
    issueId: string;
    title: string;
    description: string;

    constructor(
        issueId: string,
        title: string,
        description: string
    ) {
        this.issueId = issueId;
        this.title = title;
        this.description = description;
    }
}