appMain.service('ajaxService', ['$http', function ($http) {
    this.AjaxPost = function (data, route, successFunction, errorFunction) {
        $http.post(route, data).success(function (response, status, headers, config) {
            successFunction(response, status);
        }).error(function (response) {
            if (response.IsAuthenicated == false) { window.location = "/admin"; }
            errorFunction(response);
        });
    }
    this.AjaxPut = function (data, route, successFunction, errorFunction) {
        $http.put(route, data).success(function (response, status, headers, config) {
            successFunction(response, status);
        }).error(function (response) {
            if (response.IsAuthenicated == false) { window.location = "/admin"; }
            errorFunction(response);
        });
    }
    this.AjaxDelete = function (data, route, successFunction, errorFunction) {
        $http({ method: 'DELETE', url: route, params: data }).success(function (response, status, headers, config) {
            successFunction(response, status);
        }).error(function (response) {
            if (response.IsAuthenicated == false) { window.location = "/admin"; }
            errorFunction(response);
        });
    }
    this.AjaxPostWithNoAuthenication = function (data, route, successFunction, errorFunction) {
        $http.post({ method: 'POST', url: route }).success(function (response, status, headers, config) {
            successFunction(response, status);
        }).error(function (response) {
            errorFunction(response);
        });
    }
    this.AjaxGet = function (route, successFunction, errorFunction) {
        $http({ method: 'GET', url: route }).success(function (response, status, headers, config) {
            successFunction(response, status);
        }).error(function (response) {
            if (response.IsAuthenicated == false) { window.location = "/admin"; }
            errorFunction(response);
        });
    }
    this.AjaxGetWithData = function (data, route, successFunction, errorFunction) {
        $http({ method: 'GET', url: route, params: data }).success(function (response, status, headers, config) {
            successFunction(response, status);
        }).error(function (response) {
            if (response.IsAuthenicated == false) { window.location = "/admin"; }
            errorFunction(response);
        });
    }
    this.AjaxGetWithNoBlock = function (data, route, successFunction, errorFunction) {
        $http({ method: 'GET', url: route, params: data }).success(function (response, status, headers, config) {
            successFunction(response, status);
        }).error(function (response) {;
            if (response.IsAuthenicated == false) { window.location = "/admin"; }
            errorFunction(response);
        });
    }
}]);


