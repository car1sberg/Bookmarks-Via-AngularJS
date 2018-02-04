(function(){
    angular
    .module('category.states', [
        'category.components',
        'categories.service'
    ])

    .config(configure)

    function configure($stateProvider){
        $stateProvider
        .state('app.categories.create', {
            url: 'category/create',
            views: {
                'category-create': {
                    component: 'categoryCreate'
                }
            }
        });
    }
}());