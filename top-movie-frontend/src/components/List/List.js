import React from "react";
import "./List.css";
import { Col, Row, Container } from "../Grid";
import { ListItem } from "./ListItem";

const getMoviesInsideRange = (movieList, range) => {
  let temp = [];
  let start = range[0];
  let end = range[1];
  if (start < end) {
  //e.g. 0,3 => 0,1,2,3
    return movieList.slice(start, end+1);
  }
  else {
    //e.g. 3,0 => 3,4,5,0
    temp = movieList.slice(start).concat(movieList.slice(0, end + 1));
    console.log('4001 temp', temp);
    return temp;

  }
};

export const List = (props) => {
  const movieGroup = props.movieGroup;
  const {cursor, activeListIdx, displayStartIdx, displayEndIdx, displayIdx } = props.data;
  console.log('3001 items', movieGroup);
  console.log('3002', displayIdx);
  // const cursor = data.cursor;
  // const activeList = data.activeList;
  const curListIdx = props.curListIdx;

  // const movieListInRange = getMoviesInsideRange(movieGroup, displayStartIdx[curListIdx], displayEndIdx[curListIdx]);
  const movieListInRange = getMoviesInsideRange(movieGroup, displayIdx[curListIdx]);
  console.log('3003 movieListInRange', movieListInRange);
  const itemShown = movieListInRange.map((movie, idx) => (

    <Col size="sm-3">
      {/* <input onKeyDown = { this.handlerKeyPress } /> */}
      <ListItem key={movie.imdbID} item={movie} src={movie.Poster} active={idx === cursor && curListIdx === activeListIdx}>
      </ListItem>
    </Col>
  ));
  return (
    <div className="list-overflow-container">
      <ul className="list-group">
        {/* {children} */}
        {itemShown}
      </ul>
    </div>
  );
};