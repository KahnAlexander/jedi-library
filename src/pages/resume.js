import React from 'react'
import resume from '../resources/KahnResume.pdf';

const Resume = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <iframe 
                title='Resume PDF' 
                src={resume}
                height='820em'
                width='600px'>
            </iframe>
        </div>
    )
}

export default Resume
