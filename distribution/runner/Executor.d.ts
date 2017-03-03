import { DangerDSL } from "../dsl/DangerDSL"
import { CISource } from "../ci_source/ci_source"
import { Platform } from "../platforms/platform"
import { DangerResults } from "../dsl/DangerResults"
import { DangerfileRuntimeEnv } from "./types"
export declare class Executor {
    readonly ciSource: CISource
    readonly platform: Platform
    private readonly d
    constructor(ciSource: CISource, platform: Platform);
    /** Mainly just a dumb helper because I can't do
     * async functions in danger-run.js
     * @param {string} file the path to run Danger from
     * @returns {void} It's a promise, so a void promise
     */
    setupAndRunDanger(file: string): Promise<void>;
    /**
     *  Runs all of the operations for a running just Danger
     * @returns {DangerfileRuntimeEnv} A runtime environment to run Danger in
     */
    setupDanger(): Promise<DangerfileRuntimeEnv>;
    /**
     *  Runs all of the operations for a running just Danger
     * @param {string} file the filepath to the Dangerfile
     * @returns {void} It's a promise, so a void promise
     */
    runDanger(file: string, runtime: DangerfileRuntimeEnv): Promise<void>;
    /**
     * Sets up all the related objects for running the Dangerfile
     * @returns {void} It's a promise, so a void promise
     */
    dslForDanger(): Promise<DangerDSL>;
    /**
     * Handle the messaing aspects of running a Dangerfile
     * @param {DangerResults} results a JSON representation of the end-state for a Danger run
     * @returns {void} It's a promise, so a void promise
     */
    handleResults(results: DangerResults): Promise<void>;
}
