$.xhrPool = [];
$.xhrPool.abortAll = function () {
    $(this).each(function (idx, jqXHR) {
        jqXHR.abort();
    });
};

$.ajaxSetup({
    beforeSend: function (jqXHR) {
        $.xhrPool.push(jqXHR);
        $("#loading-mask").show();
    }
});
$(document).ajaxStop(function () {
    $.xhrPool.pop();
    $("#loading-mask").hide();
});

$(document).ajaxError(function () {
    $.xhrPool.abortAll();
});

function CheckAccountLogin() {
    var accountId = 0;
    $.ajax({
        url: '/AccountModule/CheckAccountLogin',
        type: 'POST',
        async: false,
        data: JSON.stringify({}),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data.Result == "OK") {
                accountId = data.Data;
            }
            else {
                alert(data.Message);
            }
        },
        error: function () {
        }
    });
    return accountId;
}
$(document).ready(function ($) {
    //	Back Top Link
    var offset = 200;
    var duration = 500;
    $(window).scroll(function () {
        if ($(this).scrollTop() > offset) {
            $('.back-to-top').fadeIn(400);
        } else {
            $('.back-to-top').fadeOut(400);
        }
    });
    $('.back-to-top').click(function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 600);
        return false;
    })
});
