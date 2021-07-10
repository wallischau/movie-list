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
      cursor: 0, // current horizontal movie position on screen at the moment
      activeListIdx: 0,  // index of active group (displayed vertically)
      displayIdx: [],  //display range for each group, # of entries matches # of group
      movieGroups: [ ] //list of movie groups

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
        const displayIdx = [];
        movieGroups.push(this.getTopMoviesByYear(res.data, '2019'));
        displayIdx.push([0,3]);
        movieGroups.push(this.getTopMoviesByYear(res.data, '2018'));
        displayIdx.push([0,3]);
        movieGroups.push(this.getTopMoviesByGenre(res.data, 'Mystery'));
        displayIdx.push([0,3]);
        movieGroups.push(this.getTopMoviesByGenre(res.data, 'Action'));
        displayIdx.push([0,3]);
        movieGroups.push(this.getTopMoviesByGenre(res.data, 'Fantasy'));
        displayIdx.push([0,3]);
        movieGroups.push(this.getTopMoviesByGenre(res.data, 'Thriller'));
        displayIdx.push([0,3]);

        return (
          this.setState({
            movies: res.data,
            movieGroups: movieGroups,
            displayIdx: displayIdx
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
    // changing the state to the name of the key
    // which is pressed
    const { cursor, activeListIdx, displayIdx } = this.state;
    // console.log('1003', e.key);
    // console.log('1004 currentcur', cursor);
    // console.log('1005 currentlistidx', activeListIdx);
    // console.log('1006 display Idx', displayStartIdx, displayEndIdx);
    const curMovieList = this.state.movieGroups[activeListIdx];
    console.log('1007 curmovielist', curMovieList);
    if (e.keyCode === 37) {     //left arrow key
      if (cursor > 0) {
        this.setState(prevState => ({
          cursor: prevState.cursor - 1
        }));
      }
      else {
        this.setState(prevState => {
          prevState.displayIdx[activeListIdx][0] = (prevState.displayIdx[activeListIdx][0] - 1 + curMovieList.length) % curMovieList.length;
          prevState.displayIdx[activeListIdx][1] = (prevState.displayIdx[activeListIdx][1] - 1 + curMovieList.length) % curMovieList.length;
          return {
            displayIdx: prevState.displayIdx,
          }
        });
      }
    } else if (e.keyCode === 39 && cursor < curMovieList.length - 1) { //right arrow key
      console.log('4001 right key', this.state.displayIdx[2]);
      //shift right...
      if (cursor < 3) {
        this.setState(prevState => ({
          cursor: prevState.cursor + 1
        }));
      }
      //cursor at edge of display
      else {
        this.setState(prevState => {
          prevState.displayIdx[activeListIdx][0] = (prevState.displayIdx[activeListIdx][0] + 1) % curMovieList.length;
          prevState.displayIdx[activeListIdx][1] = (prevState.displayIdx[activeListIdx][1] + 1) % curMovieList.length;
          return {
            displayIdx: prevState.displayIdx,
          }
        });
      }
    } else if (e.keyCode === 38 && activeListIdx > 0) { //up arrow key
      this.setState(prevState => ({
        activeListIdx: prevState.activeListIdx - 1
      }));
    } else if (e.keyCode === 40 && activeListIdx < displayIdx.length - 1) {  //down arrow key
      console.log('4002 displayidx len', activeListIdx, displayIdx);
      this.setState(prevState => ({
        activeListIdx: prevState.activeListIdx + 1
      }));
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

    const movieRowMetas = [
      {
        title: 'Top 2019 Movies',
        groupIdx: 0,
      },
      {
        title: 'Top 2018 Movies',
        groupIdx: 1,
      },
      {
        title: 'Mystery Movies',
        groupIdx: 2,
      },
      {
        title: 'Action Movies',
        groupIdx: 3,
      },
      {
        title: 'Fantasy Movies',
        groupIdx: 4,
      },
      {
        title: 'Thriller Movies',
        groupIdx: 5,
      },
    ];

    movieRowMetas.forEach(row => {
      if (movieGroups[row.groupIdx]) {

        rowOfMovies.push(
          <div>
            <Row>
              {/* <Col size="md-4"> */}
              {/* <MoviesDetail currentMoviesId={this.state.currentMoviesId}/> */}
              {/* </Col> */}
              <Col size="md-12">
                <h3 className='text-center'>{row.title}</h3>
              </Col>
            </Row>
            <Row>
              {this.state.movies.length ? (
                <List data={this.state} movieGroup={movieGroups[row.groupIdx]} curListIdx={row.groupIdx}>
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
        <Row>
          <Col size="md-12">
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