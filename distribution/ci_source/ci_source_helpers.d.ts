import { Env, CISource } from "./ci_source"
/**
 * Validates that all ENV keys exist and have a length
 * @param {Env} env The environment.
 * @param {[string]} keys Keys to ensure existence of
 * @returns {bool} true if they exist, false if not
 */
export declare function ensureEnvKeysExist(env: Env, keys: Array<string>): boolean
/**
 * Validates that all ENV keys exist and can be turned into ints
 * @param {Env} env The environment.
 * @param {[string]} keys Keys to ensure existence and number-ness of
 * @returns {bool} true if they are all good, false if not
 */
export declare function ensureEnvKeysAreInt(env: Env, keys: Array<string>): boolean
/**
 * Retrieves the current pull request open for this branch from the GitHub API
 * @param {Env} env The environment
 * @param {string} branch The branch to find pull requests for
 * @returns {number} The pull request ID, if any.  Otherwise 0 (Github starts from #1).
 * If there are multiple pull requests open for a branch, returns the first.
 */
export declare function getPullRequestIDForBranch(source: CISource, env: Env, branch: string): Promise<number>
