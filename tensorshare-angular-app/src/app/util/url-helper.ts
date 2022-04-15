const BASE_URL = 'https://tensorshare-api.herokuapp.com/';
const AUTH_BASE = 'auth/';
const API_1 = 'api/v1/';

const LOGIN_RESOURCE = 'login/';
const REGISTER_RESOURCE = 'register/';

const TENSORMODEL_RESOURCE = 'tensormodels/';
const ISSUE_RESOURCE = 'issues/';
const COMMENT_RESOURCE = 'comments/';

const URL_API_LOGIN = BASE_URL + AUTH_BASE + LOGIN_RESOURCE;
const URL_API_REGISTER = BASE_URL + AUTH_BASE + REGISTER_RESOURCE;
const URL_API_V1 = BASE_URL + API_1;

//
// TensorModel Endpoints
//
export function getTensorModelsURI(): string {
    return URL_API_V1 + TENSORMODEL_RESOURCE;
}

export function getTensorModelsFromUserURI(username: string): string {
    return URL_API_V1 + TENSORMODEL_RESOURCE + `user/${username}`;
}

export function getTensorModelByIdURI(_id: string): string {
    return URL_API_V1 + TENSORMODEL_RESOURCE + _id;
}

export function getUpvoteTensorModelByIdURI(_id: string): string {
    return URL_API_V1 + TENSORMODEL_RESOURCE + _id + '/upvote';
}

//
// Comment Endpoints
//
export function getCommentsFromTensorModelURI(tensorModelId: string): string {
    return URL_API_V1 + COMMENT_RESOURCE + `tensormodels/${tensorModelId}`;
}

export function getCommentsFromIssueURI(issueId: string): string {
    return URL_API_V1 + COMMENT_RESOURCE + `issues/${issueId}`;
}

export function getCommentByIdURI(_id: string): string {
    return URL_API_V1 + COMMENT_RESOURCE + _id;
}

export function getUpvoteCommentByIdURI(_id: string): string {
    return URL_API_V1 + COMMENT_RESOURCE + _id + '/upvote';
}

//
// Issue Endpoints
//

// GET
export function getIssuesURI(): string {
    return URL_API_V1 + ISSUE_RESOURCE;
}

// GET
export function getIssuesFromTensorModelURI(tensorModelId: string): string {
    return URL_API_V1 + ISSUE_RESOURCE + `tensormodels/${tensorModelId}`
}

// GET/UPDATE/DELETE by Id
export function getIssueByIdURI(_id: string): string {
    return URL_API_V1 + ISSUE_RESOURCE + _id;
}

// Close issue
export function getCloseIssueByIdURI(_id: string): string {
    return URL_API_V1 + ISSUE_RESOURCE + `${_id}/close`
}

//
// Authentication Endpoints
//
export function getLoginURI(): string {
    return URL_API_LOGIN;
}

export function getRegistrationURI(): string {
    return URL_API_REGISTER;
}