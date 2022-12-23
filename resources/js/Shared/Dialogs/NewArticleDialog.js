"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Dialog_1 = require("@/Components/UI/Dialog");
var react_2 = require("@material-tailwind/react");
var NewArticleDialog = function (_a) {
    var dialogOpen = _a.dialogOpen, handleDialog = _a.handleDialog, saveArticle = _a.saveArticle;
    var _b = (0, react_1.useState)(''), newArticleTitle = _b[0], setNewArticleTitle = _b[1];
    var _c = (0, react_1.useState)('BETA'), newArticleType = _c[0], setNewArticleType = _c[1];
    var changeTitle = function (event) {
        setNewArticleTitle(event.target.value);
    };
    var changeType = function (event) {
        setNewArticleType(function (prevState) { return event.target.value; });
    };
    var resetForm = function () {
        setNewArticleTitle('');
        setNewArticleType('BETA');
    };
    var saveNewArticle = function () {
        saveArticle(newArticleTitle, newArticleType);
        handleDialog();
        resetForm();
    };
    return (react_1.default.createElement(Dialog_1.default, { size: "sm", open: dialogOpen, handleDialog: handleDialog, title: "Articol Nou", confirmBtn: true, confirmText: 'Save', confirmAction: saveNewArticle, cancelBtn: true },
        react_1.default.createElement("div", { className: 'w-full flex flex-col justify-center items-center' },
            react_1.default.createElement("div", { className: 'w-full mb-3' },
                react_1.default.createElement(react_2.Input, { label: 'Titlu', size: 'lg', value: newArticleTitle, onChange: changeTitle })),
            react_1.default.createElement("div", { className: 'py-2 h-15 flex justify-around w-8/12' },
                react_1.default.createElement(react_2.Radio, { id: 'BETA', name: 'type', value: 'BETA', label: 'BETA', checked: newArticleType === 'BETA', onChange: changeType }),
                react_1.default.createElement(react_2.Radio, { id: 'OFF', name: 'type', value: 'OFF', label: 'OFF', checked: newArticleType === 'OFF', onChange: changeType })))));
};
exports.default = NewArticleDialog;
//# sourceMappingURL=NewArticleDialog.js.map