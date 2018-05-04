

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
            $(".table>tbody").empty();//清除
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
    var but=$('.btn').val();
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
            if(data=="200") $(function () {
                user_list();
                add_promptb();
            }) else {
                $(function () {
                    add_prompta();
                })
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
            $("button[name = 'update_submit']").val(id);
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
        success: function(data){ ///处理页面成功后输出
            if(data=="200") {
                $(function () {
                    user_list();
                    modify_promptb();
                })


            }else {
                $(function () {
                    modify_prompta();
                })
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
            success: function(data){
                if(data=="200"){ //删除成功
                    $(function () {
                        del_promptb();
                        window.location.reload();
                    })

                }else{
                    $(function () {
                        del_prompta();
                    })
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
            alert("查询条件不能为空！");//要判断一下，否则的话，要出全部列表，我下面已经有出全部列表的了，
            // parent.document.location.href="";//必须得这一步，否则会空列表
        }else{
            $.ajax({
                type:"GET",
                url:"/user/search",
                data:{
                    str: search,
                    pageNext:1,
                },
                contentType: "application/json",
                success:function(ReturnMsg){
                    mytowObj = ReturnMsg.data(JSON.parse(data));
                    alert(mytowObj);
                    $(".table>tbody").empty();//清除

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

//删除错误提示
function del_prompta(){

    var msgw,msgh,bordercolor;
    msgw=400;//提示窗口的宽度
    msgh=600;//提示窗口的高度

    var sWidth,sHeight;
    sWidth=document.body.offsetWidth;
    sHeight=document.body.offsetHeight;
    var bgObj=document.createElement("div");
    bgObj.setAttribute('id','bgDiv');
    bgObj.style.position="absolute";
    bgObj.style.top="0";
    bgObj.style.background="#777";//背景颜色
    // bgObj.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75";
    bgObj.style.opacity="0.6";
    bgObj.style.left="0";
    bgObj.style.width="100%";
    bgObj.style.height="100%";
    document.body.appendChild(bgObj);
    var msgObj=document.createElement("div")
    msgObj.setAttribute("id","msgDiv");
    msgObj.setAttribute("align","center");
    msgObj.style.position="absolute";
    msgObj.style.background="white";
    msgObj.style.font="12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif";
    msgObj.style.top=(document.documentElement.scrollTop + (sHeight-msgh)/2) + "px";
    msgObj.style.left=(sWidth-msgw)/1.75 + "px";
    var title=document.createElement("h4");
    title.setAttribute("id","msgTitle");
    title.setAttribute("align","right");
    setTimeout(title.onclick=function(){
        document.body.removeChild(bgObj);
        document.getElementById("msgDiv").removeChild(title);
        document.body.removeChild(msgObj);
    },2000);
    document.body.appendChild(msgObj);
    document.getElementById("msgDiv").appendChild(title);
    var txt=document.createElement("p");
    txt.style.margin="1em 0"
    txt.setAttribute("id","msgTxt");
    txt.innerHTML=' <div class="alert alert-danger"> <strong> <i class="ace-icon fa fa-times"></i>删除失败！ </strong></div>';
    document.getElementById("msgDiv").appendChild(txt);
}
function del_promptb(){

    var msgw,msgh,bordercolor;
    msgw=400;//提示窗口的宽度
    msgh=600;//提示窗口的高度

    var sWidth,sHeight;
    sWidth=document.body.offsetWidth;
    sHeight=document.body.offsetHeight;
    var bgObj=document.createElement("div");
    bgObj.setAttribute('id','bgDiv');
    bgObj.style.position="absolute";
    bgObj.style.top="0";
    bgObj.style.background="#777";//背景颜色
    // bgObj.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75";
    bgObj.style.opacity="0.6";
    bgObj.style.left="0";
    bgObj.style.width="100%";
    bgObj.style.height="100%";
    document.body.appendChild(bgObj);
    var msgObj=document.createElement("div")
    msgObj.setAttribute("id","msgDiv");
    msgObj.setAttribute("align","center");
    msgObj.style.position="absolute";
    msgObj.style.background="white";
    msgObj.style.font="12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif";
    msgObj.style.top=(document.documentElement.scrollTop + (sHeight-msgh)/2) + "px";
    msgObj.style.left=(sWidth-msgw)/1.75 + "px";
    var title=document.createElement("h4");
    title.setAttribute("id","msgTitle");
    title.setAttribute("align","right");
    setTimeout(title.onclick=function(){
        document.body.removeChild(bgObj);
        document.getElementById("msgDiv").removeChild(title);
        document.body.removeChild(msgObj);
    },2000);
    document.body.appendChild(msgObj);
    document.getElementById("msgDiv").appendChild(title);
    var txt=document.createElement("p");
    txt.style.margin="1em 0"
    txt.setAttribute("id","msgTxt");
    txt.innerHTML='<div class="alert alert-block alert-success"><strong><i class="ace-icon fa fa-check"></i>删除成功！ </strong> </div>';
    document.getElementById("msgDiv").appendChild(txt);
}

//添加错误提示
function add_prompta(){

    var msgw,msgh,bordercolor;
    msgw=400;//提示窗口的宽度
    msgh=600;//提示窗口的高度

    var sWidth,sHeight;
    sWidth=document.body.offsetWidth;
    sHeight=document.body.offsetHeight;
    var bgObj=document.createElement("div");
    bgObj.setAttribute('id','bgDiv');
    bgObj.style.position="absolute";
    bgObj.style.top="0";
    bgObj.style.background="#777";//背景颜色
    // bgObj.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75";
    bgObj.style.opacity="0.6";
    bgObj.style.left="0";
    bgObj.style.width="100%";
    bgObj.style.height="100%";
    document.body.appendChild(bgObj);
    var msgObj=document.createElement("div")
    msgObj.setAttribute("id","msgDiv");
    msgObj.setAttribute("align","center");
    msgObj.style.position="absolute";
    msgObj.style.background="white";
    msgObj.style.font="12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif";
    msgObj.style.top=(document.documentElement.scrollTop + (sHeight-msgh)/2) + "px";
    msgObj.style.left=(sWidth-msgw)/1.75 + "px";
    var title=document.createElement("h4");
    title.setAttribute("id","msgTitle");
    title.setAttribute("align","right");
    setTimeout(title.onclick=function(){
        document.body.removeChild(bgObj);
        document.getElementById("msgDiv").removeChild(title);
        document.body.removeChild(msgObj);
    },2000);
    document.body.appendChild(msgObj);
    document.getElementById("msgDiv").appendChild(title);
    var txt=document.createElement("p");
    txt.style.margin="1em 0"
    txt.setAttribute("id","msgTxt");
    txt.innerHTML=' <div class="alert alert-danger"> <strong> <i class="ace-icon fa fa-times"></i>添加失败！ </strong></div>';
    document.getElementById("msgDiv").appendChild(txt);
}
function add_promptb(){

    var msgw,msgh,bordercolor;
    msgw=400;//提示窗口的宽度
    msgh=600;//提示窗口的高度

    var sWidth,sHeight;
    sWidth=document.body.offsetWidth;
    sHeight=document.body.offsetHeight;
    var bgObj=document.createElement("div");
    bgObj.setAttribute('id','bgDiv');
    bgObj.style.position="absolute";
    bgObj.style.top="0";
    bgObj.style.background="#777";//背景颜色
    // bgObj.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75";
    bgObj.style.opacity="0.6";
    bgObj.style.left="0";
    // bgObj.style.width="100%";
    // bgObj.style.height="100%";
    document.body.appendChild(bgObj);
    var msgObj=document.createElement("div")
    msgObj.setAttribute("id","msgDiv");
    msgObj.setAttribute("align","center");
    msgObj.style.position="absolute";
    msgObj.style.background="white";
    msgObj.style.font="12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif";
    msgObj.style.top=(document.documentElement.scrollTop + (sHeight-msgh)/2) + "px";
    msgObj.style.left=(sWidth-msgw)/1.75 + "px";
    var title=document.createElement("h4");
    title.setAttribute("id","msgTitle");
    title.setAttribute("align","right");
    setTimeout(title.onclick=function(){
        document.body.removeChild(bgObj);
        document.getElementById("msgDiv").removeChild(title);
        document.body.removeChild(msgObj);
    },10000);
    document.body.appendChild(msgObj);
    document.getElementById("msgDiv").appendChild(title);
    var txt=document.createElement("p");
    txt.style.margin="1em 0"
    txt.setAttribute("id","msgTxt");
    txt.innerHTML='<div class="alert alert-block alert-success"><strong><i class="ace-icon fa fa-check"></i>添加成功！ </strong> </div>';
    document.getElementById("msgDiv").appendChild(txt);
}
//修改错误提示
function modify_prompta(){

    var msgw,msgh,bordercolor;
    msgw=400;//提示窗口的宽度
    msgh=600;//提示窗口的高度

    var sWidth,sHeight;
    sWidth=document.body.offsetWidth;
    sHeight=document.body.offsetHeight;
    var bgObj=document.createElement("div");
    bgObj.setAttribute('id','bgDiv');
    bgObj.style.position="absolute";
    bgObj.style.top="0";
    bgObj.style.background="#777";//背景颜色
    // bgObj.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75";
    bgObj.style.opacity="0.6";
    bgObj.style.left="0";
    bgObj.style.width="100%";
    bgObj.style.height="100%";
    document.body.appendChild(bgObj);
    var msgObj=document.createElement("div")
    msgObj.setAttribute("id","msgDiv");
    msgObj.setAttribute("align","center");
    msgObj.style.position="absolute";
    msgObj.style.background="white";
    msgObj.style.font="12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif";
    msgObj.style.top=(document.documentElement.scrollTop + (sHeight-msgh)/2) + "px";
    msgObj.style.left=(sWidth-msgw)/1.75 + "px";
    var title=document.createElement("h4");
    title.setAttribute("id","msgTitle");
    title.setAttribute("align","right");
    setTimeout(title.onclick=function(){
        document.body.removeChild(bgObj);
        document.getElementById("msgDiv").removeChild(title);
        document.body.removeChild(msgObj);
    },2000);
    document.body.appendChild(msgObj);
    document.getElementById("msgDiv").appendChild(title);
    var txt=document.createElement("p");
    txt.style.margin="1em 0"
    txt.setAttribute("id","msgTxt");
    txt.innerHTML=' <div class="alert alert-danger"> <strong> <i class="ace-icon fa fa-times"></i>修改失败！ </strong></div>';
    document.getElementById("msgDiv").appendChild(txt);
}
function modify_promptb(){

    var msgw,msgh,bordercolor;
    msgw=400;//提示窗口的宽度
    msgh=600;//提示窗口的高度

    var sWidth,sHeight;
    sWidth=document.body.offsetWidth;
    sHeight=document.body.offsetHeight;
    var bgObj=document.createElement("div");
    bgObj.setAttribute('id','bgDiv');
    bgObj.style.position="absolute";
    bgObj.style.top="0";
    bgObj.style.background="#777";//背景颜色
    // bgObj.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75";
    bgObj.style.opacity="0.6";
    bgObj.style.left="0";
    bgObj.style.width="100%";
    bgObj.style.height="100%";
    document.body.appendChild(bgObj);
    var msgObj=document.createElement("div")
    msgObj.setAttribute("id","msgDiv");
    msgObj.setAttribute("align","center");
    msgObj.style.position="absolute";
    msgObj.style.background="white";
    msgObj.style.font="12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif";
    msgObj.style.top=(document.documentElement.scrollTop + (sHeight-msgh)/2) + "px";
    msgObj.style.left=(sWidth-msgw)/1.75 + "px";
    var title=document.createElement("h4");
    title.setAttribute("id","msgTitle");
    title.setAttribute("align","right");
    setTimeout(title.onclick=function(){
        document.body.removeChild(bgObj);
        document.getElementById("msgDiv").removeChild(title);
        document.body.removeChild(msgObj);
    },2000);
    document.body.appendChild(msgObj);
    document.getElementById("msgDiv").appendChild(title);
    var txt=document.createElement("p");
    txt.style.margin="1em 0"
    txt.setAttribute("id","msgTxt");
    txt.innerHTML='<div class="alert alert-block alert-success"><strong><i class="ace-icon fa fa-check"></i>修改成功！ </strong> </div>';
    document.getElementById("msgDiv").appendChild(txt);
}
