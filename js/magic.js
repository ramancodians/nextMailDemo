var app = angular.module('bunky', ['ngRoute', 'ngAnimate', 'ngStorage']);

app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
        when('/', {
                templateUrl: 'views/login.html',               
            })
            .when('/home', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
  }]);

// Authentication
app.service('Auth', function ($http, $localStorage) {
    var CLIENT_ID = '139561841666-ipgrvtk01lvem0a61j4gksv1r90vaktr.apps.googleusercontent.com';
    var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

    this.signIn = function () {
        console.log('Login User');
        // Call Google API,
        gapi.auth.authorize(
            {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
            this.handleAuthResult);
        return false;
    }

    this.handleAuthResult = function (authResult) {
        console.log('handle Auth Result');
        if (authResult && !authResult.error) {
            $localStorage.isLogged = true;
            console.log(authResult)
            //loadCalendarApi();
        } else {
            $localStorage.isLogged = true;
        }
    }

    this.getUserData = function () {
        return data;
    }
    
    // save user data on Browser/Machine
    this.isLogged = function () {
        if ($localStorage.isLoggedOnThis){
            data = $localStorage.userData;
            return 1;
        }else{
            return 0;
        }
    }

    this.logUSer = function (user) {
        //storing data on local storage
        $localStorage.userData = user;

        // remembering user is logged on this Machine
        if (!$localStorage.isLoggedOnThis)
            $localStorage.isLoggedOnThis = true;
        
        logged = true;
        // to share across service
        data = user;
    }

    this.logout = function () {
        // reset all varials        
        data = {};
        logged = false;
        $localStorage.isLoggedOnThis = false;
        return 1;
    }
});


/*CONTROLLER
 ***********************************************************************************/
app.controller('LoginCtrl', function ($scope, $http, Auth, $location) {
    // Directly Redirect User if Logged
    Auth.isLogged()?  $location.path('/home') : null;
    $scope.test = 'working'

    $scope.signIn = function () {
        console.log('asdsa')
        Auth.signIn();
    }

});



app.controller('HomeCtrl', ['$scope', 'Attendance', 'Auth', '$location', '$http', function ($scope, Attendance, Auth, $location, $http) {
    // Check if used is Logged
    !Auth.isLogged() ? $location.path('/login') : null;
}]);