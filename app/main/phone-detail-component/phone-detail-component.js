'use strict';
angular.module('phonecatalog')
.component('phone-detail',
{
    templateUrl:'main/phone-detail-component/phone-detail-component.html',
    controller:phoneDetailController
});

phoneDetailController.$inject = ['getData','$rootScope','$transition$'];

function phoneDetailController(getData,$rootScope,$transition$)
{
    var self = this;
    
    self.$onInit = onInit;
    self.log = log;

    self.searchActiveClass = false;
    self.filter="";
    
    function onInit()
    {
        self.phone = {};
        getData.getPhoneDetail($transition$.params().personId).then(function(response){self.phone = response;});
    };

    function log()
    {
        console.log(self);
    };
}