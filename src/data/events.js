import {
  eventSummit,
  eventHealing,
  eventFaithWalk,
  eventNewLife,
} from '../assets/images'

export const events = [
  {
    id: 1,
    title: 'Annual Evangelism Summit',
    description:
      'A gathering of believers from across Africa to receive teaching, impartation, and inspiration to take the gospel to the nations.',
    image: eventSummit,
    category: 'Summit',
  },
  {
    id: 2,
    title: 'Jesus Crusade',
    description:
      'Events focused on the miraculous power of God, bringing healing and deliverance to those in need.',
    image: eventHealing,
    category: 'Crusade',
  },
  {
    id: 3,
    title: 'Healing Room',
    description:
      'Practical workshops designed to teach believers how to apply their faith in everyday life and walk in the power of the Spirit.',
    image: eventFaithWalk,
    category: 'Workshop',
  },
  {
    id: 4,
    title: 'New Life Conference',
    description:
      'This is a program with three sessions: supernatural night (2 nights) and Workers & Ministers conference.',
    image: eventNewLife,
    category: 'Conference',
  },
]
