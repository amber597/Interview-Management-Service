import { Stream } from "./stream";

export interface ProjectStreamId {
    ProjectId: number,
    StreamId: number
}

export interface ProjectStream {
    id: ProjectStreamId,
    stream: Stream,
    candidateRequired: number
}