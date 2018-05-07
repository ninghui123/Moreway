//转换时间格式
$(function () {
    todate();
})
function todate(inputstr, showsplit) {
    //Wed Mar 22 13:38:37 CST 2017
    inputstr = inputstr + ""; //末尾加一个空格
    var date = "";
    var month = new Array();
    var week = new Array();
    month["Jan"] = 1; month["Feb"] = 2; month["Mar"] = 3; month["Apr"] = 4; month["May"] = 5; month["Jan"] = 6;
    month["Jul"] = 7; month["Aug"] = 8; month["Sep"] = 9; month["Oct"] = 10; month["Nov"] = 11; month["Dec"] = 12;
    week["Mon"] = "一"; week["Tue"] = "二"; week["Wed"] = "三"; week["Thu"] = "四"; week["Fri"] = "五"; week["Sat"] = "六"; week["Sun"] = "日";
    str = inputstr.split(" ");
    date = str[3];
    date += showsplit + month[str[1]] + showsplit + str[2];
    date += "    "+str[4];
    //  if(showweek){
    // date += "    " + " 星期" + week[str[0]];
    // }
    return date;
}

//计算时间
$(function () {
    showTime();
})
function checkTime(i){  //补位处理
    if(i<10){
        i="0"+i;
       // return i;
    }
    else{
        i=i;
        // return i;
    }

    return i;

}
function showTime(){
    var now=new Date();

    var year=now.getFullYear() ;
    var month= now.getMonth() ;
    var day=now.getDate() ;
    var h=now.getHours();
    var m=now.getMinutes() ;
    var s=now.getSeconds() ;
    m=checkTime(m)
    s=checkTime(s)
    innerHTML=""+year+"-"+month+"-"+day+" "+h+":"+m+":"+s;

}
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
            for(var i=0; i < data.length;  i++) {
                // myObj = JSON.parse(data[i].equipmentAttribute);
                mytowObj = JSON.parse(data[i].responseId);
                stopTimea=(data[i].stopTime);
                stopTimeb=new Date(stopTimea);
                var year=stopTimeb.getFullYear() ;
                var month= stopTimeb.getMonth() ;
                var day=stopTimeb.getDate() ;
                var h=stopTimeb.getHours();
                var m=stopTimeb.getMinutes() ;
                var s=stopTimeb.getSeconds() ;
                stopTimec=""+year+"-"+month+"-"+day+"";
                date1=new Date(innerHTML.replace(/-/g, "/"));  //开始时间
                date2=new Date(stopTimec.replace(/-/g, "/"));    //结束时间
                //时间差的毫秒
                date3 = date2.getTime()-date1.getTime();
                //计算相差天数
                days = Math.floor(date3/(24*3600*1000));
                if(days<0){
                    day=00;
                }else {
                    day=days;
                }

                //计算相差小时数
                leave1=date3%(24*3600*1000);    //计算天数后剩余的毫秒数
                hours=Math.floor(leave1/(3600*1000));
                if(hours<0){
                    hour=00;
                }else {
                    hour=hours;
                }
                //计算相差分钟数
                leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
                minutes=Math.floor(leave2/(60*1000));
                //计算相差秒数
                leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
                seconds=Math.round(leave3/1000);
                str += "<tr>";
                str += "<td>" + data[i].equipmentDid + "</td>";
                str += data[i].rs === 0 ? '<td><span class="label label-sm label-warning2" ><i class="ace-icon fa fa-power-off  bigger-120"></i>待机</span></td>' : data[i].rs === 1 ? '<td><span class="label label-sm label-warning3" ><i class="ace-icon fa fa-magic   bigger-120"></i>冲洗</span></td>' : data[i].rs === 2 ? '<td><span class="label label-sm label-warning4" ><i class="ace-icon fa fa-plus-square  bigger-120"></i>制水</span></td>' : data[i].rs === 3 ? '<td><span class="label label-sm label-warning5" ><i class="ace-icon fa fa-gavel  bigger-120"></i>检修</span></td>' : data[i].rs === 4 ? '<td><span class="label label-sm label-warning1"><i class="ace-icon fa fa-bars  bigger-120"></i>水满</span></td>' : '<td></td>';
                str += "<td>" + data[i].equipmentName + "</td>";
                str += "<td>" + data[i].flow + "</td>";
                str += "<td>" + data[i].tdsi + "</td>";
                str += "<td>" + data[i].tdso + "</td> ";
                str += "<td>" + data[i].t + "</td>";
                str += data[i].fault === 0 ? '<td><span class="label label-sm label-warning6"></i>缺水</span></td>' :data[i].fault === 1 ? '<td><span class="label label-sm label-warning7" ></i>连续30秒制水无净水流量</span></td>' :data[i].fault === 2 ? '<td><span class="label label-sm label-warning8" ></i>净水TDS温度补偿探头异常</span></td>' : data[i].fault === 3 ? '<td><span class="label label-sm label-warning9" ></i>连续制水6小时不水满</span></td>' : data[i].fault === 4 ? '<td><span class="label label-sm label-warning10" ></i>漏水</span></td>' : '<td></td>';
                str += '"<td><span class="date-tiem-span m">' + day + ' </span>天<span class="date-s-span s">' + hour + '</span><span>时</span></td>"';
                str += mytowObj.fs === 0 ? '<td><span class="label label-sm label-warning1" ></i>正常</span></td>' : mytowObj.fs === 1 ? '<td><span class="label label-sm label-warning2" ></i>快到期</span></td>' : mytowObj.fs === 2 ? '<td><span class="label label-sm label-warning5" ></i>到期</span></td>' : '<td></td>';
                str += '<td><button class="btn btn-xs btn-info"  onclick=equipment_update("' + data[i].id + '"); href="#modal-table" title="编辑" role="button" class="blue" data-toggle="modal"><i class="ace-icon fa fa-pencil bigger-120"></i></button>' +
                    '<button class="btn btn-xs btn-danger" onclick=equipment_del("' + data[i].id + '"); title="删除" role="button" data-toggle="modal"><i class="ace-icon fa fa-trash-o bigger-120"></i> </button></td>';
                str += "</tr>";
            }
            $("#hs").append(str);
        }
    });
}
//添加
function equipment_add() {
    var equipmentName = $('#equipment_Name').val();
    var equipmentType=$('#equipment_Type').val();
    var modifystart=$('#modifystart').val();
    var modifyend=$('#modifyend').val();
    var filterStartTime=$('#filterStartTime').val();
    var filterStopTime=$('#filterStopTime').val();
    $.ajax({
        url: "/Equipment/add", //要处理的页面
        //要传过去的数据
        data: JSON.stringify({
            equipmentName:equipmentName,
            equipmentDid:equipmentType,
            startTime:modifystart,
            stopTime:modifyend,
            filterStartTime:filterStartTime,
            filterStopTime:filterStopTime,
            billingType:12,
            responseId:JSON.stringify({
                res:3,
                state:0,
                cyc:5000,
                tl:3,
                pc:1,
                mc:0,
                fs:0,
                dbg:1,
                flow:5000,
            })

        }),
        type: "POST",  //提交方式
        dataType: "JSON", //返回的数据类型，TEXT字符串 JSON返回JSON XML返回XML；dataType中T要大写！！
        contentType: "application/json",
        success: function(data){ ///处理页面成功后输出
            if(data=="200") {
                window.location.reload();
                $(function () {
                    add_promptb();
                })
            }else {
                $(function () {
                    add_prompta();
                })
            }
        }
    })
}
//修改
function equipment_update(id) {
    $.ajax({
        url:"/Equipment/one",
        type:"GET",
        dataType:"json",
        data:{"id":id,

        },
        success:function (data) {

            $("input[name = 'equipmentName_modify']").val(data.equipmentName);
            $("input[name = 'equipmentType_modify']").val(data.equipmentDid);
            $("input[name = 'startTime_modify']").val(data.startTime);
            $("input[name = 'stopTime_modify']").val(data.stopTime);
            $("input[name = 'filterStartTime_modify']").val(data.filterStartTime);
            $("input[name = 'filterStopTime_modify']").val(data.filterStopTime);
            $("button[name = 'equip_modify']").val(data.id);
        }

    })

}
function update_submit(){
    var equipment_Name=$("input[name = 'equipmentName_modify']").val();
    var equipment_Type =$("input[name = 'equipmentType_modify']").val();
    var start_Time=$("input[name = 'startTime_modify']").val();
    var stop_Time=$("input[name = 'stopTime_modify']").val();
    var filterStart_Time=$("input[name = 'filterStartTime_modify']").val();
    var filterStop_Time=$("input[name = 'filterStopTime_modify']").val();
    var eid=$("button[name = 'equip_modify']").val();
    $.ajax({
        url:"/Equipment/update",
        type:"PUT",
        dataType:"json",
        contentType: "application/json",
        data: JSON.stringify({
            id:eid,
            equipmentName: equipment_Name,
            equipmentDid: equipment_Type,
            startTime: start_Time,
            stopTime: stop_Time,
            filterStartTime: filterStart_Time,
            filterStopTime: filterStop_Time,
        }),
        success: function(data){ ///处理页面成功后输出
             if(data=="200") {
                 window.location.reload();
                 $(function () {
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
function equipment_del(did){
    if(confirm('确认删除吗?')){
        $.ajax({
            type:'delete',
            url: "/Equipment/delete/{did}"+did,
            success: function(data){
                if(data=="200"){ //删除成功
                    alert(删除成功);
                }else{
                    $(function () {
                        edel_prompta();
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
                url:"/Equipment/search",
                data:{
                    str: search,
                    pageNext:1,
                },
                contentType: "application/json",
                success: function(data){
                    $(".table>tbody").empty();//清除
                    console.log(data);
                    var str = "";
                    for(var i=0; i < data.length;  i++) {
                        // myObj = JSON.parse(data[i].equipmentAttribute);
                        mytowObj = JSON.parse(data[i].responseId);
                        stopTimea=(data[i].stopTime);
                        stopTimeb=new Date(stopTimea);
                        var year=stopTimeb.getFullYear() ;
                        var month= stopTimeb.getMonth() ;
                        var day=stopTimeb.getDate() ;
                        var h=stopTimeb.getHours();
                        var m=stopTimeb.getMinutes() ;
                        var s=stopTimeb.getSeconds() ;
                        stopTimec=""+year+"-"+month+"-"+day+"";
                        date1=new Date(innerHTML.replace(/-/g, "/"));  //开始时间
                        date2=new Date(stopTimec.replace(/-/g, "/"));    //结束时间
                        //时间差的毫秒
                        date3 = date2.getTime()-date1.getTime();
                        //计算相差天数
                        days = Math.floor(date3/(24*3600*1000));
                        if(days<0){
                            day=00;
                        }else {
                            day=days;
                        }

                        //计算相差小时数
                        leave1=date3%(24*3600*1000);    //计算天数后剩余的毫秒数
                        hours=Math.floor(leave1/(3600*1000));
                        if(hours<0){
                            hour=00;
                        }else {
                            hour=hours;
                        }
                        //计算相差分钟数
                        leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
                        minutes=Math.floor(leave2/(60*1000));
                        //计算相差秒数
                        leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
                        seconds=Math.round(leave3/1000);
                        str += "<tr>";
                        str += "<td>" + data[i].equipmentDid + "</td>";
                        str += data[i].rs === 0 ? '<td><span class="label label-sm label-warning2" ><i class="ace-icon fa fa-power-off  bigger-120"></i>待机</span></td>' : data[i].rs === 1 ? '<td><span class="label label-sm label-warning3" ><i class="ace-icon fa fa-magic   bigger-120"></i>冲洗</span></td>' : data[i].rs === 2 ? '<td><span class="label label-sm label-warning4" ><i class="ace-icon fa fa-plus-square  bigger-120"></i>制水</span></td>' : data[i].rs === 3 ? '<td><span class="label label-sm label-warning5" ><i class="ace-icon fa fa-gavel  bigger-120"></i>检修</span></td>' : data[i].rs === 4 ? '<td><span class="label label-sm label-warning1"><i class="ace-icon fa fa-bars  bigger-120"></i>水满</span></td>' : '<td></td>';
                        str += "<td>" + data[i].equipmentName + "</td>";
                        str += "<td>" + data[i].flow + "</td>";
                        str += "<td>" + data[i].tdsi + "</td>";
                        str += "<td>" + data[i].tdso + "</td> ";
                        str += "<td>" + data[i].t + "</td>";
                        str += data[i].fault === 0 ? '<td><span class="label label-sm label-warning6"></i>缺水</span></td>' :data[i].fault === 1 ? '<td><span class="label label-sm label-warning7" ></i>连续30秒制水无净水流量</span></td>' :data[i].fault === 2 ? '<td><span class="label label-sm label-warning8" ></i>净水TDS温度补偿探头异常</span></td>' : data[i].fault === 3 ? '<td><span class="label label-sm label-warning9" ></i>连续制水6小时不水满</span></td>' : data[i].fault === 4 ? '<td><span class="label label-sm label-warning10" ></i>漏水</span></td>' : '<td></td>';
                        str += '"<td><span class="date-tiem-span m">' + day + ' </span>天<span class="date-s-span s">' + hour + '</span><span>时</span></td>"';
                        str += mytowObj.fs === 0 ? '<td><span class="label label-sm label-warning1" ></i>正常</span></td>' : mytowObj.fs === 1 ? '<td><span class="label label-sm label-warning2" ></i>快到期</span></td>' : mytowObj.fs === 2 ? '<td><span class="label label-sm label-warning5" ></i>到期</span></td>' : '<td></td>';
                        str += '<td><button class="btn btn-xs btn-info"  onclick=equipment_update("' + data[i].id + '"); href="#modal-table" title="编辑" role="button" class="blue" data-toggle="modal"><i class="ace-icon fa fa-pencil bigger-120"></i></button>' +
                            '<button class="btn btn-xs btn-danger" onclick=equipment_del("' + data[i].id + '"); title="删除" role="button" data-toggle="modal"><i class="ace-icon fa fa-trash-o bigger-120"></i> </button></td>';
                        str += "</tr>";
                    }
                    $("#hs").append(str);
                }
            });
        }
    })
});
//删除错误提示
function edel_prompta(){

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
function edel_promptb(){


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




