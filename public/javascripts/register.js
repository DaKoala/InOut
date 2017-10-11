/**
 * Created by billyzou on 2017/9/27.
 */
$().ready(function() {
    $("#register-form").validate({
        errorElement: 'div',
        rules: {
            userid: {
                required: true,
                minlength: 6,
                remote: {
                    url: "registerCheck",
                    type: "post",
                    dataType: "json",
                    data: {
                        userid: function () {
                            return $('#userid').val();
                        }
                    }
                }
            },
            password: {
                required: true,
                minlength: 6
            },
            confirmPassword: {
                required: true,
                minlength: 6,
                equalTo: '#password'
            }
        },
        messages: {
            userid: {
                required: '用户名不能为空',
                minlength: '用户名不能少于6个字符',
                remote: '该用户名已被注册'
            },
            password: {
                required: '密码不能为空',
                minlength: '密码不能少于6个字符'
            },
            confirmPassword: {
                required: '密码不能为空',
                minlength: '密码不能少于6个字符',
                equalTo: '两次输入的密码不一致'
            }
        },
        success: function(label, element) {
            label.addClass('checked');
        }
    });
});