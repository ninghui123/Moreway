//转换时间格式
$(function () {
    todate();
})
function todate(inputstr, showsplit, showweek) {
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
    // if(showweek){
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
        //return i;
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
    var month= now.getMonth()+1 ;
    var day=now.getDate() ;
    var h=now.getHours();
    var m=now.getMinutes() ;
    var s=now.getSeconds() ;
    m=checkTime(m)
    s=checkTime(s)

    // var weekday=new Array(7)
    // weekday[0]="星期日"
    // weekday[1]="星期一"
    // weekday[2]="星期二"
    // weekday[3]="星期三"
    // weekday[4]="星期四"
    // weekday[5]="星期五"
    // weekday[6]="星期六"

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
                myObj = JSON.parse(data[i].equipmentAttribute);

                mytowObj = JSON.parse(data[i].responseId);

                stopTimea=(data[i].stopTime);
                stopTimeb=new Date(stopTimea);
                stopTimec=todate(stopTimeb, "-",":", true);

                // alert(stopTimec); //2017-3-22

                // date1 = Date.parse(data[i].equipmentType.replace(/-/g, "/")); //begintime 为开始时间
                //
                // date2 = Date.parse(data[i].billingType.replace(/-/g, "/"));   // endtime 为结束时间
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
               // alert(" 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
                //data[i]
                //console.log(data[i]);
                //alert(data[i].con);
                // if (data[i].equipmentAttribute = '""') {
                //
                //     str += "<tr>";
                //     str += "<td>" + data[i].equipmentDid + "</td>";
                //     str += "<td>0</td>";
                //     str += "<td>" + data[i].equipmentName + "</td>";
                //     str += "<td> 0 </td>";
                //     str += "<td>0</td>";
                //     str += "<td>0</td>";
                //     str += "<td>0</td>";
                //     str += "<td>0</td>";
                //     str += '"<td><span class="date-tiem-span m">' + day + ' </span>天<span class="date-s-span s">' + hour + '</span><span>时</span></td>"';
                //     str += "<td>0</td>";
                //     str += '<td><button class="btn btn-xs btn-info"  onclick=equipment_update("' + data[i].id + '"); href="#modal-table" title="编辑" role="button" class="blue" data-toggle="modal"><i class="ace-icon fa fa-pencil bigger-120"></i></button>' +
                //         '<button class="btn btn-xs btn-danger" onclick=del("' + data[i].id + '"); title="删除" role="button" data-toggle="modal"><i class="ace-icon fa fa-trash-o bigger-120"></i> </button></td>';
                //     str += "</tr>";
                //
                // }


                    str += "<tr>";
                    str += "<td>" + data[i].equipmentDid + "</td>";
                    str += myObj.rs === 0 ? '<td><span class="label label-sm label-warning2" ><i class="ace-icon fa fa-power-off  bigger-120"></i>待机</span></td>' : myObj.rs === 1 ? '<td><span class="label label-sm label-warning3" ><i class="ace-icon fa fa-magic   bigger-120"></i>冲洗</span></td>' : myObj.rs === 2 ? '<td><span class="label label-sm label-warning4" ><i class="ace-icon fa fa-plus-square  bigger-120"></i>制水</span></td>' : myObj.rs === 3 ? '<td><span class="label label-sm label-warning5" ><i class="ace-icon fa fa-gavel  bigger-120"></i>检修</span></td>' : myObj.rs === 4 ? '<td><span class="label label-sm label-warning1"><i class="ace-icon fa fa-bars  bigger-120"></i>水满</span></td>' : '<td></td>';
                    str += "<td>" + data[i].equipmentName + "</td>";
                    str += "<td>" + myObj.flow + "</td>";
                    str += "<td>" + myObj.tdsi + "</td>";
                    str += "<td>" + myObj.tdso + "</td> ";
                    str += "<td>" + myObj.t + "</td>";
                    str += myObj.fault === 0 ? '<td><span class="label label-sm label-warning6"></i>缺水</span></td>' : myObj.fault === 1 ? '<td><span class="label label-sm label-warning7" ></i>连续30秒制水无净水流量</span></td>' : myObj.fault === 2 ? '<td><span class="label label-sm label-warning8" ></i>净水TDS温度补偿探头异常</span></td>' : myObj.fault === 3 ? '<td><span class="label label-sm label-warning9" ></i>连续制水6小时不水满</span></td>' : myObj.fault === 4 ? '<td><span class="label label-sm label-warning10" ></i>漏水</span></td>' : '<td></td>';
                    str += '"<td><span class="date-tiem-span m">' + day + ' </span>天<span class="date-s-span s">' + hour + '</span><span>时</span></td>"';
                    str += mytowObj.fs === 0 ? '<td><span class="label label-sm label-warning1" ></i>正常</span></td>' : mytowObj.fs === 1 ? '<td><span class="label label-sm label-warning2" ></i>快到期</span></td>' : mytowObj.fs === 2 ? '<td><span class="label label-sm label-warning5" ></i>到期</span></td>' : '<td></td>';
                    str += '<td><button class="btn btn-xs btn-info"  onclick=equipment_update("' + data[i].id + '"); href="#modal-table" title="编辑" role="button" class="blue" data-toggle="modal"><i class="ace-icon fa fa-pencil bigger-120"></i></button>' +
                        '<button class="btn btn-xs btn-danger" onclick=del("' + data[i].id + '"); title="删除" role="button" data-toggle="modal"><i class="ace-icon fa fa-trash-o bigger-120"></i> </button></td>';
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
    //  var modifystart=$("input[name = 'modify_start']").val();
    // var modifyend=$("input[name = 'modify_end']").val();
    // var filterStartTime=$("input[name = 'filter_StartTime']").val();
    // var filterStopTime=$("input[name = 'filter_StopTime']").val();
    // var px = $("#px").val();
    $.ajax({
        url: "/Equipment/add", //要处理的页面
        //要传过去的数据
        data: JSON.stringify({
            equipmentName:equipmentName,
            equipmentDid:equipmentType,
            createTime:0,
            billingType:0,
            updateTime:1,
            isDelete:0,
            status:0,
            // startTime:modifystart,
            // stopTime:modifyend,
            surplusTime:10,

            equipmentAttribute:JSON.stringify({

                 req:3,
                 did:"100-110-120-119",
                 flow:1000,
                 tdsi:999,
                 tdso:999,
                 t:100,
                 rs:1,
                 dbg:1,
                 us:1,
                 fault:2
             }),
             filterSurplusTime:13,
             // filterStartTime:filterStartTime,
             // filterStopTime:filterStopTime,
             responseId:JSON.stringify({

            res:3,
            state:0,
            cyc:4000,
            tl:40000,
            pc:1,
            mc:1,
            fs:0,
            dbg:1,
            flow:4000,
        }),


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
function equipment_update(id) {
    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:"/Equipment/update",
        type:"PUT",
        dataType:"json",
        data: JSON.stringify({
            "id":id
        }),

        success:function (data) {
            $("input[name = 'equipmentname']").val(data.equipmentName);
            $("input[name = 'equipmentype']").val(data.equipmentType);

            $("input[name = 'updatestart']").val(data.startTime);
            $("input[name = 'updateend']").val(data.stopTime);
        }

    })

}
function update_submit(){

    var ename = $('#update_equipment_name').val();
    var Type =$('#update_equipment_Type').val();
    var start = $('#modifystart').val();
    var stop= $('#modifyend').val();
    $.ajax({
        url:"/Equipment/list",
        type:"GET",
        dataType:"json",
        contentType: "application/json",
        data: JSON.stringify({
            equipmentName: ename,
            equipmentType: Type,
            startTime: start,
            stopTime:stop
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



