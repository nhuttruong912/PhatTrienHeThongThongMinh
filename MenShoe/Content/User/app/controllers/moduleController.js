appMain.controller('moduleController', function ($scope, $rootScope, $location, $window, moduleService, alertsService) {
    $scope.initController = function () {
        $scope.course = {
            Id: 0,
            Name: "",
            Email: "",
            Phone: "",
            Province: "",
            District: "",
            Address: "",
        };
        $scope.newsletter = {
            Id: 0,
            Name: "",
            Email: "",
            Phone: "",
            Province: "",
            District: "",
            Address: "",
        };
    }
    $scope.initAccessController = function () {
        moduleService.getAccessStatistic($scope.getAccessStatisticCompleted, $scope.getAccessStatisticError);
    }
    $scope.initFooterController = function (Shop) {
        $scope.LinkTypeConst = {
            Page: 0,
            Content: -1,
            GroupProduct: 3,
            GroupNews: 5,
            GroupProject: 29,
            GroupService: 26,
            GroupExchange: 32,
            Url: -2,
        };
        $scope.shop = window["Shop"];
        $scope.menus = window["Menus"];
        $scope.newss = window["Newss"];
        $scope.gallerys = window["Gallerys"];
    }
    $scope.initHeaderController = function (Shop, MyCart, ProductGroups, Search) {
        $scope.search = window[Search];
        $scope.shop = window[Shop];
        $rootScope.myCart = window[MyCart];
        $scope.ProductGroups = window[ProductGroups];
    }
    $scope.removeItemCart = function (obj) {
        moduleService.removeItemCart(obj, $scope.removeItemCartCompleted, $scope.getError);
    }
    $scope.removeItemCartCompleted = function (response) {
        $rootScope.myCart = response.Data;
    }
    $scope.initSalePolicyController = function (Shop) {
        $scope.shop = window[Shop];;
    }
    $scope.initAdvMenuController = function (AdvMenus) {
        $scope.AdvMenus = window[AdvMenus];
    }
    $scope.initAdvSlideController = function (AdvSlides) {
        $scope.AdvSlides = window[AdvSlides];
    }
    $scope.initPartnerController = function (Partners) {
        $scope.Partners = window[Partners];
    }
    $scope.initSlideshowController = function (Slideshows) {
        $scope.Slideshows = window[Slideshows];
    }
    $scope.initSupportOnlineController = function (Shop, SupportOnlines) {
        $scope.shop = window[Shop];
        $scope.SupportOnlines = window[SupportOnlines];
    }
    $scope.initTopLinkController = function (Shop, AccountLogin) {
        $scope.shop = window[Shop];
        $scope.accountLogin = window[AccountLogin];
    }
    $scope.initMapController = function (Maps) {
        $scope.Maps = window[Maps];
    }

    $scope.getAccessStatisticCompleted = function (response) {
        $scope.access = response.Data;
    }
    $scope.getAccessStatisticError = function (response) {
    }
    $scope.registerNewsletter = function () {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test($scope.newsletter.Email)) {
            alert("Địa chỉ email không hợp lệ.");
            return;
        }

        if (filter.test($scope.newsletter.Email)) {
            $scope.newsletter.Note = "Đăng ký nhận thông tin khuyến mãi";
            moduleService.registerNewsLetter($scope.newsletter, $scope.registerNewsletterCompleted, $scope.registerNewsletterError);
        }
    }
    $scope.registerNewsletterCompleted = function (response) {
        alert("Đăng ký thành công.\nCảm ơn bạn đã quan tâm đến chúng tôi.");
        $scope.newsletter = {
            Id: 0,
            Name: "",
            Email: "",
            Phone: "",
            Province: "",
            District: "",
            Address: "",
        };
    }
    $scope.registerNewsletterError = function (response) {
        alert(response.ReturnMessage);
    }

    $scope.registerCourse = function () {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test($scope.course.Email)) {
            alert("Địa chỉ email không hợp lệ.");
            return;
        }

        if (filter.test($scope.course.Email)) {
            $scope.course.Note = "Đăng ký khóa học";
            moduleService.registerNewsLetter($scope.course, $scope.registerCourseCompleted, $scope.registerCourseError);
        }
    }
    $scope.registerCourseCompleted = function (response) {
        alert("Đăng ký thành công.\nCảm ơn bạn đã đăng ký, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.");
        $scope.course = {
            Id: 0,
            Name: "",
            Email: "",
            Phone: "",
            Province: "",
            District: "",
            Address: "",
        };
    }
    $scope.registerCourseError = function (response) {
        alert(response.ReturnMessage);
    }
});
