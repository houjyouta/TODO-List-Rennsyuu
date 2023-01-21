var todos = JSON.parse(localStorage.getItem('todos')) || [];
  var todoList = document.getElementById('todo-list');
  var todoForm = document.getElementById('todo-form');
  var todoInput = document.querySelector('#todo-form input');
  var render = function() {

    todoList.innerHTML = '';
    todos.forEach(function(todo) {
      var checkBox = document.createElement('input');
      checkBox.type = 'checkbox';
      
      if (todo.done) {
        checkBox.checked = true;

      }
      checkBox.addEventListener('change', function(event) {
        todo.done = event.target.checked;
        render();
      });

      var span = document.createElement('span');
      span.textContent = todo.text;

      var label = document.createElement('label');
      label.appendChild(checkBox);


      label.appendChild(span);

      var deleteButton = document.createElement('button');
      deleteButton.textContent = '削除';

      deleteButton.addEventListener('click', function() {
        var index = todos.indexOf(todo);
        if (todos[index]) {
          todos.splice(index, 1);
          render();
        }
      });



      var listItem = document.createElement('li');
      listItem.appendChild(label);
      listItem.appendChild(deleteButton);
      todoList.appendChild(listItem);
    });


    localStorage.setItem('todos', JSON.stringify(todos));
  };
  var addItem = function(event) {
    event.preventDefault();

    if (!todoInput.value) {
      return;
    }

    todos.push({text: todoInput.value, done: false});
    render();

    todoInput.value = '';
  };

  todoForm.addEventListener('submit', addItem);
  render();