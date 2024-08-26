const App = {
  data() {
    return {
      input: {
        value: "",
      },
      editInput: {
        editInput: null,
        editText: "",
        inEditItem: false,
      },
      notes: ["Task 1", "Task 2", "Task 3"],
    };
  },
  mounted() {
    this.getNotes();
  },
  watch: {
    notes: {
      handler(updatedList) {
        localStorage.setItem("items", JSON.stringify(updatedList));
      },
      deep: true,
    },
  },
  methods: {
    getNotes() {
      const localNotes = localStorage.getItem("items");
      if (localNotes) {
        this.notes = JSON.parse(localNotes);
      }
    },
    onSubmit() {
      this.notes.push(this.input.value);
      this.input.value = "";
    },
    remove(index) {
      this.notes.splice(index, 1);
    },
    edit(item) {
      this.editInput.editText = item;
      this.editInput.editInput = item;
      this.editInput.inEditItem = true;
    },
    saved(index) {
      if (this.editInput.editText !== "") {
        this.notes[index] = this.editInput.editText;
      }

      this.editInput.editText = "";
      this.editInput.editInput = null;
      this.editInput.inEditItem = false;
    },
  },
};

Vue.createApp(App).mount("#app");
