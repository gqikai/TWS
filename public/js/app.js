var TWS = angular.module('TWS', [
    'ngRoute','TWS.services','TWS.controllers'
]);

TWS.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/emp-rent', {
                controller: 'EmpCtrl',
                templateUrl: 'view/emp/rent.html'
            })
            .when('/emp-tool', {
                controller: 'EmpCtrl',
                templateUrl: 'view/emp/tool.html'
            })
            .when('/admin-tool', {
                controller: 'AdminCtrl',
                templateUrl: 'view/admin/tool.html'
            })
            .when('/admin-employee', {
                controller: 'AdminCtrl',
                templateUrl: 'view/admin/employee.html'
            })
            .when('/login', {
                controller: 'LoginCtrl',
                templateUrl: 'view/login.html'
            })
            .otherwise({redirectTo: '/login'});
    }])
TWS.factory('myInterceptor', ['$log', function($log) {
    $log.debug('$log is here to show you that this is a regular factory with injection');

    var myInterceptor = {
        'response': function (resp) {
            //$log.debug(resp);
            //$log.debug(resp.headers('set-cookie'));
            //$log.debug(resp.headers('X-Powered-By'));
            return resp;
        }
    };

    return myInterceptor;
}]).config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('myInterceptor');
}]);
Array.prototype.removeByValue = function(index,val) {
    for(var i=0; i<this.length; i++) {
        if(this[i][index] == val) {
            this.splice(i, 1);
            break;
        }
    }
}


