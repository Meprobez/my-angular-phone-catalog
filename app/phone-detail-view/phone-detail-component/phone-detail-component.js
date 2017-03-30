'use strict';
angular.module('phonecatalog')
.component('phoneDetail',
{
    templateUrl:'phone-detail-view/phone-detail-component/phone-detail-component.html',
    bindings: { phoneData: '<' },
    controller:phoneDetailController
})

function phoneDetailController()
{
    var self = this;
    self.log = log;
    self.returnData = returnData;
    self.activeImage = 0;
    self.setActiveImage = setActiveImage;
    
    function log()
    {
        console.log(self);
    };

    function returnData()
    {
        return self.phoneData;
    };

    function setActiveImage($index)
    {
        self.activeImage = $index;
    }
}
