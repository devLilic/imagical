"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var playlist_context_1 = require("@/Store/PlaylistStore/playlist-context");
var PlaylistItem_1 = require("@/Components/Playlist/PlaylistItem");
var PlaylistsList = function () {
    var playlistCtx = (0, react_1.useContext)(playlist_context_1.default);
    return (react_1.default.createElement("ul", { className: 'list-none mx-2 text-blue-600 w-8/12 mx-auto' },
        playlistCtx.playlists &&
            playlistCtx.playlists.map(function (playlist) {
                return react_1.default.createElement(PlaylistItem_1.default, { playlist: playlist, key: playlist.id });
            }),
        !playlistCtx.playlists && react_1.default.createElement("li", null, "NO Playlists")));
};
exports.default = PlaylistsList;
//# sourceMappingURL=PlaylistsList.js.map