var spell = angular.module('spell-module',['ngRoute']);
spell.provider('moduleInvoker',function()
{
	var self = this;
	self.providers = [];

	self.getProviders = function(args)
	{
		for(var i = 0;i<arguments.length;i++)
		{
			if('provider' in args[i])
				self.providers['$provide'] = args[i];
			if('component' in arguments[i]) 
				self.providers['$compileProvider'] = args[i];
			if('register' in arguments[i]) 
				self.providers['$filterProvider'] = args[i];
			if('when' in arguments[i]) 
				self.providers['$routeProvider'] = args[i];
			if('html5Mode' in arguments[i]) 
				self.providers['$locationProvider'] = args[i];
		}
	};

	self.$get = ['$http','$route','$location','$history',function($http,$route,$location,$history)
	{
		var providers = self.providers;

		var that = this;
		
		that.loadedModules = [];
		
		that.invokeModule = function(element)
		{
			console.log(element);
			switch(element[1])
				{
					case 'factory': providers.$provide.factory(element[2][0],element[2][1]);
					break;

					case 'service': providers.$provide.service(element[2][0],element[2][1]);
					break;

					case 'provider': providers.$provide.provider(element[2][0],element[2][1]);
					break;
	
					case 'component': providers.$compileProvider.component(element[2][0],element[2][1]);
					break;

					case 'directive': providers.$compileProvider.directive(element[2][0],element[2][1]);
					break;

					case 'filter': providers.$filterProvider.register(element[2][0],element[2][1]);
					break;
				}
		};

		that.logModule = function(module)
		{
			console.log("Module: ",module.name,"==>");
			console.log(module);
		};
		
		return {

			providers:self.providers,
			
			loadedModules:that.loadedModules,

			loadModule:function(path)
			{
				$http(
				{
				  	url:path,
				  	method: 'GET',
				  	cache:true,
				  	transformResponse:[]
			 	}).then(function(response)
	  			{
					var module = eval(response.data);
					that.loadedModules[module.name+", "+module._invokeQueue[module._invokeQueue.length-1][2][0]] = module;
					 		
					that.invokeModule(module._invokeQueue.pop());
					  	
				   	$route.reload();
					$location.replace();

				}).catch(function(error)
				{
					alert("Error loading module, "+error.status+" "+error.statusText+". Redirecting...");
					$history.removeLastEntry();
					if($history.getHistory().length<3)
						$location.path('/');
					else
						window.location = "#!"+$history.getPreviousPage();
					  		 	 	
					$location.replace();
	      		});
			}  
		};
	}];
})
spell.provider('$history',function()
{
	var self = this;
	self.history = [];

	self.$get = function()
	{
		var $history = {
			
			historyMaintain:function($rootScope)
			{
				$rootScope.$on('$routeChangeSuccess',function(event,current,previous)
				{
					if(current&&current.$$route.originalPath!=$history.getHistory()[$history.getHistory().length-1])
						$history.saveHistory(current.$$route.originalPath);
					$history.logHistory();
				});
			},
		
			saveHistory:function(url){ self.history.push(url); },

			getPreviousPage:function(){ return self.history[self.history.length-1] },

			getHistory:function(){ return self.history; },

			logHistory:function() { console.log(self.history); },

			historySearch:function(url) { var exists = false; self.history.forEach(function(el){if(el===url)exists=true;}); },

			removeLastEntry:function() { self.history=self.history.slice(0,self.history.length-1);}
	
		}
		return $history;
   };
})
spell.factory('statesMaintain',['$location',function($location)
{
	var states=[];
	return {
		maintainId:function(id,$routeParams)
		{
			var cutedString = '';
			for(prop in $routeParams)
			{
				cutedString+='/'+$routeParams[prop];
			}
			console.log(cutedString);
			id =id.replace(cutedString,'');
			console.log(id);
			return id;
		},

		saveState:function(name,state) { states[name] = state; },

		getState:function(name) { return states[name]||undefined; },

		removeState:function(name) { state[name] = undefined; },

		getStatesArray:function() { return states;},
			
		logStatesArray:function() { console.log(states); }
 	};
}])