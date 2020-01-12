const backdrop = document.getElementById('backdrop');
const startAddButton = document.querySelector('header button');
const addMovieModal = document.getElementById('add-modal');
const closeAdditionModal = addMovieModal.querySelector('.btn--passive');
const addMovieBtn = addMovieModal.querySelector('.btn--success');
const userInputs = addMovieModal.querySelectorAll('input');
let idMovie = 0;
const movies = [];
const deletingModal = document.getElementById('delete-modal');
const cancelBtn = deletingModal.querySelector('.btn--passive');

function updateUI() {
    if(movies.length > 0){
        document.querySelector('#entry-text').style.display = "none";
    } else {
        document.querySelector('#entry-text').style.display = "";
    }
}

function showAddModalHandler() {
    toggleBackdrop();
    addMovieModal.classList.add('visible');
}

function closeAddModalHandler() {
    addMovieModal.classList.remove('visible');
    clearUserInputs();
}

function clearUserInputs() {
    for(const input of userInputs){
        input.value = '';
    }
}

function toggleBackdrop() {
    backdrop.classList.toggle('visible');
}

function showDeletingModalHandler(deleteIdMovie) {
    toggleBackdrop();
    deletingModal.classList.add("visible");

    let removeBtn = deletingModal.querySelector('.btn--danger');
    removeBtn.replaceWith(removeBtn.cloneNode(true)); //Fix many eventlisteners on 1 btn
    removeBtn =  deletingModal.querySelector('.btn--danger');

    removeBtn.addEventListener('click', deleteMovie.bind(null, deleteIdMovie));
}

function deleteMovie(deleteIdMovie) {
    let id = 0;
    for(const movie of movies){
        if(movie.id === deleteIdMovie){
            break;
        }
        id++;
    }
    movies.splice(id, 1);

    const listMovies = document.getElementsByTagName("ul")[0];
    const movieForDeleting = listMovies.querySelectorAll('li')[id];
    movieForDeleting.remove();

    closeDeletingModal();
    toggleBackdrop();
    updateUI();
}

function closeDeletingModal(){
    deletingModal.classList.remove("visible");
}

function addMovieHandler(){
    const titleMovie = userInputs[0].value;
    const imgMovie = userInputs[1].value;
    const ratingMovie = userInputs[2].value;

    if(titleMovie.trim() === "" || imgMovie.trim() === "" || ratingMovie.trim() === "" || 
    ratingMovie.trim() < 1 || ratingMovie.trim() > 5){
        alert("Entered wrong(empty) value (rating from 1 to 5");
        return;
    }

    const movie = {
        id: idMovie++,
        title: titleMovie,
        img: imgMovie,
        rating: ratingMovie
    };

    movies.push(movie);
    closeAddModalHandler();
    toggleBackdrop();
    updateUI();

    const listMovies = document.getElementsByTagName("ul")[0];
    const addMovieItem = document.createElement('li');
    addMovieItem.classList.add("movie-element");
    addMovieItem.innerHTML = `
        <div class = "movie-element__image">
            <img src = "${imgMovie}" alt = "${titleMovie}"/>
        </div>
        <div class = "movie-element__info">
            <h2>${titleMovie}</h2>
            <p>${ratingMovie}/5 stars</p>
        </div>
    `;
    
    listMovies.append(addMovieItem);

    addMovieItem.addEventListener('click', showDeletingModalHandler.bind(null, movie.id));
}

startAddButton.addEventListener('click', showAddModalHandler);
backdrop.addEventListener('click', () => {
    toggleBackdrop();
    closeAddModalHandler();
    closeDeletingModal();
});
closeAdditionModal.addEventListener('click', closeAddModalHandler);
addMovieBtn.addEventListener('click', addMovieHandler);
cancelBtn.addEventListener('click', () => {
    closeDeletingModal();
    toggleBackdrop();
});