import './style.js'
import { Banner } from './style'
import Image from '../../assets/images.jpg'

export function BannerAccount(){
    return(
        <Banner>
            <img src={Image.src} />
        </Banner>
    )
}