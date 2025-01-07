export type WorkStatusType = "Working" | "Vacation" | "Sick Leave" | "Holiday" | "Weekend";


export interface WorkStatusData {
    [key: string]: {
        status: "Working" | "Vacation" | "Sick Leave" | "Holiday",
        metaData: any
    };
}

export interface StatusColorCodeObject {
    bg: string;
    text: string;
}


