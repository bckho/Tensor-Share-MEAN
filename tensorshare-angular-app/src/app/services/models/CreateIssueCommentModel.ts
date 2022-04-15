export class CreateIssueComment {
    issueId: string;
    content: string;

    constructor(
        issueId: string,
        content: string
    ) {
        this.issueId = issueId;
        this.content = content;
    }
}