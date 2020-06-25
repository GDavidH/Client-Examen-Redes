"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var operators_1 = require("rxjs/operators");
var Rx_1 = require("rxjs/Rx");
//@Injectable
var GuerrillaService = /** @class */ (function () {
    function GuerrillaService(_http, /*@Inject('BASE_URL')*/ baseUrl) {
        this._http = _http;
        this.myAppUrl = "";
        this.myAppUrl = baseUrl;
    }
    GuerrillaService.prototype.getGuerrillas= function () {
        return this._http.get('https://localhost:44331/Guerrilla').pipe(operators_1.map(function (res) {
            console.log('res', res);
            return res;
        }));
    };
    GuerrillaService.prototype.errorHandler = function (error) {
        console.log(error);
        return Rx_1.Observable.throw(error);
    };
    return GuerrillaService;
}());
exports.GuerrillaService = GuerrillaService;
//# sourceMappingURL=guerrillaservice.service.js.map