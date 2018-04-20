
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

                    success: function(data){
                        console.log(data);
                var str = "";
                for(var i=0; i < data.length; i++) {
                    //data[i]
                    //console.log(data[i]);
                    //alert(data[i].con);
                    str += "<tr>";
                    str += "<td>" + data[i].id + "</td>";
                    str += "<td>" + data[i].nickname + "</td>";
                    str += "<td>" + data[i].pswd + "</td>";
                    str += data[i].status===0?'<td>超级管理员</td>':data[i].status===1?'<td>管理员</td>':data[i].status===2?'<td>经销商</td>':'<td>下级人员</td>';
                    str += '<td><button class="btn btn-xs btn-info"  onclick=user_update("'+data[i].id+'"); href="#modal-table" title="编辑" role="button" class="blue" data-toggle="modal"><i class="ace-icon fa fa-pencil bigger-120"></i></button>'+
                        '<button class="btn btn-xs btn-danger" onclick=user_del("'+data[i].id+'"); title="删除" role="button" data-toggle="modal"><i class="ace-icon fa fa-trash-o bigger-120"></i> </button></td>';
                    str += "</tr>";
                }

                $("#hs").append(str);
            }
        });
}


//添加
function user_add() {
    var name = $('#name').val();
    var pwd=$('#password').val();
    var status=$("select[name = 'add_select']").val();

    // var px = $("#px").val();
    $.ajax({
        url: "/user/add", //要处理的页面
        //要传过去的数据
        data: JSON.stringify({
            nickname: name,
            pswd: pwd,
            status:status
        }),
        type: "POST",  //提交方式
        dataType: "JSON", //返回的数据类型，TEXT字符串 JSON返回JSON XML返回XML；dataType中T要大写！！
        contentType: "application/json",
        success: function(data){ ///处理页面成功后输出
            if(data=="200") {
                window.location.reload();
            }else {
               alert("添加失败");
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
            $("button[name = 'update_submit']").val(id)
            $("select[name = 'status_select']").find("option[value="+data.status+"]").attr("selected",true);
        }

    })

}
function update_submit(){

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
        success: function(data){ ///处理页面成功后输出
            if(data=="200") {
                window.location.reload();
            }else {
                window.location.reload();
            }
        }

    })

}
//删除
function del(id){
    if(confirm('确认删除吗?')){
        $.ajax({
            type:'delete',
            url: "/user/delete/"+id,
            success: function(data){
                if(data=="200"){ //删除成功
                    window.location.reload();
                }else{
                    alert("删除失败");
                }
            }
        });
    }


}
//模糊查询
$(document).ready(function(){
    $("#btn").click(function(){
        var search = $("#search").val();
        alert(search);
        $("#all tr td").remove();
        if(search==null ||search==""){
            alert("查询条件不能为空！");//要判断一下，否则的话，要出全部列表，我下面已经有出全部列表的了，
            parent.document.location.href="";//必须得这一步，否则会空列表
        }else{
            $.ajax({
                type:"GET",
                url:"/user/search",
                data:{
                    "search":search,
                },
                DataType:"json",
                success:function(data){
                    var dataObj = eval("("+data+")");
                    //alert(dataObj);
                    var a=null;//主要是因为json是个数组，有多列结果的时候，得拼接+
                    $.each(dataObj,function(i,item){
                        //alert(dataObj.length);
                        //alert("这是："+item.id+","+item.username);
                        a += '<tr>'+
                            +'<td id="id">'+item.id+'</td>'
                            +'<td id="name">'+item.username+'</td>'
                            +'<td id="status">'+item.status+'</td>'
                            +'<td id="isAdmin">'+item.isAdmin +'</td>'
                            +'<td id="createTime">'+item.createTime+'</td>'
                            +'</tr>';
                    })
                    $("#all").append(a);

                },
            });
        }
    })
});


