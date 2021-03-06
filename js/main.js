//DATA STRUCTURE
var dataStrure = (function(){
    var List = function(id, value){
        this.id = id;
        this.value = value;
    };

    var dataBase = {
        value: []
    };
    return{
        addItemToDb: function(dataVa){
            var id, newObj;
            if (dataBase.value.length > 0) {
                id = dataBase.value[dataBase.value.length - 1].id + 1;
            }else{
                id = 0;
            }
            newObj = new List(id, dataVa);
            dataBase.value.push(newObj);
            return newObj;
        },
        deleteFrmDs: function(id){
            var ids, index;
            ids = dataBase.value.map(function(current){
                return current.id;
            });
            index = ids.indexOf(id);
            if (index !== -1) {
                dataBase.value.splice(index, 1);
            }
        }
        // ,
        // testing: function(){
        //     return dataBase.value;
        // }
    };    
})();

//UI MODULE
var uiModule = (function(){
    var domSelector = {
        plusButton: '.todo__app-nav--button',
        modal: '.add__task',
        input: '.input',
        modalAddBtn: '.button__add',
        modalDelBtn: '.button__delete',
        listContainer: '.todo__app--todo',
        completeBtn: '.action__txt',
        deleteBtn: '.action__txt',
        lineThrough: '.left',
        bubble: '.bubble'
    };

    return{
        allSelectors: function(){
            return domSelector;
        },
        domValue: function(){
            return document.querySelector(domSelector.input).value;
        },
        showActualData: function(objx){
            var htmxl, newHxtml, elementy;
            elementy = domSelector.listContainer;
            htmxl = '<div class="todo__list border-radius" id="list-%id%"><div class="flex align-items-center justify-content-between"><div class="left flex align-items-center"><div class="bubble"></div><div class="todo__list--task"><p class="color-black">%value%</p></div></div><div class="right"><div class="todo__list--task--action"><div class="menu__action"></div><div class="dropdown__action border-radius"><div class="row"><div class="flex align-items-center"><button class="action__pls margin-right-small"><span class="action-sign">&check;</span></button><div class="action__txt " id="action__txt--1">completed</div></div><div class="indicator-drp"></div></div><div class="row"><div class="flex align-items-center"><button class="action__pls margin-right-small"><span class="action-sign">&minus;</span></button><div class="action__txt" id="action__txt--2">delete task</div></div></div></div></div></div></div></div>';
            newHxtml = htmxl.replace('%id%', objx.id);
            newHxtml = newHxtml.replace('%value%', objx.value);
            document.querySelector(elementy).insertAdjacentHTML("afterend", newHxtml);
        },
        clearInput: function(){
            document.querySelector(domSelector.input).value = '';
            document.querySelector(domSelector.input).focus();
        },
        deleteData: function(prntId){   
            var toRmv = document.getElementById(prntId);
            toRmv.parentNode.removeChild(toRmv);
        }
    };
})();

//GLOBAL CONTROLLER MODULE
var controller = (function(dataSr, uiMo){
    var doms;
    doms = uiMo.allSelectors();
    
    var eventHandlr = function(){
        document.querySelector(doms.plusButton).addEventListener('click', function(){
            document.querySelector(doms.modal).style.display = 'block';
            document.querySelector(doms.modalAddBtn).addEventListener('click', dataControl);
            document.querySelector(doms.modalDelBtn).addEventListener('click', hideModal);
        });
        targetChecker();
    };

    var targetChecker = function(){
        document.addEventListener('click', function(event){
            var eventId = event.target.id;
            if (eventId === 'action__txt--1') { 
                var lineth 
                lineth = document.querySelector(doms.lineThrough);
                lineth.style.textDecoration = 'line-through';
                lineth.style.textDecorationColor  = 'red';
                document.querySelector(doms.bubble).style.background  = 'red';
            }else if(eventId === 'action__txt--2'){
                var parentId, sliceId, listTp, listId;
                parentId = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id;
                sliceId = parentId.split('-');
                listTp = sliceId[0];
                listId = parseInt(sliceId[1]);  
                dataSr.deleteFrmDs(listId);    
                uiMo.deleteData(parentId);
            }
        });
    };

    var hideModal = function(){
        document.querySelector(doms.modal).style.display = 'none';
    };
    
    var dataControl = function(){
        var dta = uiMo.domValue();
        if (dta != '') {
            // add the data to data base
            var storedData = dataSr.addItemToDb(dta);
            // add the data to ui
            uiMo.showActualData(storedData);
            uiMo.clearInput();
        }
    };

    return {
        init: function(){
            return eventHandlr();
        }
    };

})(dataStrure, uiModule);

controller.init();