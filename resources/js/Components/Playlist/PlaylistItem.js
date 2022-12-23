"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Button_1 = require("@/Components/UI/FormElements/Button");
var playlist_context_1 = require("@/Store/PlaylistStore/playlist-context");
var DeleteIcon_1 = require("@/Components/UI/Svg/DeleteIcon");
var PlaylistItem = function (_a) {
    var playlist = _a.playlist;
    var playlistCtx = (0, react_1.useContext)(playlist_context_1.default);
    return (react_1.default.createElement("li", { className: 'hover:text-blue-800 cursor-pointer px-3 py-1 bg-blue-50 rounded-lg flex justify-between items-center', key: playlist.id },
        react_1.default.createElement("span", null,
            playlist.title,
            " ",
            (playlist.play_date)),
        react_1.default.createElement("div", { className: 'flex items-center' },
            react_1.default.createElement("a", { className: 'border border-blue-600 px-2 py-1 rounded hover:bg-blue-400 hover:text-white', href: route('playlist', playlist.id) }, "Open"),
            react_1.default.createElement(Button_1.default, { processing: false, className: 'bg-red-300 border-red-300 hover:bg-red-400 ml-2', onClick: function () { return playlistCtx.deletePlaylist(playlist.id); } },
                react_1.default.createElement(DeleteIcon_1.default, null)))));
};
exports.default = PlaylistItem;
//# sourceMappingURL=PlaylistItem.js.map