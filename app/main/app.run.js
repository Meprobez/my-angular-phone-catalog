'use strict';
angular.module('phonecatalog')
.run(['$rootScope','$history',function($rootScope,$history)
{
	$history.historyMaintain($rootScope);
		
}])
