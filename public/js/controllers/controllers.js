angular.module('TWS.controllers',['TWS.services'])
    .controller('LoginCtrl', function LoginCtrl($scope, UserService, $location, $rootScope) {
        $scope.username = null;
        $scope.password = null;

        $('#login-button').click(function () {
            UserService.signin( $scope.username, $scope.password).then(function (data) {
                $location.path('/emp-rent')
                //$rootScope.$apply(function () {
                //
                //    }
                //)
            }, function (data) {
                console.log(data)
            });

        })
    })
    .controller('EmpCtrl', function ($scope, $rootScope, EmpService, ToolService) {
        console.log('helll')
        ToolService.getAllTools().then(function (data) {
            $scope.toolInfo = data;
        }, function (data) {
            console.log(data);
        });
        $scope.rentInfo = EmpService.getRentInfo();
        $scope.returnTool = function (info) {
            EmpService.returnTool(info)
        }
    })
    .controller('AdminCtrl', function () {

    })


