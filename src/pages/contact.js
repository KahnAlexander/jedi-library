import React from 'react'
// import emailjs from 'emailjs-com';

const Contact = () => {

    function sendEmail(e) {
        e.preventDefault();

        // emailjs.sendForm()
        alert('SEND EMAIL');
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center', //horizontal center
            alignItems: 'center', //vertical center
        }}>

            <form onSubmit={sendEmail}>
                <label>Contact Email: </label>
                <input type="text" id="email" name="email"/><br/><br/>
                <label>Message: </label>
                <input type="text" id="message" name="message"/><br/><br/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default Contact
