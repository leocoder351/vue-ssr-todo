<template>
    <section class="real-app">
        <Tabs 
            :filter="filter" 
            :todos="todos" 
            @clearAllCompleted="clearAllCompleted" 
            @toggle="toggleFilter">
        </Tabs>

        <input
            type="text"
            class="add-input"
            autofocus="autofocus"
            placeholder="接下来要做什么？"
            @keyup.enter="addTodo">

        <Item 
            :todo="todo"
            v-for="todo in filteredTodos"
            :key="todo.id"
            @toggle="toggleTodoState"
            @del="deleteTodo">
        </Item>
    </section>
</template>

<script>
import Item from './item.vue';
import Tabs from './tabs.vue';

export default {
  data () {
    return {
      id: 0,
      todos: [],
      filter: 'all'
    };
  },
  components: {
    Item,
    Tabs
  },
  created () {
    // this.todos = JSON.parse(localStorage.getItem('vue-todo-items')) || [];
    this.todos = [];
    if (this.todos.length === 0) {
      this.id = 0;
    } else {
      this.id = this.todos[0].id;
    }
  },
  computed: {
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos;
      }
      const completed = this.filter === 'completed';
      return this.todos.filter(todo => completed === todo.completed);
    }
  },
  methods: {
    addTodo (e) {
      if (e.target.value.trim() === '') return;
      this.todos.unshift({
        id: ++this.id,
        content: e.target.value.trim(),
        completed: false
      });
      e.target.value = '';
      this.updateLocalStorage(this.todos);
    },
    toggleTodoState (id) {
      this.todos.forEach(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
      });
      this.updateLocalStorage(this.todos);
    },
    deleteTodo (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1);
      this.updateLocalStorage(this.todos);
    },
    clearAllCompleted () {
      this.todos = this.todos.filter(todo => todo.completed === false);
      this.updateLocalStorage(this.todos);
    },
    toggleFilter (state) {
      this.filter = state;
    },
    updateLocalStorage (todos) {
      // localStorage.setItem('vue-todo-items', JSON.stringify(todos));
    }
  }
};
</script>

<style lang="stylus" scoped>
.real-app {
  width: 600px;
  max-height: 800px;
  overflow-y: scroll;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}

.add-input {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 36px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
</style>
