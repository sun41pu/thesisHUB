import { RoleBadge } from "@sh/UI/RoleBadge";
import { IconBtn } from "@pg/Thesis/UI/IconBtn";
import {
  ChevronUpIcon,
} from '@heroicons/react/24/solid'
import {
  TrashIcon,
  PencilSquareIcon,
  ArrowUturnLeftIcon
} from '@heroicons/react/24/outline'

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
})

export const CommentComponent = ({comment}) => {
  const {id, text, createdAt, parent_id, author} = comment

  return (
    <>
      <div className={"bg-neutral-50 px-4 sm:px-6 py-4 "}>
        <div className={"flex flex-row justify-between"}>
          <div className={"flex flex-row items-center gap-2"}>
            <span className={"text-xl font-bold"}>{author.username}</span>
            {/*@ts-ignore*/}
            <RoleBadge roleId={author.roleId} />
          </div>
          <span>{dateFormatter.format(Date.parse(createdAt))}</span>
        </div>
        <div>
          <p>{text}</p>
        </div>
        <div className={'text-blue-500 flex flex-row gap-2 text-xs'}>
          <IconBtn
            Icon={ChevronUpIcon}
            isActive={false}
            color={''}
          >
            2
          </IconBtn>
          <IconBtn
            Icon={ArrowUturnLeftIcon}
            isActive={false}
            color={''}
            children={''}
          />
          <IconBtn
            Icon={PencilSquareIcon}
            isActive={false}
            color={''}
            children={''}
          />
          <IconBtn
            Icon={TrashIcon}
            isActive={false}
            color={'text-red-400'}
            children={''}
          />

        </div>
      </div>
    </>
  );
};
