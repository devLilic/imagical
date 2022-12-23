"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagesReducer = exports.defaultLocalImagesState = void 0;
var images_actions_1 = require("./images-actions");
exports.defaultLocalImagesState = {
    relevant: {
        loading: false,
        images: [],
        query: '',
    },
    local: {
        loading: false,
        images: [],
        query: '',
    },
    external: {
        loading: false,
        images: [],
        query: '',
        error: '',
        selected: {
            loading: false,
            url: '',
            readyToCrop: false,
            cropSection: {},
            croppedUrl: null
        }
    },
};
var imagesReducer = function (state, action) {
    switch (action.type) {
        case images_actions_1.INIT_IMAGES:
        case images_actions_1.SEARCH_LOCAL_IMAGES:
            return __assign(__assign({}, state), { local: __assign(__assign({}, state.local), { images: action.images, loading: false }) });
        case images_actions_1.SET_LOCAL_QUERY:
            return (action.query === '') ? state : __assign(__assign({}, state), { local: __assign(__assign({}, state.local), { query: action.query, loading: true }) });
        case images_actions_1.SET_RELEVANT_QUERY:
            return __assign(__assign({}, state), { relevant: __assign(__assign({}, state.relevant), { query: action.query, loading: true }) });
        case images_actions_1.SEARCH_RELEVANT_IMAGES:
            return __assign(__assign({}, state), { relevant: __assign(__assign({}, state.relevant), { images: action.images, loading: false }) });
        case images_actions_1.RESET_SEARCH:
            return __assign(__assign({}, state), { external: __assign(__assign({}, state.external), { loading: false }), local: __assign(__assign({}, state.local), { query: '', loading: false }), relevant: __assign(__assign({}, state.relevant), { query: '', loading: false }) });
        case images_actions_1.SET_EXTERNAL_QUERY:
            return __assign(__assign({}, state), { external: __assign(__assign({}, state.external), { query: action.query, error: '', loading: true }) });
        case images_actions_1.SEARCH_EXTERNAL_IMAGES:
            var external_images = state.external.images;
            if (action.article_id in external_images) {
                external_images[action.article_id] = __spreadArray(__spreadArray([], external_images[action.article_id], true), action.images, true);
            }
            else {
                external_images[action.article_id] = action.images;
            }
            return __assign(__assign({}, state), { external: __assign(__assign({}, state.external), { images: external_images, loading: false }) });
        case images_actions_1.LOAD_MORE_EXTERNAL_IMAGES:
            var images = __assign({}, state.external.images);
            images[action.article_id] = __spreadArray(__spreadArray([], images[action.article_id], true), action.images, true);
            return __assign(__assign({}, state), { external: __assign(__assign({}, state.external), { images: images, loading: false }) });
        case images_actions_1.SELECT_EXTERNAL_IMAGE:
            return __assign(__assign({}, state), { external: __assign(__assign({}, state.external), { selected: __assign(__assign({}, state.external.selected), { url: action.url, readyToCrop: false, cropSection: {}, croppedUrl: null }) }) });
        case images_actions_1.CROP_IMAGE_PREPARE:
            return __assign(__assign({}, state), { external: __assign(__assign({}, state.external), { selected: __assign(__assign({}, state.external.selected), { cropSection: action.section }) }) });
        case images_actions_1.CROP_IMAGE_PENDING:
            return __assign(__assign({}, state), { external: __assign(__assign({}, state.external), { selected: __assign(__assign({}, state.external.selected), { readyToCrop: true, loading: true }) }) });
        case images_actions_1.CROP_IMAGE:
            return __assign(__assign({}, state), { external: __assign(__assign({}, state.external), { selected: __assign(__assign({}, state.external.selected), { croppedUrl: action.image, readyToCrop: false, loading: false }) }) });
        default:
            return exports.defaultLocalImagesState;
    }
};
exports.imagesReducer = imagesReducer;
//# sourceMappingURL=images-reducer.js.map