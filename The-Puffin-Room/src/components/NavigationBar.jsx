import {  useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {getTopics} from "../api"

function NavigationBar() {
    const [topicList, setTopicList] = useState([])
    const [selectedTopic,setSelectedTopic] = useState("")
    
    useEffect(() => {
        getTopics().then((topics)=>{
            setTopicList(topics)
        });
      }, [setTopicList]);

      const handleClick = (topic) =>{
        setSelectedTopic(topic);
      }

  return (
    <div className="navigationBar">
        <Link to={`/articles`} className={selectedTopic === "article"? "activeTopicTab":"topicTab"}
        onClick={() => handleClick("article")}>
          All Article
        </Link>
        {topicList.map((topic) => (
        <Link key={topic.slug} to={`/articles/${topic.slug}`} onClick={() => handleClick(topic.slug)}  
        className={topic.slug === selectedTopic? "activeTopicTab":"topicTab"}
        >
          {(topic.slug).charAt(0).toUpperCase() + (topic.slug).slice(1)}
        </Link>
      ))}
    </div>
  );
}

export default NavigationBar;