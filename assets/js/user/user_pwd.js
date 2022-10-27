$(function() {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        passwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samepasswd: function(value) {
            if (value === $('[name=oldpasswd]').val()) {
                return '新旧密码不能相同'
            }
        },
        repasswd: function(value) {
            if (value !== $('[name=newpasswd]').val()) {
                return '两次输入不一致，请再次确认密码'
            }
        }
    })



})