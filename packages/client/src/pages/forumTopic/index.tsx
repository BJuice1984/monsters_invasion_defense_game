import React, { FC } from "react";

import style from "./style.module.scss";
import Layout from "@/components/Layout";
import { useParams } from "react-router";

import temp_data from "@/pages/forumTopic/temp_data";
import Button from "@/ui/button";

const ForumTopics: FC = () => {
  const params = useParams();
  const page = params.topicId;
  // TODO get message by topic id
  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  };

  return (
    <Layout.Page>
      <div className={style.titleBox}>
        <h2 className={style.topic}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </h2>
      </div>

      {temp_data.map(item => (
        <div className={style.message} key={item.id}>
          <div className={style.date}>
            <span>{item.date}</span>
            <span>#{item.id}</span>
          </div>
          <div className={style.body}>
            <div className={style.user}>
              <div className={style.name}>{item.user.name}</div>
              <div className={style.avatar}>
                <img src={item.user.avatar} alt="" />
              </div>
            </div>
            <div className={style.text}>
              <p>{item.message}</p>
            </div>
          </div>
        </div>
      ))}

      <form method="post" onSubmit={onSubmitHandler}>
        <div className={style.footer}>
          <textarea
            className={style.textarea}
            name="message"
            defaultValue="I really enjoyed killing Zomby yesterday!"
          />
          <Button.Flat name="Send Message" type="submit" deepRed={true} />
        </div>
      </form>
    </Layout.Page>
  );
};

export default ForumTopics;
