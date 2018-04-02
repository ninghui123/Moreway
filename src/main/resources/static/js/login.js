function login() {
    var name = $("input[name = 'username']").val();
    var pwd=$("input[name = 'password']").val();
    $.ajax({
        async : false,
        url:"/user/login",
        type:"POST",
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

$(function (){
   list();

})

function list() {
    $.ajax({
        url:"/user/list",
        type:"POST",
        dataType : "json",
        contentType : "application/json",
        data:JSON.stringify({
            pageNext:1,
            pageSize:10
        }),
            success:function (data) {
                var obj = "";
                $.each(data,function (i,list) {
                    obj += '<tr>';
                    // obj +='<td>'+list.id+'</td>';
                    obj +='<td>'+list.nickname+'</td>';
                    obj +='<td>'+list.pswd+'</td>';
                    obj +=list.status===0?'<td>超级管理员</td>':list.status===1?'<td>管理员</td>':list.status===3?'<td>经销商</td>':'<td>人员</td>';
                    obj +='<td><button type="button" class="btn btn-xs btn-info" href="#modal-table" title="编辑" role="button"  class="blue" data-toggle="modal"><i class="ace-icon fa fa-pencil bigger-120"></i></button>' +
                        '<button type="button" class="btn btn-xs btn-danger" name="delbutt" onclick=delete_button("'+list.id+'"); title="删除"><i class="ace-icon fa fa-trash-o bigger-120"></i></button></td>'
                    obj	+='</tr>';
                })
                $(".table").append(obj);
            }
    })
}

function delete_button(id) {
    $.ajax({
        url:"/user/delete/"+id,
        type:"DELETE",
        dataType : "json",
        success:function (data) {
            if (data=="200"){
                window.location.reload()
                alert("删除成功！")
            }else {
                window.location.reload()
                alert("网络错误请重试！")
            }
        }
    })

}
