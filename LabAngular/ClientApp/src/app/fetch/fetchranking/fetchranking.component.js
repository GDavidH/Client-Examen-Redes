"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
const { GuerrillaService } = require("../../services/guerrilla/guerrillaservice.service");
core_1.Component({
    templateUrl: './fetchranking.component.html'
});
var FetchRankingComponent = /** @class */ (function () {
    function FetchRankingComponent(http, _router, _guerrillaService) {
        this.http = http;
        this._router = _router;
        this._guerrillaService = _guerrillaService;
        this.getAllGuerrillas();
    }
    FetchRankingComponent.prototype.getAllGuerrillas = function () {
        var _this = this;
        this._guerrillaService.getAllGuerrillas().subscribe(function (data) { return _this.rankingList = data; });
    };
    return FetchRankingComponent;
}());
exports.FetchRankingComponent = FetchRankingComponent;
//# sourceMappingURL=fetchemployee.component.js.map