

function login() {
    var name=$("input[name = 'username']").val();

    var pwd=$("input[name = 'password']").val();



    $.ajax({

        async:false,
        url:"/user/login",
        type:"POST",
        dataType : "json",
        data:{"username":name,"password":pwd,},
        success:function (data) {
            console.log(data);//打印服务端返回的数据(调试用)
            if (data.code==="500"){
                alert("用户名密码错误")
            }
            if (data.code==="200"){
                location.href ="index.html"
            }

        }

    })
}



