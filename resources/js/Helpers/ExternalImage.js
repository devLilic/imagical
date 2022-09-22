import {v4 as uuidv4} from "uuid";

class ExternalImage {
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
