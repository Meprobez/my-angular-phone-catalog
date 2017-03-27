'use strict';
angular.module('phonecatalog')
.factory('getData',getData);

getData.$inject = ['$http'];

function getData($http) 
{
    var self = this;
    self.responseData = []; 
    var service = {
        getPhonesList: getPhonesList,
        getPhoneDetail: getPhoneDetail
    };

    return service;

    function request(path)
    {
       var res = [];
       var responseData = $http({
            method:'GET',
            url:path,
            cache:true}).then(function(response){console.log(response.data);return response.data});
        res = responseData;
        console.log(res);
        
    };

    function getPhonesList() 
    {
        var phonesList,url = "application-data/phones/phones.json";
        phonesList = request(url);
        console.log(phonesList);
        return phonesList; 
    };

    function getPhoneDetail(phoneId)
    {

    };
}