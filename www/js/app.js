// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

	.state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'menuCtrl'
    })
    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html",
		  resolve: {
				resolveTrans: function($http, info) {
				var trans = [];
				return $http.get(info.trans() +'.json').then(function(r){	
						trans = r.data.quran;
						return trans;
					});
				}	
		  },
		  controller: 'searchCtrl'
        }
      }
    })
	.state('app.searchLink', {
      url: "/search/:suraIndex",
      views: {
        'menuContent' :{
          templateUrl: "templates/searchLink.html",
		  resolve: {
				resolveInfo: function($http, sharedProperties, jsondata) {
				var info = [];
				return $http.get(jsondata.getinfo()+'.json').then(function(r){	
						var currentSelection = sharedProperties.getProperty()[3].arg;
						info = r.data.quran.suras.sura[currentSelection-1]
						return info;
					});
				},
				resolveAQ: function($http, sharedProperties, jsondata) {
				var aq = [];
				return $http.get(jsondata.getaq()+'.json').then(function(r){			
						var currentSelection = sharedProperties.getProperty()[3].arg;
						aq = r.data.quran.sura[currentSelection-1]
						return aq;
					});
				},
				resolveTrans: function($http, sharedProperties, info) {
				var trans = [];
				return $http.get(info.trans() +'.json').then(function(r){
						var currentSelection = sharedProperties.getProperty()[3].arg;
						trans = r.data.quran.sura[currentSelection-1]
						return trans;
					});
				}	
		  },
		  controller: 'searchResult'
        }
      }
    })
    .state('app.surahindex', {
      url: "/surahindex",
      views: {
        'menuContent' :{
          templateUrl: "templates/surahindex.html",
		   resolve: {
			resolveInfo: function($http, sharedProperties, jsondata) {
				var info = [];
				return $http.get(jsondata.getinfo()+'.json').then(function(r){
						info = r.data.quran.suras
						return info;
					});
				}
		  },
		  controller: 'rangeListCtrl'
        }
      }
    })
	.state('app.suraSingle', {
      url: "/sura/:suraIndex",
      views: {
        'menuContent' :{
          templateUrl: "templates/surah.html",
          resolve: {
			  resolveInfo: function($http, sharedProperties, jsondata) {
				var info = [];
				return $http.get(jsondata.getinfo()+'.json').then(function(r){
						var currentSelection = sharedProperties.getProperty()[0].arg;
						info = r.data.quran.suras.sura[currentSelection-1]
						return info;
					});
				},
				resolveAQ: function($http, sharedProperties, jsondata) {
				var aq = [];
				return $http.get(jsondata.getaq()+'.json').then(function(r){
						
						var currentSelection = sharedProperties.getProperty()[0].arg;
						aq = r.data.quran.sura[currentSelection-1]
						return aq;
					});
				},
				resolveTrans: function($http, sharedProperties, info) {
				var trans = [];
				return $http.get(info.trans() +'.json').then(function(r){
						var currentSelection = sharedProperties.getProperty()[0].arg;
						trans = r.data.quran.sura[currentSelection-1]
						return trans;
					});
				}	
		  },
          controller: 'suraDataCtrl'
        }
      }
    })
	.state('app.quickNavigation', {
      url: "/quicknavigation",
      views: {
        'menuContent' :{
          templateUrl: "templates/quicknavigation.html",
		  resolve: {
			  resolveInfo: function($http, jsondata) {
				var info = [];
				return $http.get(jsondata.getinfo()+'.json').then(function(r){
						info = r.data.quran.suras.sura;
						return info;
					});
				}
		  },
          controller: 'quickNavCtrl'
        }
      }
    })
	.state('app.tags', {
      url: "/tags",
      views: {
        'menuContent' :{
          templateUrl: "templates/tags.html",
		  resolve: {
			  resolveInfo: function($http, jsondata) {
				var info = [];
				return $http.get(jsondata.getinfo()+'.json').then(function(r){
						info = r.data.quran.suras.sura;
						return info;
					});
				},
			  resolveAQ: function($http, sharedProperties, jsondata) {
				var aq = [];
				return $http.get(jsondata.getaq()+'.json').then(function(r){
						aq = r.data.quran.sura
						return aq;
					});
				},
			  resolveTrans: function($http, sharedProperties, info) {
				var trans = [];	
				return $http.get(info.trans() +'.json').then(function(r){
						trans = r.data.quran.sura
						return trans;
					});
				}
		  },
          controller: 'tagsCtrl'
        }
      }
    })
	.state('app.qnote', {
      url: "/qnote",
      views: {
        'menuContent' :{
          templateUrl: "templates/qnote.html",
		  controller: 'qnoteCtrl'
        }
      }
    })
	.state('app.qnoteview', {
      url: "/qnote/:qnoteIndex",
      views: {
        'menuContent' :{
          templateUrl: "templates/qnoteView.html",
		  resolve: {
			  resolveInfo: function($http, jsondata) {
				var info = [];
				return $http.get(jsondata.getinfo()+'.json').then(function(r){
						info = r.data.quran.suras.sura;
						return info;
					});
				},
			  resolveAQ: function($http, sharedProperties, jsondata) {
				var aq = [];
				return $http.get(jsondata.getaq()+'.json').then(function(r){
						aq = r.data.quran.sura
						return aq;
					});
				},
			  resolveTrans: function($http, sharedProperties, info) {
				var trans = [];	
				return $http.get(info.trans() +'.json').then(function(r){
						trans = r.data.quran.sura
						return trans;
					});
				}
		  },
		  controller: 'qnoteViewCtrl'
        }
      }
    })
	.state('app.settings', {
      url: "/settings",
      views: {
        'menuContent' :{
          templateUrl: "templates/settings.html"
        }
      }
    })
	.state('app.about', {
      url: "/about",
      views: {
        'menuContent' :{
          templateUrl: "templates/about.html",
		  controller: 'aboutCtrl'
        }
      }
	 })
	.state('app.frontpage', {
      url: "/frontpage",
      views: {
        'menuContent' :{
          templateUrl: "templates/frontpage.html",
		  controller: 'frontpageCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/frontpage');
});

