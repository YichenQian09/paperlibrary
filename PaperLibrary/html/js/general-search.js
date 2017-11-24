$(function(){
	var searchkey="keyword";
	var generalSearch=new Array("keyword","title","author");
	var timer;
	var selectUls=new Array();
	var liHeight=32;
	var ulObject=new Array();
	initialPage();
	getAndCreate();
	/*$.ajax({ 
	        type: "POST",    
	        url: "../Ajax/queryMulti.ashx",
	        dataType: "JSON",
	        async : false,
    		data:{searchKey:"11;14",time:"2000;2017",currntPage:"0"},
	        success: function(data) {
                 console.log(data);
	        }
	    });*/
	function initialPage()
	{
		$(".general-search-container").css({
			"height":$(window).height()
		});
		$(".advanced-search-container").css({
			"height":$(window).height()
		});
		$(".footer").css({
			"left":($(".container").width()-$(".footer").width())/2
		});
	}
	$(window).resize(function(){
		initialPage();
	})
	$(".general-search-search ul").hover(function(){
		$(this).addClass("search-ul-hover");
		$(".select-keyword img").attr("src","images/select-white.png");
		$(this).stop(false,false).animate({"height":"166px"},300);
	},function(){
		$(this).stop(false,false).animate({"height":"56px"},300,function(){
			$(this).removeClass("search-ul-hover");
			$(".select-keyword img").attr("src","images/select-blue.png");
		});
	})
	$(".general-search-search>img").hover(function(){
		$(this).attr("src","images/searching-hover.png");
	},function(){
		$(this).attr("src","images/searching.png");
	})
	$(".search-ul li").click(function(){
		var theIndex=$(".search-ul li").index(this);
		var forChange;
		var changeText;
		if(theIndex==0) return;
		forChange=generalSearch[0];
		generalSearch[0]=generalSearch[theIndex];
		generalSearch[theIndex]=forChange;
		changeText=$(".search-ul li:eq(0) p").text();
		$(".search-ul li:eq(0) p").text($(".search-ul li:eq("+theIndex+")").text());
		$(".search-ul li:eq("+theIndex+")").text(changeText);
		searchkey=generalSearch[0];
	})
	$(".general-search-search>img").click(function(){
		var searchContent=$(".general-search-search input").val();
		if(!searchContent) return;
		$.ajax({ 
	        type: "POST",    
	        url: "../Ajax/querySingle.ashx",
	        dataType: "JSON",
	        async : false,
    		data:{searchKey:searchkey,searchValue:searchContent,currntPage:0},
	        success: function(data) {
                 console.log(1);
	        }
	    });
	})
	$(".advanced-search-search ul").hover(function(){
		var ulHeight;
		if($(this)[0].liNumber)
			ulHeight=$(this)[0].liNumber*liHeight;
		else
		{
			for(var i=0;i<ulObject.length;i++)
				if($(this).attr("id")==ulObject[i].id)
				{
					ulHeight=ulObject[i].liNumber*liHeight;
					break;
				}
		}
		showOption($(this),"blue",ulHeight);
	},function(){
		if(!$(this).hasClass("oppo-style"))
			hideOption($(this),"white",liHeight);
		else
			hideOption($(this),"blue",liHeight);
	})
	//选择一级菜单
	$(".select-level1").delegate(".select-option","click",function(){  
     	for(var i=0;i<selectUls.length;i++)
		{
			if(selectUls[i].name==$(this).parents("ul").attr("id"))
			{
				selectUls[i].setSelected($(this).attr("id"));
			}
		}
		$(this).parent("ul").find(".select-title p").text($(this).text());
	});  
	//选择二级菜单的一级标题
	$(".select-level2 .first-title .select-option").click(function(){
		var optionIndex=$(this).parents(".select-level2").find(".first-title .select-option").index(this);
		$(this).parent("ul").find(".select-title p").text($(this).text());
		$(this).parents(".select-level2").find(".second-title").css({"display":"none"});
		var secondUl=$(this).parents(".select-level2").find(".second-title:eq("+optionIndex+")");
		secondUl.css({"display":"block"});
		if($(this).parent(".first-title").attr("id")=="documentType")
			selectUls[0].setSelected(secondUl.find(".select-title").attr("id"));	
		else
			selectUls[1].setSelected(secondUl.find(".select-title").attr("id"));	
	})
	//选择二级菜单的二级标题
	$(".select-level2 .second-title .select-option").click(function(){
		for(var i=0;i<selectUls.length;i++)
		{
			if(selectUls[i].name==$(this).parents(".select-level2").find(".first-title").attr("id"))
				selectUls[i].setSelected($(this).attr("id"));
		}
		var changeLi;
		var changeId;
		changeLi=$(this).text();
		$(this).text($(this).parent("ul").find(".select-title p").text());
		$(this).parent("ul").find(".select-title p").text(changeLi);
		changeId=$(this).attr("id");
		$(this).attr("id",$(this).parent("ul").find(".select-title").attr("id"));
		$(this).parent("ul").find(".select-title").attr("id",changeId);
	})
	//点击高级搜索时跳页并传送数据
	$(".search-choice button").click(function(){
		var advancedKey="";
		for(var i=0;i<selectUls.length;i++)
		{
			if(selectUls[i].selectedId)
			{
				advancedKey+=selectUls[i].selectedId;
				advancedKey+=";";
			}
		}
		advancedKey=advancedKey.substring(0,advancedKey.length-1);
		console.log(advancedKey);
		window.location.href="search-result.html";
		$.ajax({ 
	        type: "POST",    
	        url: "../Ajax/queryMulti.ashx",
	        dataType: "JSON",
	        async : false,
    		data:{searchKey:advancedKey,time:"2000;2017",currntPage:0},
	        success: function(data) {
                 console.log("search");
	        }
	    });
	})
	function showOption(obj,changeTo,ulHeight)
	{
		obj.addClass("search-ul-hover");
		if(changeTo=="white")
			obj.find(".select-title img").attr("src","images/select-white.png");
		else if(changeTo=="blue")
			obj.find(".select-title img").attr("src","images/select-blue.png");
		//if(!$(".advanced-search-search ul").is(":animated"))
			timer=setTimeout(function(){
				obj.addClass("search-ul-hover");
				obj.stop()
				.animate({"height":ulHeight},200);
				$(".advanced-search-search ul").height(32);
			},50);			
	}
	function hideOption(obj,changeTo,ulHeight)
	{
		clearTimeout(timer);
		obj.stop().animate({"height":ulHeight},200,function(){
			obj.removeClass("search-ul-hover");
			if(changeTo=="white")
			obj.find(".select-title img").attr("src","images/select-white.png");
		else if(changeTo=="blue")
			obj.find(".select-title img").attr("src","images/select-blue.png");
		});
	}
	function getAndCreate()
	{
		setEverySelect();
		initializeSelect();
		var json=getOptionData();
		for(var i=0;i<json.length;i++)
		{
			var selectTitle=json[i].firstType;
			if(selectTitle=="文献综述"||selectTitle=="一级评估"||selectTitle=="二级评估")
			{
				selectUls[0].getType(json[i]);
				continue;
			}
			else if(selectTitle=="使用价值"||selectTitle=="非使用价值")
			{
				selectUls[1].getType(json[i]);
				continue;
			}
			for(var j=0;j<selectUls.length;j++)
			{
				if(selectTitle==selectUls[j].firstT)
				{
					selectUls[j].getType(json[i].secondType);
					selectUls[j].createOption();
				}
			}
		}
		selectUls[0].createOption();
		selectUls[1].createOption();
	}
	function getOptionData()
	{
		var json=[];
		$.ajax({ 
	        type: "GET",    
	        url: "../Ajax/getOptions.ashx",
	        dataType: "JSON",
	        async : false,
	        success: function(data) {
                json=data;
	        }
	    });
	    return json;
	}
	function initializeSelect()
	{
		selectUls[0]=new everySelect("documentType","文献类型",true);
		selectUls[1]=new everySelect("valueType","非市场价值类型",true);
		selectUls[2]=new everySelect("place","地区",false);
		selectUls[3]=new everySelect("ecoSystem","生态系统类型",false);
		selectUls[4]=new everySelect("ecoService","生态系统服务类型",false);
		selectUls[5]=new everySelect("model","模型",false);
	}
	function everySelect(id,firstType,twolevels)
	{
		this.name=id;
		this.selectedId=0;
		this.obj=$(document.getElementById(id));
		this.twolevels=twolevels;
		//获取该id对象并转化为jquery对象
		this.firstT=firstType;
		this.secondT=new Array();
		/*this.serverIds=[];*/
	}
	function setEverySelect(){
		everySelect.prototype.setSelected=function(number)
		{
			this.selectedId=number;
		}
		everySelect.prototype.getType=function(jsonObj){
			if(!this.twolevels)
				this.secondT=jsonObj;
			else
			{
				this.secondT.push(jsonObj);
			}
		}
		everySelect.prototype.createOption=function(){
			ulObject.push({"id":this.name,"liNumber":this.secondT.length+1});
			if(!this.twolevels)
			{
				for(var i=0;i<this.secondT.length;i++)
				{
					$("<li>").attr("id",this.secondT[i].id).addClass("select-option").text(this.secondT[i].name).appendTo(this.obj);			
				}
			}else{
				for(var i=0;i<this.secondT.length;i++)
				{
					$("<li>").text(this.secondT[i].firstType).addClass("select-option").appendTo(this.obj);
					var ulObj=$("<ul>").addClass("second-title").appendTo(this.obj.parent(".select-level2"));
					ulObj[0].liNumber=this.secondT[i].secondType.length;
					for(j=0;j<this.secondT[i].secondType.length;j++)
					{
						var liObj=this.secondT[i].secondType[j];
						var option=$("<li>").attr("id",liObj.id).appendTo(ulObj);
						if(j!=0){
							option.text(liObj.name).addClass("select-option");
						}else{
							option.addClass("select-title");
							var div=$("<div>").addClass("clearfix").appendTo(option);
							var p=$("<p>").text(liObj.name).appendTo(div);
							var img=$("<img>").attr("src","images/select-white.png").appendTo(div);
						}
					}
				}
			}
		}
	}
	
})