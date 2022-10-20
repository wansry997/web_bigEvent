$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()

    })
})

//从layui中获取form对象
var form = layui.form
var layer = layui.layer
    //通过form.verify()函数自定义校验规则
form.verify({
    passwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    username: function(value, item) { //value：表单的值、item：表单的DOM对象
        if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
            return '用户名不能有特殊字符';
        }
        if (/(^\_)|(\__)|(\_+$)/.test(value)) {
            return '用户名首尾不能出现下划线\'_\'';
        }
        if (/^\d+\d+\d$/.test(value)) {
            return '用户名不能全为数字';
        }
        if (value === 'xxx') {
            alert('用户名不能为敏感词');
            return true;
        }
    },
    //校验两次密码是否一致
    repasswd: function(value) {
        var repasswd = $('.reg-box [name=userpasswd]').val()
        if (repasswd !== userpassewd) {
            return '两次密码输入不一致'
        }
    }


})

//监听注册表单的提交事件
$('#form-reg').on('submit', function(e) {
    e.preventDefault()
        // $.post("http://ajax.frontend.itheima.net/api/reguser", {
        //         username: $('#form-reg [name = username]').val(),
        //         userpassewd: $('#form-reg [name = userpassewd]').val()
        //     },
        //     function(responseText) {
        //         if (responseText != 0) {
        //             alert(responseText.messge)

    //         }
    //         alert('注册成功')
    //     },
    // )
    $.get(`../../mock/register.json`, {
        username: $('#form-reg [name = username]').val(),
        userpassewd: $('#form-reg [name = userpasswd]').val()
    }, (responseText) => {
        if (responseText.status != 0) {
            layer.msg(responseText.messge)
        }
        layer.msg('注册成功')
    })
})

//登录注册表单事件
$('#form-login').on('submit', function(e) {
    e.preventDefault()
    $.post(`../../mock/login.json`, {
        username: $('#form-login [name = username]').val(),
        userpassewd: $('#form-login [name = userpasswd]').val()
    }, (responseText) => {
        if (responseText.status != 0) {
            layer.msg(responseText.messge)
        }
        localStorage.setItem('token', responseText.token)
            // location.href = '/index.html'
    })
})