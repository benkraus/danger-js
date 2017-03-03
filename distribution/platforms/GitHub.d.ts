import { GitDSL } from "../dsl/GitDSL"
import { GitCommit } from "../dsl/Commit"
import { GitHubCommit, GitHubDSL } from "../dsl/GitHubDSL"
import { GitHubAPI } from "./github/GitHubAPI"
/** Handles conforming to the Platform Interface for GitHub, API work is handle by GitHubAPI */
export declare class GitHub {
    readonly api: GitHubAPI
    name: string
    constructor(api: GitHubAPI);
    /**
     * Get the Code Review description metadata
     *
     * @returns {Promise<any>} JSON representation
     */
    getReviewInfo(): Promise<any>;
    /**
     * Get the Code Review diff representation
     *
     * @returns {Promise<GitDSL>} the git DSL
     */
    getReviewDiff(): Promise<GitDSL>;
    /**
     * Returns the `github` object on the Danger DSL
     *
     * @returns {Promise<GitHubDSL>} JSON response of the DSL
     */
    getPlatformDSLRepresentation(): Promise<GitHubDSL>;
    /**
     * Returns the response for the new comment
     *
     * @param {GitHubCommit} ghCommit A GitHub based commit
     * @returns {GitCommit} a Git commit representation without GH metadata
     */
    githubCommitToGitCommit(ghCommit: GitHubCommit): GitCommit;
    /**
     * Returns the response for the new comment
     *
     * @param {string} comment you want to post
     * @returns {Promise<any>} JSON response of new comment
     */
    createComment(comment: string): Promise<any>;
    /**
     * Deletes the main Danger comment, used when you have
     * fixed all your failures.
     *
     * @returns {Promise<boolean>} did it work?
     */
    deleteMainComment(): Promise<boolean>;
    /**
     * Either updates an existing comment, or makes a new one
     *
     * @param {string} newComment string value of comment
     * @returns {Promise<boolean>} success of posting comment
     */
    updateOrCreateComment(newComment: string): Promise<boolean>;
    /**
     * Updates the main Danger comment, when Danger has run
     * more than once
     *
     * @param {string} comment updated text
     *
     * @returns {Promise<boolean>} did it work?
     */
    editMainComment(comment: string): Promise<boolean>;
}