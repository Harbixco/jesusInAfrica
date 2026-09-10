import { Link } from 'react-router-dom'
import EventGrid from '../events/EventGrid'
import { events } from '../../data/events'

export default function EventsSection() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#0F172A] uppercase tracking-wide mb-3">
            EVENTS
          </h2>
          <div className="w-16 h-1 bg-[#FD9800] mx-auto mb-4" />
          <p className="font-body text-[15px] text-[#454F5E] max-w-2xl mx-auto">
            JIA hosts a variety of events aimed at equipping and empowering believers to spread the gospel with passion and zeal.
          </p>
        </div>

        <EventGrid events={events} />

        <div className="text-center mt-12">
          <Link
            to="/events"
            className="inline-flex items-center justify-center bg-[#FD9800] hover:bg-[#E98C00] text-[#FEF9E1] font-semibold text-[13px] uppercase tracking-[2px] px-8 py-3.5 transition-colors"
          >
            View All Events
          </Link>
        </div>
      </div>
    </section>
  )
}
