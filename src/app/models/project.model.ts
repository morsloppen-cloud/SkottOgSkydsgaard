export interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    extraImages?: string[];
    description: string;
    link?: string;
    number: string;
    client?: string;
    location?: string;
    year?: string;
}
