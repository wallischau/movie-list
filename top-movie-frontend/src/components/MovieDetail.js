//Movie detail
import React, { Component } from "react";
import "../style/style.css";

class MovieDetail extends Component {
	constructor(props) {
		console.log('constructor');
		super(props);
		this.state = {
			currentMovie: 'abc',
			currentMovieId: '123',
		};

		//   this.toggleMenu = this.toggleMenu.bind(this);
	} //constructor




	render() {
		const state = this.props.location.state;
		console.log('601', state);
		return (
			<div>my Details</div>
		)

	}//render
}//class detail

export default MovieDetail;