export default function getRSS(type: 'news'): Promise<{
    title: any;
    description: any;
    link: any;
    time: string;
}[]>;
