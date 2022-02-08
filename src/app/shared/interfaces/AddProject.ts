import { Candidate } from "./candidate";


export interface Project1 {
    projectName: String,
    projectDate: String,
    candidates: Candidate[]
}

export interface Streamc {
    streamId: number,
    candidate_required: number;
}
export interface AddProject {
    project: Project1,
    streamc: Streamc[];
}