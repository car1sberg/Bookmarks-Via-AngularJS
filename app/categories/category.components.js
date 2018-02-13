(function(){

    var categoryList = {
        templateUrl: 'app/categories/components/category-list.html',
        controller: function($stateParams, $state, CategoriesService, ActionService, ngDialog, $timeout){
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

                        // action message
                        ActionService.getMessage(`You are deleting a ${category.name} category`);

                        self.closeDialog = function(){
                            ngDialog.close();
                            ActionService.getMessage('Let it be alive')
                        };
                        self.delete = function(){
                            ActionService.getMessage(`${category.name} category was deleted!`);
                            ngDialog.close();
                            CategoriesService.deleteCategory(category);
                            $timeout(function(){
                                $state.go('app.categories');
                            }, 800)
                        }
                    }
                });
            };

            // activity message
            vm.categoryCreateClick = function(){
                ActionService.getMessage('You are creating a category');
            };

            vm.logoClick = function(){
                ActionService.getMessage('You are at the main view');
            }
        }
    };

    var categoryCreate = {
        templateUrl: 'app/categories/components/category-create.html',
        controller: function ($stateParams, $state, CategoriesService, ngDialog, $timeout, ActionService){
            var vm = this;

            vm.createCategory = function(category){
                var categoryAlreadyExists = CategoriesService.categoryExists(category);

                if (categoryAlreadyExists) {
                    ngDialog.open({
                        template: 'app/categories/components/category-exists.html',
                        controller: function(){
                            $timeout(function(){
                                ngDialog.close();
                            }, 3000)
                        }
                    });
                }
                else {
                    CategoriesService.createCategory(category);
                    ActionService.getMessage(`You\'ve just created a ${category} category`)
                    $state.go('app.categories'); 
                }
            };

            vm.cancelCreating = function(){
                $state.go('app.categories');
                // activity message
                ActionService.getMessage('Creation canceled');
            }
        }
    };
    
    angular.module('category.components',[])
    
    .component('categoryList', categoryList)
    .component('categoryCreate', categoryCreate)
}());
