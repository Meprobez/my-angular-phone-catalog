'use strict';
angular.module('phonecatalog')
.component('phones',
{
    templateUrl:'main/phones-component/phones.component.html',
    controller:phonesController
});

phonesController.$inject = ['getData'];

function phonesController(getData)
{
    var self = this;
    self.phones = [];
    self.phones = getData.getPhonesList();
    self.log = log;

    function log()
    {
        console.log(self);
    }
}