			
$(function(){
				//距离时间段手动输入
				$("#getTimeIpt_1").val(new Date().format("yyyy/MM/dd hh:mm:ss"));
				var clearTime2=0;
				function setDateImportFn(){
					//清除时间
					window.clearInterval(clearTime2);
					var $getTimeIpt1=$("#getTimeIpt_1"),
						$getTimeIpt2=$("#getTimeIpt_1"),
						$getTimeIpt3=$("#getTimeIpt_3"),
						$getTimeIpt4=$("#getTimeIpt_4"),
						$getTimeIpt5=$("#getTimeIpt_5"),
						$getTimeIpt6=$("#getTimeIpt_6");
					/*== 获取数据 ==*/
					var data2={};
					//系统时间
					data2.nowdate=$getTimeIpt1.val();
					//开始时间
					data2.startdate=$getTimeIpt2.val();
					//结束时间
					data2.enddate=$getTimeIpt3.val();;
					//是否跳过开始
					data2.init=$getTimeIpt5.find("option:selected").val()=="false"?false:true;
					clearTime2=$.leftTime(data2,function(d){
					if(d.status){
						var $dateShow1=$("#dateShow3");
						$dateShow1.find(".d").html(d.d);
						$dateShow1.find(".h").html(d.h);
						$dateShow1.find(".m").html(d.m);
						$dateShow1.find(".s").html(d.s);
						


						
					}
				},$getTimeIpt6.find("option:selected").val()=="false"?false:true);
				}
				//初始化
				setDateImportFn();
				//手动触发
				$("#dateBtn3").on("click",setDateImportFn);
			});