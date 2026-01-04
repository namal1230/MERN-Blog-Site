export type User = {
    id:number;
    role: "admin" | "user"; 
    token: string;
};