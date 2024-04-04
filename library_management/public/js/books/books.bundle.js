import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useBooksStore } from './store';
import BooksComponent from './Books.vue';

class Book {
    constructor(wrapper) {
        this.wrapper = $(wrapper);
        this.page = frappe.ui.make_app_page({
            parent: wrapper,
        });
        this.sidebar = this.wrapper.find(".layout-side-section");
        this.main_section = this.wrapper.find(".layout-main-section");
        this.wrapper.bind("show", () => {
            this.show();
        });
    }

    show() {
        this.page.set_title(__("Books"));
        this.setup_page();
    }

    setup_page() {
        console.log("page loaded....!!");

        const pinia = createPinia();

        const app = createApp(BooksComponent);
        SetVueGlobals(app)

        app.use(pinia);

        this.bookstore = useBooksStore();
        this.$books = app.mount(this.main_section.get(0));

    }
}

frappe.require("frappe-ui")
frappe.ui.Book = Book
export default Book