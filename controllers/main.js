///////////////////////////////////////////////////////////
//                    Main Controller                    //
///////////////////////////////////////////////////////////
myapp.controller('loginController', function($scope, $location) {

    console.log('okay im in the main controller, lets get goin');



    //gether the login data and login the user
    $scope.login = function() {
        var username = $('#username').val();
        var password = $('#password').val();

        //use external parse API to validate user
        Parse.User.logIn(username, password, {
            success: function(user) {
                $location.path("/userpage"); //change to the users logged in page
                $scope.$apply(); //force angulare to switch pages immediately
            },
            error: function(user, error) { //user login infor was probably wrong
                $('#username').val("");
                $('#password').val("");
            }
        });
    }

    $scope.register = function() {
        $location.path("/register"); //change to the users register page
        $scope.$apply(); //force angulare to switch pages immediately
    }

});

///////////////////////////////////////////////////////////
//                Userpage Controller                    //
///////////////////////////////////////////////////////////
myapp.controller('userpageController', function($scope, $location) {

    visualNav(); // add the visual effects to the nav

    $scope.logout = function() {
        $location.path("/login");
    }

    $('#form').html(); = '<button>LOL</button>';

    console.log('hur');

});

///////////////////////////////////////////////////////////
//                Register Controller                    //
///////////////////////////////////////////////////////////
myapp.controller('registerController', function($scope, $location) {

    $scope.back = function() {
        $location.path("/login"); //change to the users login page
    }

    $scope.register = function() {

        //create a new user using values from the fields
        var user = new Parse.User();
        user.set("username", $('#username').val());
        user.set("password", $('#password').val());
        user.set("email", $('#email').val());

        user.signUp(null, {
            success: function(user) {
                $location.path("/login");
                $scope.$apply(); //force angulare to switch pages immediately
            },
            error: function(user, error) {
                // Show the error message somewhere and let the user try again.
                alert(error.message);
            }
        });

    }

});




var visualNav = function() {
    jQuery(document).ready(function($) {
        var $lateral_menu_trigger = $('#cd-menu-trigger'),
            $content_wrapper = $('.cd-main-content'),
            $navigation = $('header');

        //open-close lateral menu clicking on the menu icon
        $lateral_menu_trigger.on('click', function(event) {
            event.preventDefault();

            $lateral_menu_trigger.toggleClass('is-clicked');
            $navigation.toggleClass('lateral-menu-is-open');
            $content_wrapper.toggleClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
                // firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
                $('body').toggleClass('overflow-hidden');
            });
            $('#cd-lateral-nav').toggleClass('lateral-menu-is-open');

            //check if transitions are not supported - i.e. in IE9
            if ($('html').hasClass('no-csstransitions')) {
                $('body').toggleClass('overflow-hidden');
            }
        });

        //close lateral menu clicking outside the menu itself
        $content_wrapper.on('click', function(event) {
            if (!$(event.target).is('#cd-menu-trigger, #cd-menu-trigger span')) {
                $lateral_menu_trigger.removeClass('is-clicked');
                $navigation.removeClass('lateral-menu-is-open');
                $content_wrapper.removeClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
                    $('body').removeClass('overflow-hidden');
                });
                $('#cd-lateral-nav').removeClass('lateral-menu-is-open');
                //check if transitions are not supported
                if ($('html').hasClass('no-csstransitions')) {
                    $('body').removeClass('overflow-hidden');
                }

            }
        });

        //open (or close) submenu items in the lateral menu. Close all the other open submenu items.
        $('.item-has-children').children('a').on('click', function(event) {
            event.preventDefault();
            $(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(200).end().parent('.item-has-children').siblings('.item-has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(200);
        });
    });
}




//4scrull