export interface Member_request {
    user_id: number;
    project_id: number;
}

export const member_reqest: Member_request[] = [
    {
        user_id: 2,
        project_id: 1
    },
    {
        user_id: 3,
        project_id: 2
    },
    {
        user_id: 1,
        project_id: 3
    },
    {
        user_id: 2,
        project_id: 3
    }
]