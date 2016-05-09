var log = function(val){
	console.log(val);
};

var app = angular.module('app', []);

app.controller('HeaderCtrl', ['$scope', 'model', function($scope, model){
	console.log('HeaderCtrl:' + model());
	$scope.add = function(){
	};
}]);

app.controller('BodyCtrl', ['$scope', 'model', function($scope, model){
	console.log('BodyCtrl:' + model());
	$scope.remove = function(){
	};
}]);

app.factory('model', function(){
	return function (){
		return 1;
	};
})

app.directive('headerPanel', function(){
	return {
        template : "<h1>headerPanel</h1>"
    };
});

app.directive('bodyPanel', function(){
	return {
        template : "<h2>bodyPanel</h2>"
    };
});
