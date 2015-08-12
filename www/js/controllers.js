/*
* Quran Meta Angularjs controller
* (c) 2014 Shahrul Nizam Selamat
* link: https://play.google.com/store/apps/details?id=com.ionicframework.qmeta996726&ah=-KyIkUp843r_Eetf-63gCx-XXVY
*/
angular.module('starter.controllers', ['factories', 'ngSanitize', 'ngCordova', 'ngWig', 'mgcrea.ngStrap.modal', 'mgcrea.ngStrap.aside', 'mgcrea.ngStrap.alert'])

.controller('AppCtrl', function($scope, $window, $alert, sharedProperties, $rootScope, loader, textService, $state, $timeout, aq,  $ionicSideMenuDelegate, $ionicPlatform, delegateSideMenu) {
	
	$rootScope.$on('$stateChangeStart', 
	function(event, viewConfig){ 
		delegateSideMenu.set();
		loader.load();
	})
	$scope.$on('$viewContentLoaded', 
	function(event){ 
		loader.done();
	});
	
	var langdata = [];
	var curlang = textService.getMenuLang();
	var langid = 0;
	if(curlang=='my'){langid = 1};
	aq.menuLang().then(function(d) {
		langdata = d.data;
	})
	$scope.menu = [];
	$scope.$watch(function () {
		return langdata;
	},
	function (newval, oldval) {
		if(newval!=oldval){
			for (var i = 0; i < newval.settingpage.length; i++) {
				if(curlang=='my'){
					$scope.menu[i] = newval.settingpage[i][1];
				} else{
					$scope.menu[i] = newval.settingpage[i][0];
				}
			}
		}
	}, false);
	
 $scope.saveSet = function() {
	var trans = $scope.transSelect.title;
	localStorage.setItem("st_translation", trans);
	var transId =  $scope.transSelect.id
	localStorage.setItem("st_idTrans", transId);

	var lang = $scope.menuLangSelect.title;
	localStorage.setItem("st_langMenu", lang);
	var langid = $scope.menuLangSelect.id;
	localStorage.setItem("st_idMenu", langid);
	var langCode =  $scope.menuLangSelect.code;
	localStorage.setItem("st_codeMenu", langCode);
	
	var mArabic = $scope.menuArabic.title;
	localStorage.setItem("st_  menuArabic", mArabic);
	var menuid = $scope.menuArabic.id;
	localStorage.setItem("st_idArabicFont", menuid);
	
	var ayaFont =   $scope.ayaFontSelect.title;
	localStorage.setItem("st_ayaFont", ayaFont);
	var ayaId = $scope.ayaFontSelect.id;
	localStorage.setItem("st_idAyaFont", ayaId);
	
	var suraListuId = $scope.suraList.id;
	localStorage.setItem("st_suraListId", suraListuId);
	
	var ayaHeader = $scope.ayaHeaderSelect.title;
	localStorage.setItem("st_ayaHeader", ayaHeader);
	var ayaHeaderId = $scope.ayaHeaderSelect.id;
	localStorage.setItem("st_idHeader", ayaHeaderId);

	var myAlert = $alert({title: 'Settings saved,', content: 'some changes only effect after restart.', duration: 3, placement: 'top', type: 'info', show: true});
  };
   $scope.langMenuList = [
    { title: 'English', id: 0, code: 'en'},
	{ title: 'Malay', id: 1, code: 'my'}
  ];
  if(localStorage.st_langMenu == null){
	$scope.menuLangSelect = $scope.langMenuList[0];
  } else {
	$scope.menuLangSelect = $scope.langMenuList[localStorage.st_idMenu];
  }

  $scope.ayaHeaderList = [
	{title: 'Romanize', id: 0},
	{title: 'Arabic', id: 1},
	{title: 'English', id: 2},
	{title: 'Romanize-English', id: 3},
	{title: 'Arabic-English', id: 4},
	{title: 'Arabic-Romanize', id: 5}
  ];
  if(localStorage.st_ayaHeader == null){
	$scope.ayaHeaderSelect = $scope.ayaHeaderList[5];
  } else {
	$scope.ayaHeaderSelect = $scope.ayaHeaderList[localStorage.st_idHeader];
  }
  $scope.translationList = [
	{ title: 'English - A.J. Arberry', id: 0, jsonstr: 'en.arberry'},
    { title: 'Indonesian', id: 1, jsonstr: 'id.indonesia'},
	{ title: 'Malay - Basmeih', id: 2, jsonstr: 'my.basmeih'}
  ];
  if(localStorage.st_translation == null){
	$scope.transSelect = $scope.translationList[0];
  } else {
	$scope.transSelect = $scope.translationList[localStorage.st_idTrans];
  }
  $scope.arabicFont = [
    { title: 'Amiri Naskh', id: 0, css: 'amiri-compress', header: 'amiri'},
    { title: 'Droid Arabic Kufi', id: 1, css: 'kufi-compress', header: 'kufi' },
    { title: 'Droid Arabic Naskh', id: 2, css: 'droid-compress', header: 'droid' },
    { title: 'KFGQPC Uthman Taha', id: 3, css: 'taha-compress', header: 'taha' },
    { title: 'Scheherazade', id: 4, css: 'scheh-compress', header: 'scheherazade' }
  ];
  if(localStorage.st_menuArabic == null){
	$scope.menuArabic = $scope.arabicFont[4];
  } else {
	$scope.menuArabic = $scope.arabicFont[localStorage.st_idArabicFont];
  }
  if(localStorage.st_ayaFont == null){
	$scope.ayaFontSelect = $scope.arabicFont[4];
  } else {
	$scope.ayaFontSelect = $scope.arabicFont[localStorage.st_idAyaFont];
  }
  // sura list style
  $scope.suraStyleList = [
    { title: 'Ascending Index', id: 0, arg: 'ascending' },
    { title: 'Descending Index', id: 1, arg: 'descending' },
    { title: 'Revelation Order', id: 2, arg: 'revOrder' },
    { title: 'Ayas Count -', id: 3, arg: 'ayasCountLow' },
    { title: 'Ayas Count +', id: 4, arg: 'ayasCountHigh' }
  ];
  if(localStorage.st_suraListId == null){
	$scope.suraList = $scope.suraStyleList[0];
  } else {
	$scope.suraList = $scope.suraStyleList[localStorage.st_suraListId];
	var arg = $scope.suraStyleList[localStorage.st_suraListId].arg;
	sharedProperties.setProperty(1, arg);
  }
})
.controller('rangeListCtrl', function($scope, aq, info, $aside, $timeout, sharedProperties, $rootScope, loader, aq, textService, delegateSideMenu, resolveInfo) {

	$rootScope.$on('$stateChangeStart', 
	function(event, viewConfig){ 
		loader.load();
		delegateSideMenu.set();
	})
	$scope.$on('$viewContentLoaded', 
	function(event){ 
		loader.done();
	});
	var langdata = [];
	var curlang = textService.getMenuLang()
	aq.menuLang().then(function(d) {
		langdata = d.data;
	})
	$scope.menu = [];
	$scope.$watch(function () {
		return langdata;
	},
	function (newval, oldval) {
		if(newval!=oldval){
			for (var i = 0; i < newval.indexpage.length; i++) {
				if(curlang=='my'){
					$scope.menu[i] = newval.indexpage[i][1];
				} else{
					$scope.menu[i] = newval.indexpage[i][0];
				}
			}
		}
	}, false);
	
	var ftstyle = info.mA();
	
	$scope.indexListArabic = '<span id="'+ftstyle+'">{{item.name}}</span>'
	
	
	var arg = sharedProperties.getProperty()[1].arg;
	
	var sort_by = function(field, reverse, primer){
	   var key = primer ? 
		   function(x) {return primer(x[field])} : 
		   function(x) {return x[field]};
	   reverse = [-1, 1][+!!reverse];
	   return function (a, b) {
		   return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
		 } 
	}
		
	$scope.items = [];
	var dataArray = [];
	var idArray = [];
	for ( var i = 0; i < 114; i++) {
		idArray[i] = i;
	}
	$scope.loadMore = function() {	
		var aqData = [];
		var l = $scope.items.length
		for ( var i = l; i < l+1; i++) {
				if (i == 114){
					$scope.$broadcast('scroll.infiniteScrollComplete');
					return false;
				}
		}
		aqid = idArray[i-1];
		if (arg == 'ascending'){
			aqData = resolveInfo.sura
			aqData.sort(sort_by('index', true, parseInt));
			newData = aqData[aqid]
			dataArray.push(newData);
			$scope.items = dataArray;
		}
		if (arg == 'descending'){
			aqData = resolveInfo.sura
			aqData.sort(sort_by('index', false, parseInt));
			newData = aqData[aqid]
			dataArray.push(newData);
			$scope.items = dataArray;
		}
		if (arg == 'revOrder'){
			aqData = resolveInfo.sura
			aqData.sort(sort_by('order', true, parseInt));
			newData = aqData[aqid]
			dataArray.push(newData);
			$scope.items = dataArray;
		}
		if (arg == 'ayasCountLow'){
			aqData = resolveInfo.sura
			aqData.sort(sort_by('ayas', true, parseInt));
			newData = aqData[aqid]
			dataArray.push(newData);
			$scope.items = dataArray;
		}
		if (arg == 'ayasCountHigh'){
			aqData = resolveInfo.sura
			aqData.sort(sort_by('ayas', false, parseInt));
			newData = aqData[aqid]
			dataArray.push(newData);
			$scope.items = dataArray;
		}
		$scope.$broadcast('scroll.infiniteScrollComplete');
	};
	$scope.$on('stateChangeSuccess', function() {
			$scope.loadMore();
	});
	
	  // Show a basic aside from a controller
	var asideTrigger = '';
	$scope.asideRight = function(){
	   var myOtherAside = $aside({scope: $scope, html: true, template: 'templates/aside.html', show: true});
	   myOtherAside.$promise.then(function() {
		myOtherAside.show();
		asideTrigger = myOtherAside;
	  })   
	}
	
	$scope.ascending = function() {
		arg = 'ascending';
		$scope.items = [];
		dataArray = [];
		$scope.loadMore();
		sharedProperties.setProperty(1, arg);
		$timeout(function(){asideTrigger.hide();},300);
	}
	
	$scope.descending = function() {
		arg = 'descending';
		$scope.items = [];
		dataArray = [];
		$scope.loadMore();
		sharedProperties.setProperty(1, arg);
		$timeout(function(){asideTrigger.hide();},300);
	}
	$scope.revOrder = function() {
		arg = 'revOrder';
		$scope.items = [];
		dataArray = [];
		$scope.loadMore();
		sharedProperties.setProperty(1, arg);
		$timeout(function(){asideTrigger.hide();},300);
	}
	$scope.ayasCountLow = function() {
		arg = 'ayasCountLow';
		$scope.items = [];
		dataArray = [];
		$scope.loadMore();
		sharedProperties.setProperty(1, arg);
		$timeout(function(){asideTrigger.hide();},300);
	}
	$scope.ayasCountHigh = function() {
		arg = 'ayasCountHigh';
		$scope.items = [];
		dataArray = [];
		$scope.loadMore();
		sharedProperties.setProperty(1, arg);
		$timeout(function(){asideTrigger.hide();},300);
	}
	
	$scope.dataUrl = function(value){
		sharedProperties.setProperty(0, value);
	}
})
.controller('suraDataCtrl', function($scope, sharedProperties, resolveInfo, resolveTrans, info, resolveAQ, $timeout, $aside, $rootScope, loader, $ionicPopover, tagService, $alert, $cordovaSocialSharing, aq, textService) {
	
	$rootScope.$on('$stateChangeStart', 
	function(event, viewConfig){ 
		loader.load();
	})
	$scope.$on('$viewContentLoaded', 
	function(event){ 
		loader.done();
	});
	var langdata = [];
	var curlang = textService.getMenuLang();
	var langid = 0;
	if(curlang=='my'){langid = 1};
	aq.menuLang().then(function(d) {
		langdata = d.data;
	})
	$scope.menu = [];
	$scope.$watch(function () {
		return langdata;
	},
	function (newval, oldval) {
		if(newval!=oldval){
			for (var i = 0; i < newval.surapage.length; i++) {
				if(curlang=='my'){
					$scope.menu[i] = newval.surapage[i][1];
				} else{
					$scope.menu[i] = newval.surapage[i][0];
				}
			}
			$scope.asideInfo = '<p>'+langdata.navCtrl.index[langid]+': '+resolveInfo.index +'<br>'+langdata.navCtrl.sura[langid]+' '+resolveInfo.tname +'<br>('+resolveInfo.ename+')<br id="ara">'+langdata.navCtrl.arabic[langid]+': <b>'+resolveInfo.name+'</b><br>'+langdata.navCtrl.type[langid]+': '+
			   resolveInfo.type+'<br>'+langdata.navCtrl.ayas[langid]+': '+resolveInfo.ayas+'<br>'+langdata.navCtrl.rev[langid]+': '+resolveInfo.order+'<br>'+langdata.navCtrl.rukus[langid]+': '+resolveInfo.rukus+'</p>';
		}
	}, false);
	
	var x = sharedProperties.getProperty()[0].arg;

	var ftstyle = info.mA();
	var fontSura = info.fontStyle();

	var suraLen = resolveInfo.ayas;

	var header = localStorage.getItem("st_ayaHeader");
	
	var jsonArr = [
					resolveInfo.tname, 
					'<span id="'+ftstyle+'">'+resolveInfo.name+'</span>', 
					resolveInfo.ename,
					resolveInfo.tname+" ("+resolveInfo.ename+")", 
					'<span id="'+ftstyle+'">'+resolveInfo.name+'</span>'+" ("+resolveInfo.ename+")", 
					'<span id="'+ftstyle+'">'+resolveInfo.name+'</span>'+" ("+resolveInfo.tname+")"
					];
	var headerPick = ['Romanize', 'Arabic', 'English', 'Romanize-English', 'Arabic-English', 'Arabic-Romanize' ];
	 for (var i = 0; i < 6; ++i) {
		 if(header == headerPick[i]){
			 $scope.singleTitle = '<p class="title "style="position:absolute;">'+jsonArr[i]+'</p>';
		 } if(header == null){
			 $scope.singleTitle = '<p class="title "style="position:absolute;"><span id="'+ftstyle+'">'+resolveInfo.name +'</span> ('+resolveInfo.tname +')</p>';
		 }
		}

	if (x == 1 || x == 9){
		$scope.bismi =  '';
	} else {
		$scope.bismi =  '<span id="'+fontSura+'">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>';
	}
	
	var arg = sharedProperties.getProperty()[2].arg;
	
	function swapHTML(){
		if (arg == 'verse'){
			$scope.verse = '<div id="'+fontSura+'">{{item.text}}<span id="'+fontSura+'" style="font-size:80%;white-space: nowrap;"> '+
						   '&#64831;<span ng-bind-html="item.taha"></span>&#64830;</span></div>'
		} 
		if (arg == 'trans'){
			$scope.verse = '<p style="text-align:justify">{{item.tr}}<span> [{{item.index}}]</span></p>'
		}
		if (arg == 'sync'){
			$scope.verse = '<div id="'+fontSura+'">{{item.text}}<span id="'+fontSura+'" style="font-size:80%;white-space: nowrap;"> '+
						   '&#64831;<span ng-bind-html="item.taha"></span>&#64830;</span></div>' +
						   '<p style="text-align:justify">{{item.tr}}<span> [{{item.index}}]</span></p>'
		} 
	}
	swapHTML();

	$scope.items = [];
	
	$scope.loadMore = function() {	
		
		var aqData = [];
		var tahaArr = [];
		var l = $scope.items.length
		for ( var i = l; i < l+1; i++) {
				if (i == suraLen){
					$scope.$broadcast('scroll.infiniteScrollComplete');
					return false;
				}
					v = resolveAQ.aya[i]
					x = resolveAQ.aya[i].index
					str = x.toString();
					var taha = info.taha(str);
					t = resolveTrans.aya[i].text
					v['taha'] = taha;
					v['tr'] = t;
					aqData.push(v)
		}	
		$scope.items = $scope.items.concat(aqData);
		$scope.$broadcast('scroll.infiniteScrollComplete');
	};
	$scope.$on('stateChangeSuccess', function() {
			$scope.loadMore();
	});	
	
	var asideTrigger = '';
	$scope.asideRight = function(){
	   var myOtherAside = $aside({scope: $scope, html: true, template: 'templates/asideSura.html', show: true});
	   myOtherAside.$promise.then(function() {
		myOtherAside.show();
		asideTrigger = myOtherAside;
	  })   
	}
	$scope.viewVerse = function() {
		arg = 'verse';
		swapHTML();
		$scope.items = [];
		$scope.loadMore();
		sharedProperties.setProperty(2, arg);
		$timeout(function(){asideTrigger.hide();},300);
	}
	$scope.viewTrans = function() {
		arg = 'trans';
		swapHTML();
		$scope.items = [];
		$scope.loadMore();
		sharedProperties.setProperty(2, arg);
		$timeout(function(){asideTrigger.hide();},300);
	}
	$scope.viewSync = function() {
		arg = 'sync';
		swapHTML();
		$scope.items = [];
		$scope.loadMore();
		sharedProperties.setProperty(2, arg);
		$timeout(function(){asideTrigger.hide();},300);
	}
	
	$ionicPopover.fromTemplateUrl('my-popover.html', {
		scope: $scope,
	}).then(function(popover) {
		$scope.popover = popover;
	});
	var shareText = '';
	var shareTr = '';
	var shareIndex = '';
	$scope.openPopover = function($event, text, tr, index) {
		$scope.popover.show($event);
		shareText = text;
		shareTr = tr;
		shareIndex = index;
	};
	$scope.closePopover = function() {
		$scope.popover.hide();
	};
	$scope.$on('$destroy', function() {
		$scope.popover.remove();
	});
	
	$scope.shareAnywhere = function() {
		var string = shareText+'\n'+shareTr+'\n'+resolveInfo.tname+', '+langdata.navpage[2][langid]+' '+shareIndex+' - via quran meta';
		$cordovaSocialSharing.share(string);
		$scope.popover.hide();
    }
	$scope.tagThis = function(){
		tagService.add(resolveInfo.index, shareIndex)
		$scope.popover.hide();
		var myAlert = $alert({title: langdata.surapage[8][langid], content: langdata.surapage[9][langid], duration: 3, placement: 'top', type: 'info', show: true});
	}
	$scope.shareFacebook = function() {
		var string = shareText+'\n'+shareTr+'\n'+resolveInfo.tname+', '+langdata.navpage[2][langid]+' '+shareIndex+' - via quran meta';
		window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint(string, null /* img */, null /* url */, langdata.surapage[11][langid], function() {/*console.log('share ok')*/}, function(errormsg){/*alert(errormsg)*/});
		$scope.popover.hide();
    }
})
.controller('searchCtrl', function($scope, resolveTrans, loadSearchData, sharedProperties, $rootScope, loader, textService, aq, delegateSideMenu, feature, $alert, $ionicGesture) {

	$rootScope.$on('$stateChangeStart', 
	function(event, viewConfig){ 
		loader.load();
		delegateSideMenu.set();
	})
	$scope.$on('$viewContentLoaded', 
	function(event){ 
		loader.done();
	});
	//menu lang--------------
	var langdata = [];
	var curlang = textService.getMenuLang();
	var langid = 0;
	if(curlang=='my'){langid = 1};
	aq.menuLang().then(function(d) {
		langdata = d.data;
	})
	$scope.menu = [];
	$scope.$watch(function () {
		return langdata;
	},
	function (newval, oldval) {
		if(newval!=oldval){
			for (var i = 0; i < newval.searchpage.length; i++) {
				if(curlang=='my'){
					$scope.menu[i] = newval.searchpage[i][1];
				} else{
					$scope.menu[i] = newval.searchpage[i][0];
				}
			}
			$scope.searchTag = '<p>'+newval.searchCtrl.found[langid]+': {{count}} '+newval.searchCtrl.result[langid]+'{{display}}</p>'
		}
	}, false);
	//------------------------
	
	$scope.searchInput = '';
	loadSearchData.set([]);
	
	var v = resolveTrans.sura[1].aya;
	
	var transData = resolveTrans.sura;
	var ayaArray = [];
	for (var i = 0; i < transData.length; i++) {
			for (var k = 0; k < transData[i].aya.length; k++) {
			ayaArray.push({
				index: (i+1)+':'+transData[i].aya[k].index,
				text: transData[i].aya[k].text,
				surId: (i+1),
				aytId: transData[i].aya[k].index
				})
			}
	}
	
	//set full version or lite version
	arg = feature.getSF(); // 'multi' / 'single'
	if(arg=='multi'){
		$scope.buyFeatDisplay = '';
	} else {
		$scope.buyFeatDisplay = '<button ng-click="buyFeat()" class="button button-icon icon ion-android-playstore"></button>';
	}
	$scope.buyFeat = function(){
		 inappbilling.buy(function(buydata) {
			var myAlert = $alert({title: langdata.frontpage[2][langid], content: langdata.frontpage[3][langid], duration: 3, placement: 'top', type: 'info', show: true});
			arg = 'multi';
			$scope.buyFeatDisplay = '';
			feature.setSF(); 
		}, function(errorBuy) {
			//error log
		}, 
		"g_search");
	}
	
	$scope.result = '<p style="text-align:justify">{{item.text}}<span> [{{item.index}}]</span></p>'
	$scope.count = 0;
	$scope.filterArray = [];
	$scope.items = [];
	$scope.trigger = function(){

		var input = this.searchInput;
		var split = input.split(' ');
		
		var data = []
		var dataFiltered = []
		for (var j = 0; j < ayaArray.length; j++) {
			if(input == ''){
				$scope.items = [];
				$scope.count = 0;
				$scope.display = '';
				return false;
			}
			if (arg == 'single'){
				var re = [];
				for (var k = 0; k < split.length; k++) {
					try {
					re[k] = new RegExp(split[k],"i");
					} catch(e){return false}
				}
				if(split.length == 1){
					if ( ayaArray[j].text.match(re[0]) ) {dataFiltered.push(ayaArray[j])}}
				if(split.length > 1){
					$scope.display = langdata.searchCtrl.displayfull[langid];
				}
			}
			if (arg == 'multi'){
				var re = [];
				for (var k = 0; k < split.length; k++) {
					re[k] = new RegExp(split[k],"i");
				}
				if(split.length == 1){
					if ( ayaArray[j].text.match(re[0]) ) {dataFiltered.push(ayaArray[j])}}
				if(split.length == 2){
					if ( ayaArray[j].text.match(re[0]) && ayaArray[j].text.match(re[1]) ) {dataFiltered.push(ayaArray[j])}}
				if(split.length == 3){
					if ( ayaArray[j].text.match(re[0]) && ayaArray[j].text.match(re[1]) && ayaArray[j].text.match(re[2]) ) {dataFiltered.push(ayaArray[j])}}
				if(split.length == 4){
					if ( ayaArray[j].text.match(re[0]) && ayaArray[j].text.match(re[1]) && ayaArray[j].text.match(re[2]) && ayaArray[j].text.match(re[3]) ) {dataFiltered.push(ayaArray[j])}}
				if(split.length == 5){
					if ( ayaArray[j].text.match(re[0]) && ayaArray[j].text.match(re[1]) && ayaArray[j].text.match(re[2]) && ayaArray[j].text.match(re[3]) && ayaArray[j].text.match(re[4]) ) {dataFiltered.push(ayaArray[j])}}
				if(split.length > 5){
					$scope.display = langdata.searchCtrl.displaymany[langid];
				}

			}
		} 

		$scope.count = dataFiltered.length;
		loadSearchData.set(dataFiltered);

		$scope.items = [];
		$scope.loadMore();
	}

	
	$scope.loadMore = function() {	
	
		var filter = loadSearchData.get();
		if (filter == ''){
			return false;
		}
		$scope.display = langdata.searchCtrl.displayfirst[langid];
			var aqData = [];
			var l = $scope.items.length
			for ( var i = l; i < l+1; i++) {
					if (i == 100 || i == filter.length ){
						$scope.$broadcast('scroll.infiniteScrollComplete');
						return false;
					}
					try {
						aqData.push(filter[i]);
					} catch(e){
						return false;
					}
			}	
			$scope.items = $scope.items.concat(aqData);
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}
	$scope.dataUrl = function(x, y){
		sharedProperties.setProperty(3, x);
		sharedProperties.setProperty(4, y);
	}
	
	//$scope.lastEventCalled = 'Try to Drag the content up, down, left or rigth';
	var element = angular.element(document.querySelector('#dragEvent'));
	var events = [{
	event: 'dragup'
	},{
	event: 'dragdown'
	},{
	event: 'dragleft'
	},{
	event: 'dragright'
	}];
	var gestureInit = 0;
	$scope.$watch(function () {
		return $scope.count;
	},
	function (newval, oldval) {
		if(newval!=oldval){
			gestureInit = newval;
			$scope.triggerScroll = false;
			if(gestureInit!=0){
				angular.forEach(events, function(obj){
					$ionicGesture.on(obj.event, function (event) {
						$scope.$apply(function () {
							//$scope.lastEventCalled = obj.text;
							$scope.triggerScroll = true;
						});
					}, element);
				});
			}
		}
	}, false);
})
.controller('searchResult', function($scope, sharedProperties, resolveInfo, resolveTrans, info, resolveAQ, $aside, $ionicPopover, $rootScope, loader, $cordovaSocialSharing, tagService, $alert, aq, textService) {
	
	$rootScope.$on('$stateChangeStart', 
	function(event, viewConfig){ 
		loader.load();
	})
	$scope.$on('$viewContentLoaded', 
	function(event){ 
		loader.done();
	});
	
	var x = sharedProperties.getProperty()[3].arg;
	var stry = sharedProperties.getProperty()[4].arg;
	var y = parseInt(stry);
	var ftstyle = info.mA();
	var fontSura = info.fontStyle();
	var suraLen = resolveInfo.ayas;
	var header = localStorage.getItem("st_ayaHeader");
	
	var jsonArr = [
					resolveInfo.tname, 
					'<span id="'+ftstyle+'">'+resolveInfo.name+'</span>', 
					resolveInfo.ename,
					resolveInfo.tname+" ("+resolveInfo.ename+")", 
					'<span id="'+ftstyle+'">'+resolveInfo.name+'</span>'+" ("+resolveInfo.ename+")", 
					'<span id="'+ftstyle+'">'+resolveInfo.name+'</span>'+" ("+resolveInfo.tname+")"
					];
	var headerPick = ['Romanize', 'Arabic', 'English', 'Romanize-English', 'Arabic-English', 'Arabic-Romanize' ];
	 for (var i = 0; i < 6; ++i) {
		 if(header == headerPick[i]){
			 $scope.singleTitle = '<p class="title "style="position:absolute;">'+jsonArr[i]+'</p>';
		 } if(header == null){
			 $scope.singleTitle = '<p class="title "style="position:absolute;"><span id="'+ftstyle+'">'+resolveInfo.name +'</span> ('+resolveInfo.tname +')</p>';
		 }
		}	

	$scope.verse = '<div id="'+fontSura+'">{{item.text}}<span id="'+fontSura+'" style="font-size:80%;white-space: nowrap;"> '+
				   '&#64831;<span ng-bind-html="item.taha"></span>&#64830;</span></div>' +
				   '<p style="text-align:justify">{{item.tr}}<span> [{{item.index}}]</span></p>'
	
	$scope.items = [];
	
	$scope.loadMore = function() {	
		var cId = y-1;
		var aqData = [];
		var tahaArr = [];
		var l = $scope.items.length
		for ( var i = l; i < l+1; i++) {
				if (i+ cId == suraLen || i + cId > suraLen){
					$scope.$broadcast('scroll.infiniteScrollComplete');
					return false;
				}
				v = resolveAQ.aya[i+cId]
				x = resolveAQ.aya[i+cId].index
				str = x.toString();
				var taha = info.taha(str);
				t = resolveTrans.aya[i+cId].text
				v['taha'] = taha;
				v['tr'] = t;
				aqData.push(v)	;			
		}		
		$scope.items = $scope.items.concat(aqData);
		$scope.$broadcast('scroll.infiniteScrollComplete');
	};
	var count = 2;
	$scope.doRefresh = function() {
		if(count > y){
			$scope.$broadcast('scroll.refreshComplete');
			return false;
		}
		
		v = resolveAQ.aya[y-count];
		x = resolveAQ.aya[y-count].index;
		str = x.toString();
		var taha = info.taha(str);
		t = resolveTrans.aya[y-count].text;
		$scope.items.unshift({
			text: v.text,
			taha: taha,
			tr: t,
			index: v.index
		})
		$scope.$broadcast('scroll.refreshComplete');
		$scope.$apply();
		count++;
	}
	
	var asideTrigger = '';
	$scope.asideRight = function(){
	   var myOtherAside = $aside({scope: $scope, html: true, template: 'templates/asideResult.html', show: true});
	   myOtherAside.$promise.then(function() {
		myOtherAside.show();
		asideTrigger = myOtherAside;
	  })   
	}
	
	//menu lang--------------
	var langdata = [];
	var curlang = textService.getMenuLang();
	var langid = 0;
	if(curlang=='my'){langid = 1};
	aq.menuLang().then(function(d) {
		langdata = d.data;
	})
	$scope.menu = [];
	$scope.$watch(function () {
		return langdata;
	},
	function (newval, oldval) {
		if(newval!=oldval){
			$scope.asideInfo = '<p>'+langdata.navCtrl.index[langid]+': '+resolveInfo.index +'<br>'+langdata.navCtrl.sura[langid]+' '+resolveInfo.tname +'<br>('+resolveInfo.ename+')<br id="ara">'+langdata.navCtrl.arabic[langid]+': <b>'+resolveInfo.name+'</b><br>'+langdata.navCtrl.type[langid]+': '+
			   resolveInfo.type+'<br>'+langdata.navCtrl.ayas[langid]+': '+resolveInfo.ayas+'<br>'+langdata.navCtrl.rev[langid]+': '+resolveInfo.order+'<br>'+langdata.navCtrl.rukus[langid]+': '+resolveInfo.rukus+'</p>';
		    $scope.asidemenu = langdata.navCtrl.surainfo[langid];
			for (var i = 0; i < newval.surapage.length; i++) {
				if(curlang=='my'){
					$scope.menu[i] = newval.surapage[i][1];
				} else{
					$scope.menu[i] = newval.surapage[i][0];
				}
			}
			$scope.puller = '<ion-refresher pulling-text="'+langdata.surapage[10][langid]+'" on-refresh="doRefresh()"></ion-refresher>'
		}
	}, false);
	//------------------------
	
	$ionicPopover.fromTemplateUrl('my-popover.html', {
		scope: $scope,
	}).then(function(popover) {
		$scope.popover = popover;
		
	});
	var shareText = '';
	var shareTr = '';
	var shareIndex = '';
	$scope.openPopover = function($event, text, tr, index) {
		$scope.popover.show($event);
		shareText = text;
		shareTr = tr;
		shareIndex = index;
	};
	$scope.closePopover = function() {
		$scope.popover.hide();
	};
	$scope.$on('$destroy', function() {
		$scope.popover.remove();
	});
	
	$scope.shareAnywhere = function() {
		var string = shareText+'\n'+shareTr+'\n'+resolveInfo.tname+', '+langdata.navpage[2][langid]+' '+shareIndex+' - via quran meta';
		$cordovaSocialSharing.share(string);
		$scope.popover.hide();
    }
	$scope.tagThis = function(){
		tagService.add(resolveInfo.index, shareIndex)
		$scope.popover.hide();
		var myAlert = $alert({title: langdata.surapage[8][langid], content: langdata.surapage[9][langid], duration: 3, placement: 'top', type: 'info', show: true});
	}
	$scope.shareFacebook = function() {
		var string = shareText+'\n'+shareTr+'\n'+resolveInfo.tname+', '+langdata.navpage[2][langid]+' '+shareIndex+' - via quran meta';
		window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint(string, null /* img */, null /* url */, langdata.surapage[11][langid], function() {/*console.log('share ok')*/}, function(errormsg){/*alert(errormsg)*/});
		$scope.popover.hide();
    }
})
.controller('quickNavCtrl', function($scope, sharedProperties, resolveInfo, info, $state, $rootScope, loader, textService, aq, delegateSideMenu, feature, $alert) {

	$rootScope.$on('$stateChangeStart', 
	function(event, viewConfig){ 
		loader.load();
		delegateSideMenu.set();
	})
	$scope.$on('$viewContentLoaded', 
	function(event){ 
		loader.done();
	});
	//menu lang--------------
	var langdata = [];
	var curlang = textService.getMenuLang();
	var langid = 0;
	if(curlang=='my'){langid = 1};
	aq.menuLang().then(function(d) {
		langdata = d.data;
	})
	$scope.menu = [];
	$scope.$watch(function () {
		return langdata;
	},
	function (newval, oldval) {
		if(newval!=oldval){
			for (var i = 0; i < newval.navpage.length; i++) {
				if(curlang=='my'){
					$scope.menu[i] = newval.navpage[i][1];
				} else{
					$scope.menu[i] = newval.navpage[i][0];
				}
			}
			$scope.quickhtml = newval.navCtrl.quickhtml[langid];
		}
	}, false);
	//------------------------
	$scope.qsw = [];
	function buttonVar(type){
		var jsonArr = [];
		for (var i = 0; i < 10; i++) {
			jsonArr.push({
				value: info.sw(i, type)
			});
			$scope.qsw[i] = jsonArr[i].value;
		}
	};
	buttonVar('sur');
	var sur = ''
	$scope.quickSurVal = function(x) {

		sur = sur.concat(x);
		var len = resolveInfo[sur-1];
		if (len == null){
			return false;
		}
		$scope.csur = sur;
		var elem = '<p>'+langdata.navCtrl.info[langid]+': '+langdata.navCtrl.sura[langid]+' '+len.tname +' ('+len.ename+')<br id="ara">'+langdata.navCtrl.arabic[langid]+': <b>'+len.name+'</b> , '+langdata.navCtrl.type[langid]+': '+
					len.type+', '+langdata.navCtrl.ayas[langid]+': '+len.ayas+'<br>'+langdata.navCtrl.rev[langid]+': '+len.order+', '+langdata.navCtrl.rukus[langid]+': '+len.rukus+'</p>';
		$scope.quickhtml = elem;

		sharedProperties.setProperty(3, len.index);
    };
	var featQN = feature.getQN();
	if(featQN=='all'){
		$scope.buyFeatDisplay = '';
	} else {
		$scope.buyFeatDisplay = '<button ng-click="buyFeat()" class="button button-icon icon ion-android-playstore"></button>';
	}
	$scope.buyFeat = function(){
		 inappbilling.buy(function(buydata) {
			var myAlert = $alert({title: langdata.frontpage[2][langid], content: langdata.frontpage[3][langid], duration: 3, placement: 'top', type: 'info', show: true});
			featQN = 'all';
			$scope.buyFeatDisplay = '';
			feature.setQN(); 
		}, function(errorBuy) {
			//error log
		}, 
		"g_quicknav");
	}
	$scope.qswitchRight = function() {

		if (sur == '' || sur == 0){
			return false;
		}
		if(featQN=='lim' && sur > 3){
			var myAlert = $alert({title: langdata.qnotepage[14][langid], content: langdata.navpage[4][langid], duration: 5, placement: 'top', type: 'info', show: true});
			return false;
		} else{
			$scope.surbg = {'background-color': '#fff'};
			$scope.aytbg = {'background-color': '#d5ffc0'};
			buttonVar('ayt');
		}
	};
	$scope.qremVal = function() {
		buttonVar('sur');
		$scope.csur = '';
		$scope.cayt = '';
		$scope.aytbg = {'background-color': '#fff'};
		$scope.surbg = {'background-color': '#d5ffc0'};
		$scope.quickhtml = langdata.navCtrl.quickhtml[langid];
		sur = ''; ayt = '';
	};
	var ayt = '';
	var done = false;
	$scope.quickAytVal = function(x){
		ayt = ayt.concat(x);
		var len = resolveInfo[sur-1];
		var int_ayt = parseInt(ayt);
		if ( int_ayt > len.ayas){
			ayt = '';
			done = false;
			return false;
		}
		$scope.cayt = ayt;
		sharedProperties.setProperty(4, ayt);
		done = true;
	};
	$scope.qnav = function(){
		var int_ayt_done = parseInt(ayt);
		if(done==true && int_ayt_done != 0){
			$state.go('app.searchLink', {suraIndex: sur})
		}
	}
})
.controller('tagsCtrl', function($scope, resolveInfo, resolveAQ, resolveTrans, $rootScope, loader, tagService, info, $state, $alert, $ionicPopup, aq, textService, $ionicScrollDelegate, delegateSideMenu) {
	$rootScope.$on('$stateChangeStart', 
	function(event, viewConfig){ 
		loader.load();
		delegateSideMenu.set();
	})
	$scope.$on('$viewContentLoaded', 
	function(event){ 
		loader.done();
	});
	var langdata = [];
	var curlang = textService.getMenuLang();
	var langid = 0;
	if(curlang=='my'){langid = 1};
	aq.menuLang().then(function(d) {
		langdata = d.data;
	})
	$scope.menu = [];
	$scope.$watch(function () {
		return langdata;
	},
	function (newval, oldval) {
		if(newval!=oldval){
			for (var i = 0; i < newval.tagspage.length; i++) {
				if(curlang=='my'){
					$scope.menu[i] = newval.tagspage[i][1];
				} else{
					$scope.menu[i] = newval.tagspage[i][0];
				}
			}
		}
	}, false);
	/**
		test
	**/
	var testsail = '';
	aq.test().then(function(d) {
		testsail = d;
		console.log(testsail)
	})
	
	var fontSura = info.fontStyle();
	var gcollapsed;
	$scope.global = function(){
	gcollapsed = !gcollapsed;
	if(!gcollapsed){
	$scope.verse = '<p><p><a style="color:green;text-decoration:none;height:20px;width:280px;display:inline-block;cursor:pointer" ng-click="collapsed=!collapsed">{{item.tname}}, {{menu[1]}} {{item.index}} »</a>'+
				   '<span style="float:right"><a style="width:30px;height:30px;display:block;text-align:center;cursor:pointer" class="icon ion-close-circled" ng-click="removeTag(item.id)"></a></span></p></p>'+
				   '<div id="'+fontSura+'" ng-show="collapsed">{{item.text}}<span id="'+fontSura+'" style="font-size:80%;white-space: nowrap;"> '+
				   '&#64831;<span ng-bind-html="item.taha"></span>&#64830;</span></div>' +
				   '<p ng-show="collapsed" style="text-align:justify">{{item.tr}}</p>'
	}
	if(gcollapsed){
	$scope.verse = '<p><p><a style="color:green;text-decoration:none;height:20px;width:280px;display:inline-block;cursor:pointer" ng-click="collapsed=!collapsed">{{item.tname}}, {{menu[1]}} {{item.index}} »</a>'+
				   '<span style="float:right;"><a style="width:30px;height:30px;display:block;text-align:center;cursor:pointer" class="icon ion-close-circled" ng-click="removeTag(item.id)"></a></span></p></p>'+
				   '<div id="'+fontSura+'" ng-hide="collapsed">{{item.text}}<span id="'+fontSura+'" style="font-size:80%;white-space: nowrap;"> '+
				   '&#64831;<span ng-bind-html="item.taha"></span>&#64830;</span></div>' +
				   '<p ng-hide="collapsed" style="text-align:justify">{{item.tr}}</p>'
	}
	$ionicScrollDelegate.scrollTop();
	}
	$scope.global();
	var x = tagService.get();
	if (x != null){
		var suraLen = x.length	
	}
	$scope.items = [];
	
	$scope.loadMore = function() {	
		
		var aqData = [];
		var l = $scope.items.length
		for ( var i = l; i < l+1; i++) {
				if (i == suraLen || x == null){
					$scope.$broadcast('scroll.infiniteScrollComplete');
					return false;
				}
				v = resolveAQ[x[i].sura-1].aya[x[i].aya-1];
				tname = resolveInfo[x[i].sura-1].tname;
				indexMore = x[i].aya;
				str = indexMore.toString();
				var taha = info.taha(str);
				t = resolveTrans[x[i].sura-1].aya[x[i].aya-1].text
				id = i;
				v['taha'] = taha;
				v['tr'] = t;
				v['tname'] = tname;
				v['id'] = i;
				aqData.push(v);
		}	
		$scope.items = $scope.items.concat(aqData);
		$scope.$broadcast('scroll.infiniteScrollComplete');
		
	};
	$scope.removeTag = function(id){
		var confirmPopup = $ionicPopup.confirm({
			title: langdata.tagspage[4][langid],
			template: langdata.tagspage[5][langid],
			cancelText: langdata.qnoteviewpage[4][langid]
		});
		confirmPopup.then(function(res) {
			if(res) {
				tagService.remove(id);
				$state.go($state.current, {}, {reload: true});
				var myAlert = $alert({title: langdata.tagspage[2][langid], content: langdata.tagspage[3][langid], duration: 3, placement: 'top', type: 'info', show: true});
			} else {
			}
		});
	}
})
.controller('qnoteCtrl', function($scope, $rootScope, qnoteService, $alert, $state, $ionicPopup, loader, $timeout, aq, textService, delegateSideMenu, feature) {
	$rootScope.$on('$stateChangeStart', 
	function(event, viewConfig){ 
		loader.load();
		delegateSideMenu.set();
	})
	$scope.$on('$viewContentLoaded', 
	function(event){ 
		loader.done();
	});
	
	var langdata = [];
	var curlang = textService.getMenuLang();
	var langid = 0;
	if(curlang=='my'){langid = 1};
	aq.menuLang().then(function(d) {
		langdata = d.data;
	})
	$scope.menu = [];
	$scope.$watch(function () {
		return langdata;
	},
	function (newval, oldval) {
		if(newval!=oldval){
			for (var i = 0; i < newval.qnotepage.length; i++) {
				if(curlang=='my'){
					$scope.menu[i] = newval.qnotepage[i][1];
				} else{
					$scope.menu[i] = newval.qnotepage[i][0];
				}
			}
		}
	}, false);

	var data = [];
	var len = data.length;
	var featqnote = feature.getQF();
	qnoteService.get().then(function(d){
		data = d;
		len = d.length;
	});
	$scope.$watch(function () {
		return data;
	},
	function (newval, oldval) {
		if(newval!=oldval){
			var counteredit = newval[0].counter;
			var leftEdit = 15 - counteredit;
			if (featqnote=='lim'){
				$scope.buyFeatDisplay = '<button ng-click="buyFeat()" class="button button-icon icon ion-android-playstore"></button>';
				$scope.headerList = '<h2>{{item.name}}</h2><p style="color:green">{{menu[8]}}: {{item.created}}<span> {{menu[12]}}: '+leftEdit+' {{menu[13]}}</span></p>'
			} else{
				$scope.headerList = '<h2>{{item.name}}</h2><p style="color:green">{{menu[8]}}: {{item.created}}</p>';
				$scope.buyFeatDisplay = '';
			}
		}
	}, false);
	
	$scope.buyFeat = function(){
			 inappbilling.buy(function(buydata) {
                var myAlert = $alert({title: langdata.frontpage[2][langid], content: langdata.frontpage[3][langid], duration: 3, placement: 'top', type: 'info', show: true});
				featqnote = 'all';
				$scope.buyFeatDisplay = '';
				feature.setQF(); 
            }, function(errorBuy) {
                //error log
            }, 
            "g_qnote");
	}

	$scope.items = [];
	$scope.loadMore = function() {	
		
		var headerArray = [];
		var l = $scope.items.length
		for ( var i = l; i < l+1; i++) {
				if (i == len || data == null){
					$scope.$broadcast('scroll.infiniteScrollComplete');
					return false;
				}
				v = data[i];
				v['index'] = i;
				headerArray.push(v);
		}
		$scope.items = $scope.items.concat(headerArray);
		$scope.$broadcast('scroll.infiniteScrollComplete');
	};
		
	$scope.headerNote = function(index){
		qnoteService.share(index);
	}
	$scope.add = function(){
		if (featqnote=='lim'){
			var myAlert = $alert({title: langdata.qnotepage[14][langid], content: langdata.qnotepage[11][langid], duration: 5, placement: 'top', type: 'info', show: true});
			return false;
		}
		$scope.show = !$scope.show
	};
	
	$scope.wysiwyg = '<div class="list list-inset">'+
						'<label class="item item-input">'+
							'<input type="text" placeholder={{menu[3]}} ng-model="newFileName">'+
						'</label>'+
					'</div>'+
					'<div style="text-align:right; margin:0 6px 0 0">'+
					'<button class="button button-small icon-left ion-close-circled button-positive" ng-click="add()">&nbsp;{{menu[4]}}</button>'+
					'&nbsp;&nbsp;<button class="button button-small icon-left ion-briefcase button-balanced" ng-click="saveFileName(newFileName)">&nbsp;{{menu[5]}}&nbsp;</button></div><br>'

	$scope.saveFileName = function(newName){
		if(newName == '' || newName == null){
			var myAlert = $alert({title: langdata.qnotepage[9][langid], content: langdata.qnotepage[10][langid], duration: 3, placement: 'top', type: 'info', show: true});
			return false;
		}
		qnoteService.add(newName, data);
		$scope.add();
		$timeout(function(){$state.go($state.current, {}, {reload: true});},1000);
		
	};
	
	$scope.showInfo = function() {
	   var p = $ionicPopup.alert({
		 title: langdata.qnotepage[6][langid],
		 template: langdata.qnotepage[7][langid]
	   });
	 };
})
.controller('qnoteViewCtrl', function($scope, $rootScope, qnoteService, textService, $alert, $ionicPopup, $state, $timeout, resolveInfo, resolveAQ, resolveTrans, info, $ionicScrollDelegate, loader, $cordovaFile, aq, feature) {
	
	$rootScope.$on('$stateChangeStart', 
	function(event, viewConfig){ 
		loader.load();
	})
	$scope.$on('$viewContentLoaded', 
	function(event){ 
		loader.done();
	});
	var langdata = [];
	var curlang = textService.getMenuLang();
	var langid = 0;
	if(curlang=='my'){langid = 1};
	aq.menuLang().then(function(d) {
		langdata = d.data;
	})
	$scope.menu = [];
	$scope.$watch(function () {
		return langdata;
	},
	function (newval, oldval) {
		if(newval!=oldval){
			for (var i = 0; i < newval.qnoteviewpage.length; i++) {
				if(curlang=='my'){
					$scope.menu[i] = newval.qnoteviewpage[i][1];
				} else{
					$scope.menu[i] = newval.qnoteviewpage[i][0];
				}
			}
		}
	}, false);
	//var index = 0;
	var index = qnoteService.getShare();
	var headerData = [];
	var header = [];
	var data = [];
	var genID = '';
	var editcounter = 0;
	qnoteService.get().then(function(d){
		headerData = d;
		header = d[index];
		genID = d[index].id
		editcounter = d[0].counter;
		qnoteService.getData(genID).then(function(dd){
			data = dd;
		});
	});
	
	$scope.$watch(
		function() {
			return(header, data);
		},
		function( newValue ) {
			$scope.title = header.name;
		}
	);
	
	$scope.items = [];
	$scope.loadMore = function() {	
		var len = data.length;
		var dataArray = [];
		var l = $scope.items.length
		for ( var i = l; i < l+1; i++) {
				if (i == len || data == null){
					$scope.$broadcast('scroll.infiniteScrollComplete');
					return false;
				}
				v = data[i];
				if(data[i].isur==null){
					v['display'] = 'none';
				}
				v['index'] = i;
				dataArray.push(v);
		}
		$scope.items = $scope.items.concat(dataArray);
		$scope.$broadcast('scroll.infiniteScrollComplete');
	};
	$scope.wysiwyg = '';
	$scope.addElement = function(){
		if(editMode == false){
		$scope.wysiwyg = '<div style="margin-left:15px;margin-right:15px" ng-controller="textModelCtrl"><textarea ng-wig="textModel" ng-model="textModel"></textarea></div>'+
						 '<div style="text-align:right; margin:6px">'+
						 '<button class="button button-small icon-left ion-close-circled button-positive" ng-click="cancelElem()">&nbsp;{{menu[4]}}</button>'+
						 '&nbsp;&nbsp;<button class="button button-small icon-left ion-briefcase button-balanced" ng-click="saveElem()">&nbsp;{{menu[5]}}&nbsp;</button></div><br>'
		}
		if(editMode == true){
		$scope.wysiwyg = '<div style="margin-left:15px;margin-right:15px" ng-controller="textModelCtrl"><textarea ng-wig="textModel" ng-model="textModel"></textarea></div>'+
						 '<div style="text-align:right; margin:6px">'+
						 '<button class="button button-small icon-left ion-close-circled button-dark" ng-click="deleteElem('+currentIndex+')">&nbsp;{{menu[3]}}</button>'+
						 '&nbsp;&nbsp;<button class="button button-small icon-left ion-close-circled button-positive" ng-click="cancelElem()">&nbsp;{{menu[4]}}</button>'+
						 '&nbsp;&nbsp;<button class="button button-small icon-left ion-briefcase button-balanced" ng-click="saveElem()">&nbsp;{{menu[5]}}&nbsp;</button></div><br>'	
		}
	}
	$scope.editFileName = function(){
		$scope.wysiwyg = '<div class="list list-inset">'+
							'<label class="item item-input">'+
								'<input type="text" value="{{title}}" ng-model="newFileName">'+
							'</label>'+
						'</div>'+
						'<div style="text-align:right; margin:0 6px 0 0">'+
						'<button class="button button-small icon-left ion-close-circled button-positive" ng-click="cancelElem()">&nbsp;{{menu[4]}}</button>'+
						'&nbsp;&nbsp;<button class="button button-small icon-left ion-briefcase button-balanced" ng-click="saveFileName(newFileName)">&nbsp;{{menu[5]}}&nbsp;</button></div><br>'
	}
	$scope.saveFileName = function(newName){
		if(newName == '' || newName == null){
			var myAlert = $alert({title: langdata.qnoteviewpage[12][langid], content: langdata.qnoteviewpage[14][langid], duration: 3, placement: 'top', type: 'info', show: true});
			return false;
		}
		headerData[index].name = newName;
		qnoteService.editFileName(headerData);
		$scope.title = newName;
		$scope.wysiwyg = '';
	};
	$scope.deleteFile = function() {
	   var confirmPopup = $ionicPopup.confirm({
		 title: langdata.qnoteviewpage[10][langid],
		 template: langdata.qnoteviewpage[11][langid],
		 cancelText: langdata.qnoteviewpage[4][langid]
	   });
	   confirmPopup.then(function(res) {
		 if(res) {
			headerData.splice(index, 1);
			qnoteService.remove(headerData, genID);
			$timeout(function(){$state.go('app.qnote', {});},1000);
		 } else {
		   
		 }
	   });
	 };
	$scope.color = 'grey';
	var featqnote = feature.getQF();
	$scope.showEditMode = function(){
		if (featqnote=='lim' && editcounter == 15){
			var myAlert = $alert({title: langdata.qnotepage[14][langid], content: langdata.qnotepage[15][langid], duration: 5, placement: 'top', type: 'info', show: true});
			return false;
		}
		$scope.show = !$scope.show
		if (!$scope.show){
			$scope.color = 'grey';
			$scope.wrapper = '<span style="padding:3px 10px 3px 10px;border:none" class="item item-text-wrap" dynamic="resultEditor"></span>'
		} else {
			editcounter++;
			headerData[0].counter = editcounter;
			qnoteService.editFileName(headerData);
			$scope.color = 'white';
			$scope.wrapper = '<a ng-click="elemAction(item.index, item.element)" style="padding:3px 10px 3px 10px;cursor:pointer" class="item item-text-wrap" dynamic="resultEditor"></a>'
		}	
	};
	$scope.editor = '<div style="padding:6px">'+
						  '<button class="button button-small icon-left ion-log-in button-balanced" ng-click="addAya()">&nbsp;{{menu[0]}}</button>'+
						  '&nbsp;<button class="button button-small icon-left ion-log-in button-positive" ng-click="addElement()">&nbsp;{{menu[1]}}</button>'+
						  '&nbsp;<button class="button button-small icon-left ion-edit button-royal" ng-click="editFileName()">&nbsp;{{menu[2]}}</button>'+
						  '&nbsp;<button class="button button-small icon-left ion-trash-a button-dark" ng-click="deleteFile()">&nbsp;{{menu[3]}}</button>'+
					 '</div>'
	
	$scope.wrapper = '<span style="padding:3px 10px 3px 10px;border:none" class="item item-text-wrap" dynamic="resultEditor"></span>'
					 
	var fontSura = info.fontStyle();
	//WARNNG!!!! unsafe method find solution WARNING!!!!!!! '<span id="qnote" ng-bind-html="item.element | trusted"></span>'+
	$scope.resultEditor = '<span add-system id="qnote" ng-bind-html="item.element"></span>'+
						  '<div style="display:{{item.display}};border-style:solid;border-width:2px;border-color:#C4C4C4;padding:4px">'+
						  '		<a ng-model="collapsed" ng-click="collapsed=!collapsed" style="text-decoration:none;display:block"><p style="color:green">{{item.tname}} {{menu[18]}} {{item.iayt+1}} »</p></a>'+
						  '		<div ng-show="collapsed" id="'+fontSura+'">{{item.verse}} <span style="font-size:80%;white-space: nowrap;">&#64831;<span ng-bind-html="item.itaha"></span>&#64830;</span></span></div>'+
						  '		<p ng-show="collapsed" style="text-align:justify">{{item.trans}}</p>'+
						  '</div>'
	
	$scope.cancelElem = function(){
		$scope.wysiwyg = '';
		textService.set('');
		textService.setElem('');
		editMode = false;
	}
	var editMode = false;
	var currentIndex = 0;
	$scope.saveElem = function(){
		var dataString = textService.get();
			if(dataString==''){
				var myAlert = $alert({title: langdata.qnoteviewpage[12][langid], content: langdata.qnoteviewpage[13][langid], duration: 3, placement: 'top', type: 'info', show: true});
				return false;
			}
			loader.load();
		if(editMode == false){
			data.push({element: dataString});
		}
		if(editMode == true){
			data.splice(currentIndex, 1,{element: dataString});
		}
		qnoteService.edit(index, headerData, genID, data);
		$scope.wysiwyg = '';
		textService.set('');
		textService.setElem('');
		$scope.items = [];
		$timeout(function(){$scope.loadMore();loader.done();},300);
	}
	$scope.surval = '';$scope.aytval = '';
	$scope.elemAction = function(elem, type) {
		if(!$scope.show){return false}
			currentIndex = elem;
		var confirmPopup = $ionicPopup.confirm({
			title: langdata.qnoteviewpage[16][langid],
			cancelText: langdata.qnoteviewpage[4][langid]
		});
		confirmPopup.then(function(res) {
			if(res) {
				if(type!=null){
					var newElem = data[elem].element;
					textService.setElem(newElem);
					textService.set(newElem);
					editMode = true;
					$scope.addElement();
					$ionicScrollDelegate.scrollTop();
				}
				if(type==null){
					var sur = data[elem].isur;
					var ayt = data[elem].iayt;
					$scope.surval = parseInt(sur)+1;$scope.aytval = parseInt(ayt)+1;
					editAya = true;
					$scope.editAya();
					$ionicScrollDelegate.scrollTop();
				}
			} else {
				textService.setElem('');
				editMode = false;
			}
		});
	}
	$scope.deleteElem = function(i) {
		var confirmPopup = $ionicPopup.confirm({
			title: langdata.qnoteviewpage[17][langid],
			cancelText: langdata.qnoteviewpage[4][langid]
		});
		confirmPopup.then(function(res) {
			if(res) {
				loader.load();
				data.splice(i, 1)
				qnoteService.edit(index, headerData, genID, data);
				$scope.wysiwyg = '';
				$scope.items = [];
				$timeout(function(){$scope.loadMore();loader.done();},300);
			} else {
			}
		});
	}
	var editAya = false;
	$scope.addAya = function(){
		editAya = false;
		$scope.wysiwyg = '<div class="item"><b>{{menu[7]}}</b></div>'+
						 '<div class="list">'+
							'<label class="item item-input">'+
								'<span class="input-label" >{{menu[8]}}</span>'+
								'<input type="number" ng-model="sur">'+
							'</label>'+
							'<label class="item item-input">'+
								'<span class="input-label">{{menu[9]}}</span>'+
								'<input type="number" ng-model="ayt">'+
							'</label>'+
						 '</div>'+
						'<div style="text-align:right; margin:0 6px 0 0">'+
						'<button class="button button-small icon-left ion-close-circled button-positive" ng-click="cancelElem()">&nbsp;{{menu[4]}}</button>'+
						'&nbsp;&nbsp;<button class="button button-small icon-left ion-briefcase button-balanced" ng-click="saveAya(sur, ayt)">&nbsp;{{menu[5]}}&nbsp;</button></div><br>'
	}
	$scope.editAya = function(){
		$scope.wysiwyg = '<div class="item"><b>{{menu[7]}}</b></div>'+
						 '<div class="list">'+
							'<label class="item item-input">'+
								'<span class="input-label" >{{menu[8]}}</span>'+
								'<input type="number" ng-model="msur" placeholder={{surval}}>'+
							'</label>'+
							'<label class="item item-input">'+
								'<span class="input-label">{{menu[9]}}</span>'+
								'<input type="number" ng-model="mayt" placeholder={{aytval}}>'+
							'</label>'+
						 '</div>'+
						'<div style="text-align:right; margin:0 6px 0 0">'+
						'<button class="button button-small icon-left ion-close-circled button-dark" ng-click="deleteElem('+currentIndex+')">&nbsp;{{menu[3]}}</button>'+
						'&nbsp;&nbsp;<button class="button button-small icon-left ion-close-circled button-positive" ng-click="cancelElem()">&nbsp;{{menu[4]}}</button>'+
						'&nbsp;&nbsp;<button class="button button-small icon-left ion-briefcase button-balanced" ng-click="saveAya(msur, mayt)">&nbsp;{{menu[5]}}&nbsp;</button></div><br>'
	}
	$scope.saveAya = function(x, y){
		if(x==null || y ==null){
			var myAlert = $alert({title: langdata.qnoteviewpage[12][langid], content: langdata.qnoteviewpage[15][langid], duration: 3, placement: 'top', type: 'info', show: true});
			return false;
		}
		if( 1 > x || x > 114 ){
			var myAlert = $alert({title: langdata.qnoteviewpage[12][langid], content: langdata.qnoteviewpage[19][langid], duration: 3, placement: 'top', type: 'info', show: true});
			return false;
		}
		var len = resolveInfo[x-1].ayas;
		if( 1 > y || y > len){
			var myAlert = $alert({title: langdata.qnoteviewpage[12][langid], content: langdata.qnoteviewpage[20][langid]+' '+len+'.', duration: 3, placement: 'top', type: 'info', show: true});
			return false;
		} 
		var sur = x-1;var ayt = y-1;
		//begin push
		loader.load();
		var verseData = resolveAQ[sur].aya[ayt].text;
		var transData = resolveTrans[sur].aya[ayt].text;
		var infonameData = resolveInfo[sur].tname;
		
		str = y.toString();
		var taha = info.taha(str);
		var tahaData = taha;
		if(editAya == false){
			data.push({tname: infonameData, verse: verseData, trans: transData, isur: sur, iayt: ayt, itaha: tahaData});
			qnoteService.edit(index, headerData, genID, data);
		}
		if(editAya == true){
			data.splice(currentIndex, 1, {tname: infonameData, verse: verseData, trans: transData, isur: sur, iayt: ayt, itaha: tahaData});
			qnoteService.edit(index, headerData, genID, data);
		}
		$scope.wysiwyg = '';
		$scope.items = [];
		$timeout(function(){$scope.loadMore();loader.done();},300);
	}
	$scope.scrollTop = function(){
		$ionicScrollDelegate.scrollTop();
	}
})
.controller('textModelCtrl', function($scope, textService) {
	$scope.textModel = textService.getElem();
	
	$scope.$watch(function () {
        return $scope.textModel;
    },
    function (newValue, oldValue) {
        if(newValue == oldValue){return;}
        $scope.textModel = newValue;
		textService.set(newValue);
    }, true);
})
.controller('frontpageCtrl', function($scope, $rootScope, loader, qnoteService, textService, aq, $ionicGesture, $ionicSideMenuDelegate, delegateSideMenu, $cordovaSplashscreen, $timeout, $ionicPlatform, tagService, $window, feature) {
	
	var w = $window.innerWidth; //console.log(w) 
	var h = $window.innerHeight;

	var margin = (w < h ? 50: 20);
	var imgheight = (w < 500 || h < 500 ? 180 : 300); 
	var heighttosmall = (h < 414 ? true : false);
	$scope.margin = margin;
	$scope.imgheight = imgheight;
	$scope.landsmall = heighttosmall;
   
	function tellAngular() {
		var elem = document.getElementById('logoimg');
		scope = angular.element(elem).scope();
		var w = window.innerWidth;
		var h = window.innerHeight;
		var margin = (w < h ? 50: 20);
		var imgheight = (w < 500 || h < 500 ? 180 : 300);
		var heighttosmall = (h < 414 ? true : false);
		scope.$apply(function() {
			scope.margin = margin;
			scope.imgheight = imgheight;
			$scope.landsmall = heighttosmall;
		});
	}
	
	document.addEventListener("DOMContentLoaded", tellAngular, false);
	window.onresize = tellAngular;

	$rootScope.$on('$stateChangeStart', 
	function(event, viewConfig){ 
		loader.load();
	})
	$scope.$on('$viewContentLoaded', 
	function(event){ 
		loader.done();
		
	});
	//init config
	var inittag = tagService.get();
	var initqnote = qnoteService.init();
	delegateSideMenu.set();
	//set version
	localStorage.setItem("version", "v1.0.5");

	setTimeout(function() {
		$cordovaSplashscreen.hide()
	  }, 5000)
	delegateSideMenu.init();
	
	var langdata = [];
	$scope.menuinfo = [];
	var curlang = textService.getMenuLang()
	aq.menuLang().then(function(d) {
		langdata = d.data;
	})
	$scope.$watch(function () {
		return langdata;
	},
	function (newval, oldval) {
		if(newval!=oldval){
			for (var i = 0; i < newval.frontpage.length; i++) {
				if(curlang=='my'){
					$scope.menuinfo[i] = newval.frontpage[i][1];
				} else{
					$scope.menuinfo[i] = newval.frontpage[i][0];
				}
			}
		}
	}, false);
	$ionicPlatform.ready(function () {
		/**
		* this is inappbilling plugin for android, enable it test-build on android device
		*
		*/
        /*
		inappbilling.init(function(resultInit) {
			inappbilling.getPurchases(function(result) {
				//console.log("PURCHASE RESPONSE -> " + JSON.stringify(result));
				purchasedInit = function (){
					var featuresID = ['g_qnote', 'g_search', 'g_quicknav'];
					for ( var i = 0; i < result.length; i++) {
						if(result[i].productId == featuresID[0]) feature.setQF();
						if(result[i].productId == featuresID[1]) feature.setSF();
						if(result[i].productId == featuresID[2]) feature.setQN();
					}
				}
				noneInit = function(){return false};
				var initItems = (result.length != 0 ? purchasedInit() : noneInit());
			}, 
			function(errorPurchases) {
				//console.log("PURCHASE ERROR -> " + errorPurchases);
			});
			}, 
			function(errorInit) {
				//console.log("INITIALIZATION ERROR -> " + errorInit);
			}, 
			{showLog: false},
			["g_qnote", "g_search", "g_quicknav"]);
		*/
    });
	
})
.controller('menuCtrl', function($scope, $rootScope, loader, textService, aq) {
	
	$rootScope.$on('$stateChangeStart', 
	function(event, viewConfig){ 
		loader.load();
	})
	$scope.$on('$viewContentLoaded', 
	function(event){ 
		loader.done();
	});
	var langdata = [];
	var curlang = textService.getMenuLang()
	aq.menuLang().then(function(d) {
		langdata = d.data;
	})
	$scope.menu = [];
	$scope.$watch(function () {
		return langdata;
	},
	function (newval, oldval) {
		if(newval!=oldval){
			for (var i = 0; i < newval.menupage.length; i++) {
				if(curlang=='my'){
					$scope.menu[i] = newval.menupage[i][1];
				} else{
					$scope.menu[i] = newval.menupage[i][0];
				}
			}
		}
	}, false);
	$scope.exitApp = function(){
		navigator.app.exitApp();
	}
})
.controller('aboutCtrl', function($scope, $rootScope, loader, aq, textService, delegateSideMenu) {
	
	var json = [];
	aq.update().then(function(data) {
			var get = '';
			try{
			get = JSON.parse(window.atob(data.data.content));
			}catch(e){
				$scope.fail = data;
				$scope.showfail = true;
				return false
			}
			var len = get.update.length;
			json = get.update[len-1];	
		});
	$rootScope.$on('$stateChangeStart', 
	function(event, viewConfig){ 
		loader.load();
		delegateSideMenu.set();
	})
	$scope.$on('$viewContentLoaded', 
	function(event){ 
		loader.done();
		
	});
	
	var langdata = [];
	var curlang = textService.getMenuLang();
	var langid = 0;
	if(curlang=='my'){langid = 1};
	aq.menuLang().then(function(d) {
		langdata = d.data;
	})
	$scope.menu = [];
	$scope.$watch(function () {
		return langdata;
	},
	function (newval, oldval) {
		if(newval!=oldval){
			for (var i = 0; i < newval.aboutpage.length; i++) {
				if(curlang=='my'){
					$scope.menu[i] = newval.aboutpage[i][1];
				} else{
					$scope.menu[i] = newval.aboutpage[i][0];
				}
			}
		}
	}, false);
	
	var cur_version = localStorage.getItem("version");
	$scope.$watch(function () {
        return json
    },
    function (newValue, oldValue) {
		if(oldValue!=newValue){
			$scope.done = true;
			///// change != on production
			if(cur_version!=json.version){
				$scope.dlthis = true;
			}
		}
		$scope.update = json;
		$scope.name = json.name;
		$scope.version = json.version;
		$scope.core = json.core;
		$scope.date = json.date;
		$scope.features = json.features;
		len = json.entries.length;
		data = json.entries;
		
    }, true);
	var len = 0;
	var data = [];
	$scope.items = [];
	$scope.loadMore = function() {	
		var dataArray = [];
		var l = $scope.items.length
		for ( var i = l; i < l+1; i++) {
				if (i == len || data == null){
					$scope.$broadcast('scroll.infiniteScrollComplete');
					return false;
				}
				v = data[i];
				v['logindex'] = i+1;
				dataArray.push(v);
		}
		$scope.items = $scope.items.concat(dataArray);
		$scope.$broadcast('scroll.infiniteScrollComplete');
		
		var info;
		$scope.switcher = function(){
			info=!info;
			if(info){
			$scope.build =  
							'<div class="item" style="text-align:center" ng-show="dlthis"><button class="button button-small button-balanced" ng-click="goGooglePlay()">Download Update</button></div>'+
							'<div class="item"><p>Name: <b>{{name}} </b></p></div>'+
							'<div class="item"><p id="qnote">Version: <i>{{version}}</i></p></div>'+
							'<div class="item"><p>Core: <i>{{core}}</i></p></div>'+
							'<div class="item"><p>Date Release: {{date}}</p></div>'+
							'<div class="item item-text-wrap"><p>Features Added: {{features}}</p></div>'+
							'<h2 class="item"><b>Log Entries</b></h2>'+
							'<div class="item">'+
								  '<li class="item-text-wrap" ng-repeat="item in items"><p style="margin-bottom:8px">{{item.log}}</p></li>'+
							'</div>'
			}
			if(!info){
			$scope.build = 	'<div class="item item-text-wrap"><p style="font-style: italic;font-size:12px;color:blue">'+
							'For support, request, suggestion or paypal donation;<br><br>hottincup@gmail.com<br><br>When sending request pls use "qmeta" as leading title. If you want to contribute to the development, you can check <a href="https://github.com/syarul/qmeta" ng-click=externalLink()>https://github.com/syarul/qmeta</a> for more info. Currently need localization for menu language.'+
							'</p></div>'
			}
		}
		$scope.switcher();
		$scope.externalLink = function(){
			window.open('https://github.com/syarul/qmeta', '_system', 'location=yes');
		}
		$scope.goGooglePlay = function(){
			window.open('https://play.google.com/store/apps/details?id=com.ionicframework.qmeta996726', '_system', 'location=yes');
		}
	};
})
