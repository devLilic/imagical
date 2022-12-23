"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistApi = void 0;
var axios_1 = require("axios");
var playlistInstance = axios_1.default.create({
    baseURL: "api/playlists/"
});
exports.PlaylistApi = {
    getPlaylists: function () { return playlistInstance.get("/")
        .then(function (response) { return response.data; }); },
    getPlaylist: function (id) { return playlistInstance.get("".concat(id))
        .then(function (response) { return response.data; }); },
    deletePlaylist: function (id) { return playlistInstance.delete("".concat(id))
        .then(function (response) { return response.data; }); }
};
//# sourceMappingURL=playlist-api.js.map