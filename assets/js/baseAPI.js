//调用函数，拿到给Ajax的配置对象
$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    console.log(options.url);
})