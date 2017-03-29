'use strict';
angular.module('phonecatalog')
.component('phoneDetail',
{
    templateUrl:'main/phone-detail-component/phone-detail-component.html',
    bindings: { phoneData: '<' },
    controller:phoneDetailController
});

function phoneDetailController()
{
    var self = this;
    self.log = log;
    
    function log()
    {
        console.log(self);
    };
}