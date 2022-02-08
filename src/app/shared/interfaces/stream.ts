import { Project } from "./Project";

export interface Stream {
    id: number,
    streamName: string,
    projects: Project[]
}