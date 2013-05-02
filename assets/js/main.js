
var docElement = document.documentElement, browserUA = navigator.userAgent.toLowerCase();
docElement.className = docElement.className.replace(/(^|\s)preload(\s|$)/, "$1$2");
-1 < browserUA.search("windows phone os 7") && (docElement.className += " winphone");
-1 < browserUA.search("android 2.1") && (docElement.className += " winphone");
-1 < browserUA.search("symbian/3; series60") && (docElement.className += " symbian3");
if (-1 < browserUA.search("series60/3.0") || -1 < browserUA.search("series60/3.1") || -1 < browserUA.search("series60/3.2"))
	docElement.className += " symbian3 s60";
  
window.selectnav = function () {
	return function (a) {
		var c,
		f = function (a) {
			var b;
			if (!a)
				a = window.event;
			if (a.target)
				b = a.target;
			else if (a.srcElement)
				b = a.srcElement;
			if (b.nodeType == 3)
				b = b.parentNode;
			if (b.value)
				window.location.href = b.value
		};
		c = document.getElementById(a);
		var a = 0,
		g = c.parentNode,
		h = c.parentNode.innerHTML;
		a++;
		var i = c.children.length,
		d = '<option value="" active="active">Navigation</option>',
		e;
		for (e = 0; e < i; e++)
			var b = c.children[e].children[0], j = '<option value="' + b.href + '">', b = (b.innerText || b.textContent).toLowerCase(),
			b = b.charAt(0).toUpperCase() + b.slice(1), d = d + (j + b + "</option>");
		a === 1 && (d = '<select id="selectnav">' + d + "</select>");
		a--;
		g.innerHTML = h + d;
		a = document.getElementById("selectnav");
		a.remove(a.length - 1);
		a.addEventListener ? a.addEventListener("change", f, false) : a.attachEvent("onchange", f, false)
	}
}
();
selectnav("nav");

$(document).ready(function() {
  console.log("here");
  impress().init();
});


(function (a) {
	window.VS = window.VS || {};
	VS.viewportmeta = a.querySelector && a.querySelector('meta[name="viewport"]');
	VS.ua = navigator.userAgent;
	VS.scaleFix = function () {
		if (VS.viewportmeta && /iPhone|iPad|iPod/.test(VS.ua) && !/Opera Mini/.test(VS.ua)) {
			VS.viewportmeta.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
			a.addEventListener("gesturestart", VS.gestureStart, false)
		}
	};
	VS.gestureStart = function () {
		VS.viewportmeta.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.9"
	};
	VS.hideUrlBar =
	function () {
		/iPhone/.test(VS.ua) && (!pageYOffset && !location.hash) && setTimeout(function () {
			window.scrollTo(0, 1)
		}, 1E3)
	}
})(document);

