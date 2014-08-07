/* G R I D M A S T E R   F O R   A N G U L A R J S
Created by Zafarali Ahmed (2014) Available to all under MIT License
V 0.0.1 https://github.com/zafarali/gridmaster
*/
;(function () {

	angular
	 .module('gridmaster', [])
	 .directive('gmWrapper', function() {
	  	return {
		  	restrict: 'A',
		  	// transclude:true,
		  	// template:'<div style="position:static" ng-transclude></div>',
		  	link: function (element) {
		  		// element.find('div').css({
		  		// 	position:'absolute'
		  		// })
		  	}
		  }
	  })
	 .directive('gmResizer', [ '$document', '$window', function ($document, $window) {
	 		var gmIsArray = function (toCheck) {
	 			return toString.call(toCheck) === '[object Array]';
	 		}
	 		return {
	 			restrict: 'A',
	 			scope:true,
	 			link: function (scope, element, attributes) {
	 				
	 				//initialization of all elements and their positions
	 				element.addClass('gm-resizer-'+attributes.gmDirection);
	 				var offset = {
	 					w: parseInt($(attributes.gmLeft).css('width')),
	 					h: parseInt($(attributes.gmTop).css('height'))
	 				}

	 				if ( attributes.gmDirection==='vertical' ) {
		 				element.css({
		 					top: attributes.gmTopOffset+'px',
		 					bottom: attributes.gmBottomOffset+'px',
		 					left: offset.w+'px',
		 					width: attributes.gmWidth+'px'
		 				});
	 				} else {
		 				element.css({
		 					left: attributes.gmLeftOffset+'px',
		 					right: attributes.gmRightOffset+'px',
		 					top: offset.h+'px',
		 					height: attributes.gmHeight+'px',
		 				});	 					
	 				}

	 				$(attributes.gmRight).css({
	 					left: offset.w+parseInt(attributes.gmWidth)+'px'
	 				});

	 				$(attributes.gmBottom).css({
	 					top: offset.h+parseInt(attributes.gmHeight)+'px'
	 				});

	 				var mousemove = function (event) {
	 					var parents = {
	 						x: parseInt(element.parent().css('left')) || 0,
	 						y: parseInt(element.parent().css('bottom')) || 0
	 					}


	 					if ( attributes.gmDirection === 'vertical' ) {

	 						//vertical resizer
	 						var x = event.pageX;

	 						// if(x>$window.innerWidth){
	 						// 	x = $window.innerWidth + parents.x;
	 						// }else if( x === 0){
	 						// 	x = parents.x;						
	 						// }

	 						if (attributes.gmMax && x > parseInt(attributes.gmMax)) {
	 							x = parseInt(attributes.gmMax);
	 						} else if (attributes.gmMin && x < parseInt(attributes.gmMin)){
	 							x = parseInt(attributes.gmMin);
	 						}else if(x < 0){
	 							x = 0;
	 						} 

	 						element.css({
	 							left: (x-parents.x) + 'px'
	 						});

	 						$(attributes.gmLeft).css({
	 							width: (x-parents.x) + 'px'
	 						})

	 						$(attributes.gmRight).css({
	 							left: (x-parents.x+parseInt(attributes.gmWidth || attributes.gmSize)) + 'px'
	 						})


	 					} else if ( attributes.gmDirection === 'horizontal' ) {
	 						//horizontal resizer
	 						// var y = $window.innerHeight - event.pageY;	 						
	 						var y = event.pageY;
	 						// if (y > $window.innerHeight){
	 						// 	y = $window.innerHeight + parents.y;
	 						// }else if( y === 0 ){
	 						// 	y = parents.y;
	 						// }

	 						if (attributes.gmMax && y > parseInt(attributes.gmMax)) {
	 							y = parseInt(attributes.gmMax);
	 						} else if(attributes.gmMin && y < parseInt(attributes.gmMin)){
	 							y = parseInt(attributes.gmMin);
	 						}else if (y < 0){
	 							y = 0;
	 						}

	 						element.css({
	 							top: (y-parents.y) + 'px'
	 						});

	 						$(attributes.gmTop).css({
	 							height: (y -parents.y ) + 'px'
	 						});

	 						$(attributes.gmBottom).css({
	 							top: (y-parents.y +parseInt(attributes.gmHeight))+ 'px'
	 						})

	 					}//end if
	 				}//end mouse move

	 				var mouseup = function () {
	 					$document.unbind('mousemove', mousemove);
	 					$document.unbind('mouseup', mouseup);
	 				}
	 				//bind event listener for mousedown
	 				element.bind('mousedown', function (event) {
	 					//prevents default dragging that the mouse usually does
	 					event.preventDefault();

	 					$document.bind('mousemove', mousemove);
	 					$document.bind('mouseup', mouseup);
	 				})


	 			}
	 		}
	 }]);

})();
