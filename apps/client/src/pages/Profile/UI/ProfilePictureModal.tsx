import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { handleProfilePictureUpload } from "@sh/lib/handlers/handleProfilePictureUpload";
import { supabase } from "@sh/lib/middleware/SupabaseClient";
import { v4 as uuidv4 } from "uuid";
import { useQueryClient } from "@tanstack/react-query";

export const ProfilePictureModal = ({isOpen, setOpen, userId, title, prompt}) => {
  const [isDragging, setDragging] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);
  const queryClient = useQueryClient()

  function handleDragSrart(e) {
    e.preventDefault();
    setError(null)
    setDragging(true);
  }
  function handleDragLeave(e) {
    e.preventDefault();
    setError(null)
    setDragging(false);
  }
  async function handleUpload(e, userId) {
    e.preventDefault();
    setError(null)
    const result = await handleProfilePictureUpload(e.target.files[0], userId, setLoading, setError);
    handleReload(result)
  }
  async function handleDataTransferUpload(e) {
    e.preventDefault();
    setError(null)
    const result = await handleProfilePictureUpload(e.dataTransfer.files[0], userId, setLoading, setError);
    handleReload(result)
  }
  function handleReload(result) {
    setDragging(false);
    if (result) {
      setOpen(false);
      // queryClient.invalidateQueries(["user", userId])
      window.location.reload()
    }
  }


  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => {
          setOpen(false);
          setError(null)
        }}
        as={"div"}
        onDragStart={(e) => handleDragSrart(e)}
        onDragOver={(e) => handleDragSrart(e)}
        onDragLeave={(e) => handleDragLeave(e)}
        onDrop={(e) => handleDataTransferUpload(e, userId)}
        className={` absolute inset-0 backdrop-brightness-75 flex flex-row justify-center items-center p-2 sm:p-24`}
      >
        <Dialog.Panel
          className={`relative bg-white px-6 py-6 w-full max-w-2xl shadow-xl rounded-xl`}
        >
          <Dialog.Title>{title}</Dialog.Title>

          <div
            className={`
            ${ isError    ? "border-red-500" : "" }
            ${ isLoading  ? "border-neutral-200 pointer-events-none cursor-wait" : ""}
            ${ isDragging ? "border-blue-500" : "border-neutral-400"
            } flex flex-col gap-4 text-neutral-500 items-center justify-center bg-neutral-200 w-full h-40 mt-6 rounded-xl border-dashed border-2`}
          >
            {isDragging ? (
              <>
                <p className={"text-lg font-bold text-blue-500"}>
                  Отпустите здесь, чтобы начать загрузку
                </p>
              </>
            ) : isLoading ? (
              <p>Загружаем...</p>
            ) : (
              <>
                <p>{prompt}</p>
                <input
                  disabled={isLoading}
                  type={"file"}
                  onChange={(e) => handleUpload(e, userId)}
                />
              </>
            )}
          </div>
          <div className={'mt-4'}>

          {!!isError && (
            <p className={"text-red-500 text-center text-sm"}>
              {"Ошибка: " + isError + ". Поробуйте еще раз."}
            </p>
          )}
          <button
            className={'mx-auto bg-red-600 hover:bg-rose-700 tr text-white font-bold py-2 px-4 rounded'}
            onClick={() => {
              setOpen(false);
              setError(null);
            }}
          >
            Отмена
          </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};
