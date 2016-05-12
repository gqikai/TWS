angular.module('TWS.services',[])
    .factory('UserService', function ($http,$rootScope,$q) {
        var signupURL = 'http://localhost:4000/signup',
            signinURL = 'http://localhost:4000/signin',
            userUrl = 'http://localhost:4000/users'

        var signup = function(username,password) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: signupURL,
                data: {
                    user: username,
                    password: password
                }
            }).success(function(data, status, headers) {

               console.log("user data="+"");
                console.log(data);
                if(data.message == "ok"){
                    deferred.resolve(data);
                    $rootScope.user = data.user;
                    $rootScope.loged = true;
                }else{
                    alert(data + "")
                }
            }).error(function (data, statue, headers) {
                deferred.reject(data)
            });

            return deferred.promise;
        };
        var signin = function(username,password) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: signinURL,
                data: {
                    user: username,
                    password: password
                }
            }).success(function(data, status, headers) {
                console.log(data);


                if(data.message == "ok"){
                    $rootScope.user = data.user;
                    $rootScope.loged = true;
                    deferred.resolve(data);
                }else{
                    deferred.reject(data)
                }
            }).error(function (data, statue, headers) {
                alert(data + statue + headers)
            });
            return deferred.promise;
        };
        var findAllUsers = function() {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: userUrl
            }).success(function(data, status, headers) {

                console.log("users data="+"");
                console.log(data);

                deferred.resolve(data);

            }).error(function (data, statue, headers) {
                deferred.reject(data)
            });

            return deferred.promise;
        };
        return {
            signup: signup,
            signin: signin,
            findAllUsers: findAllUsers
        };
    })
    .factory('EmpService', ['$http', 'UserService', function ($http, UserService) {
        var rentInfo =  [{
            toolID : 1,
            toolName : 1,
            num : 1,
            time : 1231232132
        },{
            toolID : 1,
            toolName : 1,
            num : 1,
            time : 1231232132
        },{
            toolID : 1,
            toolName : 1,
            num : 1,
            time : 1231232132
        }]
        return {
            getRentInfo: function () {
                return rentInfo;
            },
            returnTool : function (tool) {
                var userID = UserService.getUser().userID;
                var toolID = tool.toolID;
            }
        };
    }])
    .factory('ToolService', function ($http,$rootScope,$q) {
        var toolURL = 'http://localhost:4000/tool' ;

        var getAllTools = function() {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: toolURL
            }).success(function(data, status, headers) {

                console.log("tools data="+"");
                console.log(data);

                    deferred.resolve(data);

            }).error(function (data, statue, headers) {
                deferred.reject(data)
            });

            return deferred.promise;
        };

        var findRentsByUserId = function(user_id) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: toolURL + '/rent/find',
                data: {
                    user_id: user_id
                }
            }).success(function(data, status, headers) {

                console.log("rents data="+"");
                console.log(data);

                deferred.resolve(data);

            }).error(function (data, statue, headers) {
                deferred.reject(data)
            });

            return deferred.promise;
        };
        var getAllRentsAdmin = function() {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: toolURL + '/rent'
            }).success(function(data, status, headers) {

                console.log("rents data="+"");
                console.log(data);

                deferred.resolve(data);

            }).error(function (data, statue, headers) {
                deferred.reject(data)
            });

            return deferred.promise;
        };
        var rent = function (user_id, tool_id,rent_num) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: toolURL + '/rent',
                data: {
                    user_id: user_id,
                    tool_id: tool_id,
                    rent_num: rent_num
                }
            }).success(function(data, status, headers) {

                console.log("rent data="+"");
                console.log(data);
                if(data.message == "ok"){
                    deferred.resolve(data);

                }else{
                    alert(data + "")
                }
            }).error(function (data, statue, headers) {
                deferred.reject(data)
            });
            return deferred.promise;
        }
        var returnTool = function (rent_id) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: toolURL + '/rent/return',
                data: {
                    rent_id: rent_id
                }
            }).success(function(data, status, headers) {

                console.log("return data="+"");
                console.log(data);
                if(data.message == "ok"){
                    deferred.resolve(data);


                }else{
                    alert(data + "")
                }
            }).error(function (data, statue, headers) {
                deferred.reject(data)
            });
            return deferred.promise;
        }
        return {
            getAllTools: getAllTools,
            findRentsByUserId: findRentsByUserId,
            rent: rent,
            returnTool: returnTool,
            getAllRentsAdmin: getAllRentsAdmin
        };
    })
