'use strict';

angular.module('phonecatalog').component('phones', {
    templateUrl: 'main/phones-component/phones-component.html',
    controller: phonesController
});

phonesController.$inject = ['getData', '$rootScope'];

function phonesController(getData, $rootScope) {
    var self = this;

    self.$onInit = onInit;
    self.log = log;

    self.searchActiveClass = false;
    self.filter = "";
    function onInit() {
        self.phones = [];
        getData.getPhonesList().then(response => self.phones = response);
        self.searchInput = "";
    };

    function log() {
        console.log(self);
    };
}