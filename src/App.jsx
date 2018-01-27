import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Pokemon from './Pokemon';
import Loader from "./Loader";
import reactLogo from './img/react-hexagon.png'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            pkmnList: null,
            isFetching: false
        }
    }

    /***
     * Search function, calls the API and fills the state with the fetched data
     * */
    search() {
        const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
        let FETCH_URL = `${BASE_URL}${this.state.query.toLowerCase()}`;
        this.setState({isFetching:true});

        fetch(FETCH_URL, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(json => {
                const pkmnList = json;
                this.setState({pkmnList,isFetching:false});
            });
    }

    render() {
        return (
            <div className="App">
                <h1 className="App-title">Pokedex Master</h1>
                <h4 className="App-title">Gotta find 'em all !</h4>

                <FormGroup>
                    <InputGroup className="col-xs-offset-2 col-xs-8 col-md-offset-4 col-md-4">
                        <FormControl
                            type="text"
                            placeholder="Search for a Pokemon"
                            value={this.state.query}
                            onChange={event => {this.setState({query: event.target.value})}}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    this.search()
                                }
                            }}
                        />
                        <InputGroup.Addon onClick={() => this.search()}>
                            <Glyphicon glyph="search"></Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>

                {
                    this.state.pkmnList !== null
                        ?
                        <div>
                            <Pokemon
                                pkmnList={this.state.pkmnList}
                            />
                        </div>
                        : <div></div>
                }

                {
                    this.state.isFetching !== false
                        ?
                        <Loader
                        />
                        : <div></div>
                }

                <div class="footer">
                    <img className="fixed-bottom reactLogo" src={reactLogo} alt="Made with ReactJS"/><span className="madeWithReact">Made with React</span>
                </div>

            </div>
        )
    }
}

export default App;
