

$(function () {

        list();
})

function list() {

    $.ajax({
        async:false,
        url:"/user/list",
        type:"POST",
        dataType : "json",
        contentType:"application/json",
        data: JSON.stringify({
            pageNext:1,
            pageSize:10
        }),

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
                    str += data[i].status===0?'<td>超级管理员</td>':data[i].status===1?"<td>管理员</td>":data[i].status===3?"<td>经销商</td>":"<td>下级人员</td>";
                    str += '<td><button class="btn btn-xs btn-info" href="#modal-table" title="编辑" role="button" class="blue" data-toggle="modal"><i class="ace-icon fa fa-pencil bigger-120"></i></button>'+
                        '<button class="btn btn-xs btn-danger" title="删除"><i class="ace-icon fa fa-trash-o bigger-120"></i> </button></td>';
                    str += "</tr>";
                }

                /* for(var i in data){
                 console.log(i);
                 str += "<tr>";
                 str += "<td>" + i.mman + "</td>";
                 alert(i.mman);
                 str += "<td>" + i.verdict + "</td>";
                 str += "<td>" + i.reason + "</td>";
                 str += "<td>" + i.nopartreason + "</td>";
                 str += "<tr>";
                 } */
                $("#hs").append(str);
            }
        });



}


//添加
function add() {
    var name=$("input[name = 'username']").val();
alert('123');
    var pwd=$("input[name = 'password']").val();

    var px=$("select[name = 'px']").val();
alert('321');
    $.ajax({

        async:false,
        url:"/user/add",
        type:"Post",
        dataType : "json",
        data:{"username":name,"password":pwd,"px":px,},
        success:function (data) {


        }

    })
}
//删除
function del(){

    $.ajax({
        type: "delete",
        data: $.param({id: v}),
        url: "/user/delete", //后台提供的删除接口
        dataType: 'json',
        success: function (data) {
            var html = '';
            if (data.status == 1) {
                alert('删除成功');
                window.location.reload();
            } else {
                alert('删除失败，请稍后重试');
                return false;
            }
        }
    });
}










