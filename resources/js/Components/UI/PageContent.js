"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var inertia_react_1 = require("@inertiajs/inertia-react");
var Authenticated_1 = require("@/Layouts/Authenticated");
var PageContent = function (_a) {
    var title = _a.title, auth = _a.auth, children = _a.children;
    return (react_1.default.createElement(Authenticated_1.default, { auth: auth, header: [] },
        react_1.default.createElement(inertia_react_1.Head, { title: title }),
        react_1.default.createElement("div", { className: "py-6" },
            react_1.default.createElement("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8" },
                react_1.default.createElement("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg p-2 relative" }, children)))));
};
exports.default = PageContent;
//# sourceMappingURL=PageContent.js.map