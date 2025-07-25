import React from "react";

const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null;

  return(
    <div style={{position:"fixed", top:0, left:0, width:'100%', height:'100%', backgroundColor:'rgba(0.0.0.0.6)', display:'flex', justifyContent:'center', alignItems:'center', zIndex:1000}}>
        <div style={{background:'white', padding:'20px', borderRadius:'10px', width:'90%', maxWidth:'500px', maxHeight:'80%',overflow:'auto'}}>
            <h2>{movie.Title}{movie.Year}</h2>
            <img src={movie.Poster!=="N/A"? movie.Poster:"https://i.imgur.com/sJ3CT4V.png"} alt={movie.Title} style={{width:'100%', height:'auto', borderRadius:'8px', marginBottom:'15px'}}/>
            <p><strong>Genre:</strong>{movie.Genre!="N/A"?" "+movie.Genre:"Unknown"}</p>
            <p><strong>Director:</strong>{movie.Director?" "+ movie.Director:"Unknown"}</p>
            <p><strong>Actors:</strong>{movie.Actors?" "+ movie.Actors:"Unknown"}</p>
            <p><strong>Plot:</strong>{movie.Plot?" "+ movie.Plot:"Plot unavailable"}</p>
            <p><strong>IMDB Rating:</strong>{movie.imdbRating?" "+ movie.imdbRating:"Not Rated"}</p>
            <button onClick={onClose} style={{marginTop:'10px', padding:'8px 12px'}}>
                Close
            </button>
        </div>
    </div>
  )
};

export default MovieModal;
