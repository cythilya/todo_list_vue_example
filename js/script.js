Vue.component( 'todo-item' , {
  props: ['todo', 'index', 'filter'],
  template:`<li>
    <input type="checkbox" v-on:change="updateStatus(todo)" :checked="todo.isCompleted">
    <label v-if="!todo.isEdit" v-bind:class="[todo.isCompleted ? 'completed' : '']">{{ todo.text }}</label>
    <input type="text" v-if="todo.isEdit" v-on:keyup.enter="updateTodo($event, todo)" v-model="todo.text" />
    <a v-on:click="editTodo(todo)" v-if="!todo.isEdit" class="btn">編輯</a>
    <a v-on:click="remove(index)" class="btn">刪除</a>
  </li>`,
  methods: {
    remove: function(index) {
      this.$emit('remove');
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
        uuid: 'a5436691-350c-4ed0-862e-c8abc8509a4a',
        text: '買一本好書',
        isCompleted: false,
        isEdit: false
      },
      {
        uuid: 'a98bf666-a710-43b2-81b2-60c68ec4688d',
        text: '打電話給小明',
        isCompleted: true,
        isEdit: false
      },
      {
        uuid: '452ef417-033d-48ff-9fec-9d686c105dce',
        text: '寫一篇文章',
        isCompleted: false,
        isEdit: false
      }
    ],
    newTodoText: '',
    filter: 'show_all'
  },
  computed: {
    todosData: function() {
      return JSON.stringify(this.todos);
    },
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
      return this.todos.filter(function(value) {
        return value.isCompleted
      }).length;
    },
    incompleteCount: function() {
      return this.todos.filter(function(value) {
        return !value.isCompleted
      }).length;
    }
  },
  methods: {
    add: function() {
      this.todos.push({
        uuid: this._uuid(),
        text: this.newTodoText,
        isCompleted: false,
        isEdit: false
      });
      this.newTodoText = '';
    },
    del: function(index) {
      this.todos.splice(index, 1);
    },
    setFilter: function(filter) {
      this.filter = filter;
    },
    _uuid: function() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
    },
    _getTodos: function(isCompleted) {
      return this.todos.filter(function(value) {
        return value.isCompleted === isCompleted;
      });
    }
  }
});