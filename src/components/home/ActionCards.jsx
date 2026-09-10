import { Link } from 'react-router-dom'
import prayingHandsIcon from '../../assets/icons/praying-hands.svg'
import mailIcon from '../../assets/icons/mail.svg'
import heartIcon from '../../assets/icons/heart.svg'

export default function ActionCards() {
  const cards = [
    {
      title: 'LET US PRAY',
      description:
        'It is our privilege to pray for you today and agree with you for your miracle answer.',
      link: '/prayer',
      icon: (
        <img
          src={prayingHandsIcon}
          alt="Praying hands"
          className="w-10 h-10 [filter:invert(63%)_sepia(97%)_saturate(1487%)_hue-rotate(360deg)_brightness(103%)_contrast(102%)]"
        />
      ),
    },
    {
      title: 'EMAIL NEWSLETTER',
      description:
        'Get the latest news, Bible Studies, Campaign reports and special offers.',
      link: '#colophon',
      isAnchor: true,
      icon: (
        <img
          src={mailIcon}
          alt="Newsletter mail"
          className="w-10 h-10 [filter:invert(63%)_sepia(97%)_saturate(1487%)_hue-rotate(360deg)_brightness(103%)_contrast(102%)]"
        />
      ),
    },
    {
      title: 'DONATE',
      description:
        'Make a measurable difference! Make an online donation.',
      link: '/donate',
      icon: (
        <img
          src={heartIcon}
          alt="Donate heart"
          className="w-10 h-10 [filter:invert(63%)_sepia(97%)_saturate(1487%)_hue-rotate(360deg)_brightness(103%)_contrast(102%)]"
        />
      ),
    },
  ]

  return (
    <section className="bg-[#FAF9F5] border-b border-gray-100 py-5">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {cards.map((card) => {
            const content = (
              <div className="flex items-start gap-5 p-6 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow group h-full">
                <div className="shrink-0 p-3 bg-[#FEF9E1] group-hover:bg-[#FD9800]/20 transition-colors">
                  {card.icon}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-[#0F172A] tracking-wider uppercase mb-2 group-hover:text-[#FD9800] transition-colors">
                    {card.title}
                  </h3>
                  <p className="font-body text-[14px] text-[#454F5E] leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            )

            if (card.isAnchor) {
              return (
                <a key={card.title} href={card.link} className="block">
                  {content}
                </a>
              )
            }

            return (
              <Link key={card.title} to={card.link} className="block">
                {content}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
