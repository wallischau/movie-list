import React, { Component } from "react";
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
      activeListIdx: 0,  //vertical
      displayStartIdx: [ 0, 0 ],
      displayEndIdx: [ 3, 3 ],
      movieListLengths: [ 0, 0 ],
      movieGroups: [
        [],
        []
      ]
      
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
        const top2019Movies = this.getTopMovies(res.data, '2019');
        const top2018Movies = this.getTopMovies(res.data, '2018');

        return (
            this.setState({ 
          movies: res.data, 
          movieGroups: [ top2019Movies, top2018Movies ],
          movieListLengths: [top2019Movies.length, top2018Movies.length]
        }))
      })
      .catch(err => console.log(err));
  };

  // deleteBook = id => {
  //   API.deleteBook(id)
  //     .then(res => this.loadBooks())
  //     .catch(err => console.log(err));
  // };

  // handleInputChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.title && this.state.author) {
  //     API.saveBook({
  //       title: this.state.title,
  //       author: this.state.author,
  //       synopsis: this.state.synopsis
  //     })
  //       .then(res => this.loadBooks())
  //       .catch(err => console.log(err));
  //   }(
    // };
  
  handleMoviesClick = id => {
    this.setState({
      currentMoviesId: id 
    });
    console.log("id=", id);
  };

  handlerKeyPress = (e) => {
    // changing the state to the name of the key
    // which is pressed
    const { cursor, activeListIdx, displayStartIdx, displayEndIdx } = this.state;
    // console.log('1003', e.key);
    // console.log('1004 currentcur', cursor);
    // console.log('1005 currentlistidx', activeListIdx);
    // console.log('1006 display Idx', displayStartIdx, displayEndIdx);
    const curMovieList = this.state.movieGroups[activeListIdx];
    console.log('1007 curmovielist', curMovieList);
    if (e.keyCode === 37) {
      if (cursor > 0) {
        this.setState( prevState => ({
          cursor: prevState.cursor - 1
        }));
      }
      else {
        this.setState( prevState => {
          prevState.displayStartIdx[activeListIdx] = (prevState.displayStartIdx[activeListIdx] - 1 + curMovieList.length) % curMovieList.length;
          prevState.displayEndIdx[activeListIdx] = (prevState.displayEndIdx[activeListIdx] - 1 + curMovieList.length) % curMovieList.length;
          return {
          displayStartIdx: prevState.displayStartIdx,
          displayEndIdx: prevState.displayEndIdx
          }
        });


      }



    } else if (e.keyCode === 39 && cursor < curMovieList.length - 1) {
      //shift right...
      if (cursor < 3) {
        this.setState( prevState => ({
          cursor: prevState.cursor + 1
        }));
      }
      //cursor at edge of display
      else {
        this.setState( prevState => {
          prevState.displayStartIdx[activeListIdx] = (prevState.displayStartIdx[activeListIdx] + 1) % curMovieList.length;
          prevState.displayEndIdx[activeListIdx] = (prevState.displayEndIdx[activeListIdx] + 1) % curMovieList.length;
          return {
          displayStartIdx: prevState.displayStartIdx,
          displayEndIdx: prevState.displayEndIdx
          }
        });
      }
    } else if (e.keyCode === 38 && activeListIdx > 0) {
      this.setState( prevState => ({
        activeListIdx: prevState.activeListIdx - 1
      }));
    } else if (e.keyCode === 40 && activeListIdx < 1) {
      this.setState( prevState => ({
        activeListIdx: prevState.activeListIdx + 1
      }));
    }
    console.log('1005 post cur and list', this.state.cursor, this.state.activeListIdx);
  };

  getTopMovies = ((movies, year) => {
    return movies.filter(movie => parseFloat(movie.imdbRating) > 8.0 && movie.Year === year);
  });

  getMoviesInRange = (movieList, start, end) => {
    return movieList.slice(start, end+1);
  };


  render() {
    const { movieGroups } = this.state;
    return (
      <Container fluid onKeyDown={ this.handlerKeyPress }>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <Header />
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          {/* <Col size="md-4"> */}
            {/* <MoviesDetail currentMoviesId={this.state.currentMoviesId}/> */}
          {/* </Col> */}
          <Col size="md-12">
              <h3 className='text-center'>Top 2019 Movies</h3>
          </Col>
        </Row>
        <Row>
            {this.state.movies.length ? (
              <List data={this.state} movieGroup={movieGroups[0]} curListIdx={0}>
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}

        </Row>
        <Row>
          {/* <Col size="md-4"> */}
            {/* <MoviesDetail currentMoviesId={this.state.currentMoviesId}/> */}
          {/* </Col> */}
          <Col size="md-12">
              <h3 className='text-center'>Top 2018 Movies </h3>
          </Col>
        </Row>
        <Row>
            {this.state.movies.length ? (
              <List data={this.state} movieGroup={movieGroups[1]} curListIdx={1}>
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}

        </Row>
      </Container>
    );
  }
}

export default Movies;