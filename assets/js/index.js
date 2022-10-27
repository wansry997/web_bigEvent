$(function() {
    getUserInfo();
});
//获取用户基本信息
var layer = layui.layer

function getUserInfo() {
    $.ajax({
        type: "GET",
        url: '../../mock/userinfo.json',
        dataType: "json",
        success: function(responseText) { //请求成功回调
            if (responseText.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            console.log(responseText);
            rederAvatar(responseText.data)
        },
        error: function(e) { //请求超时回调
            if (e.status == "timeout") {
                alert("请求超时")
            }
        },
        complete: function(responseText) {
            if (responseText.responseJSON.status === 1 && responseText.responseJSON.message === '身份认证失败') {
                localStorage.removeItem('token')
                location.href = 'login.html'
            }
        }, //无论请求是成功还是失败都会执行的回调，常用全局成员的释放，或者页面状态的重置
    })

};

//渲染用户头像
function rederAvatar(user) {
    //1.获取用户名称
    //2.设置欢迎文本
    $('#welcome').html('欢迎' + user.nickname);
    //3.按需渲染用户头像
    if (user.user_pic) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = user.username[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
};

//退出
$('#loginout').on('click', function() {
    //提示用户是否退出
    layer.confirm('是否退出登录', { icon: 3, title: '提示' }, function(index) {
        //清空本地存放的token
        localStorage.removeItem('token')
        location.href = 'login.html'
        layer.close(index);
    });
});