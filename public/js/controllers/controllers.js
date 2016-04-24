angular.module('TWS.controllers',['TWS.services'])
    .controller('LoginCtrl', function LoginCtrl($scope, UserService, $location, $rootScope) {
        $scope.username = null;
        $scope.password = null;
        $scope.err_message = null;

        $('#login-button').click(function () {
            UserService.signin( $scope.username, $scope.password).then(function (data) {
                $location.path('/emp-rent')
            }, function (data) {
                console.log(data)
                $scope.err_message = data.message;
            });

        })
        $('#regist-button').click(function () {
            UserService.signup( $scope.username, $scope.password).then(function (data) {
                $location.path('/emp-rent');
            }, function (data) {
                console.log(data)
                $scope.err_message = data.message;
            });

        })
    })
    .controller('EmpCtrl', function ($scope, $rootScope, EmpService, ToolService) {
        $scope.rentInfo = null;
        $scope.toolInfo = null;
        $scope.rent = function (tool) {
            ToolService.rent($rootScope.user_id,tool._id,tool.rent_num).then(function (data) {
                $scope.rentInfo.push({
                    num: tool.rent_num,
                    tool_id: tool._id
                })
            });
        }
        ToolService.getAllTools().then(function (data) {
            $scope.toolInfo = data;
        }, function (data) {
            console.log(data);
        });
        ToolService.getAllRents().then(function (data) {
            $scope.rentInfo = data;
        }, function (data) {
            console.log(data);
        }, function (data) {
            console.log(data)
        });
        $scope.returnTool = function (info) {
            ToolService.returnTool(info._id).then(function (data) {
                $scope.rentInfo.removeByValue('_id',info._id);
            }, function (data) {
                console.log(data)
            })
        }
    })
    .controller('AdminCtrl', function () {
        $scope.rentInfo = null;
        $scope.toolInfo = null;
        $scope.rent = function (tool) {
            ToolService.rent($rootScope.user_id,tool._id,tool.rent_num).then(function (data) {
                $scope.rentInfo.push({
                    num: tool.rent_num,
                    tool_id: tool._id
                })
            });
        }
        ToolService.getAllTools().then(function (data) {
            $scope.toolInfo = data;
        }, function (data) {
            console.log(data);
        });
        ToolService.getAllRents().then(function (data) {
            $scope.rentInfo = data;
        }, function (data) {
            console.log(data);
        }, function (data) {
            console.log(data)
        });
        $scope.returnTool = function (info) {
            ToolService.returnTool(info._id).then(function (data) {
                $scope.rentInfo.removeByValue('_id',info._id);
            }, function (data) {
                console.log(data)
            })
        }
    })
    .controller('NavCtrl', function ($scope,$rootScope) {
    $scope.logout = function () {
        $rootScope.username = null;
        $rootScope.user_id = null;
        $rootScope.loged = false;
    }
})

