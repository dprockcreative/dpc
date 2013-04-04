var mfMobile = window.mfMobile||{};

mfMobile.Lang = {
    welcome_1: "Swipe to learn more",
    welcome_2: "Second screen",
    end:''
};

/* mfQuery 1.0 based on Zepto 1.0 - zeptojs.com/license */
!function(a){String.prototype.trim===a&&(String.prototype.trim=function(){return this.replace(/^\s+/,'').replace(/\s+$/,'')}),Array.prototype.reduce===a&&(Array.prototype.reduce=function(b){if(this===void 0||this===null)throw new TypeError;var c=Object(this),d=c.length>>>0,e=0,f;if(typeof b!='function')throw new TypeError;if(d==0&&arguments.length==1)throw new TypeError;if(arguments.length>=2)f=arguments[1];else do{if(e in c){f=c[e++];break}if(++e>=d)throw new TypeError}while(!0);while(e<d)e in c&&(f=b.call(a,f,c[e],e,c)),e++;return f})}();mfMobile.element=function(){function A(a){return v.call(a)=='[object Function]'}function B(a){return a instanceof Object}function C(b){var c,d;if(v.call(b)!=='[object Object]')return!1;d=A(b.constructor)&&b.constructor.prototype;if(!d||!hasOwnProperty.call(d,'isPrototypeOf'))return!1;for(c in b);return c===a||hasOwnProperty.call(b,c)}function D(a){return a instanceof Array}function E(a){return typeof a.length=='number'}function F(b){return b.filter(function(b){return b!==a&&b!==null})}function G(a){return a.length>0?[].concat.apply([],a):a}function H(a){return a.replace(/::/g,'/').replace(/([A-Z]+)([A-Z][a-z])/g,'$1_$2').replace(/([a-z\d])([A-Z])/g,'$1_$2').replace(/_/g,'-').toLowerCase()}function I(a){return a in i?i[a]:i[a]=new RegExp('(^|\\s)'+a+'(\\s|$)')}function J(a,b){return typeof b=='number'&&!k[H(a)]?b+'px':b}function K(a){var b,c;return h[a]||(b=g.createElement(a),g.body.appendChild(b),c=j(b,'').getPropertyValue('display'),b.parentNode.removeChild(b),c=='none'&&(c='block'),h[a]=c),h[a]}function L(b,d){return d===a?c(b):c(b).filter(d)}function M(a,b,c,d){return A(b)?b.call(a,c,d):b}function N(a,b,d){var e=a%2?b:b.parentNode;e?e.insertBefore(d,a?a==1?e.firstChild:a==2?b:null:b.nextSibling):c(d).remove()}function O(a,b){b(a);for(var c in a.childNodes)O(a.childNodes[c],b)}var a,b,c,d,e=[],f=e.slice,g=window.document,h={},i={},j=g.defaultView.getComputedStyle,k={'column-count':1,columns:1,'font-weight':1,'line-height':1,opacity:1,'z-index':1,zoom:1},l=/^\s*<(\w+|!)[^>]*>/,m=[1,3,8,9,11],n=['after','prepend','before','append'],o=g.createElement('table'),p=g.createElement('tr'),q={tr:g.createElement('tbody'),tbody:o,thead:o,tfoot:o,td:p,th:p,'*':g.createElement('div')},r=/complete|loaded|interactive/,s=/^\.([\w-]+)$/,t=/^#([\w-]+)$/,u=/^[\w-]+$/,v={}.toString,w={},x,y,z=g.createElement('div');return w.matches=function(a,b){if(!a||a.nodeType!==1)return!1;var c=a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.matchesSelector;if(c)return c.call(a,b);var d,e=a.parentNode,f=!e;return f&&(e=z).appendChild(a),d=~w.qsa(e,b).indexOf(a),f&&z.removeChild(a),d},x=function(a){return a.replace(/-+(.)?/g,function(a,b){return b?b.toUpperCase():''})},y=function(a){return a.filter(function(b,c){return a.indexOf(b)==c})},w.fragment=function(b,d){d===a&&(d=l.test(b)&&RegExp.$1),d in q||(d='*');var e=q[d];return e.innerHTML=''+b,c.each(f.call(e.childNodes),function(){e.removeChild(this)})},w.GB=function(a,b){return a=a||[],a.__proto__=arguments.callee.prototype,a.selector=b||'',a},w.isGB=function(a){return a instanceof w.GB},w.init=function(b,d){if(!b)return w.GB();if(A(b))return c(g).ready(b);if(w.isGB(b))return b;var e;if(D(b))e=F(b);else if(C(b))e=[c.extend({},b)],b=null;else if(m.indexOf(b.nodeType)>=0||b===window)e=[b],b=null;else if(l.test(b))e=w.fragment(b.trim(),RegExp.$1),b=null;else{if(d!==a)return c(d).find(b);e=w.qsa(g,b)}return w.GB(e,b)},c=function(a,b){return w.init(a,b)},c.extend=function(c){return f.call(arguments,1).forEach(function(d){for(b in d)d[b]!==a&&(c[b]=d[b])}),c},w.qsa=function(a,b){var c;return a===g&&t.test(b)?(c=a.getElementById(RegExp.$1))?[c]:e:a.nodeType!==1&&a.nodeType!==9?e:f.call(s.test(b)?a.getElementsByClassName(RegExp.$1):u.test(b)?a.getElementsByTagName(b):a.querySelectorAll(b))},c.isFunction=A,c.isObject=B,c.isArray=D,c.isPlainObject=C,c.trim=function(a){return a.trim()},c.uuid=0,c.map=function(a,b){var c,d=[],e,f;if(E(a))for(e=0;e<a.length;e++)c=b(a[e],e),c!=null&&d.push(c);else for(f in a)c=b(a[f],f),c!=null&&d.push(c);return G(d)},c.each=function(a,b){var c,d;if(E(a)){for(c=0;c<a.length;c++)if(b.call(a[c],c,a[c])===!1)return a}else for(d in a)if(b.call(a[d],d,a[d])===!1)return a;return a},c.fn={forEach:e.forEach,reduce:e.reduce,push:e.push,indexOf:e.indexOf,concat:e.concat,map:function(a){return c.map(this,function(b,c){return a.call(b,c,b)})},slice:function(){return c(f.apply(this,arguments))},ready:function(a){return r.test(g.readyState)?a(c):g.addEventListener('DOMContentLoaded',function(){a(c)},!1),this},get:function(b){return b===a?f.call(this):this[b]},remove:function(){return this.each(function(){this.parentNode!=null&&this.parentNode.removeChild(this)})},each:function(a){return this.forEach(function(b,c){a.call(b,c,b)}),this},filter:function(a){return c([].filter.call(this,function(b){return w.matches(b,a)}))},add:function(a,b){return c(y(this.concat(c(a,b))))},is:function(a){return this.length>0&&w.matches(this[0],a)},not:function(b){var d=[];if(A(b)&&b.call!==a)this.each(function(a){b.call(this,a)||d.push(this)});else{var e=typeof b=='string'?this.filter(b):E(b)&&A(b.item)?f.call(b):c(b);this.forEach(function(a){e.indexOf(a)<0&&d.push(a)})}return c(d)},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){var a=this[0];return a&&!B(a)?a:c(a)},last:function(){var a=this[this.length-1];return a&&!B(a)?a:c(a)},find:function(a){var b;return this.length==1?b=w.qsa(this[0],a):b=this.map(function(){return w.qsa(this,a)}),c(b)},closest:function(a,b){var d=this[0];while(d&&!w.matches(d,a))d=d!==b&&d!==g&&d.parentNode;return c(d)},parents:function(a){var b=[],d=this;while(d.length>0)d=c.map(d,function(a){if((a=a.parentNode)&&a!==g&&b.indexOf(a)<0)return b.push(a),a});return L(b,a)},parent:function(a){return L(y(this.pluck('parentNode')),a)},children:function(a){return L(this.map(function(){return f.call(this.children)}),a)},siblings:function(a){return L(this.map(function(a,b){return f.call(b.parentNode.children).filter(function(a){return a!==b})}),a)},empty:function(){return this.each(function(){this.innerHTML=''})},pluck:function(a){return this.map(function(){return this[a]})},show:function(){return this.each(function(){this.style.display=='none'&&(this.style.display=null),j(this,'').getPropertyValue('display')=='none'&&(this.style.display=K(this.nodeName))})},replaceWith:function(a){return this.before(a).remove()},wrap:function(a){return this.each(function(){c(this).wrapAll(c(a)[0].cloneNode(!1))})},wrapAll:function(a){return this[0]&&(c(this[0]).before(a=c(a)),a.append(this)),this},unwrap:function(){return this.parent().each(function(){c(this).replaceWith(c(this).children())}),this},clone:function(){return c(this.map(function(){return this.cloneNode(!0)}))},hide:function(){return this.css('display','none')},toggle:function(b){return(b===a?this.css('display')=='none':b)?this.show():this.hide()},prev:function(){return c(this.pluck('previousElementSibling'))},next:function(){return c(this.pluck('nextElementSibling'))},html:function(b){return b===a?this.length>0?this[0].innerHTML:null:this.each(function(a){var d=this.innerHTML;c(this).empty().append(M(this,b,a,d))})},text:function(b){return b===a?this.length>0?this[0].textContent:null:this.each(function(){this.textContent=b})},attr:function(c,d){var e;return typeof c=='string'&&d===a?this.length==0||this[0].nodeType!==1?a:c=='value'&&this[0].nodeName=='INPUT'?this.val():!(e=this[0].getAttribute(c))&&c in this[0]?this[0][c]:e:this.each(function(a){if(this.nodeType!==1)return;if(B(c))for(b in c)this.setAttribute(b,c[b]);else this.setAttribute(c,M(this,d,a,this.getAttribute(c)))})},removeAttr:function(a){return this.each(function(){this.nodeType===1&&this.removeAttribute(a)})},prop:function(b,c){return c===a?this[0]?this[0][b]:a:this.each(function(a){this[b]=M(this,c,a,this[b])})},data:function(b,c){var d=this.attr('data-'+H(b),c);return d!==null?d:a},val:function(b){return b===a?this.length>0?this[0].value:a:this.each(function(a){this.value=M(this,b,a,this.value)})},offset:function(){if(this.length==0)return null;var a=this[0].getBoundingClientRect();return{left:a.left+window.pageXOffset,top:a.top+window.pageYOffset,width:a.width,height:a.height}},css:function(c,d){if(d===a&&typeof c=='string')return this.length==0?a:this[0].style[x(c)]||j(this[0],'').getPropertyValue(c);var e='';for(b in c)typeof c[b]=='string'&&c[b]==''?this.each(function(){this.style.removeProperty(H(b))}):e+=H(b)+':'+J(b,c[b])+';';return typeof c=='string'&&(d==''?this.each(function(){this.style.removeProperty(H(c))}):e=H(c)+':'+J(c,d)),this.each(function(){this.style.cssText+=';'+e})},index:function(a){return a?this.indexOf(c(a)[0]):this.parent().children().indexOf(this[0])},hasClass:function(a){return this.length<1?!1:I(a).test(this[0].className)},addClass:function(a){return this.each(function(b){d=[];var e=this.className,f=M(this,a,b,e);f.split(/\s+/g).forEach(function(a){c(this).hasClass(a)||d.push(a)},this),d.length&&(this.className+=(e?' ':'')+d.join(' '))})},removeClass:function(b){return this.each(function(c){if(b===a)return this.className='';d=this.className,M(this,b,c,d).split(/\s+/g).forEach(function(a){d=d.replace(I(a),' ')}),this.className=d.trim()})},toggleClass:function(b,d){return this.each(function(e){var f=M(this,b,e,this.className);(d===a?!c(this).hasClass(f):d)?c(this).addClass(f):c(this).removeClass(f)})}},['width','height'].forEach(function(b){c.fn[b]=function(d){var e,f=b.replace(/./,function(a){return a[0].toUpperCase()});return d===a?this[0]==window?window['inner'+f]:this[0]==g?g.documentElement['offset'+f]:(e=this.offset())&&e[b]:this.each(function(a){var e=c(this);e.css(b,M(this,d,a,e[b]()))})}}),n.forEach(function(a,b){c.fn[a]=function(){var a=c.map(arguments,function(a){return B(a)?a:w.fragment(a)});if(a.length<1)return this;var d=this.length,e=d>1,f=b<2;return this.each(function(c,g){for(var h=0;h<a.length;h++){var i=a[f?a.length-h-1:h];O(i,function(a){a.nodeName!=null&&a.nodeName.toUpperCase()==='SCRIPT'&&(!a.type||a.type==='text/javascript')&&window.eval.call(window,a.innerHTML)}),e&&c<d-1&&(i=i.cloneNode(!0)),N(b,g,i)}})},c.fn[b%2?a+'To':'insert'+(b?'Before':'After')]=function(b){return c(b)[a](this),this}}),w.GB.prototype=c.fn,w.camelize=x,w.uniq=y,c.mfmobile=w,c}();window.mfMobile.element=mfMobile.element,"$"in window||(window.$=mfMobile.element),function(a){function f(a){return a._id||(a._id=d++)}function g(a,b,d,e){b=h(b);if(b.ns)var g=i(b.ns);return(c[f(a)]||[]).filter(function(a){return a&&(!b.e||a.e==b.e)&&(!b.ns||g.test(a.ns))&&(!d||f(a.fn)===f(d))&&(!e||a.sel==e)})}function h(a){var b=(''+a).split('.');return{e:b[0],ns:b.slice(1).sort().join(' ')}}function i(a){return new RegExp('(?:^| )'+a.replace(' ',' .* ?')+'(?: |$)')}function j(b,c,d){a.isObject(b)?a.each(b,d):b.split(/\s/).forEach(function(a){d(a,c)})}function k(b,d,e,g,i,k){k=!!k;var l=f(b),m=c[l]||(c[l]=[]);j(d,e,function(c,d){var e=i&&i(d,c),f=e||d,j=function(a){var c=f.apply(b,[a].concat(a.data));return c===!1&&a.preventDefault(),c},l=a.extend(h(c),{fn:d,proxy:j,sel:g,del:e,i:m.length});m.push(l),b.addEventListener(l.e,j,k)})}function l(a,b,d,e){var h=f(a);j(b||'',d,function(b,d){g(a,b,d,e).forEach(function(b){delete c[h][b.i],a.removeEventListener(b.e,b.proxy,!1)})})}function p(b){var c=a.extend({originalEvent:b},b);return a.each(o,function(a,d){c[a]=function(){return this[d]=m,b[a].apply(b,arguments)},c[d]=n}),c}function q(a){if(!('defaultPrevented'in a)){a.defaultPrevented=!1;var b=a.preventDefault;a.preventDefault=function(){this.defaultPrevented=!0,b.call(this)}}}var b=a.mfmobile.qsa,c={},d=1,e={};e.click=e.mousedown=e.mouseup=e.mousemove='MouseEvents',a.event={add:k,remove:l},a.proxy=function(b,c){if(a.isFunction(b)){var d=function(){return b.apply(c,arguments)};return d._id=f(b),d}if(typeof c=='string')return a.proxy(b[c],b);throw new TypeError('expected function')},a.fn.bind=function(a,b){return this.each(function(){k(this,a,b)})},a.fn.unbind=function(a,b){return this.each(function(){l(this,a,b)})},a.fn.one=function(a,b){return this.each(function(c,d){k(this,a,b,null,function(a,b){return function(){var c=a.apply(d,arguments);return l(d,b,a),c}})})};var m=function(){return!0},n=function(){return!1},o={preventDefault:'isDefaultPrevented',stopImmediatePropagation:'isImmediatePropagationStopped',stopPropagation:'isPropagationStopped'};a.fn.delegate=function(b,c,d){var e=!1;if(c=='blur'||c=='focus')a.iswebkit?c=c=='blur'?'focusout':c=='focus'?'focusin':c:e=!0;return this.each(function(f,g){k(g,c,d,b,function(c){return function(d){var e,f=a(d.target).closest(b,g).get(0);if(f)return e=a.extend(p(d),{currentTarget:f,liveFired:g}),c.apply(f,[e].concat([].slice.call(arguments,1)))}},e)})},a.fn.undelegate=function(a,b,c){return this.each(function(){l(this,b,c,a)})},a.fn.live=function(b,c){return a(document.body).delegate(this.selector,b,c),this},a.fn.die=function(b,c){return a(document.body).undelegate(this.selector,b,c),this},a.fn.on=function(b,c,d){return c==undefined||a.isFunction(c)?this.bind(b,c):this.delegate(c,b,d)},a.fn.off=function(b,c,d){return c==undefined||a.isFunction(c)?this.unbind(b,c):this.undelegate(c,b,d)},a.fn.trigger=function(b,c){return typeof b=='string'&&(b=a.Event(b)),q(b),b.data=c,this.each(function(){'dispatchEvent'in this&&this.dispatchEvent(b)})},a.fn.triggerHandler=function(b,c){var d,e;return this.each(function(f,h){d=p(typeof b=='string'?a.Event(b):b),d.data=c,d.target=h,a.each(g(h,b.type||b),function(a,b){e=b.proxy(d);if(d.isImmediatePropagationStopped())return!1})}),e},'focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout change select keydown keypress keyup error'.split(' ').forEach(function(b){a.fn[b]=function(a){return this.bind(b,a)}}),['focus','blur'].forEach(function(b){a.fn[b]=function(a){if(a)this.bind(b,a);else if(this.length)try{this.get(0)[b]()}catch(c){}return this}}),a.Event=function(a,b){var c=document.createEvent(e[a]||'Events'),d=!0;if(b)for(var f in b)f=='bubbles'?d=!!b[f]:c[f]=b[f];return c.initEvent(a,d,!0,null,null,null,null,null,null,null,null,null,null,null,null),c}}($),function(a){function b(a){var b=this.os={},c=this.browser={},d=a.match(/WebKit\/([\d.]+)/),e=a.match(/(Android)\s+([\d.]+)/),f=a.match(/(iPad).*OS\s([\d_]+)/),g=!f&&a.match(/(iPhone\sOS)\s([\d_]+)/),h=a.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),i=h&&a.match(/TouchPad/),j=a.match(/Kindle\/([\d.]+)/),k=a.match(/Silk\/([\d._]+)/),l=a.match(/(BlackBerry).*Version\/([\d.]+)/);if(c.webkit=!!d)c.version=d[1];e&&(b.android=!0,b.version=e[2]),g&&(b.ios=b.iphone=!0,b.version=g[2].replace(/_/g,'.')),f&&(b.ios=b.ipad=!0,b.version=f[2].replace(/_/g,'.')),h&&(b.webos=!0,b.version=h[2]),i&&(b.touchpad=!0),l&&(b.blackberry=!0,b.version=l[2]),j&&(b.kindle=!0,b.version=j[1]),k&&(c.silk=!0,c.version=k[1]),!k&&b.android&&a.match(/Kindle Fire/)&&(c.silk=!0)}b.call(a,navigator.userAgent),a.__detect=b}($),function($){function triggerAndReturn(a,b,c){var d=$.Event(b);return $(a).trigger(d,c),!d.defaultPrevented}function triggerGlobal(a,b,c,d){if(a.global)return triggerAndReturn(b||document,c,d)}function ajaxStart(a){a.global&&$.active++===0&&triggerGlobal(a,null,'ajaxStart')}function ajaxStop(a){a.global&&!--$.active&&triggerGlobal(a,null,'ajaxStop')}function ajaxBeforeSend(a,b){var c=b.context;if(b.beforeSend.call(c,a,b)===!1||triggerGlobal(b,c,'ajaxBeforeSend',[a,b])===!1)return!1;triggerGlobal(b,c,'ajaxSend',[a,b])}function ajaxSuccess(a,b,c){var d=c.context,e='success';c.success.call(d,a,e,b),triggerGlobal(c,d,'ajaxSuccess',[b,c,a]),ajaxComplete(e,b,c)}function ajaxError(a,b,c,d){var e=d.context;d.error.call(e,c,b,a),triggerGlobal(d,e,'ajaxError',[c,d,a]),ajaxComplete(b,c,d)}function ajaxComplete(a,b,c){var d=c.context;c.complete.call(d,b,a),triggerGlobal(c,d,'ajaxComplete',[b,c]),ajaxStop(c)}function empty(){}function mimeToDataType(a){return a&&(a==htmlType?'html':a==jsonType?'json':scriptTypeRE.test(a)?'script':xmlTypeRE.test(a)&&'xml')||'text'}function appendQuery(a,b){return(a+'&'+b).replace(/[&?]{1,2}/,'?')}function serializeData(a){isObject(a.data)&&(a.data=$.param(a.data)),a.data&&(!a.type||a.type.toUpperCase()=='GET')&&(a.url=appendQuery(a.url,a.data))}function serialize(a,b,c,d){var e=$.isArray(b);$.each(b,function(b,f){d&&(b=c?d:d+'['+(e?'':b)+']'),!d&&e?a.add(f.name,f.value):(c?$.isArray(f):isObject(f))?serialize(a,f,c,b):a.add(b,f)})}var jsonpID=0,isObject=$.isObject,document=window.document,key,name,rscript=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,scriptTypeRE=/^(?:text|application)\/javascript/i,xmlTypeRE=/^(?:text|application)\/xml/i,jsonType='application/json',htmlType='text/html',blankRE=/^\s*$/;$.active=0,$.ajaxJSONP=function(a){var b='jsonp'+ ++jsonpID,c=document.createElement('script'),d=function(){$(c).remove(),b in window&&(window[b]=empty),ajaxComplete('abort',e,a)},e={abort:d},f;return a.error&&(c.onerror=function(){e.abort(),a.error()}),window[b]=function(d){clearTimeout(f),$(c).remove(),delete window[b],ajaxSuccess(d,e,a)},serializeData(a),c.src=a.url.replace(/=\?/,'='+b),$('head').append(c),a.timeout>0&&(f=timeout(function(){e.abort(),ajaxComplete('timeout',e,a)},a.timeout)),e},$.ajaxSettings={type:'GET',beforeSend:empty,success:empty,error:empty,complete:empty,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:'text/javascript, application/javascript',json:jsonType,xml:'application/xml, text/xml',html:htmlType,text:'text/plain'},crossDomain:!1,timeout:0},$.ajax=function(options){var settings=$.extend({},options||{});for(key in $.ajaxSettings)settings[key]===undefined&&(settings[key]=$.ajaxSettings[key]);ajaxStart(settings),settings.crossDomain||(settings.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(settings.url)&&RegExp.$2!=window.location.host);var dataType=settings.dataType,hasPlaceholder=/=\?/.test(settings.url);if(dataType=='jsonp'||hasPlaceholder)return hasPlaceholder||(settings.url=appendQuery(settings.url,'callback=?')),$.ajaxJSONP(settings);settings.url||(settings.url=window.location.toString()),serializeData(settings);var mime=settings.accepts[dataType],baseHeaders={},protocol=/^([\w-]+:)\/\//.test(settings.url)?RegExp.$1:window.location.protocol,xhr=$.ajaxSettings.xhr(),abortTimeout;settings.crossDomain||(baseHeaders['X-Requested-With']='XMLHttpRequest'),mime&&(baseHeaders.Accept=mime,mime.indexOf(',')>-1&&(mime=mime.split(',',2)[0]),xhr.overrideMimeType&&xhr.overrideMimeType(mime));if(settings.contentType||settings.data&&settings.type.toUpperCase()!='GET')baseHeaders['Content-Type']=settings.contentType||'application/x-www-form-urlencoded';settings.headers=$.extend(baseHeaders,settings.headers||{}),xhr.onreadystatechange=function(){if(xhr.readyState==4){clearTimeout(abortTimeout);var result,error=!1;if(xhr.status>=200&&xhr.status<300||xhr.status==304||xhr.status==0&&protocol=='file:'){dataType=dataType||mimeToDataType(xhr.getResponseHeader('content-type')),result=xhr.responseText;try{dataType=='script'?(1,eval)(result):dataType=='xml'?result=xhr.responseXML:dataType=='json'&&(result=blankRE.test(result)?null:JSON.parse(result))}catch(e){error=e}error?ajaxError(error,'parsererror',xhr,settings):ajaxSuccess(result,xhr,settings)}else ajaxError(null,'error',xhr,settings)}};var async='async'in settings?settings.async:!0;xhr.open(settings.type,settings.url,async);for(name in settings.headers)xhr.setRequestHeader(name,settings.headers[name]);return ajaxBeforeSend(xhr,settings)===!1?(xhr.abort(),!1):(settings.timeout>0&&(abortTimeout=timeout(function(){xhr.onreadystatechange=empty,xhr.abort(),ajaxError(null,'timeout',xhr,settings)},settings.timeout)),xhr.send(settings.data?settings.data:null),xhr)},$.get=function(a,b){return $.ajax({url:a,success:b})},$.post=function(a,b,c,d){return $.isFunction(b)&&(d=d||c,c=b,b=null),$.ajax({type:'POST',url:a,data:b,success:c,dataType:d})},$.getJSON=function(a,b){return $.ajax({url:a,success:b,dataType:'json'})},$.fn.load=function(a,b){if(!this.length)return this;var c=this,d=a.split(/\s/),e;return d.length>1&&(a=d[0],e=d[1]),$.get(a,function(a){c.html(e?$(document.createElement('div')).html(a.replace(rscript,'')).find(e).html():a),b&&b.call(c)}),this};var escape=encodeURIComponent;$.param=function(a,b){var c=[];return c.add=function(a,b){this.push(escape(a)+'='+escape(b))},serialize(c,a,b),c.join('&').replace('%20','+')}}($),function(a){a.fn.serializeArray=function(){var b=[],c;return a(Array.prototype.slice.call(this.get(0).elements)).each(function(){c=a(this);var d=c.attr('type');this.nodeName.toLowerCase()!='fieldset'&&!this.disabled&&d!='submit'&&d!='reset'&&d!='button'&&(d!='radio'&&d!='checkbox'||this.checked)&&b.push({name:c.attr('name'),value:c.val()})}),b},a.fn.serialize=function(){var a=[];return this.serializeArray().forEach(function(b){a.push(encodeURIComponent(b.name)+'='+encodeURIComponent(b.value))}),a.join('&')},a.fn.submit=function(b){if(b)this.bind('submit',b);else if(this.length){var c=a.Event('submit');this.eq(0).trigger(c),c.defaultPrevented||this.get(0).submit()}return this}}($),function(a){function d(a){return'tagName'in a?a:a.parentNode}function e(a,b,c,d){var e=Math.abs(a-b),f=Math.abs(c-d);return e>=f?a-b>0?'Left':'Right':c-d>0?'Up':'Down'}function h(){g=null,b.last&&(b.el.trigger('longTap'),b={})}function i(){g&&clearTimeout(g),g=null}var b={},c,f=750,g;a(document).ready(function(){var j,k;a(document.body).bind('touchstart',function(e){j=Date.now(),k=j-(b.last||j),b.el=a(d(e.touches[0].target)),c&&clearTimeout(c),b.x1=e.touches[0].pageX,b.y1=e.touches[0].pageY,k>0&&k<=250&&(b.isDoubleTap=!0),b.last=j,g=timeout(h,f)}).bind('touchmove',function(a){i(),b.x2=a.touches[0].pageX,b.y2=a.touches[0].pageY;if(Math.abs(b.x1-b.x2)>10){a.preventDefault()}}).bind('touchend',function(a){i(),b.isDoubleTap?(b.el.trigger('doubleTap'),b={}):b.x2&&Math.abs(b.x1-b.x2)>30||b.y2&&Math.abs(b.y1-b.y2)>30?(b.el.trigger('swipe')&&b.el.trigger('swipe'+e(b.x1,b.x2,b.y1,b.y2)),b={}):'last'in b&&(b.el.trigger('tap'),c=timeout(function(){c=null,b.el.trigger('singleTap'),b={}},250))}).bind('touchcancel',function(){c&&clearTimeout(c),g&&clearTimeout(g),g=c=null,b={}})}),['swipe','swipeLeft','swipeRight','swipeUp','swipeDown','doubleTap','tap','singleTap','longTap'].forEach(function(b){a.fn[b]=function(a){return this.bind(b,a)}})}($);

mfMobile = function(){

    var noop  = function(){return this},
        rows  = mfMobile.Lang, Lang = function(row){ return rows[row]}, toString = Object.prototype.toString;

    function flatten(array){return array.length > 0 ? [].concat.apply([], array):array}
    function funcArgs(F){var S=F.toString();return S.slice(S.indexOf('(')+1, S.indexOf(')')).match(/([^\s,]+)/g)}
    function isArray(value){return toString.apply(value) == '[object Array]'}
    function isObject(value){return value != null && typeof value == 'object'}
    function isString(value){return typeof value == 'string'}
    function likeArray(obj){return typeof obj.length == 'number'}
    function isFunction(value){return typeof value == 'function'}
    function isNumber(value){return typeof value == 'number'}
    function isDefined(value){return typeof value != 'undefined'}
    function isDate(value){return toString.apply(value) == '[object Date]';}
    function isWindow(obj){return obj && obj.document && obj.location && obj.alert && obj.setInterval}
    function isPlainObject(value){"use strict";var key, ctor;if(toString.call(value) !== "[object Object]"){return false}ctor = (isFunction(value.constructor) && value.constructor.prototype);if(!ctor||!hasOwnProperty.call(ctor, 'isPrototypeOf')){return false}for(key in value){return key === undefined||hasOwnProperty.call(value, key)}}
    function timeout(f,d){var l=arguments.length-1,a=map(arguments,function(n,i){return (i>0&&i<l)&&n||null}), t; return t=setTimeout(function(){f.apply(this,a);clearTimeout(t)},d);}
    function extend(dst){
        "use strict";
        forEach(arguments,function(obj){if(obj!==dst){forEach(obj,function(value,key){dst[key]=value})}});
        return dst;
    }
    function forEach(obj, mut, out){
        "use strict";
        var key;
        if(obj){
            if(isFunction(obj)){for(key in obj){if(key!='prototype'&&key!='length'&&key!='name'&&obj.hasOwnProperty(key)){mut.call(out,obj[key],key)}}}
            else if(obj.forEach&&obj.forEach!==forEach){obj.forEach(mut,out)}
            else if(isObject(obj)&&isNumber(obj.length)){for(key=0;key<obj.length;key++){mut.call(out,obj[key],key)}}
            else {for(key in obj){if(obj.hasOwnProperty(key)){mut.call(out,obj[key],key)}}}
        }
        return obj;
    }
    function map(elems, fn){
        "use strict";
        var key, value, i, ret = [];
        if(likeArray(elems)){for(i=0;i<elems.length;i++){value=fn(elems[i],i);if(value!=null){ret.push(value)}}}
        else {for(key in elems){value=fn(elems[key],key);if(value!=null){ret.push(value)}}}
        return flatten(ret);
    }
    function grep(mut, fn){
        "use strict";
        var ret=[];map(mut,function(arg){if(fn(arg)){ret.push(arg)}});return ret;
    }
    function Util(){
        "use strict";
        var $this = this, FREGEXP = /^([^%]*)%(\([\w.]+\))?([-+])?(0)?(\d+)?(\.(\d+))?([doxXcsf])(.*)$/, HDIGITS = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
        this.sprintf = function(fmt){return _sprintf_(fmt,arguments,1)};
        this.getStaticURL = function(u){return u};
        function _empty(str){if(str===undefined||str===null){return true}return (str=='')?true:false}
        function _int_(val){return Math.floor(val)}
        function _printf_num_(val,base,pad,sign,width){val=parseInt(val,10);if(isNaN(val)){return "NaN"}var aval=(val<0)?-val:val,ret='';if(aval==0){ret="0"}else{while(aval>0){ret=HDIGITS[aval%base]+ret;aval=_int_(aval/base)}}if(val<0){ret="-"+ret;}if(sign=="-"){pad=" "}return _printf_str_(ret,pad,sign,width,-1)}
        function _printf_float_(val,base,pad,sign,prec){if(prec==undefined){if(parseInt(val)!=val){return ""+val}prec=5}var p10=Math.pow(10,prec);var ival=""+Math.round(val*p10);var ilen=ival.length-prec;if(ilen==0){return "0."+ival.substr(ilen,prec)}return ival.substr(0,ilen)+"."+ival.substr(ilen,prec)}
        function _printf_str_(val,pad,sign,width,prec){var npad;if(val===undefined){return "(undefined)"}if(val===null){return "(null)"}if((npad=width-val.length)>0){if(sign=="-"){while(npad>0){val+=pad;npad--;}}else{while(npad>0){val=pad+val;npad--}}}if(prec>0){return val.substr(0,prec)}return val}
        function _sprintf_(fmt,av,index){var output="",i,m,line,match;line=fmt.split("\n");for(i=0;i<line.length;i++){if(i>0){output+="\n"}fmt=line[i];while(match=FREGEXP.exec(fmt)){var sign="",pad=" ",name="";if(!_empty(match[1])){output+=match[1];}if(!_empty(match[2])){name=match[2];name=name.substring(1,name.length-1)}if(!_empty(match[3])){sign=match[3];}if(!_empty(match[4])){pad="0";}var width=match[5],prec=match[7],type=match[8];fmt=match[9];var val;if(name){val=av[1];forEach(name.split('.'),function(nameseg,i){val=val[nameseg];})}else{if(index>=av.length){output+="[missing parameter for type '"+type+"']";continue;}val=av[index++]}switch(type){case "d":output+=_printf_num_(val,10,pad,sign,width);break;case "o":output+=_printf_num_(val,8,pad,sign,width);break;case "x":output+=_printf_num_(val,16,pad,sign,width);break;case "X":output+=_printf_num_(val,16,pad,sign,width).toUpperCase();break;case "c":output+=String.fromCharCode(parseInt(val,10));break;case "s":output+=_printf_str_(val,pad,sign,width,prec);break;case "f":output+=_printf_float_(val,pad,sign,width,prec);break;default:output+="[unknown format '"+type+"']";break;}}output+=fmt}return output}
        return this;
    }
    function Defer(cb, ms, tries){
        var timer = null, running = false, pending = false, tries = (tries||1), tried = 0,
            trigger = function(){
                timer = setTimeout(function(){
                    timer = null;
                    if(running){pending=true}
                    else {running=true;pending=false;cb();running=false;if(pending){trigger();pending=false}}
                }, ms);tried++;
            };
        return function(kill){
            if(kill){clearTimeout(timer);timer = null;tried = 0;return true}
            if(timer){clearTimeout(timer);timer = null;tried = 0}
            if(tried<tries){trigger()}
        };
    }

    function Search(){
        var $this    = this;
        this.params  = {};
        this.load    = function(){console.warn('Search::create loaded'); return this};
        this.success = function(res){console.warn('Search::request results', res); return this};
        this.fail    = function(err){console.warn('Search::request error', err); return this};
        this.results = [];
        this.change  = {
            factors: function(){

            }
        };
        this.create  = function(params, onLoad, onSuccess, onFail){
            isFunction(onLoad) && (this.load = onLoad);
            isFunction(onSuccess) && (this.success = onSuccess);
            isFunction(onFail) && (this.fail = onFail);

            extend($this.params, {});

            params.keywords && ($this.params.keywords = params.keywords);

            this.load();
            return this;
        };
        this.request = function(){
            $.ajax({
                url: '/' + 'search/',
                type: 'post',
                data: JSON.stringify($this.params),
                dataType: 'json',
                success: function(data){
                    if(data.status === 200){
                        $this.success && $this.success($this.results);
                    } else {
                        $this.fail && $this.fail(data);
                    }
                },
                error: function(err){
                    $this.fail && $this.fail(err);
                }
            });
            return this;
        };
        return this;
    }

    /**
     * Effects
     @ uses:
         assign: $(dom).Effects();
         toggle: $(dom).effects.active = bool;
         map   : $(dom).effects.event.swipeLeft = function(){ //new response };
     */
    !function(){
        var event = {}, events = 'click dblclick singleTap doubleTap longTap swipeLeft swipeRight swipeUp swipeDown';
            forEach(events.split(' '), function(fn){this[fn] = noop;}, event);
        $.fn.Effects = function(){
            var $this = this;
            this.effects = {active: true, event: event};
            return this.each(function(){
                $(this).bind(events, function(e){
                    if($this.effects.active){
                        var type = (e.type === 'dblclick' || e.type === 'doubleTap')
                            ? 'swipe' + (e.pageX < Math.floor(e.view.outerWidth/2)?'Right':'Left')
                            : (e.type === 'click' ? 'singleTap' : e.type);
                        $this.effects.event[type] && ($this.effects.event[type](e));
                    }
                });
            });
        };
        return $;
    }($);

    !function(){
        $.fn.Drift = function(b){
            var $this = this, W = $('body').width(), l, w, p; b && (b = Number(b.replace('px',''))) || 14;
            $this.drift = function(d,x){
                l = {
                    right: function(){p=(l+x);return (p>0)?0:p},
                    left: function(){p=(l-x);return ((w+p)>W)?p:((w*-1)+(W-b))}
                }[d]();
                $this.css('left', l);
                return this;
            };
            return this.each(function(){
                mfMobile.timeout(function(){l = $this[0].offsetLeft, w = $this[0].offsetWidth}, 0);
            });
        };
        return $;
    }($);

    var UI = {
        $gmap: null,
        treena: new function(){
            "use strict";
            this.px = function(n){ return (isNumber(n))?(n+'px'):n; };
            this.url = function(n){ return 'url("'+n+'")'; };
            var $this = this,
                build = function(){
                var setAttr = function($e,attr,val){
                    attr = attr.toLowerCase();
                    if((attr==='class')||(attr==='clas')){if(isString(val)){val=val.split(' ')}forEach(val,function(clas){$e.addClass(clas)})}
                    else if(attr==='style'){$e.css(val)}
                    else {$e.attr(attr, val)}
                },
                createNode = function(node_name,node_args){
                    var $e, first, attrs = {}, index = 0, callback = null, node_type = (node_name==='button'||node_name==='a')?(node_name==='button'?1:2):0,
                        processChild = function(arg){
                            if(isArray(arg)){forEach(arg, function(child){processChild(child)})}
                            else {if(('l10n' in $this)&&(isString(arg))){arg = $this.l10n(arg)}if(isObject(arg) && ('toLocalString' in arg)){arg = arg.toLocalString()}if(isString(arg)||isNumber(arg)){arg = document.createTextNode(arg)}$e.append(arg)}
                        }, click = function(e){ e.preventDefault(); if(callback){callback(e)}};
                    if(node_type && node_args && (node_args.length > index)){first = node_args[index];if(isFunction(first)){callback = first;index++}}
                    if(node_args && (node_args.length > index) ){first = node_args[index];if(isPlainObject(first)){attrs = first;index++}}
                    $e = $(document.createElement(node_name));
                    forEach(attrs, function(v,k){setAttr($e,k,v)});
                    while (index < node_args.length){processChild(node_args[index++])}
                    if(node_type===1){$e.click(click)}
                    else if(node_type===2&&!attrs.href){$e.attr('href','#').click(click)}
                    return $e;
                },
                nodeNames = ['a', 'article', 'aside', 'b', 'blockquote', 'br', 'button', 'div', 'em', 'fieldset', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4','h5','h6', 'header', 'hgroup', 'input', 'img', 'label', 'legend', 'li', 'mark', 'nav', 'ol', 'option', 'p', 'select', 'section', 'span', 'template', 'textarea', 'time', 'ul', 'var'];
                forEach(nodeNames, function(node_name){this[node_name.toUpperCase()] = function(){return createNode(node_name, arguments)}}, $this);
            }();
            return this;
        },
        nodes: new function(){
            "use strict";
            var $this    = this, nodes, active = false;
            this.$active = function(bool){ active = bool;return this; };
            this.$list   = function(){ return nodes && nodes.find('li')||[]; };
            this.$create = function(index){
                if(!nodes){ $('body').append(nodes = UI.treena.BLOCKQUOTE({clas:'history-nodes'}, UI.treena.UL(map(UI.navigate.$history(), function(element, i){return (i===index) ? UI.treena.LI({clas:'active'}):UI.treena.LI()}))))}
                else {this.$set(index)}
                return this;
            };
            this.$set = function(index){
                var list;
                if(undefined !== (list = $this.$list())){
                    forEach(UI.navigate.$history(), function(element, i){
                        var ii = index===i; $(list[i])[(ii?'addClass':'removeAttr')](ii?'active':'class');
                    });
                }
                return this;
            };
            this.$remove = function(i){
                if(i){ nodes && nodes[i] && (delete nodes[i]); }
                else {
                    var list;
                    if(undefined !== (list = $this.$list())){
                        nodes && (
                            forEach(UI.navigate.$history(), function(element, i){UI.navigate.$destroy(i)}),
                            nodes.empty().remove(), nodes = null
                        );
                    }
                }
                return this;
            };
            this.check = function(index){
                $this[(active?'$create':'$remove')](index);
                return this;
            };
            return this;
        },
        screen: new function(){
            "use strict";
            var $this = this;
            this.screen;
            this.$new = function(name, content, load, dark){
                var screen, $ev, $obj = this, $made = false, classlist = ['screen'];
                dark && (classlist.push('dark'));
                classlist.push(load === null?'stage':'next');

                screen = UI.treena.DIV({clas: classlist.join(' ')}, UI.treena.MARK({clas:'spin'}));
                if(undefined !== ($obj = UI.navigate.$make(name, screen, content))){
                    $made = $obj[0], $obj = $obj[1];
                }
                $made && ($('body').append(screen));
                screen.Effects();

                $ev = screen.effects.event;
                $ev.swipeLeft = function(e){
                    e.preventDefault();e.stopImmediatePropagation();
                    var hObj = UI.navigate.$next()||null;hObj && ($this.$load(hObj).$stage());
                },
                $ev.swipeRight = function(e){
                    e.preventDefault();e.stopImmediatePropagation();
                    var hObj = UI.navigate.$prev()||null;hObj && ($this.$load(hObj).$stage());
                };

                switch(load){
                    case true : $obj && ($this.$load($obj)); break;
                    case false: $obj && ($this.$load($obj), timeout(function(){$this.$stage($obj.index)}, 50)); break;
                    default   : $obj && ($this.$load($obj), $this.$stage($obj.index)); break;
                };
                return this;
            };
            this.$load = function(obj){
                this.screen = obj.screen;
                if(obj.cached){ return this; }
                this.screen.html((isFunction(obj.content) && obj.content()||obj.content));
                obj.cached = true;
                return this;
            };
            this.$stage = function(index){
                index = isNumber(index) ? index:UI.navigate.$history(true);
                UI.navigate.$index(index);
                forEach(UI.navigate.$history(), function(element, i){
                    index === i ? (element.screen.removeClass('next').addClass('stage')):(element.screen[(index>i?'removeClass':'addClass')]('next').removeClass('stage'));
                });
                return this;
            };
            return this;
        },
        navigate: new function(){
            "use strict";
            var $this = this, hIndex = 0, elements = [];
            this.$contains = function(name){
                var index;
                forEach(elements, function(element, i){if(element.name===name){index=i;return true}});
                return index;
            };
            this.$index = function(index){hIndex = index;UI.nodes.check(index);return this};
            this.$history = function(current){ return (current) ? hIndex:elements; };
            this.$new = function(name, screen, content){
                var obj = {name: name, index: elements.length, screen: screen, content: content, cached: false};
                elements.push(obj);
                return obj;
            };
            this.$get = function(name, uncache){
                var obj = elements[$this.$contains(name)]||null;
                uncache && (obj.cache = false);
                return obj;
            };
            this.$make = function(name, screen, content){
                var index;
                if(undefined !== (index = this.$contains(name))){return [false, elements[index]]}
                else {return [true, $this.$new(name, screen, content)]}
            };
            this.$destroy = function(i){if(isNumber(i)){elements[i].screen.remove();delete elements[i]}return this};
            this.$prev = function(){
                var index;
                if(-1 < (index = (hIndex - 1))){ $this.$index(index);return elements[index]; }
                return null;
            };
            this.$current = function(){return elements[hIndex]};
            this.$next = function(screen){
                var index;
                if(elements.length > (index = (hIndex + 1))){ $this.$index(index);return elements[index]; }
                return null;
            };
            this.nav = {
                params: {},
                set: function(params){this.params = isFunction(params) && params()||params;return this},
                render: function(){return UI.templates.nav(this.params).children()}
            };
            return this;
        },
        forms: {
            objectify: function(params){
                "use strict";
                var out = {};
                forEach(params, function(param){param.value && (this[param.name] = param.value)}, out);
                return out;
            }
        },
        map: function(){
            "use strict";
            var $this = this.map, mapReady = false, viewport,
                translate = {
                    toLocation: function(latlng){return latlng && (isFunction(latlng.lat) ? latlng: (new google.maps.LatLng(latlng.lat, latlng.lng)) || undefined)},
                    toBounds  : function(bounds){return new google.maps.LatLngBounds(this.toLocation(bounds.bottomLeft), this.toLocation(bounds.topRight))},
                    location  : function(latlng){return {lat: latlng.lat(), lng: latlng.lng()}},
                    bounds    : function(bounds){return {bottomLeft: this.location(bounds.getSouthWest()), topRight: this.location(bounds.getNorthEast())}}
                };
            $this.map; $this.list;
            this.Map = function(){
                $this.map = UI.templates.map();
                var sf = new google.maps.LatLng(37.76, -122.402),
                    defer = new Defer(function(){
                        mapReady = true;
                        viewport = translate.bounds(UI.$gmap.getBounds());
                        mfMobile.search.change.factors(mapReady, viewport);
                    }, 500);

                UI.$gmap = new google.maps.Map($this.map.get(0), {
                    disableDefaultUI: true,
                    zoom: 11,
                    center: sf,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });

                google.maps.event.addListener(UI.$gmap, 'bounds_changed', defer);
                return $this.map;
            };
            this.List = function(){
                $this.list = UI.templates.footer('');

                google.maps.event.addListener(UI.$gmap, 'dragstart', function(){
                    $this.list.removeClass('pop');
                });

                google.maps.event.addListener(UI.$gmap, 'dragend', function(){
                    timeout(function(){ $this.list.addClass('pop') }, 250);
                });
                return $this.list;
            };
            this.results = function(results){
                if($this.list && results.length){
                var $fx,
                    list = UI.templates.results(results,
                        function(label, item){
                            label.Effects();
                            $fx = label.effects.event;
                            $fx.swipeLeft = function(e){
                                e.preventDefault();e.stopImmediatePropagation();
                                list.drift('left', item.width());
                            },
                            $fx.swipeRight = function(e){
                                e.preventDefault();e.stopImmediatePropagation();
                                list.drift('right', item.width());
                            };
                            return label;
                        },
                        function(list, label){return list.Drift(label.css('margin-left'))}
                    );

                    $this.list.html(list);
                    timeout(function(){ $this.list.addClass('pop'); }, 100);
                    UI.navigate.$get('map').screen.effects.active = false;
                }
                return this;
            };
            return this;
        },
        list: function(){
            "use strict";
            var $this = this.list;
            $this.list;
            this.results = function(results){
                if(!results){
                    results = []; // results of tbd search
                }
                $this.list = UI.templates.list(results);
                return $this.list;
            };
            return this;
        },
        route: function(channel){
            "use strict";
            this.results = function(results){
                return UI[channel] && (UI[channel]().results(results)) || (console.error('UI::list: results'));
            };
            return this;
        },
        templates: {
            welcome: function(content){with (UI.treena){return SECTION(ARTICLE(H1("mf :: d.prock creative"), content))}},
            simple: function(content){},
            nav: function(params){
                with (UI.treena){
                    var template = TEMPLATE();
                    if(params.prev){
                        if(isArray(params.prev)){
                            isFunction(params.prev[0]) && (template.append(LI({clas: 'a'}, BUTTON.apply(this, params.prev))))||(template.append(LI.apply(this, params.prev)));
                        }
                    } else {
                        var prev = UI.navigate.$current();
                        if(prev){
                            template.append(LI({clas: 'a'}, BUTTON(function(e){
                                UI.screen.$stage(prev.index);
                            }, {clas: 'prev'})));
                        } else {
                            template.append(LI({clas: 'logo'}));
                        }
                    }
                    if(params.title){
                        template.append(LI(isFunction(params.title) && params.title()||params.title));
                    }
                    if(params.next){
                        if(isArray(params.next)){
                            isFunction(params.next[0]) && (template.append(LI({clas: 'c'}, BUTTON.apply(this, params.next))))||(template.append(LI.apply(this, params.next)));
                        }
                    } else {
						template.append(LI({clas: 'c'}));
                    }
                    return template;
                }
            },
            complex: function(obj){
                UI.navigate.nav.set(obj.nav);
                with (UI.treena){
                    return TEMPLATE(HEADER(NAV(UL(UI.navigate.nav.render()))), SECTION(isFunction(obj.content) && obj.content()||obj.content)).children();
                }
            },
            map: function(){
                with (UI.treena){
                    return DIV({id: 'map'})
                }
            },
            list: function(){
                with (UI.treena){
                    return DIV({id: 'list'})
                }
            },
            results: function(results, labelCB, listCb){
                var list, figure, item, label, clas = ['results'], drifter = ((labelCB && isFunction(labelCB)) && (listCb && isFunction(listCb)));
                drifter && (clas.push('drifter'));
                with (UI.treena){
                    list = UL({clas:clas.join(' ')}, map(results, function(event){
                        figure = event.icon().isSet && {style: {'background-image': url(event.icon().getThumbnailURL())}} || '';
                        item = LI(
                            label = LABEL(
                                FIGURE(figure),
                                HGROUP('list result goes here')
                            )
                        );
                        drifter && (label = labelCB(label, item));
                        return item;
                    }))
                }
                drifter && (list = listCb(list, label));
                return list;
            },
            footer: function(content, pop, remove, fixed){
                var footer, button;
                with (UI.treena){
                    footer = FOOTER({clas:(fixed && 'fixed'||'')}, isFunction(content) && content()||content);
                    if(pop){
                        timeout(function(){ footer.addClass('pop'); }, 0);
                    }
                    if(remove && (false !== (button = footer.find('button')))){
                        button.click(function(){footer.remove()});
                    }
                }
                return footer;
            }
        }
    };

    return {
        lang         : Lang,
        UI           : UI,
        defer        : Defer,
        util         : new Util(),
        search       : new Search(),
        timeout      : timeout,
        map          : map,
        grep         : grep,
        extend       : extend,
        forEach      : forEach,
        noop         : noop,
        isPlainObject: isPlainObject,
        isFunction   : isFunction,
        isArray      : isArray,
        isObject     : isObject,
        isDate       : isDate,
        isString     : isString,
        likeArray    : likeArray,
        isNumber     : isNumber,
        isDefined    : isDefined,
        isWindow     : isWindow
    };
}();

$(function(){
    var
    $body = $('body'),
    $html = $('html'),
    welcome = function(which){
        with (mfMobile.UI.treena){
            var content = which && {
                1: function(){
                    return content = H2(mfMobile.lang('welcome_1'));
                },
                2: function(){
                    return content = H2(mfMobile.lang('welcome_2'));
                }
            }[which]()||null;
        }
        if(content){
            return mfMobile.UI.templates.welcome(content);
        }
    },
    init = function(){
        mfMobile.UI.screen
            .$new('home',  welcome(1), null, true)
            .$new('page1', welcome(2), true, true);

        $body.append(mfMobile.UI.templates.footer(function(){
            with (mfMobile.UI.treena){
                return NAV(BUTTON(function(){
                    mfMobile.UI.nodes.$active(false).$remove();
                    return buildSearchForm();
                }, {type: 'button'}, 'search'));
            }
        }, true, true, true));

        mfMobile.UI.nodes.$active(true).$create(0);
    },
    searchResults = function(params){
        !$body.hasClass('nav') && $body.addClass('nav');

        mfMobile.UI.screen
            .$new('results', mfMobile.UI.templates.complex({
                nav: function(){
                    return {
                        title: function(){
                            with(mfMobile.UI.treena){
                                return H3('searched: ', SPAN('\u2018' + params.keywords + '\u2019'));
                            }
                        }
                    };
                },
                content: mfMobile.UI.list().results()
            }), false);

        mfMobile.search.request();
    },
    buildSearchForm = function(params){
        !$body.hasClass('nav') && $body.addClass('nav');

        mfMobile.UI.screen
            .$new('search', mfMobile.UI.templates.complex({
                nav: function(){
                    return {
                        title: mfMobile.UI.treena.H3('search')
                    };
                },
                content: function(){
                    var form;
                    with (mfMobile.UI.treena){
                        form = FORM(
                            FIELDSET(
                                LABEL({clas: 'icon search'}, INPUT({type: 'search', name: 'keywords', placeholder: 'search...', required: 'true', value: (params && params.keywords||'')}))
                            ),
                            LABEL(INPUT({type: 'submit', value: 'search'}))
                        );
                    }

                    form.submit(function(e){
                        e.preventDefault();
                        var params = mfMobile.UI.forms.objectify($(this).serializeArray());
                        mfMobile.search.create(params, function(){
                            searchResults(params);
                        }, function(results){
                            mfMobile.UI.route('list').results(results);
                        });
                    });

                    return form;
                }
            }), null);
    };

    /**
     * Instantiate UI
     */
    init();

    /**
     * Mobile Window Helpers these handle device specific ux
     */
    var orient = function(){
        if(/mobi/i.test(navigator.userAgent) && !location.hash && !pageYOffset){
            window.scrollTo(0, 1);
        }
        $html.toggleClass('standalone', !!window.navigator.standalone);
    };
    window.addEventListener('orientationchange', orient, false);
    mfMobile.timeout(orient, 1000);
});