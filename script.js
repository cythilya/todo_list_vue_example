Vue.component( 'todo-item' , {
  props: ['todo', 'index', 'filter'],
  template:`<li v-if="showCompletedTodo(todo.isCompleted, filter)">
    <input type="checkbox" v-on:change="updateStatus(todo)" :checked="todo.isCompleted">
    <label v-bind:class="[todo.isCompleted ? 'completed' : '']">{{ todo.text }}</label>
    <input type="input" v-if="todo.isEdit" v-on:keyup.enter="updateTodo($event, todo)" />
    <button v-on:click="editTodo(todo)" v-if="!todo.isEdit">edit</button>
    <button v-on:click="removeTodo(index)">x</button>
  </li>`,
  methods: {
    removeTodo: function(index) {
      this.$emit('removetodo');
    },
    updateTodo: function($event, todo) {
      todo.text = $event.target.value;
      todo.isEdit = !todo.isEdit;
    },
    updateStatus: function(todo) {
      todo.isCompleted = !todo.isCompleted;
    },
    editTodo: function(todo) {
      todo.isEdit = !todo.isEdit;
    },
    showCompletedTodo: function(isCompleted, filter) {
      return !(!isCompleted && filter === 'show_completed');
    }
  }
});

var app = new Vue({
  el: '#app',
  data: {
    todos: [
      {
        text: 'Buy a book',
        isCompleted: false,
        isEdit: false
      },
      {
        text: 'Call Mary',
        isCompleted: true,
        isEdit: false
      },
      {
        text: 'Write an article',
        isCompleted: false,
        isEdit: false
      }
    ],
    newTodoText: '',
    filter: 'show_all'
  },
  methods: {
    addTodo: function() {
      this.todos.push({
        text: this.newTodoText,
        isCompleted: false,
        isEdit: false
      });
      this.newTodoText = ''
    },
    deletetodo: function(index) {
      this.todos.splice(index, 1);
    },
    isShowForCompletedFilter: function(todo) {
      return !(!todo.isCompleted && this.filter === 'show_completed');
    },
    showAll: function() {
      this.filter = 'show_all';
    },
    showCompleted: function() {
      this.filter = 'show_completed';
    }
  }
});