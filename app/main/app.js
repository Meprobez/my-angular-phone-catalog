var app = angular.module('module-name',['ngRoute','spellModule']);
app.config(['$provide','$compileProvider','$filterProvider','$routeProvider','$locationProvider','moduleInvokerProvider','$httpProvider','$sceDelegateProvider',function($provide,$compileProvider,$filterProvider,$routeProvider,$locationProvider,moduleInvokerProvider,$httpProvider,$sceDelegateProvider)
{
	moduleInvokerProvider.getProviders(arguments);
	$compileProvider.preAssignBindingsEnabled(true);
	$routeProvider.eagerInstantiationEnabled(false)
	// Check if a new cache is available on page load.
	window.addEventListener('load', function(e) 
	{
		window.applicationCache.addEventListener('updateready', function(e) 
		{
    		if (window.applicationCache.status == window.applicationCache.UPDATEREADY) 
    		{
      			// Browser downloaded a new app cache.
      			if (confirm('A new version of this site is available. Load it?')) {
      				alert('The new Manifest is loading');
      				window.applicationCache.update();
        			window.location.reload();
      		}
    	} 
    	else { } // Manifest didn't changed. Nothing new to server. 
    }, false);

}, false);
	$locationProvider.hashPrefix('!');
	$sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow JSONP calls that match this pattern
    'https://some.dataserver.com/**.jsonp?**'
  ]);
  
}])
app.run(['$rootScope','$route','$history','statesMaintain','$cacheFactory',function($rootScope,$route,$history,statesMaintain,$cacheFactory)
{
	$history.historyMaintain($rootScope);
		
}])