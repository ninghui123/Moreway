
$(function () {
    user_list();
})

function user_list() {

    $.ajax({
        async:false,
        url:"/user/list",
        type:"GET",
        dataType : "json",
        contentType:"application/json",
        data: {
            "pageNext":1,
            "pageSize":10
        },

        success: function(success){

            $(".table>tbody").empty();//清除

            console.log(success.data);
            var str = "";
            for(var i=0; i < success.data.length; i++) {

                //data[i]
                //console.log(data[i]);
                //alert(data[i].con);
                str += "<tr>";
                str += "<td>" + success.data[i].id + "</td>";
                str += "<td>" + success.data[i].nickname + "</td>";
                str += "<td>" + success.data[i].pswd + "</td>";
                str += success.data[i].status===0?'<td>超级管理员</td>':success.data[i].status===1?'<td>管理员</td>':success.data[i].status===2?'<td>经销商</td>':'<td>下级人员</td>';
                str += '<td><button class="btn btn-xs btn-info"  onclick=user_update("'+success.data[i].id+'"); href="#modal-table" title="编辑" role="button" class="blue" data-toggle="modal"><i class="ace-icon fa fa-pencil bigger-120"></i></button>'+
                    '<button class="btn btn-xs btn-danger" onclick=user_del("'+success.data[i].id+'"); title="删除" role="button" data-toggle="modal"><i class="ace-icon fa fa-trash-o bigger-120"></i> </button></td>';
                str += "</tr>";
            }

            $("#hs").append(str);
        }
    });
}


//添加
function user_add() {
    var name=$("input[name = 'add_username']").val();
    var pswd=$("input[name = 'add_password']").val();
    var status=$("select[name = 'add_select']").find("option:selected").val();

    // var px = $("#px").val();
    $.ajax({
        url:"/user/add",
        type:"POST",
        dataType : "json",
        contentType : "application/json",
        data:JSON.stringify({
            nickname: name,
            pswd: pswd,
            status:status
        }),
        success: function(success){ ///处理页面成功后输出
            $('#new').modal('hide')

            if(success.code=="200") {

            toastr.success("添加成功!");
                // window.location.href ="user.html"
            }else {
                toastr.error("添加失败!");
            }
        }

    })

}
//修改
function user_update(id) {

    $.ajax({
        url:"/user/one",
        type:"GET",
        dataType:"json",
        data:{"id":id,

        },
        success:function (data) {
            $("input[name = 'update_username']").val(data.nickname);
            $("input[name = 'update_password']").val(data.pswd);
            $("button[name = 'update_submit']").val(data.id);
            $("select[name = 'status_select']").find("option[value="+data.status+"]").attr("selected",true);
        }

    })

}
function UpdateSubmit(){
    var name = $("input[name = 'update_username']").val();
    var pwd= $("input[name = 'update_password']").val();
    var id=$("button[name = 'update_submit']").val();
    var status=$("select[name = 'status_select']").val();
    $.ajax({
        url:"/user/update",
        type:"PUT",
        dataType:"json",
        contentType: "application/json",
        data: JSON.stringify({
            nickname: name,
            pswd: pwd,
            id:id,
            status:status

        }),
        success: function(success){ ///处理页面成功后输出
            $('#modal-table').modal('hide')
            if(success.code=="200") {
                toastr.success("修改成功!");

            }else {
                toastr.error("修改失败!");
            }
        }

    })

}
//删除
function user_del(id){
    if(confirm('确认删除吗?')){
        $.ajax({
            type:'delete',
            url: "/user/delete/"+id,
            success: function(success){

                if(success.code=="200"){ //删除成功
                    toastr.success("删除成功!");

                }else{
                    toastr.error("删除失败!");
                }
            }
        });
    }
}
//模糊查询
$(document).ready(function(){
    $("#btn").click(function(){
        var search = $("#search").val();
        if(search==null ||search==""){
            toastr.warning("查询条件不能为空!");
            // parent.document.location.href="user.html";//必须得这一步，否则会空列表
        }else{
            $.ajax({
                type:"GET",
                url:"/user/search",
                data:{
                    str: search,
                    pageNext:1,
                },
                contentType: "application/json",
                success: function(ReturnMsg){
                    $(".table>tbody").empty();//清除
                    var str = "";
                    for(var i=0; i < ReturnMsg.data.length; i++) {
                        str += "<tr>";
                        str += "<tr>";
                        str += "<td>" + ReturnMsg.data[i].id + "</td>";
                        str += "<td>" + ReturnMsg.data[i].nickname + "</td>";
                        str += "<td>" + ReturnMsg.data[i].pswd + "</td>";
                        str += ReturnMsg.data[i].status===0?'<td>超级管理员</td>':ReturnMsg.data[i].status===1?'<td>管理员</td>':ReturnMsg.data[i].status===2?'<td>经销商</td>':'<td>下级人员</td>';
                        str += '<td><button class="btn btn-xs btn-info"   href="#modal-table" title="编辑" role="button" class="blue" data-toggle="modal"><i class="ace-icon fa fa-pencil bigger-120"></i></button>'+
                            '<button class="btn btn-xs btn-danger"  title="删除" role="button" data-toggle="modal"><i class="ace-icon fa fa-trash-o bigger-120"></i> </button></td>';
                        str += "</tr>";
                    }
                    $("#hs").append(str);
                },
            });
        }
    })
});
//退出
function loginout(){

    if (confirm("您确定要退出系统吗？"))
        top.location = "/logout";
    return false;


}

