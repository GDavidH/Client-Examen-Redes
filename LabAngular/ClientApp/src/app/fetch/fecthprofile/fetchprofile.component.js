"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
core_1.Component({
    templateUrl: './fetchprofile.component.html'
});
var FetchClientComponent = /** @class */ (function () {
    function FetchClientComponent(http, _router, _clientService) {
        this.http = http;
        this._router = _router;
        this._clientService = _clientService;
        this.getClient();
    }
    FetchClientComponent.prototype.getClient = function () {
        var _this = this;
        this._issueService.getClient().subscribe(function (data) { return _this.clientList = data; });
    };
    FetchClientComponent.prototype.delete = function (id) {
        var _this = this;
        var answer = confirm("Do you want to delete Client with id: " + id + "?");
        if (answer) {
            this._issueService.deleteClient(id).subscribe(function (data) {
                _this.getClient();
            }, function (error) { return console.error(error); });
        }
    };
    return FetchClientComponent;
}());
exports.FetchClientComponent = FetchClientComponent;
//# sourceMappingURL=fetchemployee.component.js.map