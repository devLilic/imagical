"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileApi = void 0;
var api_1 = require("./api");
exports.FileApi = {
    getFiles: function () {
        return api_1.instance.get('images')
            .then(function (response) { return response.data; });
    },
    uploadImages: function (data) {
        return api_1.instance.post('upload', {
            headers: { "Content-Type": "multipart/form-data" },
            data: data
        }).then(function (response) { return response.data; });
    },
    deleteImage: function (image_id) {
        return api_1.instance.delete('images', { data: { image_id: image_id } }).then(function (response) { return response.data; });
    },
    addTags: function (images) {
        return api_1.instance.post('addTags', { data: { images: JSON.stringify(images) } }).then(function (response) { return response.data; });
    }
};
//# sourceMappingURL=file-api.js.map