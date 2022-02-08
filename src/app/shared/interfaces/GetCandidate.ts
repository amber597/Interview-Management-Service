

export interface GetStream {
    id: number,
    streamName: String
}
export interface GetUser {
    userId: number,
    userName: String,
    userScore: number | null,
    userStatus: String | null,
    userStreams: GetStream[],
}

export interface GetProject {
    projectId: number,
    projectName: String
}

export interface GetStream {
    streamId: number,
    streamName: String
}

export interface GetCandidate {
    candidateId: number,
    candidateName: String,
    candidateExperience: String,
    project: GetProject,
    stream: GetStream,
    candidateScore: number | null,
    candidateStatus: String | null,
    getUsers: GetUser[]

}