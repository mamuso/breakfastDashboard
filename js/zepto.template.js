//     Template
//     (c) 2011 Jason Byrne, MileSplit
//     May be freely distributed under the MIT license, with attribution.
//
// ** Usage **
//
// HTML:
// <script type="text/html" id="tmplArticle"><h1>${Title}</h1></script>
//
// JavaScript:
// $('#tmplArticle').tmpl(data).appendTo($item);
//
 
(function($){
	
	$.fn.tmpl = function(d) {
		var s = $(this[0]).html().trim();
		if (d) {
			for (k in d) {
				s = s.replace(new RegExp('\\${' + k + '}', 'g'), d[k]);
			}
		}
		return $(s);
	};
	
})(Zepto);