const App = {
    data() {
        return {
            title: "Notes",
            input: {
                value: "",
                placeholder: "Type your note",
            },
            editInput: null,
            button: {
                text: "Add note",
            },
            notes: ["Task 1", "Task 2", "Task 3"],
            inEditItem: false,
            editText: "",
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
            this.editText = item;
            this.editInput = item;
            this.inEditItem = true;
        },
        saved(index) {
            this.notes[index] = this.editText;
            this.inEditItem = false;
        },
    },
};

Vue.createApp(App).mount("#app");
