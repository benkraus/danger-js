import { Env, CISource } from "../ci_source"
export declare class Circle implements CISource {
    private readonly env
    constructor(env: Env);
    readonly name: string
    readonly isCI: boolean
    readonly isPR: boolean
    private _prParseURL();
    readonly pullRequestID: string
    readonly repoSlug: string
    readonly repoURL: string
    readonly supportedPlatforms: string[]
}
