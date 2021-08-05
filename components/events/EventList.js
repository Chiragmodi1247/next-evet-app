import EventItem from "./EventItem"
import classes from './EventList.module.css'

function EventList (props) {
  return (
    <ul className={classes.list}>
      {props.items.map(event => (
        <EventItem
          key={event.id}
          title={event.title}
          image={event.image}
          location={event.location}
          id={event.id}
          date={event.date}
        />
      ))}
    </ul>
  )
}
 
export default EventList