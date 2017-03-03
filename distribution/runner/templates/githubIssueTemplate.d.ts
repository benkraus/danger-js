import { DangerResults } from "../../dsl/DangerResults"
/**
 * A template function for creating a GitHub issue comment from Danger Results
 * @param {DangerResults} results Data to work with
 * @returns {string} HTML
 */
export declare function template(results: DangerResults): string