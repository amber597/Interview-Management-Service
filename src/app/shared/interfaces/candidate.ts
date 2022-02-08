
import { Project } from "./Project";
import { Stream } from "./stream";

export interface Candidate {
    candidateId: number,
    candidateName: String,
    candidateExperience: number | null,
    candidateRating: number | null,
    candidateStatus: String,
    project1: Project,
    stream1: Stream
}