(function($){
	$(document).ready(function(){
		var selectedTags = [];
		$(document).on('click','.tag-filter',function(){
			console.log("Tags", selectedTags);
			if( $(this).hasClass('all')){
				selectedTags = [];
				$('span.tag-filter').removeClass("badge-primary");
				$('span.tag-filter').addClass("badge-secondary");
				$(this).removeClass("badge-secondary");
				$(this).addClass("badge-primary");
				$('.project-item').showAll();
			}else{
				if( $(this).hasClass("badge-primary") ){
					selectedTags.removeTag( $(this).data('tag') );
					$(this).removeClass("badge-primary");
					$(this).addClass("badge-secondary");
				}
				else{
					selectedTags.addTag( $(this).data('tag') );
					$(this).removeClass("badge-secondary");
					$(this).addClass("badge-primary");
				}
				$('.project-item').filterTags( selectedTags );
			}
		});
		jQuery('.thickbox').colorbox({
			maxWidth: "80%", 
			maxHeight: "80%", 
			photo: true,
			onComplete: function(e){ 
				if($(e.el).data('url')){
					$('#cboxLoadedContent').click(function(){ 
						window.open($(e.el).data('url'), '_blank').focus();
					})
				} 
			}
		});
	});

	Array.prototype.addTag = function(tag) {
		if(this.indexOf(tag) === -1) this.push(tag);
	}

	Array.prototype.removeTag = function(tag) {
		var tagIndex = this.indexOf(tag);
		this.splice(tagIndex,1);
	}

	$.fn.extend({
	  filterTags: function(tagNames) {
	  	if(tagNames.length == 0) return this.showAll();

	    return this.each(function() {
	    	var itemTagArray = JSON.parse( $(this).attr('data-tags') );
	    	var unfound = $( tagNames ).not( itemTagArray ).get();
	    	console.log("unfound", unfound, itemTagArray.length);
	    	if( unfound.length == tagNames.length ){
				$(this).addClass('not-show');
			}else{
				$(this).removeClass('not-show');
			}
	    });
	  },
	  showAll: function(){
	  	return this.each(function() {
			if($(this).hasClass('not-show')){
				$(this).removeClass('not-show');
			}
	    });
	  }
	});
})(jQuery)
