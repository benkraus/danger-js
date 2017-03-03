import { GitDSL } from "../dsl/GitDSL"
import { CISource } from "../ci_source/ci_source"
import { Platform } from "./platform"
export declare class FakePlatform implements Platform {
    readonly name: string
    readonly ciSource: CISource
    constructor();
    getPlatformDSLRepresentation(): Promise<any>;
    getReviewDiff(): Promise<GitDSL>;
    updateOrCreateComment(_newComment: string): Promise<boolean>;
    createComment(_comment: string): Promise<any>;
    deleteMainComment(): Promise<boolean>;
    editMainComment(_comment: string): Promise<boolean>;
}