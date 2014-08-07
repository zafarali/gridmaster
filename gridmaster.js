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
		  	controller: ['$scope', function ($scope) {

		  		$scope.units = 'px';

		  		this.setUnits = function (unit){
		  			$scope.units = unit;
		  		}
		  		this.getUnits = function (){
		  			return $scope.units;
		  		}
		  	}],
		  	// transclude:true,
		  	// template:'<div style="position:static" ng-transclude></div>',
		  	link: function (scope, element) {
		 			element.bind('mouseenter', function () {
		 				console.log(scope.units);
		 			});
		  	}
		  }
	  })
	 .directive('gmUnit', function () {
	 	return {
	 		require: 'gmWrapper',
	 		restrict: 'A',
	 		link: function (scope, element, attrs, controller) {
	 			controller.setUnits(attrs.gmUnit);
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
	 			require: '^gmWrapper',
	 			link: function (scope, element, attributes, controller) {
	 				//initialization of all elements and their positions
	 				element.addClass('gm-resizer-'+attributes.gmDirection);
	 				var offset = {
	 					w: parseInt($(attributes.gmLeft).css('width')) + (parseInt($(attributes.gmLeft).css('left')) || 0),
	 					h: parseInt($(attributes.gmTop).css('height')) + (parseInt($(attributes.gmTop).css('top')) || 0)
	 				}
	 				var unit = 'px';
	 				if ( attributes.gmDirection==='vertical' ) {
		 				element.css({
		 					top: attributes.gmTopOffset+unit,
		 					bottom: attributes.gmBottomOffset+unit,
		 					left: offset.w+unit,
		 					width: attributes.gmWidth+unit
		 				});
	 				} else {
		 				element.css({
		 					left: attributes.gmLeftOffset+unit,
		 					right: attributes.gmRightOffset+unit,
		 					top: offset.h+unit,
		 					height: attributes.gmHeight+unit,
		 				});	 					
	 				}

	 				$(attributes.gmRight).css({
	 					left: offset.w+parseInt(attributes.gmWidth)+unit
	 				});

	 				$(attributes.gmBottom).css({
	 					top: offset.h+parseInt(attributes.gmHeight)+unit
	 				});

	 				var mousemove = function (event) {
	 					var unit = controller.getUnits();

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
	 							left: (x-parents.x) + unit
	 						});

	 						$(attributes.gmLeft).css({
	 							width: (x-parents.x) + unit
	 						})

	 						$(attributes.gmRight).css({
	 							left: (x-parents.x+parseInt(attributes.gmWidth || attributes.gmSize)) + unit
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
	 							top: (y-parents.y) + unit
	 						});

	 						$(attributes.gmTop).css({
	 							height: (y -parents.y ) + unit
	 						});

	 						$(attributes.gmBottom).css({
	 							top: (y-parents.y +parseInt(attributes.gmHeight))+ unit
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
