import React from "react";

export const ListItem = props => {

  // console.log('2002 props', props);
  
  return ( 

  <li className="list-group-item active">
    {/* {props.children} */}
    <div to={"/movies/" + props.item.imdbID}>
          {/* <div onClick={() => this.handleMoviesClick(movie.imdbID)}> */}
          <strong> 
            Movies # {props.item.imdbID}<img  className={ props.active ? 'active': '' } src={props.item ? props.item.Poster: ''} alt={props.item.Poster}/>
          </strong>
          {/* </div> */}
        </div>

  </li>
  )
  
}