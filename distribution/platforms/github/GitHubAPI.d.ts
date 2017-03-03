import { api as fetch } from "../../api/fetch"
import { CISource } from "../../ci_source/ci_source"
export declare type APIToken = string
/** This represent the GitHub API */
export declare class GitHubAPI {
    readonly token: APIToken | undefined
    readonly ciSource: CISource
    fetch: typeof fetch
    additionalHeaders: any
    constructor(token: APIToken | undefined, ciSource: CISource);
    /**
     * Grabs the contents of an individual file on GitHub
     *
     * @param {string} path path to the file
     * @param {string} [ref] an optional sha
     * @returns {Promise<string>} text contents
     *
     */
    fileContents(path: string, ref?: string): Promise<string>;
    getDangerCommentID(): Promise<number | null>;
    updateCommentWithID(id: number, comment: string): Promise<any>;
    deleteCommentWithID(id: number): Promise<any>;
    getUserID(): Promise<number>;
    postPRComment(comment: string): Promise<any>;
    getPullRequestInfo(): Promise<any>;
    getPullRequestCommits(): Promise<any>;
    getUserInfo(): Promise<any>;
    getPullRequestComments(): Promise<any>;
    getPullRequestDiff(): Promise<any>;
    getFileContents(path: string, ref?: string): Promise<any>;
    getPullRequests(): Promise<any>;
    private api(path, headers, body, method);
    get(path: string, headers?: any, body?: any): Promise<any>;
    post(path: string, headers?: any, body?: any): Promise<any>;
    patch(path: string, headers?: any, body?: any): Promise<any>;
}