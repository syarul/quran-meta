/*
* Quran Meta Angularjs factories
* (c) 2014 Shahrul Nizam Selamat
* link: https://play.google.com/store/apps/details?id=com.ionicframework.qmeta996726&ah=-KyIkUp843r_Eetf-63gCx-XXVY
*/
angular.module('factories', [ 'mgcrea.ngStrap.aside'])
.service('jsondata', function() {
	
	var info = './lib/json/qurandata.en';
	
	var quranInfoList = [
						{data: "./lib/json/qurandata.en", id: 0},
						{data: "./lib/json/qurandata.id", id: 1}
					]
						
	if(localStorage.st_langMenu == null){
		info = quranInfoList[0].data;
		
		} else {
			info = quranInfoList[localStorage.st_idMenu].data;
		}
		
	var quran = './lib/json/aq.simple'; // alquran simple
		
    return {
       getinfo: function(){
			return info;
		},
		getaq: function(){
			return quran;
        }
    }  
})
.service('initgen', function(qnoteService) {
	var concat = localStorage.st_keygen;
	if (concat == null){
		concat = qnoteService.gen();
		localStorage.setItem('st_keygen', concat);
	}
    return {
		init: function(){
			return concat;
		}
    }  
})
.service('feature', function() {
	//var keygenerator = localStorage.st_keygen;
	var qw_3Df1={_keyStr:'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',dwda3_1_:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=qw_3Df1._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},qqM_12:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=qw_3Df1._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};
	
	var msearch = 'single';
	var qnav = 'lim';
	var qnote = 'lim';

	var showBuyButton = true;
    return {
		getSF: function(){
			return msearch;
		},
		setSF: function(){
			msearch = 'multi';
        },
		getQN: function(){
			return qnav;
		},
		setQN: function(){
			qnav = 'all';
        },
		getQF: function(){
			return qnote;
		},
		setQF: function(){
			qnote = 'all';
        },
		e: function(vv){
			var vvx = qw_3Df1.dwda3_1_(vv);
			return vvx;
        },
		d: function(yy){
			var yyw = qw_3Df1.qqM_12(yy);
			return yyw;
        }
    }  
})
.factory('aq',['$http', '$q', function($http, $q, jsondata){
	var aq = {
		update: function() {
			var deferred = $q.defer(),
				httpPromise = $http.get('https://api.github.com/repos/syarul/qmeta/contents/qmeta-update.json');
				
				httpPromise.then(function(response){
					deferred.resolve(response);
					}, function (error){
						var err = 'fetch update fail, check your internet connection'
						return err;
					});

				return deferred.promise
		},
		test: function() {
			var deferred = $q.defer(),
				httpPromise = $http.get('http://localhost:1337/user');
				
				httpPromise.then(function(response){
					deferred.resolve(response);
					}, function (error){
						var err = 'fetch update fail, check your internet connection'
						return err;
					});

				return deferred.promise
		},
		menuLang: function() {
			var deferred = $q.defer(),
				httpPromise = $http.get('./lib/json/menulang.enmy.json');
				
				httpPromise.then(function(response){
					deferred.resolve(response);
					}, function (error){
						console.log('factory.error');
					});

				return deferred.promise
		}
	};
	return aq;
}])
.factory('info',['$http', '$q', function($http, $q, $scope){
  	var data = null;
	return {
		taha: 
		//var numAr = ["&#1776;","&#1777;","&#1778;","&#1779;","&#1780;","&#1781;","&#1782;","&#1783;",  ]
		function cTaha(input){
			var output = "";
			var numr = [];
			for (var ar = 0; ar < 10; ar++) {
				numr[ar] = '&#17'+(76+ar)+';'
			}
			for (var i = 0; i < input.length; i++){
				var letter = input.charAt(i);
				output += numr[letter];    	  
			}
			return output;                   
		},
		sw: function(x, y){
			if (y=='sur'){
				switcher = '<button class="button button-block button-dark" ng-click="quickSurVal('+x+')">'+x+'</button>';
				
			}
			if (y=='ayt'){
				switcher = '<button class="button button-block button-dark" ng-click="quickAytVal('+x+')">'+x+'</button>';
			}
			return switcher;
		}, //menuArabicFont
		mA: function() {
			var arabicFont = [
				{ title: 'Amiri Naskh', id: 0, css: 'amiri-compress' },
				{ title: 'Droid Arabic Kufi', id: 1, css: 'kufi-compress' },
				{ title: 'Droid Arabic Naskh', id: 2, css: 'droid-compress' },
				{ title: 'KFGQPC Uthman Taha', id: 3, css: 'taha-compress' },
				{ title: 'Scheherazade', id: 4, css: 'scheh-compress' }
			  ];
			if (localStorage.st_idArabicFont == null){
				var fontstyle = arabicFont[0].css
			} else{
				var fontstyle = arabicFont[localStorage.st_idArabicFont].css
			}	
			return fontstyle;
		},
		fontStyle: function() {
			var arabicFont = [
				{ title: 'Amiri Naskh', id: 0, css: 'amiri' },
				{ title: 'Droid Arabic Kufi', id: 1, css: 'kufi' },
				{ title: 'Droid Arabic Naskh', id: 2, css: 'droid' },
				{ title: 'KFGQPC Uthman Taha', id: 3, css: 'taha' },
				{ title: 'Scheherazade', id: 4, css: 'scheherazade' }
			  ];
			if (localStorage.st_ayaFont == null){
				var fontstyle = arabicFont[0].css
			} else{
				for (var i = 0; i < 5; i++) {
					if(localStorage.st_ayaFont==arabicFont[i].title){
						var fontstyle = arabicFont[i].css;
					}
				}
			}	
			return fontstyle;
		},
		trans: function() {
			var transArray = [
				{ title: 'English - A.J. Arberry', id: 0, jsonstr: './lib/json/en.arberry' },
				{ title: 'Indonesian', id: 1, jsonstr: './lib/json/id.indonesia' },
				{ title: 'Malay - Basmeih', id: 2, jsonstr: './lib/json/my.basmeih'}
			  ];
			 var t = transArray[0].jsonstr;
			 for (var i = 0; i < transArray.length; i++) {
				if (localStorage.st_idTrans == transArray[i].id){
					t = transArray[i].jsonstr;
				} 
			}
			return t
		}
	}
}])
.directive('dynamic', function ($compile) {
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, ele, attrs) {
      scope.$watch(attrs.dynamic, function(html) {
        ele.html(html);
        $compile(ele.contents())(scope);
      });
    }
  };
})
.directive('restrict', function($parse) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, iElement, iAttrs, controller) {
            scope.$watch(iAttrs.ngModel, function(value) {
                if (!value) {
                    return;
                }
                $parse(iAttrs.ngModel).assign(scope, value.toLowerCase().replace(new RegExp(iAttrs.restrict, 'g'), '').replace(/\s+/g, ' '));
            });
        }
    }
})
.filter('trusted', ['$sce', function($sce){
	return function(text) {
		return $sce.trustAsHtml(text);
	};
}])
.config(function($asideProvider) {
  angular.extend($asideProvider.defaults, {
    container: 'body',
    html: true
  });
})
.directive('asideMenu', function(){
  return {
	restrict: 'A',
	scope: true,
	template:'	<h4>{{menu[1]}}</h4>'+
			 '	<ul class="item-icon-right">'+
			 '		<li ng-click="ascending()" class="icon-small ion-document-text"><span>{{menu[2]}}</span></li>'+
			 '		<li ng-click="descending()" class="icon-small ion-document-text"><span>{{menu[3]}}</span></li>'+
			 '		<li ng-click="revOrder()" class="icon-small ion-document-text"><span>{{menu[4]}}</span></li>'+
			 '		<li ng-click="ayasCountLow()" class="icon-small ion-document-text"><span>{{menu[5]}}</span></li>'+
			 '		<li ng-click="ayasCountHigh()" class="icon-small ion-document-text"><span>{{menu[6]}}</span></li>'+
			 '	</ul>'
  }
})
.directive('asideSura', function(){
  return {
	restrict: 'A',
	scope: true,
	template:'	<h4>{{menu[0]}}</h4>'+
			 '	<ul class="item-icon-right">'+
			 '		<li ng-click="viewVerse()" class="icon-small ion-document-text"><span>{{menu[1]}}</span></li>'+
			 '		<li ng-click="viewTrans()" class="icon-small ion-document-text"><span>{{menu[2]}}</span></li>'+
			  '		<li ng-click="viewSync()" class="icon-small ion-document-text"><span>{{menu[3]}}</span></li>'+
			  '		<li id="noCursor" dynamic="asideInfo" class="icon-small ion-information-circled"></li>'+
			 '	</ul>'
  }
})
.directive('asideResult', function(){
  return {
	restrict: 'A',
	scope: true,
	template:'	<h4 class="icon-small ion-information-circled"> {{asidemenu}}</h4>'+
			 '	<ul class="item-icon-right">'+
			 '		<li dynamic="asideInfo"></li>'+
			 '	</ul>'
  }
})
.directive('back', ['$window', function($window) {
	return {
		restrict: 'A',
		link: function (scope, elem, attrs) {
			elem.bind('click', function () {
				$window.history.back();
			});
		}
	};
}])
.service('sharedProperties', function () {	
	var share = [
				{ index: 0, arg: '1' }, //sura selection
				{ index: 1, arg: 'ascending' }, // argument suras list 
				{ index: 2, arg: 'sync' }, // argument sura display mode
				{ index: 3, arg: '1' }, // argument search sura index
				{ index: 4, arg: '1' } // argument search sura ayat index
			  ];
	return {
		getProperty: function () {
			return share;
		},
		setProperty: function(x, value) {
			share[x].arg = value;
		}
	};
})
.service('tagService', function () {	
	var setup = [
				{ index: 0, sura: '1', aya: '1'}
			   ];
			
	var tagJSON = localStorage.getItem('st_tagJSON');
	
	if (tagJSON == null) {
		localStorage.setItem('st_tagJSON', JSON.stringify(setup));
	} 
	
	var tagData = JSON.parse(tagJSON);
	
	return {
		get: function () {
			return tagData;
		},
		add: function(suraId, ayaId) {
			newLen = tagData.length;
			tagData.push({index: newLen, sura: suraId, aya: ayaId})
			localStorage.setItem('st_tagJSON', JSON.stringify(tagData));
		},
		remove: function(indexId) {
			tagData.splice(indexId, 1);
			localStorage.setItem('st_tagJSON', JSON.stringify(tagData));
		}
	};
})
.service('loadSearchData', function(){
	var data = [];
	return {
		get: function () {
			return data;
		},
		set: function(value) {
			data = value;
		}
	};
})
.service('qnoteService', function ($cordovaFile, $q, feature) {	
	function IDGenerator() {
		 this.length = 8;
		 this.timestamp = +new Date;
		 var _getRandomInt = function( min, max ) {
			return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
		 }
		 this.generate = function() {
			 var ts = this.timestamp.toString();
			 var parts = ts.split( "" ).reverse();
			 var id = "";
			 
			 for( var i = 0; i < this.length; ++i ) {
				var index = _getRandomInt( 0, parts.length - 1 );
				id += parts[index];	 
			 }
			 return id;
		 }	 
	 }
	var generator = new IDGenerator();
	
	function getDate() {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		if(dd<10) {dd='0'+dd} 
		if(mm<10) {mm='0'+mm} 

		date = yyyy+'/'+mm+'/'+dd;
		return date;
	}
	var getCurrentDate = getDate();

	var noteHeader = [
	{ name: 'Sample Note', id: generator.timestamp, created: getCurrentDate, counter: 0}
			         ];
	var db = [{"element":"<h1>H1-EDITED</h1><h2>H2-EDITED</h2><h3>H3-EDITED</h3><h4>H4-EDITED</h4><p><b>first line elements this</b> element<i> is wysiwyg</i></p><div><ul><li>list</li><li>list</li></ul><ol><li>list</li><li>list</li><li>list</li></ol></div>","display":"none","index":0},{"element":"<h1>2ND-EDITED</h1><div>this is new line</div>","index":1,"$$hashKey":"00U","display":"none"},{"element":"<h1>3RD-EDITED</h1><div>its 3rd element</div>","index":2,"$$hashKey":"00L","display":"none"},{"element":"<h1>5TH ELEM</h1><div>try me</div>","index":3,"$$hashKey":"00W","display":"none"},{"tname":"Al-Faatiha","verse":"بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ","trans":"In the Name of God, the Merciful, the Compassionate","isur":0,"iayt":0,"itaha":"&#1777;","index":4}];

	var header = 'qmeta-appdata/qnote-header.json';
	function readHeader(){
		var deferred = $q.defer(),
		filePromise = $cordovaFile.readAsText(header);
		filePromise.then(function(d) {
			var e = feature.d(d);
			deferred.resolve(JSON.parse(e));
		}, function(err) {
			console.log('read failed')
		});
		return deferred.promise
	}
	function writeHeader(data){
		var jsonStr = JSON.stringify(data);
		var data64 = feature.e(jsonStr);
		var blob = new Blob([data64], {type: 'application/json'});
		$cordovaFile.writeFile(header, blob, 0).then(function(fileEntry) {
			//success
		}, function(err) {
			console.log('error, write failed');
		});
	}
	function createDB(genID){
		var jsonEmpty = "[]";
		var blobDB = new Blob([jsonEmpty], {type: 'application/json'});
		$cordovaFile.writeFile('qmeta-appdata/st_ndb'+genID+'.json', blobDB, 0).then(function(fileEntry) {
			//success
		}, function(err) {
			console.log('error, create db failed');
		});
	}
	function writeDB(genID, data){
		var jsonStr = JSON.stringify(data);
		var blob = new Blob([jsonStr], {type: 'application/json'});
		$cordovaFile.writeFile('qmeta-appdata/st_ndb'+genID+'.json', blob, 0).then(function(fileEntry) {
			//success
		}, function(err) {
			console.log('error, write db failed');
		});
	}
	function readDB(genID){
		var deferred = $q.defer(),
		filePromise = $cordovaFile.readAsText('qmeta-appdata/st_ndb'+genID+'.json');
		filePromise.then(function(d) {
			deferred.resolve(JSON.parse(d));
		}, function(err) {
			console.log('read failed')
		});
		return deferred.promise
	}
	function removeDB(genID){
		$cordovaFile.removeFile('qmeta-appdata/st_ndb'+genID+'.json').then(function(fileEntry) {
			//success
		}, function(err) {
			console.log('error, write db failed');
		});
	}

	var shareId = '';
	
	return {
		init: function (){
			$cordovaFile.readAsText(header).then(function(fileEntry) {
				//alert('file exist');
			}, function(err) {
				$cordovaFile.createDir("qmeta-appdata", false).then(function (result) {
					var jsonStr = JSON.stringify(noteHeader);
					var data64 = feature.e(jsonStr);
					var blob = new Blob([data64], {type: 'application/json'});
					var gen = noteHeader[0].id;
					$cordovaFile.writeFile(header, blob, 0).then(function(fileEntry) {
						//success
						var jsonSample = JSON.stringify(db);
						var blobDB = new Blob([jsonSample], {type: 'application/json'});
						$cordovaFile.writeFile('qmeta-appdata/st_ndb'+gen+'.json', blobDB, 0).then(function(fileEntry) {
							//success
						}, function(err) {
						  //alert('error, write failed')
						});
					}, function(err) {
					  //alert('error, write failed')
					});
				}, function (err) {
					//alert('create dir error');
				});
			}); 
		},
		get: function () {
			return readHeader();
		},
		getData: function (genID) {
			return readDB(genID);
		},
		add: function(filename, oldheader) {
			var gen = new IDGenerator();
			var date = getDate();
			oldheader.push({name: filename, id: gen.timestamp, created: date})
			writeHeader(oldheader);
			createDB(gen.timestamp);
		},
		remove: function(headerData, genID) {
			writeHeader(headerData);
			removeDB(genID);
		},
		edit: function(index, headerData, genID, data) {
			var date = getDate();
			headerData[index].created = date;
			writeHeader(headerData);
			writeDB(genID, data);
		},
		editFileName: function(newFileName) {
			writeHeader(newFileName);
		},
		share:  function(id) {
			shareId = id;
		},
		getShare:  function() {
			return shareId;
		},
		gen: function(){
			var g = new IDGenerator();
			return g.timestamp;
		}
	};
})
.service('textService', function () {	
	var data = '';
	var elemData = '';
	var menuLang = 'my';
	if(localStorage.st_langMenu == null){
		menuLang = 'en';
		} else {
			menuLang = localStorage.st_codeMenu;
		}
	var init = false;
	return {
		get: function () {
			return data;
		},
		set: function(value) {
			data = value;
		},
		setElem: function(value) {
			elemData = value;
		},
		getElem: function() {
			return elemData;
		},
		setInit: function(){
			init = true;
		},
		getInit: function(){
			return init;
		},
		setMenuLang: function(value){
			menuLang = value;
		},
		getMenuLang: function(){
			return menuLang;
		}
	};
})
.factory('loader', function($ionicLoading) {

    return {
       load: function(){
		
		$ionicLoading.show({
				template: '<i class="spinner-c"></i>',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 400,
				showDelay: 0
			  });
		},
		done: function(){
            $ionicLoading.hide();
        }
    }  
})
.factory('delegateSideMenu', function ($ionicPlatform, $ionicSideMenuDelegate, $state) {
	var condition = false;
	var state = ['app.surahindex', 'app.quickNavigation', 'app.qnote', 'app.settings', 'app.about', 'app.frontpage'];
	
	return {
		set: function(){
			condition = false;
		},
		init: function(){
			$ionicPlatform.registerBackButtonAction(function (event) {
				for (var i = 0; i < state.length; i++) {
					if($state.current.name == state[i] && condition == false){
					   $ionicSideMenuDelegate.toggleLeft();
					   condition = true;
					   return false;
					}
				}
				if(condition == true){
					navigator.app.exitApp();
				} else {
					navigator.app.backHistory();
					//navigator.app.exitApp();
				}
			}, 100);
		}
	}
})
.directive('focusOut', function($timeout, $parse) {
  
  return {
    link: function(scope, element, attrs) {
	  var model = $parse(attrs.focusOut);
	  var value = false;
      scope.$watch(model, function(value) {
        //console.log('value=',value);
        if(value === true) { 
          $timeout(function() {
            element[0].blur(); 
          });
        }
      }, true);
      element.bind('focus', function () {
            scope.$apply(attrs.focusOut = false);
      });
    }
  };
})
.directive('addSystem', function($compile){
  return {
		restrict: 'A',
		terminal:true,
		link: function(scope, element, attr)  {
			scope.$watch(function () {
				return element;
			},
			function (n) {
				var ele = []
				ele = n.find("a");
				ele.attr('hyper-link', '');
				n.removeAttr('add-system');
				$compile(ele)(scope);
			}, false);
		}
	}
})
.directive('hyperLink', function($compile){
  return {
		restrict: 'A',
		terminal:true,
		link: function(scope, element, attr)  {
			var ele = element;
			ele.attr('onClick', 'window.open("'+ele[0].href+'", "_system", "location=yes");return false;');
			var fn = $compile(ele);
			return function(scope){
			fn(scope);
			}
		}
	}
})