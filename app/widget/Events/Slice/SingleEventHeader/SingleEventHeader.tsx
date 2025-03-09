import Image from "next/image";
import logoNav from "@public/image/icons/logoNav.svg";
import logoOasis from "@public/image/icons/OasisLogo3x.png";
import SingleSpeakerCard from "@/widget/Speakers/SingleSpeakerCard";
import style from "./singleEventHeader.module.scss";
import { Event } from "@/shared/types/events/event";
import { useEffect, useState } from "react";
import { Speaker } from "@/shared/types/speakers/speaker";
import { formatDate } from "@/shared/helpers/util";
const SingleEventHeader: React.FC<{ event: Event }> = ({ event }) => {
    const [moderator, setModerator] = useState<Speaker>();
    useEffect(() => {
        const foundModerator = event.speakers.find(speaker => speaker.jobTitle === "Moderator");
        if (foundModerator) setModerator(foundModerator);
    }, [event.speakers]);
    return (
        <div className={style.header_container}>
            <div className={style.desc_section}>
                <h1>{event.shortTitle}</h1>
                {event.hostedBy && <div>
                    <Image src={logoNav} alt="header" width={32} height={32} /> <h4>Hosted by {event.hostedBy}</h4>
                </div>}
                {event.supportedBy && <div>
                    <Image src={logoOasis} alt="header" width={32} height={32} /> <h4>Supported By {event.supportedBy}</h4>
                </div>}
                <hr className="divider"></hr>
                <h3>{formatDate(event.hostDate)} - {event.address}</h3>
            </div>
            <div className={style.speakers_section}>
                {event?.speakers?.length > 0 &&
                    <>
                        <h3>Speakers: </h3>
                        <div className={style.speakers}>
                            <div className={style.speakers_list}>
                                {event.speakers.filter(sp => sp.jobTitle !== "Moderator").map((speaker, index) => {
                                    return <SingleSpeakerCard key={index} speaker={speaker} />
                                })}
                            </div>
                            {moderator && <div className={style.moderator}>
                                <Image src={moderator.imagePath} alt="header" width={72} height={72} />
                                <div>
                                    <h5>{moderator.fullName}</h5>
                                    <p>{moderator.jobTitle}</p>
                                </div>
                            </div>}
                        </div></>
                }
            </div>
            <div>

            </div>
        </div>
    )
}
export default SingleEventHeader;