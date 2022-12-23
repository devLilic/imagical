"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalImage = void 0;
var uuid_1 = require("uuid");
var ExternalImage = /** @class */ (function () {
    function ExternalImage(link, contextLink, displayLink, width, height) {
        this.id = (0, uuid_1.v4)();
        this.url = link;
        this.article_url = contextLink;
        this.site = displayLink;
        this.width = width;
        this.height = height;
    }
    return ExternalImage;
}());
exports.ExternalImage = ExternalImage;
exports.default = ExternalImage;
//# sourceMappingURL=ExternalImage.js.map