'use strict';
// import * as AWSCognito from 'amaon-cognito-identity-js';

angular.module('myApp').controller('ForgotCtrl', function ($scope, $location, cognitoService) {

  $scope.submit = function () {
    var userPool = cognitoService.getUserPool();

    var cognitoUser = cognitoService.getUser(userPool, $('#email').val());
    // var authenticationDetails = cognitoService.getAuthenticationDetails($('#email').val(), $('#password').val());


cognitoUser.forgotPassword({
        onSuccess: function(result) {
             $location.path('/login');
        },
        onFailure: function(err) {
            alert(err);
        },
        inputVerificationCode() { // this is optional, and likely won't be implemented as in AWS's example (i.e, prompt to get info)
            var verificationCode = prompt('Please input verification code ', '');
            var newPassword = $('#password').val();
            cognitoUser.confirmPassword(verificationCode, newPassword, this);
        }
    });

  };

  return false;

});
