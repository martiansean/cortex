$(document).ready(function () {
    $('.alert').hide();
    $('#progress').hide();
})
//
function warn(el) {
    $(el).addClass('warning')
}

function unwarn(el) {
    $(el).removeClass('warning')
}

function Login() {
    let Email = $('#login_email').val();
    let Password = $('#login_password').val();

    $('#progress').show();
    var posting = $.post("/users/login", { email: Email, password: Password })
    $('#progress').show()
    posting.done(function (data) {
        console.log(data)
        // console.log(data.error)
        $('#progress').hide()
        if (data.text == "correct") {
            window.location.replace('/playground')
        } else {
            $('.alert').text(data.text)
            if (data.error == true) {
                warn('#alert')
            }
            $('.alert').show()
            $('.alert').fadeOut(2000, function () {
                unwarn('#alert')
            })
        }
    })
}

function Register() { 
    let Email = $('#register_email').val()
    let pw1 = $('#register_pw1').val()
    let pw2 = $('#register_pw2').val()

    $('#progress').show();
    var posting = $.post("/users/register", { email: Email, password: pw1, password2: pw2 })
    $('#progress').show()
    posting.done(function (data) {
        // console.log(data.error)
        console.log(data)
        $('#progress').hide()
        if (data.text == "Account registered. You can now log in") {
            window.location.replace('/login')
        } else {
            $('.alert').text(data.text)
            if (data.error == true) {
                warn('#alert')
            }
            $('.alert').show()
            $('.alert').fadeOut(2000, function () {
                unwarn('#alert')
            })
        }
    })

}