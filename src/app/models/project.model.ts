export interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    extraImages?: string[];
    description: string;
    showOnMainPage: boolean;
    link?: string;
    number: string;
    client?: string;
    location?: string;
    year?: string;
}
