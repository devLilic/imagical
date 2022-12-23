"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var files_context_1 = require("@/Store/UploadFiles/files-context");
var UploadedFilesList_1 = require("@/Shared/ImagesUpload/UploadedFilesList");
var AllImagesContent = function () {
    var filesCtx = (0, react_1.useContext)(files_context_1.default);
    return (react_1.default.createElement(UploadedFilesList_1.default, null));
};
exports.default = AllImagesContent;
//# sourceMappingURL=AllImagesContent.js.map