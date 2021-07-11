import React from "react";
import "./List.css";
import { Col } from "../Grid";
import { ListItem } from "./ListItem";

/* Description: get list of movies within the given range of index. List can wraps arround
 * param:
 *  movieList - list of movies
 *  range - [ a, b ] where a is starting index, b is ending index
 * return: array of movies in order
 */
const getMoviesInsideRange = (movieList, range) => {
  let temp = [];
  let start = range[0];
  let end = range[1];
  if (start < end) {
    //e.g. 0,3 => 0,1,2,3
    return movieList.slice(start, end + 1);
  }
  else {
    //e.g. 3,0 => 3,4,5,0
    temp = movieList.slice(start).concat(movieList.slice(0, end + 1));
    return temp;

  }
};

/* Description: list component to display all rows of movies*/
export const List = (props) => {
  const movieGroup = props.movieGroup;
  const { cursor, activeListIdx, movieGroups } = props.data;
  const curListIdx = props.curListIdx;

  const movieListInRange = getMoviesInsideRange(movieGroup, movieGroups[activeListIdx].displayRangeIndices);
  const itemShown = movieListInRange.map((movie, idx) => (
    <Col key={idx} size="sm-3">
      <ListItem key={movie.imdbID} item={movie} src={movie.Poster} active={idx === cursor && curListIdx === activeListIdx}>
      </ListItem>
    </Col>
  ));
  return (
    <div className="list-overflow-container">
      <ul className="list-group">
        {itemShown}
      </ul>
    </div>
  );
};