import React from 'react'
import './PhotoGallery.css'

function PhotoGallery() {
    return (
        <div className='photogallery-container'>
            <h1 className='photogallery-title'>TOP 4 PICTURES TAKEN BY OUR STUDENTS THIS WEEK</h1>
            <div className="photogallery-images">
                <img src="https://images.unsplash.com/photo-1710413662865-544fca164656?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMwfEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D" alt=''/>
                <img src="https://images.unsplash.com/photo-1703504422237-c4f9194b8b82?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D" alt=''/>
                <img src="https://images.unsplash.com/photo-1711064643775-b1eca03ec8e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D" alt=''/>
                <img src="https://images.unsplash.com/photo-1711100358818-bd901363d56a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDd8RnpvM3p1T0hONnd8fGVufDB8fHx8fA%3D%3D" alt=''/>
               
            </div>
         
        </div>
    )
}

export default PhotoGallery