(function(){
    angular
    .module('bookmark.states',[
        'bookmarks.service',
        'bookmark.components'
    ])
    .config(configure);

    function configure($stateProvider){
        $stateProvider
        .state('app.bookmarks', {
            url: 'categories/:category',
            views: {
                'bookmarks': {
                    component: 'bookmarkList'
                },
                'categories': {
                    component: 'categoryList'
                }
            }
        })
        .state('app.bookmarks.create', {
            url: '/bookmark/create',
            views: {
                'bookmark-create': {
                    component: 'bookmarkCreate'
                }
            }
        })
        .state('app.bookmarks.edit', {
            url: '/bookmark/edit/:bookmarkId',
            views: {
                'bookmark-edit': {
                    component: 'bookmarkEdit'
                }
            }        
        })
    }
}());