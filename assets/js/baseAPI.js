//调用函数，拿到给Ajax的配置对象
// $.ajaxPrefilter(function(options) {
//     options.url = 'http://ajax.frontend.itheima.net' + options.url
//     console.log(options.url);
// })

// //全局统一挂载complete回调函数
// options.complete = function(responseText) {
//     if (responseText.responseJSON.status === 1 && responseText.responseJSON.message === '身份认证失败') {
//         localStorage.removeItem('token')
//         location.href = 'login.html'
//     }
// }