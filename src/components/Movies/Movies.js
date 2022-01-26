import React, { Component } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';

import { addToFavorites } from '../../redux/actions';
import { connect } from 'react-redux';

class Movies extends Component {
    state = { 
        movies: []
    }

    componentDidMount() {
        const { movies } = this.props;
        this.setState({ movies });
    }

    addToFavorites = (obj) => {
        this.props.addToFavorites(obj)
    }

    render() { 
        return ( 
            <ul className="movies">
                {this.props.movies && this.props.movies.map((movie) => (
                    <li className="movies__item" key={movie.imdbID}>
                        <MovieItem {...movie} addToFavorites={this.addToFavorites} />
                    </li>
                ))}
            </ul>
        );
    }
}

 
const mapStateToProps = (state) => {
    return {
      movies: state.movies
    }
  }
  
  const mapDispatchToProps = dispatch => ({
    addToFavorites: (obj) => dispatch(addToFavorites(obj))
  });
  
  const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);
  
  export default functionFromConnect(Movies);