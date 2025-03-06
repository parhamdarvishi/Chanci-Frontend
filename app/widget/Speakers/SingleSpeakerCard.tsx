import Image from "next/image";
import cardImage from "@public/image/events/cardImg.png";
import style from './style.module.scss';
const SingleSpeakerCard: React.FC = () => {
    return (
        <div className={style.speaker_container}>
            <Image src={cardImage} alt="header" width={118} height={118} />
            <h5>Full name</h5>
            <p>Descriptions Descriptions Descriptions Descriptions Descriptions</p>
        </div>
    )
}
export default SingleSpeakerCard;