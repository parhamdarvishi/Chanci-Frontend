import Image from "next/image";
import cardImage from "@public/image/events/cardImg.png";
import style from './style.module.scss';
import { Speaker } from "@/shared/types/speakers/speaker";
const SingleSpeakerCard: React.FC<{speaker: Speaker}> = ({speaker}) => {
    return (
        <div className={style.speaker_container}>
            <Image src={speaker.imagePath} alt="header" width={118} height={118} />
            <h5>{speaker.fullName}</h5>
            <p>{speaker.jobTitle}</p>
        </div>
    )
}
export default SingleSpeakerCard;