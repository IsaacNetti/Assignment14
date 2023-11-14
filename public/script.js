const getAlbums = async() => {
    try {
        return (await fetch("api/albums/")).json();
    } catch (error) {
        console.log(error);
    }
};

const showAlbums = async() => {
    let albums = await getAlbums();
    let albumsDiv = document.getElementById("album-list");
    albumsDiv.innerHTML = "";
    albums.forEach((album) => {
        const section = document.createElement("section");
        section.classList.add("album");
        albumsDiv.append(section);

        const h3 = document.createElement("h3");
        h3.innerHTML = album.name;
        section.append(h3);

        const p1 = document.createElement("p");
        section.append(p1);
        p1.innerHTML = "Artist: "+album.artist;

        const p2 = document.createElement("p");
        section.append(p2);
        p2.innerHTML = "Rating: "+album.rating+"/10";

        const p3 = document.createElement("p");
        section.append(p3);
        p3.innerHTML = "Genre: "+album.genre;
        
        const p4 = document.createElement("p");
        section.append(p4);
        p4.innerHTML = "Released: "+album.releaseDate;

        const ul = document.createElement("ul");
        section.append(ul);
        console.log(album.songs);
        album.songs.forEach((song) => {
            const li = document.createElement("li");
            ul.append(li);
            li.innerHTML = song;
        });
    });
};

const addAlbum = async(e) => {
    e.preventDefault();
    const form = document.getElementById("add-album-form");
    const formData = new FormData(form);
    let response;

    //trying to add a new album
        formData.append("songs", getSongs());
        
        console.log(...formData);

        response = await fetch("/api/albums", {
            method: "POST",
            body: formData
        });
    

    //successfully got data from server
    if (response.status != 200) {
        console.log("Error posting data");
        alert("Adding failed");
    }

    response = await response.json();
    resetForm();
    document.querySelector(".dialog").classList.add("transparent");
    showAlbums();
    location.reload();
    alert("Successfully added");
};

const getSongs = () => {
    const inputs = document.querySelectorAll("#song-boxes input");
    let songs = [];

    inputs.forEach((input) => {
        songs.push(input.value);
    });

    return songs;
}

const resetForm = () => {
    const form = document.getElementById("add-album-form");
    form.reset();
    document.getElementById("song-boxes").innerHTML = "";
};

const showHideAdd = (e) => {
    e.preventDefault();
    document.querySelector(".dialog").classList.remove("transparent");
    document.getElementById("add-title").innerHTML = "Add album";
    resetForm();
};

const addSong = (e) => {
    e.preventDefault();
    const section = document.getElementById("song-boxes");
    const input = document.createElement("input");
    input.type = "text";
    section.append(input);
}

window.onload = () => {
    showAlbums();
    document.getElementById("add-album-form").onsubmit = addAlbum;
    document.getElementById("add-link").onclick = showHideAdd;

    document.querySelector(".close").onclick = () => {
        document.querySelector(".dialog").classList.add("transparent");
    };

    document.getElementById("add-song").onclick = addSong;
};