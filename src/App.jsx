import { Navigate, Route, Routes } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
import { categories } from './content'
import AdditionPage from './pages/AdditionPage'
import ComingSoonPage from './pages/ComingSoonPage'
import HomePage from './pages/HomePage'
import LetterGamesPage from './pages/LetterGamesPage'
import LetterListenPage from './pages/LetterListenPage'
import MatchingNumberPage from './pages/MatchingNumberPage'
import MissingNumberPage from './pages/MissingNumberPage'
import NumberGamesPage from './pages/NumberGamesPage'
import NumberSortPage from './pages/NumberSortPage'

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="numbers" element={<NumberGamesPage />} />
        <Route path="numbers/sort" element={<NumberSortPage />} />
        <Route path="numbers/missing" element={<MissingNumberPage />} />
        <Route path="numbers/match" element={<MatchingNumberPage />} />
        <Route path="numbers/addition" element={<AdditionPage />} />
        <Route path="letters" element={<LetterGamesPage />} />
        <Route path="letters/listen" element={<LetterListenPage />} />
        <Route path="words" element={<ComingSoonPage category={categories[2]} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
