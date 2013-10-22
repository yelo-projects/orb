var scrollElement = 'body', $scrollElement
var $pages = $('.page');
var $window = $(window);
var $body = $('body');
var $menuLinks = $('a.menu-link')
var resizeTimer;

// determine scrolling element
$('html, body').each(function(){
	var $this = $(this);
	var initScrollTop = $this.attr('scrollTop');
	$this.attr('scrollTop', initScrollTop + 1);
	if($this.attr('scrollTop') == initScrollTop + 1){
		scrollElement = this.nodeName.toLowerCase();
		$this.attr('scrollTop', initScrollTop);
		return false;
	}    
});

$scrollElement = $(scrollElement);

function isScrolledIntoView($elem,offset,limit){

	var docViewTop = $window.scrollTop();
	var docViewBottom = docViewTop + $window.height();

	var elemTop = $elem.offset().top;
	if(offset===true){
		var elemBottom = elemTop + $elem.height();
	}
	else{
		elemBottom = elemTop + (offset ? offset : 2);
	}

	return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop) && (elemTop <= docViewTop + (limit? limit : 100)));
}

function setPage(id){
	var hash = '#'+id;
	var $menuLink = $(hash+"-Link").addClass('active')
	window.location.hash = hash;
	$menuLinks.not($menuLink).removeClass('active');
}

$menuLinks.add('a.scrollDown').click(function(event){
	var hash = $(this).attr('href');
	var $target = $(hash);
	if(!$target.length){return false;}
	$scrollElement.stop().animate({scrollTop: $target.offset().top}, 500, 'swing', function() {window.location.hash = hash;})
	event.preventDefault();
})

/* Force snap to panel on resize. */
$window.resize(function() {
	window.clearTimeout(resizeTimer);
	resizeTimer = window.setTimeout(function() {
		var hash = window.location.hash ? window.location.hash : '#Home';
		$scrollElement.stop().animate({scrollTop: $(hash).offset().top}, 200);
	}, 100);
});

$window.scroll(function(){
	var x = $scrollElement.scrollTop();
	var pos = parseInt(-x / 10);
	$pages.css('background-position', '0% ' +  pos + 'px').each(function(){
		var $page = $(this);
		if(isScrolledIntoView($page)){
			setPage(this.id,100);
			return false;
		}
	})
});

$('#Menu-Revealer').on('click',function(){
	$body.toggleClass('menu-open')
})