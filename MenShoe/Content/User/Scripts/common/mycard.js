
function AddToCard(productId, quantity) {
    $.ajax({
        url: '/OrderModule/AddToCard',
        type: 'POST',
        data: JSON.stringify({ 'productId': productId, 'quantity': quantity }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data.Result == "OK") {
                if (data.Data.IsVariant) {
                    window.location.href = "/san-pham/" + data.Data.ProductCode + ".html";
                }
                else {
                    window.location.href = "/gio-hang.html";
                }
            }
        },
        error: function () {
        }
    });
}
function RemoveItemCard(productId, variantId) {
    $.ajax({
        url: '/OrderModule/RemoveItemCard',
        type: 'POST',
        data: JSON.stringify({ 'productId': productId, 'variantId': variantId }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data.Result == "OK") {
                location.reload();
            }
        },
        error: function () {
        }
    })
}
function UpdateQuantityCard(event, productId) {
    var quantity = $("#txtQuantity" + productId).val();
    if (!$.isNumeric(quantity) || quantity <= 0) {
        $("#txtQuantity" + productId).val('1');
    }
    else if (event.keyCode == 13) {
        $.ajax({
            url: '/OrderModule/UpdateQuantityCard',
            type: 'POST',
            data: JSON.stringify({ 'productId': productId, 'quantity': quantity }),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data.Result == "OK") {
                    location.reload();
                }
            },
            error: function () {
            }
        });
    }
}
function UpQuantityCard(productId) {
    $.ajax({
        url: '/OrderModule/UpQuantityCard',
        type: 'POST',
        data: JSON.stringify({ 'productId': productId }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data.Result == "OK") {
                location.reload();
            }
        },
        error: function () {
        }
    });
}

function DownQuantityCard(productId) {
    $.ajax({
        url: '/OrderModule/DownQuantityCard',
        type: 'POST',
        data: JSON.stringify({ 'productId': productId }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data.Result == "OK") {
                location.reload();
            }
        },
        error: function () {
        }
    });
}





