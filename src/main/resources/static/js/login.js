
function login() {

    var name = $("input[name = 'username']").val();
    var pwd=$("input[name = 'password']").val();

    $.ajax({
        async : false,
        url:"/user/login",
        type:"POST",
        dataType : "json",
        data:{"username":name,"password":pwd},

        success:function (ReturnMsg) {


            if (ReturnMsg.code===500){
                $(function () {
                    prompt("密码有误！");
                })
            }
            if (ReturnMsg.code===200){
                $.cookie("user",ReturnMsg.data,"｛expires：7｝");　//expires  cookie生存时间为7天


                  console.log($.cookie("user"))

                window.location.href ="index.html"

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

function prompt(){

    var msgw,msgh,bordercolor;
    msgw=400;//提示窗口的宽度
    msgh=60;//提示窗口的高度

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
    document.body.appendChild(bgObj);
    var msgObj=document.createElement("div")
    msgObj.setAttribute("id","msgDiv");
    msgObj.setAttribute("align","center");
    msgObj.style.position="absolute";
    msgObj.style.background="white";
    msgObj.style.font="1px/.06em Verdana, Geneva, Arial, Helvetica, sans-serif";
    msgObj.style.top=(document.documentElement.scrollTop + (sHeight-msgh)/20) + "px";
    msgObj.style.left=(sWidth-msgw)/1.8 + "px";
    var title=document.createElement("h4");
    title.setAttribute("id","msgTitle");
    title.setAttribute("align","right");
    setTimeout(title.onclick=function(){

        document.body.removeChild(bgObj);
        document.getElementById("msgDiv").removeChild(title);
        document.body.removeChild(msgObj);
    },500);
    document.body.appendChild(msgObj);
    document.getElementById("msgDiv").appendChild(title);
    var txt=document.createElement("p");
    txt.style.margin="1em 0"
    txt.setAttribute("id","msgTxt");
    txt.innerHTML=' <div class="alert alert-danger"> <strong> <i class="ace-icon fa fa-times"></i>用户名称或密码输入有误，请从新输入！ </strong></div>';
    document.getElementById("msgDiv").appendChild(txt);
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
$.cookie("user",ReturnMsg.data,"｛expires：7｝");　//expires  cookie生存时间为7天


console.log($.cookie("user"))