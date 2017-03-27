'use strict';
angular.module('phonecatalog')
.factory('getData',getData);

getData.$inject = ['$http'];

function getData($http) 
{
    var service = {
        getPhonesList: getPhonesList,
        getPhoneDetail: getPhoneDetail
    };

    return service;

    function request(path)
    {
        var responseData;
        $http({
            method:'GET',
            url:path,
            cache:true
        }).then(function(response){responseData = response.data;})
        .catch(function(error){alert("Error loading file, "+error.status+" "+error.statusText);});
        return responseData
    };

    function getPhonesList() 
    {
        var url = "application-data/phones/phones.json";
        return request(url);
    };

    function getPhoneDetail(phoneId)
    {

    };
}