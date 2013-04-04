angular
    .module('indexDirective', [])
    .factory('utilities', function(){

        return {
            constrain: function(v, min, max){
                v = Math.max(v, min);
                v = Math.min(v, max);
                return v;
            }
        };
    })
;