import { Image, ImageProps } from '@nextui-org/react'
import textLogo from 'assets/manta-logo_100x24 copy.png'

export default function TextLogo(props: ImageProps) {
  return <Image src={textLogo} {...props} />
}
