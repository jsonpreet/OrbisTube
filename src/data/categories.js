import { AiOutlineCar } from 'react-icons/ai'
import { BsBrush, BsEmojiLaughing, BsNewspaper, BsVoicemail } from 'react-icons/bs'
import { CgGames, CgMusicNote, CgFilm, CgOrganisation, CgData } from 'react-icons/cg'
import { GiPopcorn } from 'react-icons/gi'
import {
  MdCardTravel,
  MdOutlinePets,
  MdOutlineSportsHandball
} from 'react-icons/md'

import { FaGraduationCap, FaBookReader } from "react-icons/fa";

export const CREATOR_VIDEO_CATEGORIES = [
  {
    title: 'People & Blogs',
    slug: 'people',
    icon: <FaBookReader size={18} />
  },
  {
    title: 'Podcast',
    slug: 'podcast',
    icon: <BsVoicemail size={21} />
  },
  {
    title: 'Autos & Vehicles',
    slug: 'vehicles',
    icon: <AiOutlineCar size={20} />
  },
  {
    title: 'Comedy',
    slug: 'comedy',
    icon: <BsEmojiLaughing size={20} />
  },
  {
    title: 'Education',
    slug: 'education',
    icon: <FaGraduationCap size={20} />
  },
  {
    title: 'Entertainment',
    slug: 'entertainment',
    icon: <GiPopcorn size={20} />
  },
  {
    title: 'Film & Animation',
    slug: 'film',
    icon: <CgFilm size={20} />
  },
  {
    title: 'Gaming',
    slug: 'gaming',
    icon: <CgGames size={21} />
  },
  {
    title: 'Howto & Style',
    slug: 'howto',
    icon: <BsBrush  size={20} />
  },
  {
    title: 'Music',
    slug: 'music',
    icon: <CgMusicNote size={21} />
  },
  {
    title: 'News & Politics',
    slug: 'news',
    icon: <BsNewspaper size={20} />
  },
  {
    title: 'Nonprofits & Activism',
    slug: 'nonprofits',
    icon: <CgOrganisation size={20} />
  },
  {
    title: 'Pets & Animals',
    slug: 'pets',
    icon: <MdOutlinePets size={20} />
  },
  {
    title: 'Science & Technology',
    slug: 'technology',
    icon: <CgData size={20} />
  },
  {
    title: 'Sports',
    slug: 'sports',
    icon: <MdOutlineSportsHandball size={20} />
  },
  {
    title: 'Travel & Events',
    slug: 'travel',
    icon: <MdCardTravel size={20} />
  }
]