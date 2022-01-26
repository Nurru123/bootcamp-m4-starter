import React, { Component } from 'react';
import './ListPage.css';
import Header from '../../components/Header/Header';

class ListPage extends Component {
    state = {
        title: '',
        favorites: []
    }
    componentDidMount() {
        // const state = store.getState();
        // this.setState({ favorites: state.favorites })
        const id = this.props.match.params;
        fetch(`https://acb-api.algoritmika.org/api/movies/list/${id.id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({ title: data.title })
                data.movies.forEach(item => {
                    fetch(`http://www.omdbapi.com/?i=${item}&apikey=c44e99fe`)
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            this.setState({ favorites: [...this.state.favorites, data] })
                            console.log(this.state)
                        })
                })
            })
    }
    render() {
        const { title, favorites } = this.state;
        console.log(favorites)
        return (
            <div>
                <Header />
                <div className="list-page">
                    <h1 className="list-page__title">{title}</h1>
                    <ul>
                        {favorites.map((item) => {
                            return (
                                <li key={item.imdbID}>
                                    <a href={`https://www.imdb.com/title/${item.imdbID}`} target="_blank">{item.Title} ({item.Year})</a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

        );
    }
}

export default ListPage;