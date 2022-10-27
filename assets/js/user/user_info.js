$(function() {
    initUserInfo()

    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6 && value.length <= 0) {
                layer.msg('昵称长度必须在1-6个字符')
            }
        }
    })

    function initUserInfo() {
        $.ajax({
            type: "GET",
            url: '../../mock/userinfo.json',
            dataType: "json",
            success: function(responseText) { //请求成功回调
                if (responseText.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                //调用form.val()快速为表单赋值
                form.val('formUserinfo', responseText.data);
            }
        })
    }

    $('#btn_reset').on('click', function(e) {
        e.preventDefault()
        initUserInfo()

    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: "GET",
            url: "../../mock/userinfo.json",
            data: $(this).serialize(),
            dataType: "json",
            success: function(responseText) { //请求成功回调
                if (responseText.status !== 0) {
                    return layer.msg('修改用户信息失败')
                }
                //调用父页面的方法,重新渲染用户头像信息
                window.parent.getUserInfo()
                return layer.msg('修改用户信息成功');
            },
            error: function(e) { //请求超时回调
                if (e.statusText == "timeout") {
                    alert("请求超时")
                }
            },
            complete: function() {}, //无论请求是成功还是失败都会执行的回调，常用全局成员的释放，或者页面状态的重置
        })
    })
})