$(document).ready(function() {
	console.log("Page ready");
});

$(function () {
	$(document).scroll(function() {
		var $nav = $("#mainNavbar");
		$nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
	});
});