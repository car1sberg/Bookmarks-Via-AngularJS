
(function (){

    function ActionService(){
        var self = this;
        var message = {
            key: 'You are at the main view'
        };

        self.getMessage = function(){
            return message;
        };

        self.setMessage = function(data){
            if (data !== null && data !== undefined){
                message.key = data;
            }
            else {
                message.key = 'Something went wrong';
            }
        };
    }

    angular
    .module('action.service', [])
    .service('ActionService', ActionService);
}());