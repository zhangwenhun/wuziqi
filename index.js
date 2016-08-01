window.onload=function(){
	kongbai={};
	for (var i = 0; i < 15; i++) {
		$('<b>')
		.addClass('hang')
		.appendTo('.qipan');

		$('<i>')
		.addClass('shu')
		.appendTo('.qipan');

		for (var j = 0; j < 15; j++) {
         kongbai[i+'-'+j]={x:i,y:j}
		 $('<div>')
		.addClass('qizi')
		.appendTo('.qipan')
		.attr('id',i+'-'+j)
		.data('pos',{x:i,y:j})
		.appendTo('.qipan');
		};
	} 
/*	$(".container .start").on('click',function(){
		 $('<div>')
		.addClass('qizi')
	})*/
	var kaiguan=true;
	var hei={};
	var bai={};
	var isAi=true;
	$(".container .renjiduizhan").on('click',function(){
		       $('.container .renji').addClass('show')
              setTimeout(function(){$('.container .renji').removeClass('show');},1500)
			   isAi=true;
	})
	$(".container .renrenduizhan").on('click',function(){
		$('.container .renren').addClass('show')
              setTimeout(function(){$('.container .renren').removeClass('show');},1500)
			   isAi=false;
	})

	var ai=function(){
		var zuobiao1;
		var max1=-Infinity;
		for (i in kongbai) {
			var weixie =panduan(kongbai[i],hei);
			if (weixie>max1) {
				max1=weixie;
				zuobiao1=kongbai[i];
			};
		};
		var zuobiao2;
		var max2=-Infinity;
		for (i in kongbai) {
			var weixie =panduan(kongbai[i],bai);
			if (weixie>max2) {
				max2=weixie;
				zuobiao2=kongbai[i];
			};
		};
        return (max1>max2)?zuobiao1:zuobiao2;
	}
	//制造字符串的JOIN
	var join=function(n1,n2){
		return n1+'-'+n2;
	}
	var panduan=function(pos,biao){
		//默认在四周有一颗棋子
        var h=1,s=1,zx=1,yx=1;
        //数棋子
        var tx,ty;
        //横向
        tx=pos.x; ty=pos.y;
        while(biao[ join(tx,ty-1) ]){
        	h++;ty--;
        }
        tx=pos.x; ty=pos.y;
        while( biao[ join(tx,ty+1) ]){
        	h++;ty++;
        }

      
        
        //竖向
        tx=pos.x; ty=pos.y;
        while(biao[ join(tx-1,ty) ]){
        	s++;tx--;
        }
        tx=pos.x; ty=pos.y;
        while( biao[ join(tx+1,ty) ]){
        	s++;tx++;
        }

       

        //左斜
         tx=pos.x; ty=pos.y;
        while(biao[ join(tx-1,ty+1) ]){
        	zx++;tx--;ty++;
        }
        tx=pos.x; ty=pos.y;
        while( biao[ join(tx+1,ty-1) ]){
        	zx++;tx++;ty--;
        }

      
        
        //右斜
         tx=pos.x; ty=pos.y;
        while(biao[ join( tx+1,ty+1) ]){
        	yx++;tx++;ty++;
        }
        tx=pos.x; ty=pos.y;
        while( biao[ join(tx-1,ty-1) ]){
        	yx++;tx--;ty--;
        }

         return Math.max(h,s,zx,yx);	
	}
	$('.qipan .qizi').on('click',function(){
		//已经点击过的棋子不可以再次点击
		if($(this).hasClass('hei')||$(this).hasClass('bai')){
			return;
		}
		var pos=$(this).data('pos');

		if (kaiguan) {
			$('#'+pos.x+'-'+pos.y)
			.addClass('hei');
			hei[pos.x+'-'+pos.y]=true;
			delete kongbai[join(pos.x,pos.y)];
			if ( panduan(pos,hei) >=5 ) {
				alert('黑方获胜')
				$('.qipan .qizi').off('click');
			};
		}
		if (isAi) {
			var pos=ai();
			$('#'+pos.x+'-'+pos.y)
			.addClass('bai');
			bai[pos.x+'-'+pos.y]=true;
			delete kongbai[join(pos.x,pos.y)];
			if ( panduan(pos,bai) >=5 ) {
				alert('白方获胜')
				$('.qipan .qizi').off('click');
			}
			return;
		}else{
			$(this).addClass('bai');
			bai[pos.x+'-'+pos.y]=true;
			if (panduan(pos,bai)>=5 ) {
				console.log('bai ying');
				$('.qipan .qizi').off('click');
			};
		}
		kaiguan=!kaiguan;
	})
    $('.xiaojiqiao').on('click',function(){
    	$('.jiqiao').toggleClass('tishi')
    })
	
}
