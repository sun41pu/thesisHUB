import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GETMyUser } from "@sh/api/user/GET.myUser";
import { useAuthUser } from "react-auth-kit";
import { supabase } from "@sh/lib/middleware/SupabaseClient";
import { v4 as uuidv4 } from "uuid";
import { RoleBadge } from "@sh/UI/RoleBadge";
import { PlusIcon, PencilIcon } from '@heroicons/react/24/outline'
import { ProfilePictureModal } from "@pg/Profile/UI/ProfilePictureModal";
import { useEffect, useState } from "react";
import { unmountComponentAtNode } from "react-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Content = () => {


  const {isLoading, isError, data, error, isFetching}
    = useQuery({ queryKey: ['user'], queryFn: GETMyUser})

  const [isOpen, setOpen] = useState(false)


  useEffect(
    () => {
      console.log(data)
    }, [data]
  )

  const User = useAuthUser()

  if (isLoading) {
    return <div>Загружаем...</div>
  }
  if (isError) {
    return <div>Ошибка: {error.message}</div>
  }



  return (
    <>
      <ProfilePictureModal isOpen={isOpen} setOpen={setOpen} userId={User().id} title={'Загрузка нового фото'} prompt={'Перетащите фото, или выберите с помощью кнопки Обзор'}/>
      <>
        <div className={''}>
          <div aria-label='profile-picture' className={'flex flex-row gap-6 bg-neutral-100 p-4 rounded-lg'}>
            <div className={''}>
              {
                (data?.Picture || data?.Picture === "[object Object]")
                ? <div className={'group w-32 h-32 relative rounded-lg text-neutral-400 font-bold text-center text-sm flex flex-row items-center'}>
                    <div className={'transition-all resp cursor-pointer opacity-60 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 p-1 absolute right-2 bottom-2 w-5 h-5 rounded-md bg-neutral-600 text-neutral-200 text-center'}
                         onClick={(e) => setOpen(true)} title={'Изменить фото'}
                    >
                      <PencilIcon/>
                    </div>
                    <img src={data.Picture} alt="Фото профиля недоступно"
                         className={'w-32 h-32 rounded-lg bg-neutral-200 shadow-lg'}/>
                  </div>

                : <div className={'group w-32 h-32 relative rounded-lg overflow-hidden bg-neutral-300 text-neutral-400 font-bold text-center text-sm flex flex-row items-center'}>
                  <div className={'transition-all resp cursor-pointer opacity-60 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 p-1 absolute right-2 bottom-2 w-5 h-5 rounded-md bg-neutral-600 text-neutral-200 text-center'}
                       onClick={(e) => setOpen(true)} title={'Изменить фото'}
                  >
                    <PlusIcon/>
                  </div>
                    Нет изображения
                  </div>
              }
            </div>
            <div>
              <div className={'flex flex-row gap-2 py-2 h-fit'}>
                <h3>{data?.username}</h3>
                <RoleBadge roleId={data?.roleId}/>
              </div>
              <div>email: {data?.email}</div>
            </div>
          </div>
          <div>
            <h3 className={'mt-24'}>Работы</h3>
            <div className={'py-4'}>
              {!data?.Authorsip.length
                ? <div>У автора еще нет работ</div>
                : <div className={'flex flex-col gap-4'}

                >
                    {data.Authorsip.map((thesis: any, index: number) => (
                      <motion.div key={index}
                        initial={{opacity: 0, x: 200}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.5 + index * 0.05, delay: index * 0.1}}
                      >
                      <div className={''}>
                      <Link to={`/thesis/${thesis?.id}`} className={'tr resp bg-neutral-100 rounded-lg px-4 py-6 flex flex-row gap-6 '}>
                        <div>
                          {!thesis.picture ? <div className={'w-24 h-24 rounded-lg bg-neutral-300 flex flex-row justify-center items-center text-xs text-center text-neutral-500'}>нет изображения</div> :
                          <img src={thesis.picture} className={'w-24 h-24'}/>
                          }
                        </div>
                        <div>
                          <h4>{thesis.name}</h4>
                          <p>ID: {thesis?.id}</p>
                          <p>{thesis.short_description}</p>
                        </div>
                      </Link>
                      </div>
                    </motion.div>
                    ))}
                  </div>
              }
              <div>
                <Link to={'/new-thesis'}>
                  <button className={'primary-button max-w-sm mt-6 mx-auto'}>
                    <PlusIcon className={'w-6 h-6'}/>
                    <h4>Добавить работу</h4>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </>
    </>
  )


}
