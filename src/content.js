export const categories = [
  {
    id: 'numbers',
    path: '/numbers',
    name: '数字乐园',
    icon: '123',
    description: '认识数字，发现排列与计算的乐趣',
    card: 'from-orange-100 to-amber-50 border-orange-200 hover:shadow-orange-200',
    iconColor: 'from-orange-400 to-amber-500 shadow-orange-200',
    active: true,
  },
  {
    id: 'letters',
    path: '/letters',
    name: '字母天地',
    icon: 'ABC',
    description: '认识字母，听见不一样的声音',
    card: 'from-sky-100 to-cyan-50 border-sky-200 hover:shadow-sky-200',
    iconColor: 'from-sky-400 to-cyan-500 shadow-sky-200',
    active: true,
  },
  {
    id: 'words',
    path: '/words',
    name: '单词森林',
    icon: 'Aa',
    description: '认识单词，用语言探索新世界',
    card: 'from-emerald-100 to-lime-50 border-emerald-200 hover:shadow-emerald-200',
    iconColor: 'from-emerald-400 to-lime-500 shadow-emerald-200',
  },
]

export const numberGames = [
  {
    path: '/numbers/sort',
    icon: '🚂',
    name: '数字排排队',
    description: '从 1 到 9，帮数字小火车排好队',
    card: 'from-orange-100 to-amber-50 border-orange-200 hover:shadow-orange-200',
    iconColor: 'bg-orange-200',
  },
  {
    path: '/numbers/missing',
    icon: '🔍',
    name: '谁不见了？',
    description: '仔细观察，找出 1–9 中缺少的数字',
    card: 'from-sky-100 to-cyan-50 border-sky-200 hover:shadow-sky-200',
    iconColor: 'bg-sky-200',
  },
  {
    path: '/numbers/match',
    icon: '🍎',
    name: '数字找朋友',
    description: '数一数物品，把数字和数量配成一对',
    card: 'from-emerald-100 to-lime-50 border-emerald-200 hover:shadow-emerald-200',
    iconColor: 'bg-emerald-200',
  },
  {
    path: '/numbers/addition',
    icon: '🍓',
    name: '水果加一加',
    description: '把两组水果合在一起，认识加法的意思',
    card: 'from-rose-100 to-pink-50 border-rose-200 hover:shadow-rose-200',
    iconColor: 'bg-rose-200',
  },
]

export const letterGames = [
  {
    path: '/letters/listen',
    icon: '🔊',
    name: '字母点点读',
    description: '点一点 A–Z，听听每个字母怎么读',
    card: 'from-sky-100 to-cyan-50 border-sky-200 hover:shadow-sky-200',
    iconColor: 'bg-sky-200',
  },
]

export const numberColors = [
  'from-rose-100 to-rose-200 border-rose-200 text-rose-700 shadow-rose-100',
  'from-orange-100 to-orange-200 border-orange-200 text-orange-700 shadow-orange-100',
  'from-amber-100 to-amber-200 border-amber-200 text-amber-700 shadow-amber-100',
  'from-lime-100 to-lime-200 border-lime-200 text-lime-700 shadow-lime-100',
  'from-emerald-100 to-emerald-200 border-emerald-200 text-emerald-700 shadow-emerald-100',
  'from-cyan-100 to-cyan-200 border-cyan-200 text-cyan-700 shadow-cyan-100',
  'from-sky-100 to-sky-200 border-sky-200 text-sky-700 shadow-sky-100',
  'from-violet-100 to-violet-200 border-violet-200 text-violet-700 shadow-violet-100',
  'from-fuchsia-100 to-fuchsia-200 border-fuchsia-200 text-fuchsia-700 shadow-fuchsia-100',
]
