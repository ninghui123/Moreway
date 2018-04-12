
$(function () {
    equipment_list();
})

function equipment_list() {

    $.ajax({
        async:false,
        url:"/Equipment/list",
        type:"GET",
        dataType : "json",
        contentType:"application/json",
        data: {
            "pageNext":1,
            "pageSize":10,
        },

        success: function(data){

            console.log(data);
            var str = "";
            for(var i=0; i < data.length; i++) {

                //data[i]
                //console.log(data[i]);
                //alert(data[i].con);
                str += "<tr>";
                str += data[i].status===0?'<td><span class="label label-success arrowed"><i class="fa fa-cog fa-spin"></i>正常运行</span></td>' +
                    '':data[i].status===1?'<td><span class="label"> <i class="fa fa-exclamation-triangle "></i>余额不足</span></td>'
                      :'<td><span class="label label-sm label-warning"> <i class="fa fa-ban fa-fw"></i>设备已停用 </span></td>';
                str += "<td>" + data[i].equipmentName + "</td>";
                str += "<td>" + data[i].equipmentType + "</td>";
                str += "<td>" + data[i].id + "</td>";
                str += '"<td class="colspan-a"><div class="data-show-box" id="dateShow3"><span class="datein" id="dataInfoShow_2"></span><span class="date-tiem-span d">00</span>天 <span class="date-tiem-span h">00</span>时 <span class="date-tiem-span m">00</span>分 <span class="date-s-span s">00</span>秒 <input type="text" value="'+ data[i].createTime+'" id="getTimeIpt_2" /> <input type="text" value="'+ data[i].updateTime+'" id="getTimeIpt_3"/></div></td>';
                str += '<td><button class="btn btn-xs btn-info"  onclick=update("'+data[i].id+'"); href="#modal-table" title="编辑" role="button" class="blue" data-toggle="modal"><i class="ace-icon fa fa-pencil bigger-120"></i></button>'+
                    '<button class="btn btn-xs btn-danger" onclick=del("'+data[i].id+'"); title="删除" role="button" data-toggle="modal"><i class="ace-icon fa fa-trash-o bigger-120"></i> </button></td>';
                str += "</tr>";
            }

            $("#hs").append(str);
        }
    });
}

//
// //添加
// function add() {
//     var name = $('#name').val();
//     var pwd=$('#password').val();
//     var status=$("select[name = 'add_select']").val();
//
//     // var px = $("#px").val();
//     $.ajax({
//         url: "/user/add", //要处理的页面
//         //要传过去的数据
//         data: JSON.stringify({
//             nickname: name,
//             pswd: pwd,
//             status:status
//         }),
//         type: "POST",  //提交方式
//         dataType: "JSON", //返回的数据类型，TEXT字符串 JSON返回JSON XML返回XML；dataType中T要大写！！
//         contentType: "application/json",
//         success: function(data){ ///处理页面成功后输出
//             if(data=="200") {
//                 window.location.reload();
//             }else {
//                 alert("添加失败");
//             }
//         }
//     })
// }
// //修改
// function update(id) {
//     $.ajax({
//         url:"/user/one",
//         type:"GET",
//         dataType:"json",
//         data:{"id":id,
//
//         },
//         success:function (data) {
//             $("input[name = 'update_username']").val(data.nickname);
//             $("input[name = 'update_password']").val(data.pswd);
//             $("button[name = 'update_submit']").val(id)
//             $("select[name = 'status_select']").find("option[value="+data.status+"]").attr("selected",true);
//         }
//
//     })
//
// }
// function update_submit(){
//
//     var name = $("input[name = 'update_username']").val();
//     var pwd= $("input[name = 'update_password']").val();
//     var id=$("button[name = 'update_submit']").val();
//     var status=$("select[name = 'status_select']").val();
//     $.ajax({
//         url:"/user/update",
//         type:"PUT",
//         dataType:"json",
//         contentType: "application/json",
//         data: JSON.stringify({
//
//             nickname: name,
//             pswd: pwd,
//             id:id,
//             status:status
//
//         }),
//         success: function(data){ ///处理页面成功后输出
//             if(data=="200") {
//                 window.location.reload();
//             }else {
//                 window.location.reload();
//             }
//         }
//
//     })
//
// }
// //删除
// function del(id){
//     if(confirm('确认删除吗?')){
//         $.ajax({
//             type:'delete',
//             url: "/user/delete/"+id,
//             success: function(data){
//                 if(data=="200"){ //删除成功
//                     window.location.reload();
//                 }else{
//                     alert("删除失败");
//                 }
//             }
//         });
//     }
//
//
// }


