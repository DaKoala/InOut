/**
 * Created by billyzou on 2017/9/27.
 */
$("#login-button").click(function() {
    $("#log-in").validate({
        onfocusout: false,
        onkeyup: false,
        focusInvalid: false,
        focusCleanup: true,
        errorElement: 'div',
        rules: {
            userid: {
                required: true,
                remote: {
                    url: 'loginUserCheck',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        userid: function(){
                            return $("#userid").val();
                        }
                    }
                }
            },
            password: {
                required: true,
                remote: {
                    url: 'loginPasswordCheck',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        userid: function(){
                            return $("#userid").val();
                        },
                        password: function() {
                            return $("#password").val();
                        }
                    }
                }
            }
        },
        messages: {
            userid: {
                required: "用户名不能为空",
                remote: "用户名不存在"
            },
            password: {
                required: "密码不能为空",
                remote: "密码错误"
            }
        },
        wrapper: 'span'
    });
});