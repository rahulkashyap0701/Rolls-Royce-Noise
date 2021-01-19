!function(n,s){var t;"function"==typeof define&&define.amd?define(["underscore","jquery","exports"],function(t,e,i){n.Backbone=s(n,i,t,e)}):"undefined"!=typeof exports?(t=require("underscore"),s(n,exports,t)):n.Backbone=s(n,{},n._,n.jQuery||n.Zepto||n.ender||n.$)}(this,function(t,a,x,e){var i=t.Backbone,n=[],s=n.slice;a.VERSION="1.1.2",a.$=e,a.noConflict=function(){return t.Backbone=i,this},a.emulateHTTP=!1,a.emulateJSON=!1;var r=a.Events={on:function(t,e,i){return l(this,"on",t,[e,i])&&e&&(this._events||(this._events={}),(this._events[t]||(this._events[t]=[])).push({callback:e,context:i,ctx:i||this})),this},once:function(t,e,i){if(!l(this,"once",t,[e,i])||!e)return this;var n=this,s=x.once(function(){n.off(t,s),e.apply(this,arguments)});return s._callback=e,this.on(t,s,i)},off:function(t,e,i){var n,s,r,o,a,h,c,u;if(!this._events||!l(this,"off",t,[e,i]))return this;if(!t&&!e&&!i)return this._events=void 0,this;for(a=0,h=(o=t?[t]:x.keys(this._events)).length;a<h;a++)if(t=o[a],r=this._events[t]){if(this._events[t]=n=[],e||i)for(c=0,u=r.length;c<u;c++)s=r[c],(e&&e!==s.callback&&e!==s.callback._callback||i&&i!==s.context)&&n.push(s);n.length||delete this._events[t]}return this},trigger:function(t){if(!this._events)return this;var e=s.call(arguments,1);if(!l(this,"trigger",t,e))return this;var i=this._events[t],n=this._events.all;return i&&o(i,e),n&&o(n,arguments),this},stopListening:function(t,e,i){var n=this._listeningTo;if(!n)return this;var s=!e&&!i;for(var r in i||"object"!=typeof e||(i=this),t&&((n={})[t._listenId]=t),n)(t=n[r]).off(e,i,this),(s||x.isEmpty(t._events))&&delete this._listeningTo[r];return this}},h=/\s+/,l=function(t,e,i,n){if(!i)return!0;if("object"==typeof i){for(var s in i)t[e].apply(t,[s,i[s]].concat(n));return!1}if(h.test(i)){for(var r=i.split(h),o=0,a=r.length;o<a;o++)t[e].apply(t,[r[o]].concat(n));return!1}return!0},o=function(t,e){var i,n=-1,s=t.length,r=e[0],o=e[1],a=e[2];switch(e.length){case 0:for(;++n<s;)(i=t[n]).callback.call(i.ctx);return;case 1:for(;++n<s;)(i=t[n]).callback.call(i.ctx,r);return;case 2:for(;++n<s;)(i=t[n]).callback.call(i.ctx,r,o);return;case 3:for(;++n<s;)(i=t[n]).callback.call(i.ctx,r,o,a);return;default:for(;++n<s;)(i=t[n]).callback.apply(i.ctx,e);return}};x.each({listenTo:"on",listenToOnce:"once"},function(s,t){r[t]=function(t,e,i){var n=this._listeningTo||(this._listeningTo={});return i||"object"!=typeof e||(i=this),(n[t._listenId||(t._listenId=x.uniqueId("l"))]=t)[s](e,i,this),this}}),r.bind=r.on,r.unbind=r.off,x.extend(a,r);var E=a.Model=function(t,e){var i=t||{};e=e||{},this.cid=x.uniqueId("c"),this.attributes={},e.collection&&(this.collection=e.collection),e.parse&&(i=this.parse(i,e)||{}),i=x.defaults({},i,x.result(this,"defaults")),this.set(i,e),this.changed={},this.initialize.apply(this,arguments)};x.extend(E.prototype,r,{changed:null,validationError:null,idAttribute:"id",initialize:function(){},toJSON:function(t){return x.clone(this.attributes)},sync:function(){return a.sync.apply(this,arguments)},get:function(t){return this.attributes[t]},escape:function(t){return x.escape(this.get(t))},has:function(t){return null!=this.get(t)},set:function(t,e,i){var n,s,r,o,a,h,c,u;if(null==t)return this;if("object"==typeof t?(s=t,i=e):(s={})[t]=e,i=i||{},!this._validate(s,i))return!1;for(n in r=i.unset,a=i.silent,o=[],h=this._changing,this._changing=!0,h||(this._previousAttributes=x.clone(this.attributes),this.changed={}),u=this.attributes,c=this._previousAttributes,this.idAttribute in s&&(this.id=s[this.idAttribute]),s)e=s[n],x.isEqual(u[n],e)||o.push(n),x.isEqual(c[n],e)?delete this.changed[n]:this.changed[n]=e,r?delete u[n]:u[n]=e;if(!a){o.length&&(this._pending=i);for(var l=0,d=o.length;l<d;l++)this.trigger("change:"+o[l],this,u[o[l]],i)}if(h)return this;if(!a)for(;this._pending;)i=this._pending,this._pending=!1,this.trigger("change",this,i);return this._pending=!1,this._changing=!1,this},unset:function(t,e){return this.set(t,void 0,x.extend({},e,{unset:!0}))},clear:function(t){var e={};for(var i in this.attributes)e[i]=void 0;return this.set(e,x.extend({},t,{unset:!0}))},hasChanged:function(t){return null==t?!x.isEmpty(this.changed):x.has(this.changed,t)},changedAttributes:function(t){if(!t)return!!this.hasChanged()&&x.clone(this.changed);var e,i=!1,n=this._changing?this._previousAttributes:this.attributes;for(var s in t)x.isEqual(n[s],e=t[s])||((i=i||{})[s]=e);return i},previous:function(t){return null!=t&&this._previousAttributes?this._previousAttributes[t]:null},previousAttributes:function(){return x.clone(this._previousAttributes)},fetch:function(e){void 0===(e=e?x.clone(e):{}).parse&&(e.parse=!0);var i=this,n=e.success;return e.success=function(t){if(!i.set(i.parse(t,e),e))return!1;n&&n(i,t,e),i.trigger("sync",i,t,e)},R(this,e),this.sync("read",this,e)},save:function(t,e,i){var n,s,r,o=this.attributes;if(null==t||"object"==typeof t?(n=t,i=e):(n={})[t]=e,i=x.extend({validate:!0},i),n&&!i.wait){if(!this.set(n,i))return!1}else if(!this._validate(n,i))return!1;n&&i.wait&&(this.attributes=x.extend({},o,n)),void 0===i.parse&&(i.parse=!0);var a=this,h=i.success;return i.success=function(t){a.attributes=o;var e=a.parse(t,i);if(i.wait&&(e=x.extend(n||{},e)),x.isObject(e)&&!a.set(e,i))return!1;h&&h(a,t,i),a.trigger("sync",a,t,i)},R(this,i),"patch"==(s=this.isNew()?"create":i.patch?"patch":"update")&&(i.attrs=n),r=this.sync(s,this,i),n&&i.wait&&(this.attributes=o),r},destroy:function(e){e=e?x.clone(e):{};function i(){n.trigger("destroy",n,n.collection,e)}var n=this,s=e.success;if(e.success=function(t){(e.wait||n.isNew())&&i(),s&&s(n,t,e),n.isNew()||n.trigger("sync",n,t,e)},this.isNew())return e.success(),!1;R(this,e);var t=this.sync("delete",this,e);return e.wait||i(),t},url:function(){var t=x.result(this,"urlRoot")||x.result(this.collection,"url")||N();return this.isNew()?t:t.replace(/([^\/])$/,"$1/")+encodeURIComponent(this.id)},parse:function(t,e){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return!this.has(this.idAttribute)},isValid:function(t){return this._validate({},x.extend(t||{},{validate:!0}))},_validate:function(t,e){if(!e.validate||!this.validate)return!0;t=x.extend({},this.attributes,t);var i=this.validationError=this.validate(t,e)||null;return!i||(this.trigger("invalid",this,i,x.extend(e,{validationError:i})),!1)}});x.each(["keys","values","pairs","invert","pick","omit"],function(e){E.prototype[e]=function(){var t=s.call(arguments);return t.unshift(this.attributes),x[e].apply(x,t)}});var c=a.Collection=function(t,e){(e=e||{}).model&&(this.model=e.model),void 0!==e.comparator&&(this.comparator=e.comparator),this._reset(),this.initialize.apply(this,arguments),t&&this.reset(t,x.extend({silent:!0},e))},k={add:!0,remove:!0,merge:!0},u={add:!0,remove:!1};x.extend(c.prototype,r,{model:E,initialize:function(){},toJSON:function(e){return this.map(function(t){return t.toJSON(e)})},sync:function(){return a.sync.apply(this,arguments)},add:function(t,e){return this.set(t,x.extend({merge:!1},e,u))},remove:function(t,e){var i,n,s,r,o=!x.isArray(t);for(e=e||{},i=0,n=(t=o?[t]:x.clone(t)).length;i<n;i++)(r=t[i]=this.get(t[i]))&&(delete this._byId[r.id],delete this._byId[r.cid],s=this.indexOf(r),this.models.splice(s,1),this.length--,e.silent||(e.index=s,r.trigger("remove",r,this,e)),this._removeReference(r,e));return o?t[0]:t},set:function(t,e){(e=x.defaults({},e,k)).parse&&(t=this.parse(t,e));var i,n,s,r,o,a=!x.isArray(t);t=a?t?[t]:[]:x.clone(t);var h=e.at,c=this.model,u=this.comparator&&null==h&&!1!==e.sort,l=x.isString(this.comparator)?this.comparator:null,d=[],f=[],p={},g=e.add,v=e.merge,m=e.remove,y=!(u||!g||!m)&&[];for(b=0,w=t.length;b<w;b++){if(i=(s=t[b]||{})instanceof E?n=s:s[c.prototype.idAttribute||"id"],r=this.get(i))m&&(p[r.cid]=!0),v&&(s=s===n?n.attributes:s,e.parse&&(s=r.parse(s,e)),r.set(s,e),u&&!o&&r.hasChanged(l)&&(o=!0)),t[b]=r;else if(g){if(!(n=t[b]=this._prepareModel(s,e)))continue;d.push(n),this._addReference(n,e)}n=r||n,!y||!n.isNew()&&p[n.id]||y.push(n),p[n.id]=!0}if(m){for(b=0,w=this.length;b<w;++b)p[(n=this.models[b]).cid]||f.push(n);f.length&&this.remove(f,e)}if(d.length||y&&y.length)if(u&&(o=!0),this.length+=d.length,null!=h)for(b=0,w=d.length;b<w;b++)this.models.splice(h+b,0,d[b]);else{y&&(this.models.length=0);for(var _=y||d,b=0,w=_.length;b<w;b++)this.models.push(_[b])}if(o&&this.sort({silent:!0}),!e.silent){for(b=0,w=d.length;b<w;b++)(n=d[b]).trigger("add",n,this,e);(o||y&&y.length)&&this.trigger("sort",this,e)}return a?t[0]:t},reset:function(t,e){e=e||{};for(var i=0,n=this.models.length;i<n;i++)this._removeReference(this.models[i],e);return e.previousModels=this.models,this._reset(),t=this.add(t,x.extend({silent:!0},e)),e.silent||this.trigger("reset",this,e),t},push:function(t,e){return this.add(t,x.extend({at:this.length},e))},pop:function(t){var e=this.at(this.length-1);return this.remove(e,t),e},unshift:function(t,e){return this.add(t,x.extend({at:0},e))},shift:function(t){var e=this.at(0);return this.remove(e,t),e},slice:function(){return s.apply(this.models,arguments)},get:function(t){if(null!=t)return this._byId[t]||this._byId[t.id]||this._byId[t.cid]},at:function(t){return this.models[t]},where:function(i,t){return x.isEmpty(i)?t?void 0:[]:this[t?"find":"filter"](function(t){for(var e in i)if(i[e]!==t.get(e))return!1;return!0})},findWhere:function(t){return this.where(t,!0)},sort:function(t){if(!this.comparator)throw new Error("Cannot sort a set without a comparator");return t=t||{},x.isString(this.comparator)||1===this.comparator.length?this.models=this.sortBy(this.comparator,this):this.models.sort(x.bind(this.comparator,this)),t.silent||this.trigger("sort",this,t),this},pluck:function(t){return x.invoke(this.models,"get",t)},fetch:function(i){void 0===(i=i?x.clone(i):{}).parse&&(i.parse=!0);var n=i.success,s=this;return i.success=function(t){var e=i.reset?"reset":"set";s[e](t,i),n&&n(s,t,i),s.trigger("sync",s,t,i)},R(this,i),this.sync("read",this,i)},create:function(t,i){if(i=i?x.clone(i):{},!(t=this._prepareModel(t,i)))return!1;i.wait||this.add(t,i);var n=this,s=i.success;return i.success=function(t,e){i.wait&&n.add(t,i),s&&s(t,e,i)},t.save(null,i),t},parse:function(t,e){return t},clone:function(){return new this.constructor(this.models)},_reset:function(){this.length=0,this.models=[],this._byId={}},_prepareModel:function(t,e){if(t instanceof E)return t;var i=new(((e=e?x.clone(e):{}).collection=this).model)(t,e);return i.validationError?(this.trigger("invalid",this,i.validationError,e),!1):i},_addReference:function(t,e){null!=(this._byId[t.cid]=t).id&&(this._byId[t.id]=t),t.collection||(t.collection=this),t.on("all",this._onModelEvent,this)},_removeReference:function(t,e){this===t.collection&&delete t.collection,t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,i,n){("add"!==t&&"remove"!==t||i===this)&&("destroy"===t&&this.remove(e,n),e&&t==="change:"+e.idAttribute&&(delete this._byId[e.previous(e.idAttribute)],null!=e.id&&(this._byId[e.id]=e)),this.trigger.apply(this,arguments))}});x.each(["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","difference","indexOf","shuffle","lastIndexOf","isEmpty","chain","sample"],function(e){c.prototype[e]=function(){var t=s.call(arguments);return t.unshift(this.models),x[e].apply(x,t)}});x.each(["groupBy","countBy","sortBy","indexBy"],function(n){c.prototype[n]=function(e,t){var i=x.isFunction(e)?e:function(t){return t.get(e)};return x[n](this.models,i,t)}});var d=a.View=function(t){this.cid=x.uniqueId("view"),t=t||{},x.extend(this,x.pick(t,p)),this._ensureElement(),this.initialize.apply(this,arguments),this.delegateEvents()},f=/^(\S+)\s*(.*)$/,p=["model","collection","el","id","attributes","className","tagName","events"];x.extend(d.prototype,r,{tagName:"div",$:function(t){return this.$el.find(t)},initialize:function(){},render:function(){return this},remove:function(){return this.$el.remove(),this.stopListening(),this},setElement:function(t,e){return this.$el&&this.undelegateEvents(),this.$el=t instanceof a.$?t:a.$(t),this.el=this.$el[0],!1!==e&&this.delegateEvents(),this},delegateEvents:function(t){if(!(t=t||x.result(this,"events")))return this;for(var e in this.undelegateEvents(),t){var i,n,s,r=t[e];x.isFunction(r)||(r=this[t[e]]),r&&(n=(i=e.match(f))[1],s=i[2],r=x.bind(r,this),n+=".delegateEvents"+this.cid,""===s?this.$el.on(n,r):this.$el.on(n,s,r))}return this},undelegateEvents:function(){return this.$el.off(".delegateEvents"+this.cid),this},_ensureElement:function(){var t,e;this.el?this.setElement(x.result(this,"el"),!1):(t=x.extend({},x.result(this,"attributes")),this.id&&(t.id=x.result(this,"id")),this.className&&(t.class=x.result(this,"className")),e=a.$("<"+x.result(this,"tagName")+">").attr(t),this.setElement(e,!1))}}),a.sync=function(t,e,i){var n=v[t];x.defaults(i=i||{},{emulateHTTP:a.emulateHTTP,emulateJSON:a.emulateJSON});var s,r={type:n,dataType:"json"};i.url||(r.url=x.result(e,"url")||N()),null!=i.data||!e||"create"!==t&&"update"!==t&&"patch"!==t||(r.contentType="application/json",r.data=JSON.stringify(i.attrs||e.toJSON(i))),i.emulateJSON&&(r.contentType="application/x-www-form-urlencoded",r.data=r.data?{model:r.data}:{}),!i.emulateHTTP||"PUT"!==n&&"DELETE"!==n&&"PATCH"!==n||(r.type="POST",i.emulateJSON&&(r.data._method=n),s=i.beforeSend,i.beforeSend=function(t){if(t.setRequestHeader("X-HTTP-Method-Override",n),s)return s.apply(this,arguments)}),"GET"===r.type||i.emulateJSON||(r.processData=!1),"PATCH"===r.type&&g&&(r.xhr=function(){return new ActiveXObject("Microsoft.XMLHTTP")});var o=i.xhr=a.ajax(x.extend(r,i));return e.trigger("request",e,o,i),o};var g=!("undefined"==typeof window||!window.ActiveXObject||window.XMLHttpRequest&&(new XMLHttpRequest).dispatchEvent),v={create:"POST",update:"PUT",patch:"PATCH",delete:"DELETE",read:"GET"};a.ajax=function(){return a.$.ajax.apply(a.$,arguments)};var m=a.Router=function(t){(t=t||{}).routes&&(this.routes=t.routes),this._bindRoutes(),this.initialize.apply(this,arguments)},y=/\((.*?)\)/g,_=/(\(\?)?:\w+/g,b=/\*\w+/g,w=/[\-{}\[\]+?.,\\\^$|#\s]/g;x.extend(m.prototype,r,{initialize:function(){},route:function(i,n,s){x.isRegExp(i)||(i=this._routeToRegExp(i)),x.isFunction(n)&&(s=n,n=""),s=s||this[n];var r=this;return a.history.route(i,function(t){var e=r._extractParameters(i,t);r.execute(s,e),r.trigger.apply(r,["route:"+n].concat(e)),r.trigger("route",n,e),a.history.trigger("route",r,n,e)}),this},execute:function(t,e){t&&t.apply(this,e)},navigate:function(t,e){return a.history.navigate(t,e),this},_bindRoutes:function(){if(this.routes){this.routes=x.result(this,"routes");for(var t,e=x.keys(this.routes);null!=(t=e.pop());)this.route(t,this.routes[t])}},_routeToRegExp:function(t){return t=t.replace(w,"\\$&").replace(y,"(?:$1)?").replace(_,function(t,e){return e?t:"([^/?]+)"}).replace(b,"([^?]*?)"),new RegExp("^"+t+"(?:\\?([\\s\\S]*))?$")},_extractParameters:function(t,e){var i=t.exec(e).slice(1);return x.map(i,function(t,e){return e===i.length-1?t||null:t?decodeURIComponent(t):null})}});var T=a.History=function(){this.handlers=[],x.bindAll(this,"checkUrl"),"undefined"!=typeof window&&(this.location=window.location,this.history=window.history)},$=/^[#\/]|\s+$/g,S=/^\/+|\/+$/g,H=/msie [\w.]+/,A=/\/$/,I=/#.*$/;T.started=!1,x.extend(T.prototype,r,{interval:50,atRoot:function(){return this.location.pathname.replace(/[^\/]$/,"$&/")===this.root},getHash:function(t){var e=(t||this).location.href.match(/#(.*)$/);return e?e[1]:""},getFragment:function(t,e){var i;return null==t&&(this._hasPushState||!this._wantsHashChange||e?(t=decodeURI(this.location.pathname+this.location.search),i=this.root.replace(A,""),t.indexOf(i)||(t=t.slice(i.length))):t=this.getHash()),t.replace($,"")},start:function(t){if(T.started)throw new Error("Backbone.history has already been started");T.started=!0,this.options=x.extend({root:"/"},this.options,t),this.root=this.options.root,this._wantsHashChange=!1!==this.options.hashChange,this._wantsPushState=!!this.options.pushState,this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState);var e,i=this.getFragment(),n=document.documentMode,s=H.exec(navigator.userAgent.toLowerCase())&&(!n||n<=7);this.root=("/"+this.root+"/").replace(S,"/"),s&&this._wantsHashChange&&(e=a.$('<iframe src="javascript:0" tabindex="-1">'),this.iframe=e.hide().appendTo("body")[0].contentWindow,this.navigate(i)),this._hasPushState?a.$(window).on("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!s?a.$(window).on("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval)),this.fragment=i;var r=this.location;if(this._wantsHashChange&&this._wantsPushState){if(!this._hasPushState&&!this.atRoot())return this.fragment=this.getFragment(null,!0),this.location.replace(this.root+"#"+this.fragment),!0;this._hasPushState&&this.atRoot()&&r.hash&&(this.fragment=this.getHash().replace($,""),this.history.replaceState({},document.title,this.root+this.fragment))}if(!this.options.silent)return this.loadUrl()},stop:function(){a.$(window).off("popstate",this.checkUrl).off("hashchange",this.checkUrl),this._checkUrlInterval&&clearInterval(this._checkUrlInterval),T.started=!1},route:function(t,e){this.handlers.unshift({route:t,callback:e})},checkUrl:function(t){var e=this.getFragment();if(e===this.fragment&&this.iframe&&(e=this.getFragment(this.getHash(this.iframe))),e===this.fragment)return!1;this.iframe&&this.navigate(e),this.loadUrl()},loadUrl:function(e){return e=this.fragment=this.getFragment(e),x.any(this.handlers,function(t){if(t.route.test(e))return t.callback(e),!0})},navigate:function(t,e){if(!T.started)return!1;e&&!0!==e||(e={trigger:!!e});var i=this.root+(t=this.getFragment(t||""));if(t=t.replace(I,""),this.fragment!==t){if(""===(this.fragment=t)&&"/"!==i&&(i=i.slice(0,-1)),this._hasPushState)this.history[e.replace?"replaceState":"pushState"]({},document.title,i);else{if(!this._wantsHashChange)return this.location.assign(i);this._updateHash(this.location,t,e.replace),this.iframe&&t!==this.getFragment(this.getHash(this.iframe))&&(e.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,t,e.replace))}return e.trigger?this.loadUrl(t):void 0}},_updateHash:function(t,e,i){var n;i?(n=t.href.replace(/(javascript:|#).*$/,""),t.replace(n+"#"+e)):t.hash="#"+e}}),a.history=new T;E.extend=c.extend=m.extend=d.extend=T.extend=function(t,e){var i=this,n=t&&x.has(t,"constructor")?t.constructor:function(){return i.apply(this,arguments)};x.extend(n,i,e);function s(){this.constructor=n}return s.prototype=i.prototype,n.prototype=new s,t&&x.extend(n.prototype,t),n.__super__=i.prototype,n};var N=function(){throw new Error('A "url" property or function must be specified')},R=function(e,i){var n=i.error;i.error=function(t){n&&n(e,t,i),e.trigger("error",e,t,i)}};return a});