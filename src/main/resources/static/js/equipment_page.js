var maxPage='';//总条数
$.fn.extend({
    "initPage":function(listCount,currentPage,fun){
        var maxshowpageitem = $(this).attr("maxshowpageitem");
        if(maxshowpageitem!=null&&maxshowpageitem>0&&maxshowpageitem!=""){
            page.maxshowpageitem = maxshowpageitem;
        }
        var pagelistcount = $(this).attr("pagelistcount");
        if(pagelistcount!=null&&pagelistcount>0&&pagelistcount!=""){
            page.pagelistcount = pagelistcount;
        }

        var pageId = $(this).attr("id");
        page.pageId=pageId;
        if(listCount<0){
            listCount = 0;
        }
        if(currentPage<=0){
            currentPage=1;
        }
        page.setPageListCount(listCount,currentPage,fun);

    }
});
var  page = {
    "pageId":"",
    "maxshowpageitem":5,//最多显示的页码个数
    "pagelistcount":10,//每一页显示的内容条数
    /**
     * 初始化分页界面
     * @param listCount 列表总量
     */
    "initWithUl":function(listCount,currentPage){
        var pageCount = 1;
        if(listCount>=0){
            var pageCount = listCount%page.pagelistcount>0?parseInt(listCount/page.pagelistcount)+1:parseInt(listCount/page.pagelistcount);
        }
        var appendStr = page.getPageListModel(pageCount,currentPage);
        $("#"+page.pageId).html(appendStr);
    },
    /**
     * 设置列表总量和当前页码
     * @param listCount 列表总量
     * @param currentPage 当前页码
     */
    "setPageListCount":function(listCount,currentPage,fun){
        listCount = parseInt(listCount);
        currentPage = parseInt(currentPage);
        page.initWithUl(listCount,currentPage);
        page.initPageEvent(listCount,fun);
        fun(currentPage);
    },
    "initPageEvent":function(listCount,fun){
        $("#"+page.pageId +">li[class='pageItem']").on("click",function(){
            page.setPageListCount(listCount,$(this).attr("page-data"),fun);
        });
    },
    "getPageListModel":function(pageCount,currentPage){
        var prePage = currentPage-1;
        var nextPage = currentPage+1;
        var prePageClass ="pageItem";
        var nextPageClass = "pageItem";
        if(prePage<=0){
            prePageClass="pageItemDisable";
        }
        if(nextPage>pageCount){
            nextPageClass="pageItemDisable";
        }
        var appendStr ="";
        appendStr+="<li class='"+prePageClass+"' page-data='1' onclick=home_page('"+1+"'); page-rel='firstpage'>首页</li>";
        appendStr+="<li class='"+prePageClass+"' page-data='"+prePage+"' onclick=Previous_page('"+prePage+"'); page-rel='prepage'>&lt;上一页</li>";
        var miniPageNumber = 1;
        if(currentPage-parseInt(page.maxshowpageitem/2)>0&&currentPage+parseInt(page.maxshowpageitem/2)<=pageCount){
            miniPageNumber = currentPage-parseInt(page.maxshowpageitem/2);
        }else if(currentPage-parseInt(page.maxshowpageitem/2)>0&&currentPage+parseInt(page.maxshowpageitem/2)>pageCount){
            miniPageNumber = pageCount-page.maxshowpageitem+1;
            if(miniPageNumber<=0){
                miniPageNumber=1;
            }
        }
        var showPageNum = parseInt(page.maxshowpageitem);
        if(pageCount<showPageNum){
            showPageNum = pageCount
        }
        for(var i=0;i<showPageNum;i++){
            var pageNumber = miniPageNumber++;
            var itemPageClass = "pageItem";
            if(pageNumber==currentPage){
                itemPageClass = "pageItemActive";
            }

            appendStr+="<li class='"+itemPageClass+"' page-data='"+pageNumber+"' name='next' onclick=page_next('"+pageNumber+"'); page-rel='itempage' >"+pageNumber+"</li>";
        }
        appendStr+="<li class='"+nextPageClass+"' page-data='"+nextPage+"'  onclick=next_page('"+nextPage+"'); page-rel='nextpage'>下一页&gt;</li>";
        appendStr+="<li class='"+nextPageClass+"' page-data='"+pageCount+"' onclick=Tail_page('"+pageCount+"'); page-rel='lastpage'>尾页</li>";
        return appendStr;

    }
}
function tt(dd){
    //alert(dd);
}
var GG = {
    "kk":function(mm){
        // alert(mm);
    }
}

$(function () {
    page_max();

})


function page_max() {
    $.ajax({
        async:false,
        url:"/Equipment/pagemax",
        type:"GET",
        dataType : "json",
        success:function (data) {
            maxPage=data.max
            $("#epage").initPage(data.max,1,GG.kk);
            $("#epage").data({
                pageNo:4,
                totalPage: 10,
                totalSize: 300,
                callback: function(num) {
                    alert(num)
                }
            })
        }
    })
}

function page_next(value) {

        $.ajax({
            async:false,
            url:"/Equipment/list",
            type:"GET",
            dataType : "json",
            contentType:"application/json",
            data: {
                "pageNext":value,
                "pageSize":10,
            },
            success: function(data){
                $(".table>tbody").empty();
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
//下一页
function next_page(value) {
    $.ajax({
        async:false,
        url:"/Equipment/list",
        type:"GET",
        dataType : "json",
        contentType:"application/json",
        data: {
            "pageNext":value,
            "pageSize":10,
        },
        success: function(data){
            PageCount=Math.ceil(maxPage/10) ;//总页数

            if(value<=PageCount){
                $(".table>tbody").empty();
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
        }}
    });
    }
//尾页
function Tail_page(value) {
        $.ajax({
            async:false,
            url:"/Equipment/list",
            type:"GET",
            dataType : "json",
            contentType:"application/json",
            data: {
                "pageNext":value,
                "pageSize":10,
            },
            success: function(data){
                $(".table>tbody").empty();
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
//首页
function home_page(value) {

        $.ajax({
            async:false,
            url:"/Equipment/list",
            type:"GET",
            dataType : "json",
            contentType:"application/json",
            data: {
                "pageNext":value,
                "pageSize":10,
            },
            success: function(data){
                $(".table>tbody").empty();
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
//上一页
function Previous_page(value) {
    $.ajax({
        async:false,
        url:"/Equipment/list",
        type:"GET",
        dataType : "json",
        contentType:"application/json",
        data: {
            "pageNext":value,
            "pageSize":10,
        },
        success: function(data){
            if(value>0){
                $(".table>tbody").empty();
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
        }}
    });
    }