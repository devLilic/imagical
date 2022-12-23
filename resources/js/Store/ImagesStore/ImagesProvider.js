"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var images_context_1 = require("@/Store/ImagesStore/images-context");
var react_1 = require("react");
var images_actions_1 = require("@/Store/ImagesStore/images-actions");
var articles_context_1 = require("@/Store/ArticleStore/articles-context");
var image_api_1 = require("@/api/image-api");
var images_reducer_1 = require("./images-reducer");
var ImagesProvider = function (props) {
    var articlesCtx = (0, react_1.useContext)(articles_context_1.default);
    var _a = (0, react_1.useReducer)(images_reducer_1.imagesReducer, images_reducer_1.defaultLocalImagesState), imagesState = _a[0], dispatchImagesAction = _a[1];
    (0, react_1.useEffect)(function () {
        requestImages();
    }, []);
    (0, react_1.useEffect)(function () {
        if (imagesState.relevant.query !== '') {
            requestRelevantImages(imagesState.relevant.query);
        }
    }, [imagesState.relevant.query]);
    (0, react_1.useEffect)(function () {
        if (imagesState.local.query !== '') {
            requestSearchLocalImages(imagesState.local.query);
        }
        else {
            requestImages();
        }
    }, [imagesState.local.query]);
    (0, react_1.useEffect)(function () {
        if (imagesState.external.selected.readyToCrop) {
            requestCropImage(imagesState.external.selected.url, imagesState.external.selected.cropSection);
        }
    }, [imagesState.external.selected.readyToCrop]);
    (0, react_1.useEffect)(function () {
        if (imagesState.external.query !== '' && !(articlesCtx.articleToEdit in imagesState.external.images)) {
            requestSearchExternalImages(imagesState.external.query, null, articlesCtx.articleToEdit);
        }
    }, [imagesState.external.query]);
    var searchLocalImages = function (query) { return dispatchImagesAction({
        type: images_actions_1.SET_LOCAL_QUERY,
        query: query
    }); };
    var searchRelevantImages = function (query) { return dispatchImagesAction({
        type: images_actions_1.SET_RELEVANT_QUERY,
        query: query
    }); };
    var searchExternalImages = function (query) { return dispatchImagesAction({
        type: images_actions_1.SET_EXTERNAL_QUERY,
        query: query
    }); };
    var resetImages = function () { return dispatchImagesAction({ type: images_actions_1.RESET_SEARCH }); };
    var selectExternalImage = function (url) {
        return dispatchImagesAction({
            type: images_actions_1.SELECT_EXTERNAL_IMAGE,
            url: url
        });
    };
    var setCropSection = function (cropSection) { return dispatchImagesAction({
        type: images_actions_1.CROP_IMAGE_PREPARE,
        section: cropSection
    }); };
    var cropImage = function () { return dispatchImagesAction({ type: images_actions_1.CROP_IMAGE_PENDING }); };
    var requestImages = function () { return __awaiter(void 0, void 0, void 0, function () {
        var imagesRequest;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, image_api_1.ImageAPI.getImages()];
                case 1:
                    imagesRequest = _a.sent();
                    return [2 /*return*/, dispatchImagesAction({ type: images_actions_1.INIT_IMAGES, images: imagesRequest.images })];
            }
        });
    }); };
    var requestSearchLocalImages = function (query) { return __awaiter(void 0, void 0, void 0, function () {
        var images;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, image_api_1.ImageAPI.searchImages(query)];
                case 1:
                    images = _a.sent();
                    return [2 /*return*/, dispatchImagesAction({ type: images_actions_1.SEARCH_LOCAL_IMAGES, images: images })];
            }
        });
    }); };
    var requestSearchExternalImages = function (query, start_index, article_id) {
        if (start_index === void 0) { start_index = null; }
        return __awaiter(void 0, void 0, void 0, function () {
            var images;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, image_api_1.ImageAPI.getExternal(query, start_index)];
                    case 1:
                        images = _a.sent();
                        return [2 /*return*/, dispatchImagesAction({ type: images_actions_1.SEARCH_EXTERNAL_IMAGES, images: images, article_id: article_id })];
                }
            });
        });
    };
    var requestRelevantImages = function (query) { return __awaiter(void 0, void 0, void 0, function () {
        var images;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, image_api_1.ImageAPI.getRelevant(query)];
                case 1:
                    images = _a.sent();
                    dispatchImagesAction({ type: images_actions_1.SEARCH_RELEVANT_IMAGES, images: images });
                    return [2 /*return*/];
            }
        });
    }); };
    var requestCropImage = function (url, section) { return __awaiter(void 0, void 0, void 0, function () {
        var image;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, image_api_1.ImageAPI.cropImage(url, section)];
                case 1:
                    image = _a.sent();
                    articlesCtx.addWallpaper(image.url);
                    return [2 /*return*/, dispatchImagesAction({ type: images_actions_1.CROP_IMAGE, image: image })];
            }
        });
    }); };
    var loadMore = function (article_id) { return __awaiter(void 0, void 0, void 0, function () {
        var images;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, image_api_1.ImageAPI.getExternal(imagesState.external.query, ((_a = imagesState.external.images[article_id]) === null || _a === void 0 ? void 0 : _a.length) + 1)];
                case 1:
                    images = _b.sent();
                    return [2 /*return*/, dispatchImagesAction({ type: images_actions_1.LOAD_MORE_EXTERNAL_IMAGES, images: images, article_id: article_id })];
            }
        });
    }); };
    var imagesContext = {
        relevant: {
            query: imagesState.relevant.query,
            images: imagesState.relevant.images,
            loading: imagesState.relevant.loading
        },
        local: {
            query: imagesState.local.query,
            images: imagesState.local.images,
            loading: imagesState.local.loading
        },
        external: {
            query: imagesState.external.query,
            images: imagesState.external.images,
            loading: imagesState.external.loading,
            error: imagesState.external.error,
            selected: {
                loading: imagesState.external.selected.loading,
                url: imagesState.external.selected.url,
                readyToCrop: imagesState.external.selected.readyToCrop,
                cropSection: imagesState.external.selected.cropSection,
                croppedUrl: imagesState.external.selected.croppedUrl
            }
        },
        resetImages: resetImages,
        searchLocalImages: searchLocalImages,
        searchRelevantImages: searchRelevantImages,
        searchExternalImages: searchExternalImages,
        selectExternalImage: selectExternalImage,
        setCropSection: setCropSection,
        cropImage: cropImage,
        loadMore: loadMore,
        requestSearchLocalImages: requestSearchLocalImages,
        requestImages: requestImages,
        requestSearchExternalImages: requestSearchExternalImages,
        requestRelevantImages: requestRelevantImages,
        requestCropImage: requestCropImage
    };
    // @ts-ignore
    return (React.createElement(images_context_1.default.Provider, { value: imagesContext }, props.children));
};
exports.default = ImagesProvider;
//# sourceMappingURL=ImagesProvider.js.map