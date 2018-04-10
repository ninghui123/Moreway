			
$(function(){
				//距离时间段手动输入
				$("#getTimeIpt_1").val(new Date().format("yyyy/MM/dd hh:mm:ss"));
				var clearTime2=0;
				function setDateImportFn(){
					//清除时间
					window.clearInterval(clearTime2);
					var $getTimeIpt1=$("#getTimeIpt_1"),
						$modifystart=$("#modifystart"),
						$modifyend=$("#modifyend"),
						$getTimeIpt4=$("#getTimeIpt_4"),
						$getTimeIpt5=$("#getTimeIpt_5"),
						$getTimeIpt6=$("#getTimeIpt_6");
					/*== 获取数据 ==*/
					var data2={};
					//系统时间
					data2.nowdate=$getTimeIpt1.val();
					//开始时间
					data2.startdate=$modifystart.val();
					//结束时间
					data2.enddate=$modifyend.val();;
					//是否跳过开始
					data2.init=$getTimeIpt5.find("option:selected").val()===false;
					clearTime2=$.leftTime(data2,function(d){
					if(d.status){
						var $dateShow1=$("#dateShow3");
						$dateShow1.find(".d").html(d.d);
						$dateShow1.find(".h").html(d.h);
						$dateShow1.find(".m").html(d.m);
						$dateShow1.find(".s").html(d.s);
						switch(d.step){
							case 1:
							$("#dataInfoShow_2").html("距离开始时间：");
							break;
							case 2:
							$("#dataInfoShow_2").html("距离结束时间：");
							break;
							case 3:
							$("#dataInfoShow_2").html("倒计时已结束：");
							break;
							default: 
							$("#dataInfoShow_2").html("");
							 break;
						}
					}
				},$getTimeIpt6.find("option:selected").val()=="false"?false:true);
				}
				//初始化
				setDateImportFn();
				//手动触发
				$("#dateBtn3").on("click",setDateImportFn);
			});

//日期范围限制

var start = {
    elem: '#start',
    format: 'YYYY-MM-DD',
    // min: laydate.now(), //设定最小日期为当前日期
    max: '2099-06-16', //最大日期
    istime: true,
    istoday: false,
    // choose: function(datas){
    //      end.min = datas; //开始日选好后，重置结束日的最小日期
    //      end.start = datas //将结束日的初始值设定为开始日
    // }
};
var end = {
    elem: '#end',
    format: 'YYYY-MM-DD',
    // min: laydate.now(),
    max: '2099-06-16',
    istime: true,
    istoday: false,
    // choose: function(datas){
    //     start.max = datas; //结束日选好后，充值开始日的最大日期
    // }
};
var modifystart = {
    elem: '#modifystart',
    format: 'YYYY-MM-DD',
    // min: laydate.now(),
    max: '2099-06-16',
    istime: true,
    istoday: false,
    // choose: function(datas){
    //     start.max = datas; //结束日选好后，充值开始日的最大日期
    // }
};
var modifyend = {
    elem: '#modifyend',
    format: 'YYYY-MM-DD',
    // min: laydate.now(),
    max: '2099-06-16',
    istime: true,
    istoday: false,
    // choose: function(datas){
    //     start.max = datas; //结束日选好后，充值开始日的最大日期
    // }
};
laydate(start);
laydate(end);
laydate(modifystart);
laydate(modifyend);


