import { StatusBadge } from "@sh/UI";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import { PATCHthesisStatus } from "@sh/api/thesis/PATCH.ThesisStatus";
import { toast, Toaster } from "react-hot-toast";

export const ThesisOptions = ({id, authorId, userId, roleId, statusId}) => {

  function handleThesisPublish(userId:string, statusId:number, reviewrId?:string) {
    console.log(userId, statusId)
    const promise = new Promise(
      (resolve, reject) => {
        try {
          const res = PATCHthesisStatus({id: userId, statusId: statusId, revid: reviewrId})
          resolve(res)
          window.location.reload()
        } catch (error) {
          reject(error)
        }
      }
    )

    toast.promise(promise, {
      loading: 'публикуем...',
      success: 'Опубликовано',
      error: 'Ошибка',
    })
  }

  const isAuthor = authorId === userId // id автора совпадает с id пользователя
  const canPublish = (roleId > 2 || isAuthor) && statusId === 1 // админ или автор, при условии что статус - драфт
  const canApprove = roleId > 1 && statusId < 3 // преподаватель и выше
  const canDeList = roleId > 2 && statusId === 3
  const canDePublish = (roleId === 1 || roleId === 3) && statusId === 2
  const reviewrId = userId

  if(!isAuthor && roleId < 2) return null


  return (
    <>
    <Toaster/>

        <p className={'mt-4'}>Управление</p>
      <div className={'mt-2 flex flex-row gap-2 items-center'}>
        <>
          {
            canPublish &&
            <button onClick={() => handleThesisPublish(id, 2, reviewrId)} role={'button'} className={'text-sm tr resp bg-amber-50 text-amber-500 flex flex-row items-center hover:bg-amber-100 gap-1 px-4 py-1 w-fit rounded-2xl'}>
              Опубликовать
              <ChevronDoubleRightIcon className={'w-5 h-5'}/>
            </button>
          }
        </>
        <>
          {
            canApprove &&
            <button onClick={() => handleThesisPublish(id, 3, reviewrId)} role={'button'} className={'text-sm tr resp bg-green-50 text-green-500 flex flex-row items-center hover:bg-green-100 gap-1 px-4 py-1 w-fit rounded-2xl'}>
              Подтвердить
              <ChevronDoubleRightIcon className={'w-5 h-5'}/>
            </button>
          }
        </>
        <>
          {
            canDeList &&
            <button onClick={() => handleThesisPublish(id, 2, '')} role={'button'} className={'text-sm tr resp bg-red-50 text-red-500 flex flex-row items-center hover:bg-red-100 gap-1 px-4 py-1 w-fit rounded-2xl'}>
              Отозвать подтверждение
              <ChevronDoubleRightIcon className={'w-5 h-5'}/>
            </button>
          }
        </>
        <>
          {
            canDePublish &&
            <button onClick={() => handleThesisPublish(id, 1, '')} role={'button'} className={'text-sm tr resp bg-red-50 text-red-500 flex flex-row items-center hover:bg-red-100 gap-1 px-4 py-1 w-fit rounded-2xl'}>
              Отозвать публикацию
              <ChevronDoubleRightIcon className={'w-5 h-5'}/>
            </button>
          }
        </>
      </div>
    </>
  );
};
