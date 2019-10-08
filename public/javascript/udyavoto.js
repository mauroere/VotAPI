$(function() {

});

function checkDNI() {


    var q = $("#dni").val();

    if (q.length === 0) {
        alert('Ingrese DNI')
    }

    var flag = false;

    $.ajax({
        url: "/api/votapi/" + q,
        type: "GET",
        dataType: "json",
        async: false,
        statusCode: {
            200: function() {
                alert(`Usted ya votó`)

                flag = false;
            },
            404: function() {

                flag = true;
            }
        }
    })
    return flag;
};