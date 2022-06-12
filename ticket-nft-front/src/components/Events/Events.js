import styled from "styled-components";

const newEvent = () => {
    console.log('first');
}
const Events = (props) => {
  return (
    
    <StyledEvents>
        <h1>New Event</h1>
        <form>
            <text>Name Event</text>
            <input type="text" name="name" placeholder="Name Event" />

            <text>Description</text>
            <input type="text" name="description" placeholder="Description" />

            <text>Date</text>
            <input type="date" name="date" placeholder="Date" />

            <text>Time</text>
            <input type="time" name="time" placeholder="Time" />

            <text>Price</text>
            <input type="number" name="price" placeholder="Price" />

            <text>Location</text>
            <input type="text" name="location" placeholder="Location" />

            <text>Image</text>
            <input type="text" name="image" placeholder="Image" />

            <button type="submit" onClick={newEvent}>Create</button>
            <button type="submit">Cancel</button>
        </form>
    </StyledEvents>
    
  );
  
}

const StyledEvents = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;



export default Events;