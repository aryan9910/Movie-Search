import React from 'react'

const MovieCard = ({movie, onClick}) => {
  return (
    <div onClick={onClick} style={{border:'1px solid #ccc', borderRadius:'10px', padding:'10px', marginBottom:'15px', width:'200px', textAlign:'center', cursor:'pointer'}}>
        <img src={movie.Poster!=="N/A"?movie.Poster:"https://i.imgur.com/sJ3CT4V.png"} alt={movie.Title} style={{width:'100%', height:'300px', objectFit:'cover', borderRadius:'8px'}}/>
        <h3 style={{marginTop:'10px'}}>{movie.Title}</h3>
        <p>{movie.Year}</p>
    </div>
  )
}

export default MovieCard