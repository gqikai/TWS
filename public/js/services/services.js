angular.module('TWS.services',[])
    .factory('UserService', function ($http,$rootScope,$q) {
        var signupURL = 'http://localhost:4000/signup',
            signinURL = 'http://localhost:4000/signin';

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

               console.log(data);
                console.log(headers);
                if(data.message == "ok"){
                    deferred.resolve(data);

                    $rootScope.username = username;
                    $rootScope.password = password;
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
            return $http({
                method: 'POST',
                url: signinURL,
                data: {
                    user: username,
                    password: password
                }
            }).success(function(data, status, headers) {
                console.log(data);

                console.log(headers());
                if(data.message == "ok"){
                    $rootScope.username = username;
                    $rootScope.password = password;
                    $rootScope.loged = true;
                }else{
                    alert(data)
                }
            }).error(function (data, statue, headers) {
                alert(data + statue + headers)
            });
        };

        return {
            signup: signup,
            signin: signin
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

                console.log(data);

                    deferred.resolve(data);

            }).error(function (data, statue, headers) {
                deferred.reject(data)
            });

            return deferred.promise;
        };

        return {
            getAllTools: getAllTools
        };
    })