# Sample Top Movies App

Create an application using what ever technologies you are most comfortable with.
We have provided a node api server to fetch the movies.

Go into `top-movies-api` and run `npm start`.
The api endpoint is: `http://localhost:4000/api/movies`

* Submit your source, assets and build instructions to `kevin.phung@nagrastar.com`.
* List any libraries and resources used.
* Be prepared to discuss the source at the next interview.

A sample can be found at https://youtu.be/W0dHCV_RDC4

-------------------------------------------------------------------------------------------

This is an app where users can browse for top movies for the past couple years and genres.
The requirements are broken down into feature levels. You are only required to complete the
**MVP**. Feel free to attempt the other features.

## Requirements:
### MVP - Home and Navigation
* The **Home** page should contain the following movie shelves:
    * Top of 2019
    * Top of 2018
    * Mystery Drama
    * Action
    * Fantasy
    * Thriller
* A shelf should contain the movie tiles filtered for that shelf criterion
* Navigation between tiles and between shelves by keyboard arrow keys only

### Feature 1 - Details Page
* The user can press *ENTER* on a particular movie tile to view more details
* **Details** page should display the following:
    * Movie Poster
    * Title
    * IMDB Rating
    * Genres
    * Year Released
    * Duration in minutes
    * Age Rating
    * Plot Summary
    * Director
    * Production Company
    * Stars
* The user can press *ESCAPE* to exit **Details** page

### Feature 2 - Favorites
* The user has a way to indicate a movie as their favorite
    * Without **Details** page, press *ENTER* to toggle favorite
    * With **Details** page, a button in the **Details** page to add / remove favorite
* Display a *heart* or *star* on the movie tile to indicate that movie is a favorite
* The favorites should persist across different sessions.
    * When user exits the application and re-opens, they should still have their favorites

### Feature 3 - Favorite Shelf
* Display a shelf with only movies that the user has favorited
* The shelf should only exist if the user has favorite movies
