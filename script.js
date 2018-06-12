var listController = (function() {

  //Urgency function constructors
  var Today = function(id,urgency,title,description,when){
    this.id = id;
    this.urgency = urgency;
    this.title = title;
    this.description = description;
    this.when = when
  }

  var Tomorrow = function(id,urgency,title,description,when){
    this.id = id;
    this.urgency = urgency;
    this.title = title;
    this.description = description;
    this.when = when
  }

  var ThisWeek = function(id,urgency,title,description,when){
    this.id = id;
    this.urgency = urgency;
    this.title = title;
    this.description = description;
    this.when = when
  }

  var NextWeek = function(id,urgency,title,description,when){
    this.id = id;
    this.urgency = urgency;
    this.title = title;
    this.description = description;
    this.when = when
  }

  var Future = function(id,urgency,title,description,when){
    this.id = id;
    this.urgency = urgency;
    this.title = title;
    this.description = description;
    this.when = when
  }

  var dates = {
      Today: [],
      Tomorrow: [],
      ThisWeek: [],
      NextWeek: [],
      Future: []
  }

  return{
    addItem: function(when, urg, title, desc){
      var newItem, itemId;

      //create new ID
      if(dates[when].length > 0){
        itemId = dates[when][dates[when].length - 1].id + 1;
      } else{
        itemId = 0;
      }

      //create new item based on 'high', 'medium' or 'low' urgency
      if(when === 'Today'){
        newItem = new Today(itemId,urg,title,desc,when);
      } else if (when === 'Tomorrow'){
        newItem = new Tomorrow(itemId,urg,title,desc,when);
      }else if(when === 'ThisWeek'){
        newItem = new ThisWeek(itemId,urg,title,desc,when);
      }else if(when === 'NextWeek'){
        newItem = new NextWeek(itemId,urg,title,desc,when);
      }else{
        newItem = new Future(itemId,urg,title,desc,when);
      }

      //push it into our data structure
      dates[when].push(newItem); //all of these new items will be added to their corresponding array in the data object and inside the data object in the allItems object
      //console.log(newItem);

      //return the new element
      return newItem;
    },

    getCount: function(when){
      return dates[when].length;
    }
  }

}());

var UIController = (function(lc) {
  function nodeListForEach(list, callback){
    for(var i = 0; i < list.length; i++){
        callback(list[i], i);
    }
  };

  return{
    displayDate: function(){
      var currentDate = new Date();
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      var year = currentDate.getFullYear();
      var currentMonth = months[currentDate.getMonth()];
      var day = currentDate.getDate();
      document.querySelector('.current_date').textContent = currentMonth + " " + day + ", " + year;
    },
    getInput: function(){
      return{
        urgency: document.querySelector('.add_urgency').value,
        title: document.querySelector('.add_title').value,
        description: document.querySelector('.add_description').value,
        when: document.querySelector('.add_when').value
      };
    },

    addItemToScreen: function(item, when){
      var html, newHtml, element;
      //create html string with placeholder text
      if(when === 'Today'){
        element = '.today_list';
        html = '<div class="list_item" id="today_%id%"><div class="list_item_urgency"><p>%urgency%</p></div><div class="list_item_info"><p class="list_item_title">%title%</p><p class="list_item_desc">%description%</p></div></div>';
      }else if(when === 'Tomorrow'){
        element = '.tomorrow_list';
        html = '<div class="list_item" id="tomorrow_%id%"><div class="list_item_urgency"><p>%urgency%</p></div><div class="list_item_info"><p class="list_item_title">%title%</p><p class="list_item_desc">%description%</p></div></div>';
      }else if(when === 'ThisWeek'){
        element = '.thisWeek_list';
        html = '<div class="list_item" id="thisWeek_%id%"><div class="list_item_urgency"><p>%urgency%</p></div><div class="list_item_info"><p class="list_item_title">%title%</p><p class="list_item_desc">%description%</p></div></div>';
      }else if(when === 'NextWeek'){
        element = '.nextWeek_list';
        html = '<div class="list_item" id="nextweek_%id%"><div class="list_item_urgency"><p>%urgency%</p></div><div class="list_item_info"><p class="list_item_title">%title%</p><p class="list_item_desc">%description%</p></div></div>';
      }else{
        element = '.future_list';
        html = '<div class="list_item" id="Future_%id%"><div class="list_item_urgency"><p>%urgency%</p></div><div class="list_item_info"><p class="list_item_title">%title%</p><p class="list_item_desc">%description%</p></div></div>';
      }

      //replace placeholder text with actual data
      newHtml = html.replace('%id%',item.id);
      newHtml = newHtml.replace('%urgency%',item.urgency);
      newHtml = newHtml.replace('%title%',item.title);
      newHtml = newHtml.replace('%description%',item.description);


      //console.log(newHtml);
      //insert html into the dom and relativly sort by urgency (prob not best way)
      if(item.urgency === 'High'){
        document.querySelector(element).insertAdjacentHTML('beforebegin', newHtml);
      }else if(item.urgency === 'Medium'){
        document.querySelector(element).insertAdjacentHTML('afterbegin', newHtml);
      }else{
        document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
      }
    },

    addCountToScreen: function(when){
      var el, html, newHtml;

      var count = lc.getCount(when);

      if(when === 'Today'){
        html = '<span class="num_when_today">(%0%)</span></p>';
        newHtml = html.replace('%0%',count);
        document.querySelector('.num_when_today').innerHTML = newHtml;
      }else if(when === 'Tomorrow'){
        html = '<span class="num_when_tom">(%0%)</span></p>';
        newHtml = html.replace('%0%',count);
        document.querySelector('.num_when_tom').innerHTML = newHtml;
      }else if(when === 'ThisWeek'){
        html = '<span class="num_when_thisWeek">(%0%)</span></p>';
        newHtml = html.replace('%0%',count);
        document.querySelector('.num_when_thisWeek').innerHTML = newHtml;
      }else if(when === 'NextWeek'){
        html = '<span class="num_when_nextWeek">(%0%)</span></p>';
        newHtml = html.replace('%0%',count);
        document.querySelector('.num_when_nextWeek').innerHTML = newHtml;
      }else{
        html = '<span class="num_when_future">(%0%)</span></p>';
        newHtml = html.replace('%0%',count);
        document.querySelector('.num_when_future').innerHTML = newHtml;
      }

      //console.log(count);
    },

    clearInputFields: function(){
      var fields = document.querySelectorAll(
        '.add_title' + ',' +
        '.add_description'
      );
      nodeListForEach(fields, function(cur){
        cur.value = "";
      });
    },

    selectToDefault: function(){
      var selects = document.querySelectorAll(
        '.add_urgency' + ',' +
        '.add_when'
      );
      nodeListForEach(selects, function(cur){
        cur.selectedIndex = 0;
      })
    }
  }

}(listController));

var appController = (function(listCtrl, UICtrl) {
  function setupEventListeners(){
    document.querySelector('.add_btn').addEventListener('click', openModal);

    document.querySelector('.close_btn').addEventListener('click',closeModal);

    window.addEventListener('click',windowCloseModal);

    document.querySelector('.add_input_btn').addEventListener('click', addListItem);
  }

  function openModal(){
    document.getElementById('add_btn_modal').style.display = 'block';
  }

  function closeModal(){
    document.getElementById('add_btn_modal').style.display = 'none';
  }

  function windowCloseModal(event) {
    if(event.target === document.getElementById('add_btn_modal')){
      document.getElementById('add_btn_modal').style.display = 'none';
    }
  }

  function addListItem(){
    var input, newItem;

    input = UICtrl.getInput(); //get the input

    //check and see if title and desc are blank or not
    if(input.title !== "" && input.description !== ""){
      newItem = listCtrl.addItem(input.when,input.urgency,input.title, input.description);

      UICtrl.addItemToScreen(newItem, input.when);

      UICtrl.addCountToScreen(input.when);

      closeModal();

      UICtrl.clearInputFields();
      
      UICtrl.selectToDefault();
    }
  }

  return {
    init: function() {
      console.log("app has started");
      setupEventListeners();
      UICtrl.displayDate();
    }
  };
}(listController, UIController));

appController.init();
