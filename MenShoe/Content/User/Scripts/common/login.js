$(document).ready(function () {
    rtLogin.Controller.Init();
});

var rtLogin = {
    UrlAjaxRequest: {
        Login: "/AccountModule/AccountLoginAjax",
        LogOff: "/AccountModule/AccountLogOffAjax"
    },
    Element: {
        Login: "#login-container",
        LoginPopup: "#login-container-popup",
        LogOff: "#logoff-container"
    },
    Util: {
        Url: ""
    },
    Controller: {
        LogOff: function () {
            $.ajax({
                url: rtLogin.UrlAjaxRequest.LogOff,
                type: 'POST',
                async: false,
                data: JSON.stringify({}),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    if (data.Result == "OK") {
                        window.location.reload(true);
                    }
                    else {
                        alert(data.Message);
                    }
                },
                error: function () {
                }
            });
        },
        InitLoginPopup: function () {
            $(rtLogin.Element.LoginPopup).dialog({
                autoOpen: false,
                resizable: true,
                height: 250,
                width: 350,
                modal: true
            });
            $(rtLogin.Element.LoginPopup).dialog('open');
        },
        Login: function () {
            var token = $(rtLogin.Element.Login).find('input[name="__RequestVerificationToken"]').val();
            var email = $(rtLogin.Element.Login).find('[name="Email"]').val();
            var password = $(rtLogin.Element.Login).find('[name="Password"]').val();
            if (email == '') {
                $(rtLogin.Element.Login).find('[name="Email"]').focus();
                return;
            }
            if (password == '') {
                $(rtLogin.Element.Login).find('[name="Password"]').focus();
                return;
            }
            var obj = new Object();
            obj.Email = email;
            obj.Password = password;
            $.ajax({
                url: rtLogin.UrlAjaxRequest.Login,
                type: 'POST',
                async: false,
                data: JSON.stringify({ 'model': obj }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    if (data.Result == "OK") {
                        window.location.href = "/";
                    }
                    else {
                        alert(data.Message);
                    }
                },
                error: function () {
                }
            });
        },
        LoginPopup: function () {
            var email = $(rtLogin.Element.LoginPopup).find('[name="Email"]').val();
            var password = $(rtLogin.Element.LoginPopup).find('[name="Password"]').val();
            if (email == '') {
                $(rtLogin.Element.LoginPopup).find('[name="Email"]').focus();
                return;
            }
            if (password == '') {
                $(rtLogin.Element.LoginPopup).find('[name="Password"]').focus();
                return;
            }
            var obj = new Object();
            obj.Email = email;
            obj.Password = password;
            $.ajax({
                url: rtLogin.UrlAjaxRequest.Login,
                type: 'POST',
                async: false,
                data: JSON.stringify({ 'model': obj }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    if (data.Result == "OK") {
                        window.location.href = "/";
                    }
                    else {
                        alert(data.Message);
                    }
                },
                error: function () {
                }
            });
        },
        BindElements: function () {
            $("#btnLoginAjax").click(function () {
                rtLogin.Controller.Login();
            });
            $("#btnLoginPopup").click(function () {
                rtLogin.Controller.LoginPopup();
            });
            $("#btnInitLogin").click(function () {
                rtLogin.Controller.InitLoginPopup();
            });

            $(rtLogin.Element.Login).find('[name="Password"]').keydown(function (event) {
                if (event.keyCode == 13) {
                    rtLogin.Controller.Login();
                }
            });
            $(rtLogin.Element.Login).find('[name="Email"]').keydown(function (event) {
                if (event.keyCode == 13) {
                    rtLogin.Controller.Login();
                }
            });

            $(rtLogin.Element.LoginPopup).find('[name="Password"]').keydown(function (event) {
                if (event.keyCode == 13) {
                    rtLogin.Controller.LoginPopup();
                }
            });
            $(rtLogin.Element.LoginPopup).find('[name="Email"]').keydown(function (event) {
                if (event.keyCode == 13) {
                    rtLogin.Controller.LoginPopup();
                }
            });

            $("#btnLogOff").click(function () {
                rtLogin.Controller.LogOff();
            });
            $("#btnLogOff2").click(function () {
                rtLogin.Controller.LogOff();
            });
        },
        Init: function () {
            this.BindElements();
        }
    }
};







