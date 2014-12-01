    Parse.initialize("gzFQPPrc51Uc10qhHb5Y4G9det5rRhb9GiA76E13", "uVhwBjbYgTVlG1hoTBYMpg69SzwwdsEzCgwOJh4j");
    var myapp = angular.module('myapp', ['ngRoute']);

    var currentUser = null;

    // configure our routes
    myapp.config(function($routeProvider) {

        $routeProvider

        // login page
        .when('/', {
            templateUrl: 'pages/login.html',
            controller: 'loginController'
        })

        .when('/login', {
            templateUrl: 'pages/login.html',
            controller: 'loginController'
        })

        .when('/userpage', {
            templateUrl: 'pages/userpage.html',
            controller: 'userpageController'
        })

        .when('/register', {
            templateUrl: 'pages/register.html',
            controller: 'registerController'
        })

    });