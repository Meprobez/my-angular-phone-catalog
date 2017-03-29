'use strict';
angular.module('phonecatalog')
.component('phoneDetail',
{
    templateUrl:'main/phone-detail-component/phone-detail-component.html',
    bindings: { phoneData: '<' },
    controller:phoneDetailController
})
.component('phoneContent',
{
   require: {
      phones: '^',
      templateUrl:'main/phones-component/phones-component-content.html',
      controller:phoneContentController,
      bindings:{ content:'<'}
    }
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

function phoneContentController()
{
    
}