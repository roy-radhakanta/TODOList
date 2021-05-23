//DATA STRUCTURE
var dataStrure = (function(){

})();


//UI MODULE
var uiModule = (function(){
    var domSelector = {
        plusButton: '.todo__app-nav--button',
        modal: '.add__task',
        input: '.input',
        modalAddBtn: '.button__add',
        modalDelBtn: '.button__delete'
    };

    return{
        allSelectors: function(){
            return domSelector;
        }
    };
})();


//GLOBAL CONTROLLER
var controller = (function(dataSr, uiMo){
    var doms;
    doms = uiMo.allSelectors();
    console.log(doms);
    var eventHandlr = function(){
        document.querySelector(doms.plusButton).addEventListener('click', function(){
            document.querySelector(doms.modal).style.display = 'block';
            var addButton = document.querySelector(doms.modalAddBtn);
            var deleteButton = document.querySelector(doms.modalDelBtn);
            if (condition) {
                
            }
        });
    };

    return {
        init: function(){
            return eventHandlr();
        }
    };

})(dataStrure, uiModule);

controller.init();