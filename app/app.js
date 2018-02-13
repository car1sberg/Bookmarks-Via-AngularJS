(function (){

    var bigBrother = {
        template: '<p>{{ $ctrl.message.key }}</p>',
        controller: function(ActionService){
            var self = this;
            self.message = ActionService.message;
        }
    };
        
    function configure($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('app', {
                abstract: true,
                url: '/',
                views: {
                    '': {
                        templateUrl: 'content.html'
                    }
                }
            })

            .state('app.categories', {
                url: '',
                views: {
                    'categories': {
                        component: 'categoryList'
                    },
                    'bookmarks': {
                        component: 'bookmarkList'
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
    }

    angular
        .module('app', [
            'ui.router',
            'ngMaterial',
            'ngDialog',
            'ngAnimate',
            'bookmark.states',
            'category.states',
            'theme',
            'action.service'
        ])
        .component('bigBrother', bigBrother)
        .config(configure)
}());