const closeSidebar = () => {
    document.getElementById("side-bar").classList.add("hide-side-bar");
    setTimeout(() => {
        document.getElementById("menu-bar").classList.remove("menu-bar-hide");
    }, 400)
}

const showSidebar = () => {
    document.getElementById("menu-bar").classList.add("menu-bar-hide");

    setTimeout(() => {
        document.getElementById("side-bar").classList.remove("hide-side-bar");
    }, 0)
}

const myPlaylist = (ind) => {
    let playlistTitle = `title-${ind}`;
    let playlist = `playlist-item-${ind}`;
    document.getElementById(playlist).classList.toggle("toggle-display");
    document.getElementById(playlistTitle).classList.toggle("playlist-title-active");
}

const showCreatePlaylistForm = (ind) => {
    document.querySelector(`.hideNewPlaylist-${ind}`).style.display = "block";
    document.querySelector(`.createNewPlaylist-${ind}`).style.display = "none";
    document.getElementById(`create-new-playlist-form-${ind}`).classList.add("create-new-playlist-form-show");
}

const hideCreatePlaylistForm = (ind) => {
    document.querySelector(`.hideNewPlaylist-${ind}`).style.display = "none";
    document.querySelector(`.createNewPlaylist-${ind}`).style.display = "block";
    document.getElementById(`create-new-playlist-form-${ind}`).classList.remove("create-new-playlist-form-show");
}