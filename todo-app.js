(function () {
  let todoArray;
  //создаём и возращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  };
  //создаём и возращаем форму для создания дела
  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';
    button.disabled = !input.value.length

    input.addEventListener('input', function() {
      button.disabled = !input.value.length
    });

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    };
  };
  //создаём и возращаем список элементов
  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  };
  //cоздание элементов
  function createTodoItem(task, index) {
    let item = document.createElement('li');
    let buttonGroup = document.createElement('div')
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');
  
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = task;
  
    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';
  
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);
  
    return {
      item,
      doneButton,
      deleteButton,
      buttonGroup,
    };
  };

  function createTask (name) {
    this.name = name;
    this.done = false;
  }

  function updateLocal () {
    localStorage.setItem(whoTask, JSON.stringify(todoArray))
  }
  
  function createTodoApp (container, title = 'Список дел', whoTask) {

    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList); 

    //проверка localstorge
    let localStorageData = localStorage.getItem(whoTask);

    if (localStorageData == null) {
      todoArray = []
    } else {
      todoArray = JSON.parse(localStorageData);
     }
    // создание дела
    const fillHtmlList = () => {
      todoList.innerHTML = '';
      if (todoArray.length > 0) {
        todoArray.forEach((item, index) => {
          let todoItem = createTodoItem(item.name, index);
          //Cоздание дела
          todoList.append(todoItem.item);

          if (todoArray[index].done === true) {
              todoItem.item.classList.toggle('list-group-item-success')
          } else {
              todoItem.item.classList.remove('list-group-item-success')
          }

          //Кнопка Готово
          todoItem.doneButton.addEventListener('click', function(){
            todoItem.item.classList.toggle('list-group-item-success');
            todoArray[index].done = !todoArray[index].done;
            updateLocal();
            fillHtmlList();
          });
          //Кнопка Удалить
          todoItem.deleteButton.addEventListener('click', function(){
            if (confirm('Вы уверены?')) {
              todoArray.splice (index, 1);
              todoItem.item.remove();
              updateLocal();
              fillHtmlList();
            } 
          });
          //
        });
      };
    };
    fillHtmlList();
    updateLocal();



    todoItemForm.form.addEventListener('submit', function(e){
      //эта строчка необходима, чтобы предотвратить стандартное дейсвие браузера
      //в данном случае мы не хотим, чтобы страница перезагружа   лась при отправке формы
      e.preventDefault();
      
      //игнорируем создание, если пользователь ничего не ввёл в поле
      if (!todoItemForm.input.value) {
        return
      };
      
      todoArray.push(new createTask(todoItemForm.input.value));
      updateLocal();
      fillHtmlList();


      //Добавляем обробочик на кнопки
      /*todoItem.doneButton.addEventListener('click', function(){
        todoItem.item.classList.toggle('list-group-item-success');
      });
      todoItems.deleteButton.addEventListener('click', function(){
        if (confirm('Вы уверены?')) {
          todoItem.item.remove();
        }
      });*/

      //создаём и добавляем в список новое дело
      //todoList.append(todoItem.item);
      // обнуляем значение в поле, чтобы не пришлось стирать его в ручную
      todoItemForm.input.value = '';
      todoItemForm.button.disabled = !todoItemForm.button.disabled

    });
  }

  window.createTodoApp = createTodoApp;
})();


