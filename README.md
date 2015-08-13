# Introduction
This is a full feature Quran translation with advance search, custom note editor with ayas tag and social sharing build on top of [Ionic Framework](http://ionicframework.com/), visit the [googleplay](https://play.google.com/store/apps/details?id=com.ionicframework.qmeta996726) to check out the published version of this.

#Installation
This is quick setup how to run this web-app.

Install the default ionic framework, there's a guide on their offical page.
```
ionic start qmeta sidemenu
cd qmeta
```
Delete these default files from the ionic packages.
```
.gitignore
bower.json 
config.xml
package.json
www folder
```
Once done,
```
git init
git remote add origin https://github.com/syarul/quran-meta
git fetch
bower & npm install
```

Install this additional cordova plugins.

[AndroidInAppBilling](https://github.com/poiuytrez/AndroidInAppBilling)

[Cordova File](https://github.com/apache/cordova-plugin-file)

[Cordova Inappbrowser](https://github.com/apache/cordova-plugin-inappbrowser)

[Cordova SocialSharing](https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin)


For quick test on browser simply run
```
ionic serve
```

#Additional Info

Inside www/css there are two additional css files spinner.css and loader.css unused by default. This css are meant to replace the odd behaving loading spinner from ionic.bundle.js file. To used them you need to hack this file.

#Contribution

Feel free to drop anything. [Tanzil.net](http://tanzil.net/trans/) has more translations, but ony downloadable as txt files if you need them converted into json let me know of it.
