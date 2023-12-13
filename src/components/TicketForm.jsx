import React from 'react'

const TicketForm = () => {
  return (
    <form className={``}>
        <button type="submit">Buy a ticket</button>
        <ul>
            <li>
                <label htmlFor='date1'>12-10</label>
                <input type='radio' id='date1' name='film_date' value='12-10'/>
            </li>
            <li>
                <label htmlFor='date2'>13-10</label>
                <input type='radio' id='date2' name='film_date' value='13-10'/>
            </li>
            
        </ul>
    </form>
  )
}

export default TicketForm