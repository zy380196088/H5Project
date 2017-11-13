/**
 * Created by zhouyu on 2017/7/11.
 */

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(locationSuccess, locationError, {
      // 指示浏览器获取高精度的位置，默认为false
      enableHighAcuracy: true,
      // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
      timeout: 5000,
      // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
      maximumAge: 3000
    });
  } else {
    alert("Your browser does not support Geolocation!");
  }
}

function locationSuccess(position) {
  var lat = position.coords.latitude; //纬度
  var lag = position.coords.longitude; //经度
  alert('纬度:' + lat + ',经度:' + lag);
  var coords = position.coords;
  var latlng = new google.maps.LatLng(
      // 维度
      coords.latitude,
      // 精度
      coords.longitude
  );
  var myOptions = {
    // 地图放大倍数
    zoom: 12,
    // 地图中心设为指定坐标点
    center: latlng,
    // 地图类型
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  // 创建地图并输出到页面
  var myMap = new google.maps.Map(
      document.getElementById("map"), myOptions
  );
  // 创建标记
  var marker = new google.maps.Marker({
    // 标注指定的经纬度坐标点
    position: latlng,
    // 指定用于标注的地图
    map: myMap
  });
  //创建标注窗口
  var infowindow = new google.maps.InfoWindow({
    content: "您在这里<br/>纬度：" +
    coords.latitude +
    "<br/>经度：" + coords.longitude
  });
  //打开标注窗口
  infowindow.open(myMap, marker);

}

function locationError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("定位失败,用户拒绝请求地理定位");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("定位失败,位置信息是不可用");
      break;
    case error.TIMEOUT:
      alert("定位失败,请求获取用户位置超时");
      break;
    case error.UNKNOWN_ERROR:
      alert("定位失败,定位系统失效");
      break;
  }
}

getLocation();


(function (window, undefined) {
  function commonFn() {
    this.loadPage = function (args) {
      var _container = args.container;//容器
      var pageUrl = args.pageUrl;//页面路径
      var pageScript = args.pageScript;//页面对应的js文件
      var onLoaded = args.onLoaded;//页面记载完成后回调函数
      $.ajax({
        url: pageUrl,
        type: 'GET',
        dataType: 'html',
        timeout: 10000,
        success: function (res) {
          //加载html页面
          _container.append(res);
          // 加载js文件
          var pageScriptTmp = document.createElement("script");
          pageScriptTmp.setAttribute('type', 'text/javascript');
          pageScriptTmp.setAttribute("src", pageScript);
          var documentHead = document.head;
          if (documentHead == undefined) {
            documentHead = document.getElementsByTagName("head")[0];
          }
          documentHead.appendChild(pageScriptTmp);
          //js脚本加载完成后回调函数
          pageScriptTmp.onload = pageScriptTmp.onreadystatechange = function () {
            if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
              onLoaded();
            }
          }
        },
        error: function () {
          alert('页面出错了');
        }
      });
    }
  }

  var commonFnObj = new commonFn();
  window.$commonObj = commonFnObj;
})(window);
//
// $commonObj.loadPage({
//   container: '',//模块容器【jquery对象】
//   pageUrl: '',//模块路径
//   pageScript: '',//模块对应的脚本文件
//   onLoaded: ''//模块加载完成后回调
// })


function loadingFn() {
  var loadingHtml = '<div class="loading"></div>';
  $('body').append(loadingHtml);
  document.onreadystatechange = function () {
    console.log(document.readyState);
    if (document.readyState == "complete") {
      $(".loading").fadeOut();
    }
  }
}

loadingFn();

function checkBrowser() {
  var browser = {
    versions: function () {
      var u = navigator.userAgent, app = navigator.appVersion;
      return {   //移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
      };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  };

  if (browser.versions.mobile) {//判断是否是移动设备打开
    var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      //在微信中打开
    }
    if (ua.match(/WeiBo/i) == "weibo") {
      //在新浪微博客户端打开
    }
    if (ua.match(/QQ/i) == "qq") {
      //在QQ空间打开
    }
    if (browser.versions.ios) {
      //是否在IOS浏览器打开
    }
    if(browser.versions.android){
      //是否在安卓浏览器打开
    }
  } else {
    //否则就是PC浏览器打开
  }

}