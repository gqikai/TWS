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
            .when('/regist', {
                controller: 'LoginCtrl',
                templateUrl: 'view/regist.html'
            })
            .when('/progress', {
                controller: 'ProgressCtrl',
                templateUrl: 'view/emp/progress.html'
            })
            .otherwise({redirectTo: '/login'});
    }])
 
//添加工具方法
Array.prototype.removeByValue = function(index,val) {
    for(var i=0; i<this.length; i++) {
        if(this[i][index] == val) {
            this.splice(i, 1);
            break;
        }
    }
}
Array.prototype.findByValue = function(index,val) {
    for(var i=0; i<this.length; i++) {
        if(this[i][index] == val) {
            return this[i];
        }
    }
}

