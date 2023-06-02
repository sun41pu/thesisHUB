import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GETThesisById } from "@sh/api/thesis/GET.ThesisById";
import fallbackPfp from '@as/img/fallbackPfp.png'
import { Helmet } from "react-helmet";
import { CommentEngine } from "@pg/Thesis/Comments/CommentEngine";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { StatusBadge } from "@sh/UI";
import { parseDateToLocal } from "@sh/lib/parsers";
import { useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { ThesisOptions } from "@pg/Profile/UI";

export const Content = ({id}) => {
  const queryClient = useQueryClient()
  const [thesisTitle, setThesisTitle] = useState('Загружаем...')
  const User = useAuthUser()

  const {isLoading, isError, data, error, isFetching} = useQuery({
    queryKey: [`thesis-${id}`],
    queryFn: () => GETThesisById(id),
    onSuccess: (data) => {
      setThesisTitle(data?.name)
      console.log(data)
    }
  })

  if (data) {
    console.log('DATA', data)
  }

 if (isLoading) {
    return <div>подождите немного</div>
  }
 if (isError) {
    return <div>Ошибка: {error.message}</div>
  }

  return (
    <>
      <Helmet>
        <title>{thesisTitle} от {data.author.username}</title>
      </Helmet>
        <div className={"container mx-auto flex flex-col sm:flex-row gap-6 justify-between bg-white p-6 rounded-md"}>
            <div id={'Thesis'}>
              <div className={'mb-2 -ml-2 flex flex-row items-center gap-2'}>
                <StatusBadge statusId={ data.statusId } />
                <p className={'text-xs text-neutral-500'}>{parseDateToLocal(data.createdAt)}</p>
              </div>
              <h1>{thesisTitle}</h1>
              <p>{data.description}</p>
            </div>
            <div id={'Author'}
                 className={"bg-white p-6 rounded flex flex-row gap-4"}>
              <div id={'ProfilePicture'}
                   className={'w-16 h-16 overflow-hidden rounded-xl shadow-lg'}>
                {data.author.Picture
                  ? <img src={data.author.Picture} alt={''}/>
                  : <img src={fallbackPfp} className={'opacity-70 w-full h-full'} alt={'Нет изображения'}/>
                }
              </div>
              <div className={''}>
                <h4>{data.author.username}</h4>
                <p className={'text-xs italic text-neutral-500'}>Автор</p>
              </div>
            </div>
        </div>
      <div className={'mt-4 bg-white p-6 rounded-md CONTENT'}>
        <div className={'flex flex-row gap-2'}>
          {
            data.fileLinks.length > 0 ?
              data.fileLinks.map((docs, index) => (
                <a href={docs} target={'_blank'} key={index} className={'group shadow-md block rounded-xl relative bg-white overflow-hidden w-32 tr resp cursor-pointer p-1'}>
                  <DocumentIcon className={'w-full h-auto max-h-40 max-w-40 rounded-xl text-blue-400 group-hover:text-blue-500 tr bg-blue-50 p-2 shadow-inner'}/>
                  <p className={'text-gray-800 text-center mt-2 mb-2'}>
                    Документ
                  </p>
                </a>
              ))
              : <p>Нет документов</p>
          }
        </div>

        <div>
          <ThesisOptions id={data.id} authorId={data.author.id} userId={User().id} roleId={User().roleId} statusId={data.statusId}/>
        </div>

        {
          data.roleId > 1 &&
          <div className={'mt-12'}>
            <CommentEngine comments={data.Comments}/>
          </div>
        }
      </div>

    </>
  );


}
