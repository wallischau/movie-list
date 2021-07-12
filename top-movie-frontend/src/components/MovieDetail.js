//Movie detail
import React, { Component } from "react";
import { Col, Row } from "./Grid";

class MovieDetail extends Component {
	constructor(props) {
		super(props);
    this.handlerKeyPress = this.handlerKeyPress.bind(this);
	} 

  componentDidMount() {
    document.addEventListener("keydown", this.handlerKeyPress.bind(this));
  }

	handlerKeyPress = (e) => {
		if (e.keyCode === 27) {  //escape key
			this.props.history.goBack();
		}
	}

	render() {
		const state = this.props.location.state;
		const movieEntries = state.movieGroups[state.activeListIdx].movieEntries;
		const curMovie = movieEntries.find(mov => mov.imdbID === state.currentMovieId);

    //map attribute descriptions to attribute names in data
    const attrMatrix = [
      { label: 'Title', attrKey: 'Title' },
      { label: 'Genre', attrKey: 'Genre' },
      { label: 'Year', attrKey: 'Year' },
      { label: 'Duration in minutes', attrKey: 'Runtime' },
      { label: 'IMDB Rating', attrKey: 'imdbRating' },
      { label: 'Age Rating', attrKey: 'Rated' },
      { label: 'Plot Summary', attrKey: 'Plot' },
      { label: 'Director', attrKey: 'Director' },
      { label: 'Production Company', attrKey: 'Production' },
      { label: 'Stars', attrKey: 'Actors' },
    ];

    //generate all required attributes of the movie
		const attrShown = attrMatrix.map(attr => (
			<Row>
			  <h4><span className='bold'>{attr.label}:</span> {curMovie[attr.attrKey]}</h4>
		</Row>

		));
		const itemShown = (
				<Row>
					<Col size='sm-3'>
						<img src={curMovie.Poster} alt={curMovie.Poster} />
					</Col>
					<Col size='sm-4'>
            { attrShown }
					</Col>
				</Row>
		);

		return (
			<div className='movie-detail' onKeyDown={this.handlerKeyPress}>
				<Row>
          { itemShown }
				</Row>

			</div>
		)

	}
}

export default MovieDetail;