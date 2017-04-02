'use strict';

angular.module('phonecatalog').component('phoneContent', {
    require: { phoneDetail: '^^' },
    templateUrl: 'phone-detail-view/phone-content-component/phone-content-component.html',
    controller: phoneContentController,
    bindings: { content: '@' }

});
function phoneContentController() {
    var self = this;
    self.log = log;
    self.$onInit = onInit;

    function log() {
        console.log(self);
    };

    function onInit() {
        self.data = self.phoneDetail.returnData()[self.content];
        self.class = 'phone-content-' + [self.content];
        self.output = [];
        for (var prop in self.data) {
            self.output.push(prop);

            if (angular.isArray(self.data[prop])) {
                self.data[prop] = self.data[prop].join(',');
            };
            if (self.data[prop] === true) self.data[prop] = '\u2714';
            if (self.data[prop] === false) self.data[prop] = '\u2718';
        };
    };
}