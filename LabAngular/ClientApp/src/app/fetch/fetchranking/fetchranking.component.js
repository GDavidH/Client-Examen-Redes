"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
core_1.Component({
    templateUrl: './fetchranking.component.html'
});
var FetchCommentComponent = /** @class */ (function () {
    function FetchCommentComponent(http, _router, _commentService) {
        this.http = http;
        this._router = _router;
        this._commentService = _commentService;
        this.getComment();
    }
    FetchCommentComponent.prototype.getComment = function () {
        var _this = this;
        this._commentService.getComment().subscribe(function (data) { return _this.commentList = data; });
    };
    FetchCommentComponent.prototype.delete = function (id) {
        var _this = this;
        var answer = confirm("Do you want to delete Comment with id: " + id + "?");
        if (answer) {
            this._issueService.deleteComment(id).subscribe(function (data) {
                _this.getComment();
            }, function (error) { return console.error(error); });
        }
    };
    return FetchCommentComponent;
}());
exports.FetchCommentComponent = FetchCommentComponent;
//# sourceMappingURL=fetchemployee.component.js.map