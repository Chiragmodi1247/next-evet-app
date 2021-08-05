import Button from '../ui/button'
import DateIcon from './../icons/date-icon'
import AddressIcon from './../icons/address-icon'
import ArrowRightIcom from './../icons/arrow-right-icon'
import classes from './EventItem.module.css'

function EventItem (props) {
  const { title, image, date, location, id } = props

  const humanReadableDate = new Date(date).toLocaleDateString('en-us', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
  const formattedAddress = location.replace(', ', '\n')
  const exploreLink = `/events/${id}`

  return (
    <li className={classes.item}>
      <img src={ '/' + image } alt="" />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>

        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore events</span>
            <span className={classes.icon}>
              <ArrowRightIcom />
            </span>
          </Button>
        </div>
      </div>
    </li>
  )
}

export default EventItem