
function login() {

    var name = $("input[name = 'username']").val();
    var pwd=$("input[name = 'password']").val();

    $.ajax({
        async : false,
        url:"/user/login",
        type:"POST",
        dataType : "json",
        data:{"username":name,"password":pwd},

        success:function (success) {
            alert(success.code);
            // if (success.code===500){
            //     toastr.error("用户名或密码有误，请从新输入!");
            // }
            // if (success.code===200){
            //     // window.location.href = "user.html";
            //
            // }
        }
    })
}

