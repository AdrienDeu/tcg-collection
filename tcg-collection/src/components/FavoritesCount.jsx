import { useFavorites } from '../context/favorites.js'

function FavoritesCount() {
  const { favoriteIds } = useFavorites()
  const count = favoriteIds.length

  return <span>{`★ ${count} favori${count === 1 ? '' : 's'}`}</span>
}

export default FavoritesCount
