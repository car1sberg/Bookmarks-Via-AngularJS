(function(){

    var categoryList = {
        templateUrl: 'app/categories/components/category-list.html',
        controller: function($stateParams, $state, CategoriesService, ngDialog, $timeout){
            var vm = this;

            CategoriesService.getCategories()
                .then(function(result){
                    vm.categories = result;
                });
        
            vm.deleteCategory = function(category){
                ngDialog.open({
                    template: 'app/categories/components/confirm-delete.html',
                    controllerAs: 'confirmDelCategoryCtrl',
                    controller: function(){
                        var self = this;

                        self.closeDialog = function(){
                            ngDialog.close();
                        }
                        self.delete = function(){
                            self.closeDialog();
                            CategoriesService.deleteCategory(category);
                            $timeout(function(){
                                $state.go('app.categories');
                            }, 800)
                        }
                    }
                });
                
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
