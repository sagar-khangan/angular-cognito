'use strict';

angular.module('myApp').controller('ActivateCtrl', function ($scope, $location, cognitoService) {

  $scope.submit = function () {
    var userPool = cognitoService.getUserPool();

    var cognitoUser = cognitoService.getUser(userPool, $('#email').val());
    var authenticationDetails = cognitoService.getAuthenticationDetails($('#email').val(), $('#old_password').val());

    var new_password = $('#new_password').val();

     cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        var accessToken = result.getAccessToken().getJwtToken();
        $scope.accessToken = accessToken;

        var currentUser = userPool.getCurrentUser();
        alert("password Changed");
        $location.path('/login');
        $scope.$apply();
      },
      onFailure: function (err) {
        $scope.errorMessage = 'Email address or password is not correct, try again!!';
        $scope.$apply();
      },
      newPasswordRequired: function(userAttributes, requiredAttributes) {

            delete userAttributes.email_verified;
            cognitoUser.completeNewPasswordChallenge(new_password, userAttributes, this)
        }

    });
  };


  return false;
});
