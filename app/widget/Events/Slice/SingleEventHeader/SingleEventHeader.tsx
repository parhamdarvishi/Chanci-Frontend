import Image from "next/image";
import logoNav from "@public/image/icons/logoNav.svg";
import SingleSpeakerCard from "@/widget/Speakers/SingleSpeakerCard";
import style from "./singleEventHeader.module.scss";
import cardImage from "@public/image/events/cardImg.png";
const SingleEventHeader: React.FC = () => {
    return (
        <div className={style.header_container}>
            <div className={style.desc_section}>
                <h1>Branding, Storytelling & Fundraising</h1>
                <div>
                    <Image src={logoNav} alt="header" width={32} height={32} /> <h4>Hosted by New Generation Network</h4>
                </div>
                <div>
                    <Image src={logoNav} alt="header" width={32} height={32} /> <h4>Supported by Oasis</h4>
                </div>
                <hr className="divider"></hr>
                <h3>15th of February 2025 - London-UK</h3>
            </div>
            <div className={style.speakers_section}>

                <h3>Speakers: </h3>
                <div className={style.speakers}>
                    <div className={style.speakers_list}>
                        <SingleSpeakerCard />
                        <SingleSpeakerCard />
                        <SingleSpeakerCard />
                    </div>
                    <div className={style.moderator}>
                        <Image src={cardImage} alt="header" width={72} height={72} />
                        <div>
                            <h5>Moderator</h5>
                            <p>Description Description Description</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}
export default SingleEventHeader;