/**
 * Created by zxm on 2017/3/31.
 */
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
        appendStr+="<li class='"+prePageClass+"' page-data='1' onclick=home('"+1+"'); page-rel='firstpage'>首页</li>";
        appendStr+="<li class='"+prePageClass+"' page-data='"+prePage+"' onclick=previous('"+prePage+"'); page-rel='prepage'>&lt;上一页</li>";
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
        appendStr+="<li class='"+nextPageClass+"' page-data='"+nextPage+"'  onclick=next('"+nextPage+"'); page-rel='nextpage'>下一页&gt;</li>";
        appendStr+="<li class='"+nextPageClass+"' page-data='"+pageCount+"' onclick=shadowe('"+pageCount+"'); page-rel='lastpage'>尾页</li>";
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
        url:"/user/pagemax",
        type:"GET",
        dataType : "json",
        success:function (data) {
            $("#page").initPage(data.max,1,GG.kk);
            $("#page").paging({
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
       url:"/user/list",
       type:"GET",
       dataType : "json",
       contentType:"application/json",
       data:{
           "pageNext":value,
           "pageSize":10
       },
       success:function (data) {
           $(".table>tbody").empty();
           var obj = "";
           $.each(data,function (i,list) {
               obj += '<tr>';
               obj +='<td>'+list.id+'</td>';
               obj +='<td>'+list.nickname+'</td>';
               obj +='<td>'+list.pswd+'</td>';
               obj +=list.status===0?'<td>超级管理员</td>':list.status===1?'<td>管理员</td>':list.status===2?'<td>经销商</td>':'<td>人员</td>';
               obj +='<td><button type="button" class="btn btn-xs btn-info" href="#modal-table" title="编辑" role="button"  class="blue"  onclick=update("'+list.id+'"); data-toggle="modal"><i class="ace-icon fa fa-pencil bigger-120"></i></button>' +
                   '<button type="button" class="btn btn-xs btn-danger" name="delbutt" onclick=del("'+list.id+'"); title="删除"><i class="ace-icon fa fa-trash-o bigger-120"></i></button></td>'
               obj	+='</tr>';
           })
           $("#hs").append(obj);
       }
   })
}
//下一页
function next(value) {
    $.ajax({
        url:"/user/list",
        type:"GET",
        dataType : "json",
        contentType:"application/json",
        data:{
            "pageNext":value,
            "pageSize":10
        },
        success:function (data) {
            $(".table>tbody").empty();
            var obj = "";
            $.each(data,function (i,list) {
                obj += '<tr>';
                obj +='<td>'+list.id+'</td>';
                obj +='<td>'+list.nickname+'</td>';
                obj +='<td>'+list.pswd+'</td>';
                obj +=list.status===0?'<td>超级管理员</td>':list.status===1?'<td>管理员</td>':list.status===2?'<td>经销商</td>':'<td>人员</td>';
                obj +='<td><button type="button" class="btn btn-xs btn-info" href="#modal-table" title="编辑" role="button"  class="blue"  onclick=update("'+list.id+'"); data-toggle="modal"><i class="ace-icon fa fa-pencil bigger-120"></i></button>' +
                    '<button type="button" class="btn btn-xs btn-danger" name="delbutt" onclick=del("'+list.id+'"); title="删除"><i class="ace-icon fa fa-trash-o bigger-120"></i></button></td>'
                obj	+='</tr>';
            })
            $("#hs").append(obj);
        }
    })
}
//尾页
function shadowe(value) {
    $.ajax({
        url:"/user/list",
        type:"GET",
        dataType : "json",
        contentType:"application/json",
        data:{
            "pageNext":value,
            "pageSize":10
        },
        success:function (data) {
            $(".table>tbody").empty();
            var obj = "";
            $.each(data,function (i,list) {
                obj += '<tr>';
                obj +='<td>'+list.id+'</td>';
                obj +='<td>'+list.nickname+'</td>';
                obj +='<td>'+list.pswd+'</td>';
                obj +=list.status===0?'<td>超级管理员</td>':list.status===1?'<td>管理员</td>':list.status===2?'<td>经销商</td>':'<td>人员</td>';
                obj +='<td><button type="button" class="btn btn-xs btn-info" href="#modal-table" title="编辑" role="button"  class="blue"  onclick=update("'+list.id+'"); data-toggle="modal"><i class="ace-icon fa fa-pencil bigger-120"></i></button>' +
                    '<button type="button" class="btn btn-xs btn-danger" name="delbutt" onclick=del("'+list.id+'"); title="删除"><i class="ace-icon fa fa-trash-o bigger-120"></i></button></td>'
                obj	+='</tr>';
            })
            $("#hs").append(obj);
        }
    })
}
//首页
function home(value) {

    $.ajax({
        async:false,
        url:"/user/list",
        type:"GET",
        dataType : "json",
        contentType:"application/json",
        data: {
            "pageNext":value,
            "pageSize":10
        },

        success: function(data){
            $(".table>tbody").empty();
            console.log(data);
            var str = "";
            for(var i=0; i < data.length; i++) {
                //data[i]
                //console.log(data[i]);
                //alert(data[i].con);
                str += "<tr>";
                str += "<td><span>" + data[i].id + "</span></td>";
                str += "<td>" + data[i].nickname + "</td>";
                str += "<td>" + data[i].pswd + "</td>";
                str += data[i].status===0?'<td>超级管理员</td>':data[i].status===1?'<td>管理员</td>':data[i].status===2?'<td>经销商</td>':'<td>下级人员</td>';
                str += '<td><button class="btn btn-xs btn-info"  onclick=update("'+data[i].id+'"); href="#modal-table" title="编辑" role="button" class="blue" data-toggle="modal"><i class="ace-icon fa fa-pencil bigger-120"></i></button>'+
                    '<button class="btn btn-xs btn-danger" onclick=del("'+data[i].id+'"); title="删除" role="button" data-toggle="modal"><i class="ace-icon fa fa-trash-o bigger-120"></i> </button></td>';
                str += "</tr>";
            }

            $("#hs").append(str);
        }
    });
}
//上一页
function previous(value) {
    $.ajax({
        url:"/user/list",
        type:"GET",
        dataType : "json",
        contentType:"application/json",
        data:{
            "pageNext":value,
            "pageSize":10
        },
        success:function (data) {
            $(".table>tbody").empty();
            var obj = "";
            $.each(data,function (i,list) {
                obj += '<tr>';
                obj +='<td>'+list.id+'</td>';
                obj +='<td>'+list.nickname+'</td>';
                obj +='<td>'+list.pswd+'</td>';
                obj +=list.status===0?'<td>超级管理员</td>':list.status===1?'<td>管理员</td>':list.status===2?'<td>经销商</td>':'<td>人员</td>';
                obj +='<td><button type="button" class="btn btn-xs btn-info" href="#modal-table" title="编辑" role="button"  class="blue"  onclick=update("'+list.id+'"); data-toggle="modal"><i class="ace-icon fa fa-pencil bigger-120"></i></button>' +
                    '<button type="button" class="btn btn-xs btn-danger" name="delbutt" onclick=del("'+list.id+'"); title="删除"><i class="ace-icon fa fa-trash-o bigger-120"></i></button></td>'
                obj	+='</tr>';
            })
            $("#hs").append(obj);
        }
    })
}