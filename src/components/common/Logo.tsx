import { Image, ImageProps } from '@nextui-org/react'
import imageLogo from 'assets/manta-logo.png'

export default function Logo(props: ImageProps) {
  return <Image src={imageLogo} {...props} />
}
