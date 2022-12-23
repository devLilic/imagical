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
Object.defineProperty(exports, "__esModule", { value: true });
exports.playlistReducer = exports.defaultPlaylistState = void 0;
var playlist_actions_1 = require("@/Store/PlaylistStore/playlist-actions");
exports.defaultPlaylistState = {
    playlists: []
};
var playlistReducer = function (state, action) {
    switch (action.type) {
        case playlist_actions_1.GET_LATEST_PLAYLISTS:
            return __assign(__assign({}, state), { playlists: action.playlists });
        case playlist_actions_1.DELETE_PLAYLIST:
            return __assign(__assign({}, state), { playlists: state.playlists.filter(function (playlist) { return playlist.id !== action.playlist_id; }) });
        default:
            return state;
    }
};
exports.playlistReducer = playlistReducer;
//# sourceMappingURL=playlist-reducer.js.map