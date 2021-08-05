import { Fragment } from 'react'

import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'
import Comments from '../../components/input/comments'
import { getEventById, getFeaturedEvents } from '../../helpers/api-util'

function EventDetailsPage (props) {
  const event = props.event

  if(!event) {
    return (
      <div className="center">
        <p>No event found!</p>
      </div>
    )
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  )
}

export async function getStaticProps (context) {
  const eventId = context.params.eventId

  const event = await getEventById(eventId)

  return {
    props: {
      event
    },
    revalidate: 1800
  }
}

export async function getStaticPaths () {
  const allEvents = await getFeaturedEvents()

  const paths = allEvents.map((event) => ({ params: { eventId: event.id } }) )
  return {
    paths,
    fallback: 'blocking'
  }
}

export default EventDetailsPage