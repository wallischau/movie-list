import React from "react";

/* Description: listItem component to display movie entry */
export const ListItem = props => {
  return (
    <li key={props.item.imdbID} className="list-group-item ">
      <div to={"/movies/" + props.item.imdbID}>
        <img className={props.active ? 'active' : ''} src={props.item ? props.item.Poster : ''} alt={props.item.Poster} />
      </div>

    </li>
  )

}