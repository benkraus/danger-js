import { DangerResults } from "../dsl/DangerResults"
import { DangerContext } from "../runner/Dangerfile"
import { DangerfileRuntimeEnv, Path } from "./types"
/**
 * Executes a Dangerfile at a specific path, with a context.
 * The values inside a Danger context are applied as globals to the Dangerfiles runtime.
 *
 * @param {DangerContext} dangerfileContext the global danger context
 * @returns {any} the results of the run
 */
export declare function createDangerfileRuntimeEnvironment(dangerfileContext: DangerContext): Promise<DangerfileRuntimeEnv>
/**
 * Executes a Dangerfile at a specific path, with a context.
 * The values inside a Danger context are applied as globals to the Dangerfiles runtime.
 *
 * @param {string} filename the file path for the dangerfile
 * @param {any} environment the results of createDangerfileRuntimeEnvironment
 * @returns {DangerResults} the results of the run
 */
export declare function runDangerfileEnvironment(filename: Path, environment: DangerfileRuntimeEnv): Promise<DangerResults>
/**
 * Updates a Dangerfile to remove the import for Danger
 * @param {string} filename the file path for the dangerfile
 * @returns {void}
 */
export declare function updateDangerfile(filename: Path): void
/**
 * Updates a Dangerfile to remove the import for Danger
 * @param {string} contents the file path for the dangerfile
 * @returns {string} the revised Dangerfile
 */
export declare function cleanDangerfile(contents: string): string