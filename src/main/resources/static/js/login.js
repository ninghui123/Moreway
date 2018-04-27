
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
                location.href ="#new"
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
                    obj +=list.status===0?'<td>超级管理员</td>':list.status===1?'<td>管理员</td>':list.status===2?'<td>经销商</td>':'<td>人员</td>';
                    obj +='<td><button type="button" class="btn btn-xs btn-info" href="#modal-table" title="编辑" role="button"  class="blue"  onclick=update_button("'+list.id+'"); data-toggle="modal"><i class="ace-icon fa fa-pencil bigger-120"></i></button>' +
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

function update_button(id) {
    $.ajax({
        url:"/user/one",
        type:"GET",
        dataType : "json",
        data:{"id":id},
        success:function (data) {
            $("input[name = 'update_username']").val(data.nickname);
            $("input[name = 'update_password']").val(data.pswd);
            $("select[name = 'update_select']").find("option[value="+data.status+"]").attr("selected",true);
            $("button[name = 'update_submit_button']").val(id);
            // $(" option[value='0']").text(data.status===0?"超级管理员":data.status===1?"管理员":data.status===2?"经销商":"普通人员");
        }
    })
}

function submit_button() {
    var name=$("input[name = 'update_username']").val();
    var pswd=$("input[name = 'update_password']").val();
    var status=$("select[name = 'update_select']").find("option:selected").val();
    var id=$("button[name = 'update_submit_button']").val();
    $.ajax({
        url:"/user/update",
        type:"PUT",
        dataType : "json",
        contentType : "application/json",
        data:JSON.stringify({
            id:id,
            nickname:name,
            pswd:pswd,
            status:status
        }),
        success:function (data) {
            if(data=="200"){
                window.location.reload();
            }else {
                window.location.reload();
                alert("修改失败!")
            }
        }
    })
}

function add_button() {
    var name=$("input[name = 'add_username']").val();
    var pswd=$("input[name = 'add_password']").val();
    var status=$("select[name = 'add_select']").find("option:selected").val();
    $.ajax({
        url:"/user/add",
        type:"POST",
        dataType : "json",
        contentType : "application/json",
        data:JSON.stringify({
            nickname:name,
            pswd:pswd,
            status:status
        }),
        success:function (data) {
            if(data=="200"){
                window.location.reload();
            }else {
                window.location.reload();
                alert("添加失败!")
            }
        }
    })
}

function search() {
    var str=$("input[name = 'search']").val();
    $.ajax({
        url:"/user/search",
        type:"GET",
        dataType : "json",
        data:{"str":str},
        success:function (data) {
            $(".table tr").empty();
            var obj = "";
            $.each(data,function (i,list) {
                obj += '<tr>';
                // obj +='<td>'+list.id+'</td>';
                obj +='<td>'+list.nickname+'</td>';
                console.log(list.nickname)
                obj +='<td>'+list.pswd+'</td>';
                obj +=list.status===0?'<td>超级管理员</td>':list.status===1?'<td>管理员</td>':list.status===2?'<td>经销商</td>':'<td>人员</td>';
                obj +='<td><button type="button" class="btn btn-xs btn-info" href="#modal-table" title="编辑" role="button"  class="blue"  onclick=update_button("'+list.id+'"); data-toggle="modal"><i class="ace-icon fa fa-pencil bigger-120"></i></button>' +
                    '<button type="button" class="btn btn-xs btn-danger" name="delbutt" onclick=delete_button("'+list.id+'"); title="删除"><i class="ace-icon fa fa-trash-o bigger-120"></i></button></td>'
                obj	+='</tr>';
            })
            $(".table").append(obj);
        }
    })
}