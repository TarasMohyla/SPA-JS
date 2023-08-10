import { AbstractView } from "../../common/view.js";
import onChange from 'on-change';
import { Header } from "../../components/header/header.js";
import { Search } from "../../components/search/search.js";
import { CardList } from "../../components/card-list/card-list.js";


export class MainView extends AbstractView {

    state = {
        list: [],
        loading: false,
        searchQuery: undefined,
        offset: 0,
        lengthBook: 0
    };

    constructor(appState) {
        super();
        this.setTitle("Search Book");
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this))
        this.state = onChange(this.state, this.stateHook.bind(this))
    }


    destroy() {
        onChange.unsubscribe(this.appState);
        onChange.unsubscribe(this.state);
    }



    appStateHook(path) {
        if(path === 'favorites') {
           this.render();
        }
    }

   async stateHook(path) {
        if(path === 'searchQuery') {
           this.state.loading = true;
           const data = await this.loadList(this.state.searchQuery)
           this.state.loading = false;
           this.state.list = data.docs;
           this.state.lengthBook =  data.numFound
           console.log(data);
        }
         if(path === 'loading' || path === 'list' || path === 'lengthBook' ) {
            this.render();
        }
       
    }

    async loadList(q, offset) {
        const res = await fetch(`https://openlibrary.org/search.json?q=${q}&offset=${offset}`);

        return res.json();
    }

    render() {
        const main = document.createElement('div');
        main.innerHTML = `
        <h3>
            Found books - ${this.state.lengthBook}
        </h3>`;
        main.append(new Search(this.state).render())
        main.append(new CardList(this.appState, this.state).render())

        this.app.innerHTML = "";
        this.app.appendChild(main);
        this.rendetHeader();
    }


    rendetHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);

    }

}