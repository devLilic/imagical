import {v4 as uuidv4} from "uuid";

export class ExternalImage {
    private id: string;
    private url: string;
    private article_url: string;
    private site: string;
    private width: number;
    private height: number;

    constructor(link, contextLink, displayLink, width, height) {
        this.id = uuidv4();
        this.url = link
        this.article_url = contextLink;
        this.site = displayLink;
        this.width = width;
        this.height = height;
    }
}

export default ExternalImage;
