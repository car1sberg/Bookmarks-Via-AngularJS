(function (){

    angular.module('categories.service', [])
    .service('CategoriesService', CategoriesService);

    function CategoriesService($http, $stateParams, $q, BookmarksService, ngDialog) {
        var vm = this,
            URLS = {
			    FETCH: 'json/categories.json'
            }, 
            categories;

        function extract(result){
            return result.data;
        }

        function cacheCategories(result){
            categories = extract(result);
            return categories;
        }

        vm.createCategory = function(category){
            categories.push({
            id: _.uniqueId('100'),
            name: category
            });             
        }

        vm.categoryExists = function(category){
            return _.find(categories, {name: category});
        }

        vm.getCategories = function(){
            return (categories) ? $q.when(categories) : $http.get(URLS.FETCH).then(cacheCategories);
        }

        vm.deleteCategory = function(category){
            _.pull(categories, category);
            BookmarksService.deleteBookmarksByCategory(category)
        }
    }
}());