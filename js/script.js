Vue.component( 'todo-item' , {
  props: ['todo', 'index', 'filter'],
  template:`<li>
    <input type="checkbox" v-on:change="updateStatus(todo)" :checked="todo.isCompleted">
    <label v-bind:class="[todo.isCompleted ? 'completed' : '']">{{ todo.text }}</label>
    <input type="text" v-if="todo.isEdit" v-on:keyup.enter="updateTodo($event, todo)" />
    <a v-on:click="editTodo(todo)" v-if="!todo.isEdit" class="btn">編輯</a>
    <a v-on:click="removeTodo(index)" class="btn">刪除</a>
  </li>`,
  methods: {
    removeTodo: function(index) {
      this.$emit('removetodo');
    },
    updateTodo: function($event, todo) {
      if($event.target.value) {
        todo.text = $event.target.value;
      }
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
        text: '買一本好書',
        isCompleted: false,
        isEdit: false
      },
      {
        text: '打電話給小明',
        isCompleted: true,
        isEdit: false
      },
      {
        text: '寫一篇文章',
        isCompleted: false,
        isEdit: false
      }
    ],
    newTodoText: '',
    filter: 'show_all'
  },
  computed: {
    list: function() {
      if(this.filter === 'show_all') {
        return this.todos;
      } else if (this.filter === 'show_completed') {
        return this._getTodos(true);
      } else { //show_incomplete
        return this._getTodos(false);
      }
    },
    allCount: function() {
      return this.todos.length;
    },
    completedCount: function() {
      var count = 0;

      for(var i = 0; i < this.todos.length; i++) {
        if(this.todos[i].isCompleted) {
          count++;
        }
      }

      return count;
    },
    incompleteCount: function() {
      var count = 0;

      for(var i = 0; i < this.todos.length; i++) {
        if(!this.todos[i].isCompleted) {
          count++;
        }
      }

      return count;
    }
  },
  methods: {
    add: function() {
      this.todos.push({
        text: this.newTodoText,
        isCompleted: false,
        isEdit: false
      });
      this.newTodoText = '';
    },
    delete: function(index) {
      this.todos.splice(index, 1);
    },
    setFilter: function(filter) {
      this.filter = filter;
    },
    _getTodos: function(isCompleted) {
      return this.todos.filter(function(value) {
        return value.isCompleted === isCompleted;
      });
    }
  }
});