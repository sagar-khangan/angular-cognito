'use strict';
// import * as AWSCognito from 'amaon-cognito-identity-js';

angular.module('myApp').controller('LoginCtrl', function ($scope, $location, cognitoService) {

  $scope.submit = function () {
    var userPool = cognitoService.getUserPool();

    var cognitoUser = cognitoService.getUser(userPool, $('#email').val());
    var authenticationDetails = cognitoService.getAuthenticationDetails($('#email').val(), $('#password').val());



    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        var accessToken = result.getAccessToken().getJwtToken();
        $scope.accessToken = accessToken;

        var currentUser = userPool.getCurrentUser();
        $location.path('/contents');
        $scope.$apply();
      },
      onFailure: function (err) {
        $scope.errorMessage = 'Email address or password is not correct, try again!!';
        $scope.$apply();
      },

    });
  };

  return false;

});
