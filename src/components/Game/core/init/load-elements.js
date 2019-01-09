// @flow
import ImageLoader from '../../../../helpers/image-loader'
import ship from '../../../../assets/img/Ship.png'
import invader from '../../../../assets/img/Enemy.png'
import invaderShot from '../../../../assets/img/Enemy-shot.png'
import heart from '../../../../assets/img/Heart.png'

export default function() {
  ImageLoader.load({
    ship,
    invader,
    invaderShot,
    heart
  })
}
