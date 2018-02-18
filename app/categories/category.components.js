(function(){

    var categoryList = {
        templateUrl: 'app/categories/components/category-list.html',
        controller: function($stateParams, $state, CategoriesService, ActionService, ngDialog, $timeout){
            var vm = this;

            CategoriesService.getCategories()
                .then(function(resolve){
                    vm.categories = resolve;
                });
        
            vm.deleteCategory = function(category){
                ngDialog.open({
                    template: 'app/categories/components/confirm-delete.html',
                    controllerAs: 'confirmDelCategoryCtrl',
                    controller: function(){
                        var self = this;

                        // action message
                        ActionService.setMessage(`You are deleting a ${category.name} category`);

                        self.closeDialog = function(){
                            ngDialog.close();
                            ActionService.setMessage('Let it be alive')
                        };
                        self.delete = function(){
                            ActionService.setMessage(`${category.name} category was deleted!`);
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
                ActionService.setMessage('You are creating a category');
            };

            vm.logoClick = function(){
                ActionService.setMessage('You are at the main view');
            }

            vm.categoryClick = function(category){
                ActionService.setMessage(`${category} category is chosen`)
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
                    ActionService.setMessage(`You\'ve just created a ${category} category`)
                    $state.go('app.categories'); 
                }
            };

            vm.cancelCreating = function(){
                $state.go('app.categories');
                // activity message
                ActionService.setMessage('Creation canceled');
            }
        }
    };
    
    angular.module('category.components',[])
    
    .component('categoryList', categoryList)
    .component('categoryCreate', categoryCreate)
}());
