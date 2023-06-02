// import { Fragment, useState } from 'react'
// import { Listbox, Transition } from '@headlessui/react'
import {
  // CalendarIcon,
  PaperClipIcon,
  // TagIcon,
  // UserCircleIcon
} from '@heroicons/react/24/solid'
import { useForm } from "react-hook-form";
import { Alert } from "./Alert";
import { useEffect } from "react";
import { handleFileUpload } from "../../../shared/lib/handlers/handleFileUpload";
import { newThesis } from "@sh/api/thesis/POST.newThesis";
import { navigation } from "@sh/navigation";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";


export const Form = ({setName, setOpen, setDesc, setShort, docs, author}) => {
  // const [labelled, setLabelled] = useState(labels[0])
  // const [assigned, setAssigned] = useState(assignees[0])
  // const [dated, setDated] = useState(dueDates[0])
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate()

  const onSubmit = async (data: any) => {
    console.log(data);
    console.log(docs);
    console.log(author);

    const thesis = {
      name: data.name,
      description: data.description,
      short_description: data.short,
      authorId: author,
      fileLinks: docs,
    }

    const res = await toast.promise(
      newThesis(thesis),
      {
        loading: 'Сохраняем...',
        success: <b>Сохранено! Открываем вашу работу...</b>,
        error: <b>Не удалось сохранить работу.</b>,
      }
    );
    console.log(res);

    if (!res) {
      alert('Не удолось создать работу')
    }
    navigate(`/thesis/${res.id}?case=created`)

  }

  let name = watch('name') || 'Мой новый драфт'
  let desc = watch('description') || 'Описание'
  let short = watch('short') || 'Краткое описание'

  useEffect(() => {
    setName(name)
  }, [name])
  useEffect(() => {
    setDesc(desc)
  }, [desc])
  useEffect(() => {
    setShort(short)
  }, [short])

  return (
    <>
     <Toaster/>
     <form className="relative" onSubmit={handleSubmit(onSubmit)}>
        <div
          className="font-serif border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
          <label htmlFor="title" className="sr-only">
            Название
          </label>
          <input
            {...register("name", { required: 'Обязательное поле' })}
            type="text"
            name="name"
            id="name"
            className="block w-full border-0 pt-2.5 text-lg font-bold placeholder-gray-500 focus:ring-0"
            placeholder="Название"
          />
          <label htmlFor="description" className="sr-only">
            Описание
          </label>
          <textarea
            {...register("description", { required: 'Обязательное поле' })}
            rows={10}
            name="description"
            id="description"
            className="block w-full border-0 py-0 resize-x-auto placeholder-gray-500 focus:ring-0 sm:text-sm"
            placeholder="Описание работы"
            defaultValue={""}
          />

          {/* Spacer element to match the height of the toolbar */}
          {/*<div aria-hidden="true">*/}
            {/*  <div className="py-2">*/}
            {/*    <div className="h-9" />*/}
            {/*  </div>*/}
            {/*  <div className="h-px" />*/}
            {/*    <div className="py-2">*/}
            {/*      <div className="py-px">*/}
            {/*        <div className="h-9" />*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            </div>

        <div className="absolute bottom-0 inset-x-px">
          {/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}
          <div className="flex flex-nowrap justify-end py-2 px-2 space-x-2 sm:px-3">
            {/*<Listbox as="div" value={labelled} onChange={setLabelled} className="flex-shrink-0">*/}
            {/*  {({ open }) => (*/}
            {/*    <>*/}
            {/*      <Listbox.Label className="sr-only">Add a label</Listbox.Label>*/}
            {/*      <div className="relative">*/}
            {/*        <Listbox.Button className="relative inline-flex items-center rounded-full py-2 px-2 bg-gray-50 text-sm font-medium text-gray-500 whitespace-nowrap hover:bg-gray-100 sm:px-3">*/}
            {/*          <TagIcon*/}
            {/*            className={classNames(*/}
            {/*              labelled.value === null ? 'text-gray-300' : 'text-gray-500',*/}
            {/*              'flex-shrink-0 h-5 w-5 sm:-ml-1'*/}
            {/*            )}*/}
            {/*            aria-hidden="true"*/}
            {/*          />*/}
            {/*          <span*/}
            {/*            className={classNames(*/}
            {/*              labelled.value === null ? '' : 'text-gray-900',*/}
            {/*              'hidden truncate sm:ml-2 sm:block'*/}
            {/*            )}*/}
            {/*          >*/}
            {/*            {labelled.value === null ? 'Label' : labelled.name}*/}
            {/*          </span>*/}
            {/*        </Listbox.Button>*/}

            {/*        <Transition*/}
            {/*          show={open}*/}
            {/*          as={Fragment}*/}
            {/*          leave="transition ease-in duration-100"*/}
            {/*          leaveFrom="opacity-100"*/}
            {/*          leaveTo="opacity-0"*/}
            {/*        >*/}
            {/*          <Listbox.Options className="absolute right-0 z-10 mt-1 w-52 bg-white shadow max-h-56 rounded-lg py-3 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">*/}
            {/*            {labels.map((label) => (*/}
            {/*              <Listbox.Option*/}
            {/*                key={label.value}*/}
            {/*                className={({ active }) =>*/}
            {/*                  classNames(*/}
            {/*                    active ? 'bg-gray-100' : 'bg-white',*/}
            {/*                    'cursor-default select-none relative py-2 px-3'*/}
            {/*                  )*/}
            {/*                }*/}
            {/*                value={label}*/}
            {/*              >*/}
            {/*                <div className="flex items-center">*/}
            {/*                  <span className="block font-medium truncate">{label.name}</span>*/}
            {/*                </div>*/}
            {/*              </Listbox.Option>*/}
            {/*            ))}*/}
            {/*          </Listbox.Options>*/}
            {/*        </Transition>*/}
            {/*      </div>*/}
            {/*    </>*/}
            {/*  )}*/}
            {/*</Listbox>*/}

            {/*<Listbox as="div" value={dated} onChange={setDated} className="flex-shrink-0">*/}
            {/*  {({ open }) => (*/}
            {/*    <>*/}
            {/*      <Listbox.Label className="sr-only">Add a due date</Listbox.Label>*/}
            {/*      <div className="relative">*/}
            {/*        <Listbox.Button className="relative inline-flex items-center rounded-full py-2 px-2 bg-gray-50 text-sm font-medium text-gray-500 whitespace-nowrap hover:bg-gray-100 sm:px-3">*/}
            {/*          <CalendarIcon*/}
            {/*            className={classNames(*/}
            {/*              dated.value === null ? 'text-gray-300' : 'text-gray-500',*/}
            {/*              'flex-shrink-0 h-5 w-5 sm:-ml-1'*/}
            {/*            )}*/}
            {/*            aria-hidden="true"*/}
            {/*          />*/}
            {/*          <span*/}
            {/*            className={classNames(*/}
            {/*              dated.value === null ? '' : 'text-gray-900',*/}
            {/*              'hidden truncate sm:ml-2 sm:block'*/}
            {/*            )}*/}
            {/*          >*/}
            {/*            {dated.value === null ? 'Due date' : dated.name}*/}
            {/*          </span>*/}
            {/*        </Listbox.Button>*/}

            {/*        <Transition*/}
            {/*          show={open}*/}
            {/*          as={Fragment}*/}
            {/*          leave="transition ease-in duration-100"*/}
            {/*          leaveFrom="opacity-100"*/}
            {/*          leaveTo="opacity-0"*/}
            {/*        >*/}
            {/*          <Listbox.Options className="absolute right-0 z-10 mt-1 w-52 bg-white shadow max-h-56 rounded-lg py-3 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">*/}
            {/*            {dueDates.map((dueDate) => (*/}
            {/*              <Listbox.Option*/}
            {/*                key={dueDate.value}*/}
            {/*                className={({ active }) =>*/}
            {/*                  classNames(*/}
            {/*                    active ? 'bg-gray-100' : 'bg-white',*/}
            {/*                    'cursor-default select-none relative py-2 px-3'*/}
            {/*                  )*/}
            {/*                }*/}
            {/*                value={dueDate}*/}
            {/*              >*/}
            {/*                <div className="flex items-center">*/}
            {/*                  <span className="block font-medium truncate">{dueDate.name}</span>*/}
            {/*                </div>*/}
            {/*              </Listbox.Option>*/}
            {/*            ))}*/}
            {/*          </Listbox.Options>*/}
            {/*        </Transition>*/}
            {/*      </div>*/}
            {/*    </>*/}
            {/*  )}*/}
            {/*</Listbox>*/}
          </div>
          <div className="border-t border-gray-200 px-2 py-2 flex justify-between items-center space-x-3 sm:px-3">
            <div className="flex">
              <button
                type="button"
                className="-ml-2 -my-2 rounded-full px-3 py-2 inline-flex items-center text-left text-gray-400 group"
                onClick={() => setOpen(true)}
              >
                <PaperClipIcon className="-ml-1 h-5 w-5 mr-2 group-hover:text-gray-500" aria-hidden="true" />
                <span className="text-sm text-gray-500 group-hover:text-gray-600 italic">Приложить файл</span>
              </button>
            </div>
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 tr resp"
              >
                Сохранить драфт
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
