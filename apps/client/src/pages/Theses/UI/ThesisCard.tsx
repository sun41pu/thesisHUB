import { parseDateToLocal } from "@sh/lib/parsers/parseDateToLocal";
import { motion } from "framer-motion";
import { isOdd } from "@sh/lib/parsers";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { StatusBadge } from "@sh/UI";
import {  ChevronRightIcon } from "@heroicons/react/24/solid";


export const ThesisCard = ({ thesis, index }) => {
  const { ref, entry } = useInView({
    triggerOnce: true,
    trackVisibility: true,
  });

  const upvoted = false

  console.log(thesis.createdAt);

  const {
    id,
    name,
    description,
    short_description,
    upvotes,
    author,
    fileLinks,
    comments,
    createdAt,
    updatedAt,
  } = thesis;

  const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1, x: 0 },
  };

  return (
    <div className={'my-2 mx-2'}>

        <motion.div
          className={"bg-white rounded-xl shadow w-full p-4"}
          key={thesis.id}
          ref={ref}
          variants={variants}
          animate={entry?.isVisible ? "enter" : "hidden"}
          initial={{ opacity: 0, x: isOdd(index) ? 200 : -200 }}
          transition={{
            delay: index * 0.05,
            duration: 0.8 + index * 0.02,
            ease: "easeInOut",
          }}
        >
          <div className={'flex flex-row justify-between'}>
            <div>
              <p className={'text-xs text-neutral-500'}>{parseDateToLocal(createdAt)}</p>
              <div className={'flex flex-row items-center gap-2'}>
                <h3>{name}</h3>
                <StatusBadge statusId={ thesis.statusId }/>
              </div>
              <p>{short_description || 'нет описания'}</p>
              <div className={'flex flex-row gap-2 items-center mt-3'}>
                {/*<div className={`${upvoted ? 'bg-blue-400 text-white stroke-1' : 'bg-blue-50 text-blue-500'} hover:bg-blue-100 tr cursor-pointer stroke-current flex flex-row items-center gap-1 px-4 py-1 w-fit rounded-2xl`}>*/}
                {/*  <div>{upvotes}</div>*/}
                {/*  <ChevronUpIcon className={'w-5 h-5'}/>*/}
                {/*</div>*/}
                <Link to={`/thesis/${thesis.id}`} className={'text-sm tr resp bg-blue-50 text-blue-500 flex flex-row items-center hover:bg-blue-100 gap-1 px-4 py-1 w-fit rounded-2xl'}>
                  Подробнее
                  <ChevronRightIcon className={'w-5 h-5'}/>
                </Link>
              </div>
            </div>
            <Link to={`/`} className={'flex flex-col'}>
              <img src={author.Picture} alt={"Picture"} className={'w-14 h-14 rounded'}/>
              <p className={'text-sm italic text-neutral-500 mt-2'}>Автор</p>
              <p>{author.username}</p>
            </Link>
          </div>
        </motion.div>
    </div>
  );
};
