import { useState } from 'react'
import PressArt from './PressArt'

export default function Photo({ src, alt = '', city, id }) {
  const [failed, setFailed] = useState(!src)
  if (!src || failed) return <PressArt id={id} alt={alt || city || ''} />
  return <img className="photo" src={src} alt={alt} onError={() => setFailed(true)} />
}
