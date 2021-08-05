import { useRouter } from "next/router"
import { Fragment, useEffect, useState } from "react"
import ResultsTitle from "../../components/events/results-title"
import useSWR from "swr"

import EventList from "../../components/events/EventList"
import Button from "../../components/ui/button"
import ErrorAlert from '../../components/ui/error-alert'
import { getFilteredEvents } from "../../helpers/api-util"

function FilteredEventsPage () {
  const [ events, setEvents ] = useState()
  const router = useRouter()
  const filteredData = router.query.slug

  const { data, error } = useSWR('https://next-event-api-default-rtdb.asia-southeast1.firebasedatabase.app/events.json')

  useEffect(() => {
    if(data) {
      setEvents(Object.values(data))
    }
  }, [data])

  if(!events) {
    return <p className="center">Loading...</p>
  }

  const filteredYear = filteredData[0]
  const filteredMonth = filteredData[1]

  const numYear = +filteredYear
  const numMonth = +filteredMonth

  if(isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth > 12 || numMonth < 1 || error) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    )
  }

  const filteredEvent = events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
  });

  if(!filteredEvent || filteredEvent.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for chosen filter :(</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    )
  }

  const date = new Date(numYear, numMonth - 1)

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvent} />
    </Fragment>
  )
}

// export async function getServerSideProps(context) {
//   const { params } = context
//   const filteredData = params.slug

//   if(!filteredData) {
//     return <p className="center">Loading...</p>
//   }
//   const filteredYear = filteredData[0]
//   const filteredMonth = filteredData[1]

//   const numYear = +filteredYear
//   const numMonth = +filteredMonth

//   if(isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth > 12 || numMonth < 1) {
//     return {
//       props: {
//         hasError: true
//       }
//       // notFound: true
//     }
//   }

//   const filteredEvent = await getFilteredEvents({
//     year: numYear,
//     month: numMonth
//   })

//   return {
//     props: {
//       events: filteredEvent,
//       date: {
//         month: numMonth,
//         year: numYear
//       }
//     }
//   }

// }

export default FilteredEventsPage