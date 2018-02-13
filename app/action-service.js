
(function (){

    function ActionService(){
        var self = this;
        self.message = {
            key: 'You are at the main view'
        };

        self.getMessage = function(data){
            self.setMessage(data);
        };

        self.setMessage = function(data){
            if (data !== null && data !== undefined){
                self.message.key = data;
            }
            else {
                self.message.key = 'Something went wrong';
            }
        }
    }

    angular
    .module('action.service', [])
    .service('ActionService', ActionService);
}());