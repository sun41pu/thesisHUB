import { Helmet } from "react-helmet";
import { Header } from "../../entities/Header";
import { Footer } from "../../entities/Footer";
import { useAuthUser, useIsAuthenticated, useSignOut } from "react-auth-kit";
import { Form, Alert, FileUpload } from "./Components";
import { useState } from "react";
import {
  DocumentIcon
} from '@heroicons/react/24/outline'
import { UploadModal } from "@pg/New/Components/UploadModal";


export const ThesesNew = () => {
  const isAuthenticated = useIsAuthenticated()
  const isLoggedIn = isAuthenticated()
  const signOut = useSignOut()
  const User = useAuthUser()

  const [name, setName] = useState('Мой новый драфт')
  const [desc, setDesc] = useState('')
  const [short, setShort] = useState('')
  const [isOpen, setOpen] = useState(false)

  const images = [
    'https://global-uploads.webflow.com/5fda3048302e579473bfb454/604127094e44c9854095cad4_Project%20Documentation%20Template.png',
    'https://global-uploads.webflow.com/5fda3048302e579473bfb454/604127094e44c9854095cad4_Project%20Documentation%20Template.png',
    'https://global-uploads.webflow.com/5fda3048302e579473bfb454/604127094e44c9854095cad4_Project%20Documentation%20Template.png',
  ]

  const [docs, setDocs] = useState([])

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Новая работа</title>
      </Helmet>
      <UploadModal isOpen={isOpen} setOpen={setOpen} userId={User().id} title={'Загрузка нового файла'} prompt={'Перетащите файл, или выберите с помощью кнопки Обзор'} docs={docs} setDocs={setDocs}/>
      <div className="relative overflow-hidden">
        <div className="relative pt-6 pb-16 sm:pb-24">
          <Header isLoggedIn={isLoggedIn}/>
        </div>
        <div className={'container mx-auto'}>
          <div className={'p-4 sm:p-12'}>
            <div className={'mb-6'}>
              <h1 className={""}>Новая работа</h1>
              <p>Загрузите новую работу, заполнив форму и добавив файлы и изображения</p>
            </div>

            <div className={'flex-col flex gap-4 mb-6 mt-6'}>
              <Alert setOpen={setOpen}/>
              <FileUpload/>
              <Form setName={setName} setOpen={setOpen} setDesc={setDesc} setShort={setShort} docs={docs} author={User().id}/>
            </div>
            <div className={'opacity-70 mb-4'}>
              <h3>Предпросмотр</h3>
              <p >так будет выглядеть ваша работа</p>
            </div>
            <div className={'shadow-2xl bg-white rounded-lg p-6 mb-6 '}>
              <p className={'capitalize italic opacity-70'}>Автор {User().username}</p>
              <h1 className={'mb-1'}>{name}</h1>
              <p>{desc}</p>

              <div className={'mt-4'}>
                <p className={'mt-6'}>Документы</p>
                <div className={'grid grid-cols-4 gap-2 mt-2'}>
                  {
                    docs.length > 0 ?
                    docs.map((docs, index) => (
                      <a href={docs} target={'_blank'} key={index} className={'group shadow-md block rounded-lg relative overflow-hidden w-full tr resp cursor-pointer'}>
                        <DocumentIcon className={'w-full h-auto max-h-40 max-w-40 rounded-2xl text-blue-400 group-hover:text-blue-500 tr bg-blue-50 p-2 shadow-inner'}/>
                        <p className={'text-gray-800 text-center mt-2 mb-2'}>
                          Документ
                        </p>
                      </a>
                    ))
                      : <p>Нет документов</p>
                  }
                </div>
              </div>

            </div>
            <div className={'shadow-2xl bg-white rounded-lg p-6'}>
              <p className={'capitalize italic opacity-70'}>{User().username}</p>
              <h3 className={'mb-1'}>{name}</h3>

              <p>{short}</p>

            </div>
          </div>
        </div>

        <Footer/>
      </div>
    </>
  );
};
