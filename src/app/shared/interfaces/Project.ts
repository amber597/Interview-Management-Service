import { ProjectStream } from "./ProjectStream";
import { Stream } from "./stream";



export interface Project {
    id: number,
    projectName: String,
    projectDate: String,
    projectStreams: ProjectStream[]
}