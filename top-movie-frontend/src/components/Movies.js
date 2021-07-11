import React, { Component, useRef } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "./Jumbotron";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "./Grid";
import { List, ListItem } from "./List";
import Header from "./Header";
// import MoviesDetail from "./MoviesDetail";
import API from "./apiAccess";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.handlerKeyPress = this.handlerKeyPress.bind(this);

    this.state = {
      movies: [],
      currentMovieId: null,
      cursor: 0, // current horizontal movie position on screen at the moment
      activeListIdx: 0,  // index of active group (displayed vertically)
      movieGroups: [ ], //list of movie groups, includes display range and meta etc

    };
  };


  componentDidMount() {
    this.loadMovies();
  }
  componentWillMount() {
    document.addEventListener("keydown", this.handlerKeyPress.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handlerKeyPress.bind(this));
  }
  
  loadMovies = () => {
    API.getMovies()
      .then(res => {
        const movieGroups = [];
        movieGroups.push({ 
            movieEntries: this.getTopMoviesByYear(res.data, '2019'),
            displayRangeIndices: [0, 3],
            movieRowMeta: { title: 'Top 2019 Movies', groupIdx: 0, }
          }
        );
        movieGroups.push({ 
            movieEntries: this.getTopMoviesByYear(res.data, '2018'),
            displayRangeIndices: [0, 3],
            movieRowMeta: { title: 'Top 2018 Movies', groupIdx: 1, }
          }
        );
        movieGroups.push({ 
            movieEntries: this.getTopMoviesByGenre(res.data, 'Mystery'),
            displayRangeIndices: [0, 3],
            movieRowMeta: { title: 'Mystery Movies', groupIdx: 2, }
          }
        );
        movieGroups.push({ 
            movieEntries: this.getTopMoviesByGenre(res.data, 'Action'),
            displayRangeIndices: [0, 3],
            movieRowMeta: { title: 'Action Movies', groupIdx: 3, }
          }
        );
        movieGroups.push({ 
            movieEntries: this.getTopMoviesByGenre(res.data, 'Fantasy'),
            displayRangeIndices: [0, 3],
            movieRowMeta: { title: 'Fantasy Movies', groupIdx: 4, }
          }
        );
        movieGroups.push({ 
            movieEntries: this.getTopMoviesByGenre(res.data, 'Thriller'),
            displayRangeIndices: [0, 3],
            movieRowMeta: { title: 'Thriller Movies', groupIdx: 5, }
          }
        );

        const moviedId=movieGroups[0].movieEntries.imdbID;
              
        return (
          this.setState({
            movies: res.data,
            movieGroups: movieGroups,
            // movieRowMetas: movieRowMetas,
            currentMovieId: moviedId
          }))
      })
      .catch(err => console.log(err));
  };


  handleMoviesClick = id => {
    this.setState({
      currentMoviesId: id
    });
    console.log("id=", id);
  };

  handlerKeyPress = (e) => {
    const { cursor, activeListIdx, displayRangeIndices, movieGroups } = this.state;
    const curMovieList = movieGroups[activeListIdx].movieEntries;
    console.log('1007 curmovielist', curMovieList);
    if (e.keyCode === 37) {     //left arrow key
      if (cursor > 0) {
        this.setState(prevState => ({
          cursor: prevState.cursor - 1
        }));
      }
      else {
        this.setState(prevState => {
          prevState.movieGroups[activeListIdx].displayRangeIndices[0] = (prevState.movieGroups[activeListIdx].displayRangeIndices[0] - 1 + curMovieList.length) % curMovieList.length;
          prevState.movieGroups[activeListIdx].displayRangeIndices[1] = (prevState.movieGroups[activeListIdx].displayRangeIndices[1] - 1 + curMovieList.length) % curMovieList.length;
          return {
            movieGroups: prevState.movieGroups,
          }
        });
      }
    } else if (e.keyCode === 39 && cursor < curMovieList.length - 1) { //right arrow key
      console.log('4001 right key', this.state.movieGroups[activeListIdx].displayRangeIndices[2]);
      //shift right...
      if (cursor < 3) {
        this.setState(prevState => ({
          cursor: prevState.cursor + 1
        }));
      }
      //cursor at edge of display
      else {
        this.setState(prevState => {
          prevState.movieGroups[activeListIdx].displayRangeIndices[0] = (prevState.movieGroups[activeListIdx].displayRangeIndices[0] + 1) % curMovieList.length;
          prevState.movieGroups[activeListIdx].displayRangeIndices[1] = (prevState.movieGroups[activeListIdx].displayRangeIndices[1] + 1) % curMovieList.length;
          return {
            movieGroups: prevState.movieGroups,
          }
        });
      }
    } else if (e.keyCode === 38 && activeListIdx > 0) { //up arrow key
      this.setState(prevState => ({
        activeListIdx: prevState.activeListIdx - 1
      }));
    } else if (e.keyCode === 40 && activeListIdx < movieGroups.length - 1) {  //down arrow key
      console.log('4002 displayRangeIndices len', activeListIdx, movieGroups[activeListIdx].displayRangeIndices);
      this.setState(prevState => ({
        activeListIdx: prevState.activeListIdx + 1
      }));
    } else if (e.keyCode === 13) {    //enter key
      //update id
      // this.setState({
      //   currentMovieId : movieGroups[activeListIdx][displayRangeIndices[cursor].imbdID
      // });
    }

    console.log('1005 post cur and list', this.state.cursor, this.state.activeListIdx);
  };

  getTopMoviesByYear = ((movies, year) => {
    return movies.filter(movie => parseFloat(movie.imdbRating) > 8.0 && movie.Year === year);
  });

  getTopMoviesByGenre = ((movies, genre) => {
    return movies.filter(movie => movie.Genre.includes(genre) && parseFloat(movie.imdbRating) > 8.0 );
  });

  getMoviesInRange = (movieList, start, end) => {
    return movieList.slice(start, end + 1);
  };


  render() {
    const { movieGroups } = this.state;
    const rowOfMovies = [];

    movieGroups.forEach(movieGroup => {
      if (movieGroup.movieEntries) {

        rowOfMovies.push(
          <div key={'div-'+movieGroup.movieRowMeta.groupIdx}>
            <Row key={'row-'+movieGroup.movieRowMeta.groupIdx+'-label'}>
              {/* <Col size="md-4"> */}
              {/* <MoviesDetail currentMoviesId={this.state.currentMoviesId}/> */}
              {/* </Col> */}
              <Col key={'col-'+movieGroup.movieRowMeta.groupIdx} size="md-12">
                <h3 className='text-center'>{movieGroup.movieRowMeta.title}</h3>
              </Col>
            </Row>
            <Row key={movieGroup.movieRowMeta.groupIdx+'-data'}>
              {this.state.movies.length ? (
                <List key={movieGroup.movieRowMeta.groupIdx+'-list'} data={this.state} movieGroup={movieGroups[movieGroup.movieRowMeta.groupIdx].movieEntries} curListIdx={movieGroup.movieRowMeta.groupIdx}>
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )}

            </Row>
          </div>
        );
      }
    });
    return (
      <Container fluid onKeyDown={this.handlerKeyPress}>
        <Row key='title-row'>
          <Col key='title-col' size="md-12">
            <Jumbotron>
              <Header />
            </Jumbotron>
          </Col>
        </Row>
        {rowOfMovies}
      </Container>
    );
  }
}

export default Movies;