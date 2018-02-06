(function (){
    angular
        .module('app', [
            'ui.router',
            'ngMaterial',
            'ngDialog',
            'ngAnimate',
            'bookmark.states',
            'category.states',
            'theme'
        ])
        .config(configure)

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
    };  
}());