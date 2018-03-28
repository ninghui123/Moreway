function login() {
    var name = $("input[name = 'username']").val();
    var pwd=$(":password").val();
    $.ajax({
        async : false,
        url:"/login",
        type:"GET",
        dataType : "json",
        data:{"username":name,"password":pwd},
        success:function (data) {
            if (data.code==="500"){
                alert("用户名密码错误")
            }
            if (data.code==="200"){
                location.href ="index.html"
            }
        }
    })
}