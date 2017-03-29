'use strict';
angular.module('phonecatalog')
.component('phoneDetail',
{
    templateUrl:'main/phone-detail-component/phone-detail-component.html',
    controller:phoneDetailController
});

phoneDetailController.$inject = ['getData','$rootScope'];

function phoneDetailController(getData,$rootScope)
{
    var self = this;
    self.log = log;
  

    function log()
    {
        console.log(self);
    };
}