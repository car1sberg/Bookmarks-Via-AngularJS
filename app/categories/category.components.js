(function(){

    var categoryList = {
        templateUrl: 'app/categories/components/category-list.html',
        controller: function($stateParams, $state, CategoriesService){
            var vm = this;

            CategoriesService.getCategories()
                .then(function(result){
                    vm.categories = result;
                });
        
            vm.deleteCategory = function(category){
                CategoriesService.deleteCategory(category);
            }
        }
    };

    var categoryCreate = {
        templateUrl: 'app/categories/components/category-create.html',
        controller: function ($stateParams, $state, CategoriesService){
            var vm = this;

            vm.createCategory = function(category){
                CategoriesService.createCategory(category);
                $state.go('app.categories');
            }            

            vm.cancelCreating = function(){
                $state.go('app.categories');
            }
        }
    }
    
    angular.module('category.components',[])
    
    .component('categoryList', categoryList)
    .component('categoryCreate', categoryCreate)
}());
