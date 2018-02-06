(function(){

    var categoryList = {
        templateUrl: 'app/categories/components/category-list.html',
        controller: function($stateParams, $state, CategoriesService, BookmarksService){
            var vm = this;

            CategoriesService.getCategories()
                .then(function(result){
                    vm.categories = result;
                });
        
            vm.deleteCategory = function(category){
                CategoriesService.deleteCategory(category);
                BookmarksService.deleteBookmarksByCategory(category)
            }
        }
    };

    var categoryCreate = {
        templateUrl: 'app/categories/components/category-create.html',
        controller: function ($stateParams, $state, CategoriesService){
            var vm = this;

            vm.createCategory = function(category){
                setTimeout(function(){
                    CategoriesService.createCategory(category);
                    $state.go('app.categories');
                }, 400)
            }            

            vm.cancelCreating = function(){
                setTimeout(function(){
                    $state.go('app.categories');
                }, 400)                
            }
        }
    }
    
    angular.module('category.components',[])
    
    .component('categoryList', categoryList)
    .component('categoryCreate', categoryCreate)
}());
