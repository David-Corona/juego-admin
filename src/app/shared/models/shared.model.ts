// When there is more interfaces, separate in to different files.


export interface TableColumn {
    field: string;
    header: string;
}

export interface QueryOptions {
    pageSize: number;
    page: number;
    sortOrder?:number;
    sortField?: string;
    filters?: string;
}
