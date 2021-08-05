import { getFeaturedEvents } from '../helpers/api-util'
import EventList from '../components/events/EventList'
import NewsletterRegistration from '../components/input/newsletter-registration'

function HomePage (props) {
  return (
    <div>
      <NewsletterRegistration />
      <EventList items={props.featuredEvents}/>
    </div>
  )
}

export async function getStaticProps () {
  const featuredEvents = await getFeaturedEvents()
  return {
    props: {
      featuredEvents
    },
    revalidate: 3600
  }
}
export default HomePage