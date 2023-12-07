export interface Status {
    status_id: number;
    status_name: string;
}

export const status: Status[] = [
    {
        status_id: 1,
        status_name: 'open'
    },
    {
        status_id: 2,
        status_name: 'in progress'
    },
    {
        status_id: 2,
        status_name: 'completed'
    }
]