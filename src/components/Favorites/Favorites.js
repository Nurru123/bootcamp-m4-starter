import React, { Component } from 'react';
import './Favorites.css';
import { connect } from 'react-redux';
import { removeFromFavorites } from '../../redux/actions';
import { Link } from "react-router-dom";


class Favorites extends Component {
    state = {
        title: 'Новый список',
        movies: [],
        link: ''
    }

    changeTitle = (e) => {
        this.setState({ title: e.target.value})
    }

    removeFromFavorites = (index) => {
        this.props.removeFromFavorites(index)
    }

    addNewList = () => {
        const { title } = this.state;
        const idList = this.props.movies.map(movie => {
            return (movie.imdbID)
        })
        fetch('https://acb-api.algoritmika.org/api/movies/list', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                'title': title,
                'movies': idList
            })
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ link: data.id })
            })
    }

    render() { 
        return (
            <div className="favorites">
                <input value={this.state.title} className="favorites__name" placeholder="Новый список" onChange={this.changeTitle} />
                <ul className="favorites__list">
                    {this.props.movies && this.props.movies.map((item, index) => {
                        return <div className='fav' key={item.imdbID}>
                            <li>{item.Title} ({item.Year})</li>
                            <button className="btn-del" onClick={() => this.removeFromFavorites(index)}>x</button>
                            </div>;
                    })}
                </ul>
                {this.state.link ? 
                    <div>
                        <Link to={`/list/${this.state.link}`}>{this.state.title}</Link>
                    </div> : <button type="button" className="favorites__save" onClick={this.addNewList}>Сохранить список</button>
                }
            </div>
        );
    }
}
 
const mapStateToProps = (state) => {
    return {
      movies: state.favorites
    }
  }
  
  const mapDispatchToProps = dispatch => ({
    removeFromFavorites: (index) => dispatch(removeFromFavorites(index))
  });
  
  const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);
  
  export default functionFromConnect(Favorites);