import React, { Component } from "react";
import Jumbotron from "./Jumbotron";
import { Col, Row, Container } from "./Grid";
import { List } from "./List";
import Header from "./Header";
import API from "./apiAccess";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.handlerKeyPress = this.handlerKeyPress.bind(this);

    this.state = {
      movies: [],             //list all movies
      currentMovieId: null,
      cursor: 0, // current horizontal movie position on screen at the moment
      activeListIdx: 0,  // index of active group (each group displayed vertically)
      movieGroups: [],   //list of movie groups, includes display range and meta etc
    };
  };


  componentDidMount() {
    this.loadMovies();
    document.addEventListener("keydown", this.handlerKeyPress.bind(this));
  }
  // componentWillMount() {
    // document.addEventListener("keydown", this.handlerKeyPress.bind(this));
  // }

  componentWillUnmount() {
    // document.removeEventListener("keydown", this.handlerKeyPress.bind(this));
    this.setState = (state,callback)=>{
      return;
  };
}

  /* Description: fetch movies and group them */
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

        const moviedId = movieGroups[0].movieEntries[0].imdbID;

        return (
          this.setState({
            movies: res.data,
            movieGroups: movieGroups,
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

  /* Description: errow key handling - hightlight current movies, loop movie around at end of list */
  handlerKeyPress = (e) => {
    const [ LEFT, UP, RIGHT, DOWN, ENTER ] = [ 37, 38, 39, 40, 13];
    const { cursor, activeListIdx, movieGroups } = this.state;
    const curMovieList = movieGroups[activeListIdx].movieEntries;
    const curGroup = movieGroups[activeListIdx];
    const curSelectedMovieIdx = (cursor + curGroup.displayRangeIndices[0]) % curGroup.movieEntries.length;

    if (e.keyCode === LEFT) {     //left arrow key
      const newSelectedMovieIdx = (curSelectedMovieIdx-1) % curMovieList.length;
      if (cursor > 0) {
        this.setState(prevState => ({
          cursor: prevState.cursor - 1,
          currentMovieId: curGroup.movieEntries[newSelectedMovieIdx].imdbID
        }));
      }
      else {
        this.setState(prevState => {
          prevState.movieGroups[activeListIdx].displayRangeIndices[0] = (prevState.movieGroups[activeListIdx].displayRangeIndices[0] - 1 + curMovieList.length) % curMovieList.length;
          prevState.movieGroups[activeListIdx].displayRangeIndices[1] = (prevState.movieGroups[activeListIdx].displayRangeIndices[1] - 1 + curMovieList.length) % curMovieList.length;
          return {
            movieGroups: prevState.movieGroups,
            currentMovieId: curGroup.movieEntries[curSelectedMovieIdx].imdbID
          }
        });
      }
    } else if (e.keyCode === RIGHT && cursor < curMovieList.length - 1) { //right arrow key
      //shift right...
      const newSelectedMovieIdx = (curSelectedMovieIdx+1) % curMovieList.length;
      if (cursor < 3) {
        this.setState(prevState => ({
          cursor: prevState.cursor + 1,
          currentMovieId: curGroup.movieEntries[newSelectedMovieIdx].imdbID
        }));
      }
      //cursor at edge of display
      else {
        this.setState(prevState => {
          prevState.movieGroups[activeListIdx].displayRangeIndices[0] = (prevState.movieGroups[activeListIdx].displayRangeIndices[0] + 1) % curMovieList.length;
          prevState.movieGroups[activeListIdx].displayRangeIndices[1] = (prevState.movieGroups[activeListIdx].displayRangeIndices[1] + 1) % curMovieList.length;
          return {
            movieGroups: prevState.movieGroups,
            currentMovieId: curGroup.movieEntries[newSelectedMovieIdx].imdbID
          }
        });
      }
    } else if (e.keyCode === UP && activeListIdx > 0) { //up arrow key
      const nextGroup = movieGroups[activeListIdx-1];
      const newSelectedMovieIdx = (cursor + nextGroup.displayRangeIndices[0]) % nextGroup.movieEntries.length;
      this.setState(prevState => ({
        activeListIdx: prevState.activeListIdx - 1,
        currentMovieId: nextGroup.movieEntries[newSelectedMovieIdx].imdbID
      }));
    } else if (e.keyCode === DOWN && activeListIdx < movieGroups.length - 1) {  //down arrow key
      console.log('1001 moviegroups', movieGroups);
      console.log('1002 activelistidx', activeListIdx);
      const nextGroup = movieGroups[activeListIdx+1];
      console.log('1003 nextgroup', nextGroup);
      const newSelectedMovieIdx = (cursor + nextGroup.displayRangeIndices[0]) % nextGroup.movieEntries.length;
      console.log('1004 newselect', newSelectedMovieIdx);
      
      this.setState(prevState => ({
        activeListIdx: prevState.activeListIdx + 1,
        currentMovieId: nextGroup.movieEntries[newSelectedMovieIdx].imdbID
      }));
    } else if (e.keyCode === ENTER) {    //enter key
      //update id
      // const curGroup = movieGroups[activeListIdx];
      // const curSelectedMovieIdx = (cursor + curGroup.displayRangeIndices[0]) % curGroup.movieEntries.length;
      this.setState({
        currentMovieId: curGroup.movieEntries[curSelectedMovieIdx].imdbID
      });
      this.props.history.push({
        pathname: '/detail',
        search: `?query=${curGroup.movieEntries[curSelectedMovieIdx].imdbID}`,
        state: this.state
      });
    }
    console.log('this.state', this.state.currentMovieId);
  };

  getTopMoviesByYear = ((movies, year) => {
    return movies.filter(movie => parseFloat(movie.imdbRating) > 8.0 && movie.Year === year);
  });

  getTopMoviesByGenre = ((movies, genre) => {
    return movies.filter(movie => movie.Genre.includes(genre) && parseFloat(movie.imdbRating) > 8.0);
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
          <div key={'div-' + movieGroup.movieRowMeta.groupIdx}>
            <Row key={'row-' + movieGroup.movieRowMeta.groupIdx + '-label'}>
              <Col key={'col-' + movieGroup.movieRowMeta.groupIdx} size="sm-12">
                <h3 className='text-center'>{movieGroup.movieRowMeta.title}</h3>
              </Col>
            </Row>
            <Row key={movieGroup.movieRowMeta.groupIdx + '-data'}>
              {this.state.movies.length ? (
                <List key={movieGroup.movieRowMeta.groupIdx + '-list'} data={this.state} movieGroup={movieGroups[movieGroup.movieRowMeta.groupIdx].movieEntries} curListIdx={movieGroup.movieRowMeta.groupIdx}>
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