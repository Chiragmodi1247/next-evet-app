import { useRouter } from "next/router"
import { Fragment } from "react"
import EventList from "../../components/events/EventList"
import EventSearch from "../../components/events/EventSearch"
import { getAllEvents } from "../../helpers/api-util"

function AllEventsPage (props) {
  const router = useRouter()
  const { events } = props

  function findEventsHandlers (year, month) {
    const fullPath = `/events/${year}/${month}`
    router.push(fullPath)
  }

  return (
    <Fragment>
      <EventSearch onSearch={findEventsHandlers} />
      <EventList items={events} />
    </Fragment>
  )
}

export async function getStaticProps () {
  const events = await getAllEvents()
  return {
    props: {
      events
    }
  }
}

export default AllEventsPage