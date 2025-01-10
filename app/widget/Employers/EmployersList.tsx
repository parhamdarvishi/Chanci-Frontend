import React from "react";
import TopicSection from "./Slice/topicSection/topicSection";
import ShowCase from "./Slice/showCase/showCase";
import Journey from "./Slice/journey/journey";
import RightRoom from "./Slice/rightRoom/rightRoom";
import ArticlesCards from "./Slice/articlesCards/articlesCards";
import TopicPhoto from "@public/image/TopicPhoto.png";

const EmployersList = () => {
  return (
    <div>
      <TopicSection
        image={TopicPhoto}
        title={"Unlock Smarter Talent Acquisition"}
        desc={"Future-proof your team with bright talents and top graduates!"}
        btnTxt={"Post a job with us"}
      />
      <ShowCase />
      <Journey />
      <RightRoom />
      <ArticlesCards />
    </div>
  );
};

export default EmployersList;
