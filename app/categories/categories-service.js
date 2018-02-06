(function (){

    angular.module('categories.service', [])
    .service('CategoriesService', CategoriesService);


    function CategoriesService($http, $stateParams, $q) {
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

        vm.getCategories = function(){
            return (categories) ? $q.when(categories) : $http.get(URLS.FETCH).then(cacheCategories);
        }

        vm.deleteCategory = function(category){
            var confirmStatus = confirm('It will devare the category, press "Yes" to continue');
           
            if (confirmStatus) {
                _.pull(categories, category);
            }
            else {
                return vm.getCategories(); 
            }

        }
    }
    
}());