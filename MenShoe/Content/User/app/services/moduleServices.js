appMain.service('moduleService', ['ajaxService', function (ajaxService) {
    this.getAccessStatistic = function (successFunction, errorFunction) {
        ajaxService.AjaxGet("/api/module/getaccessstatistic", successFunction, errorFunction);
    };
    this.removeItemCart = function (id, successFunction, errorFunction) {
        ajaxService.AjaxPut(id, "/api/order/removeitemcart", successFunction, errorFunction);
    };
    this.registerNewsLetter = function (model, successFunction, errorFunction) {
        ajaxService.AjaxPost(model, "/api/module/registernewsletter", successFunction, errorFunction);
    };
}]);

