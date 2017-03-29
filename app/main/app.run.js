'use strict';
angular.module('phonecatalog').run(run);

run.$inject = ['$rootScope','$history','$route'];


function run($rootScope,$history,$route)
{
	$history.historyMaintain($rootScope);
	$rootScope.$on('$routeChangeSuccess',function(event,current,previous)
				{
					//clean(angular.element(document.body));
				});
		
}

function clean(node)
{
  for(var n = 0; n < node.childNodes.length; n ++)
  {
    var child = node.childNodes[n];
    if
    (
      child.nodeType === 8 
      || 
      (child.nodeType === 3 && !/\S/.test(child.nodeValue))
    )
    {
      node.removeChild(child);
      n --;
    }
    else if(child.nodeType === 1)
    {
      clean(child);
    }
  }
}
