import React from 'react'

const Signin = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center', //horizontal center
            alignItems: 'center' //vertical center
        }}>

            <form action="/action_page.php">
                <label>Username: </label>
                <input type="text" id="username" name="username"/><br/><br/>
                <label>Password: </label>
                <input type="password" id="password" name="password"/><br/><br/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default Signin
