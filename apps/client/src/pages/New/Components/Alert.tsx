import { InformationCircleIcon, PaperClipIcon } from "@heroicons/react/24/solid";
import { handleFileUpload } from "../../../shared/lib/handlers/handleFileUpload";

export const Alert = ({setOpen}) => {

  return (
    <>
      <div className="rounded-md bg-blue-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <div>
              <p className="text-sm text-blue-700 font-semibold">
                Обязательно приложите документ с вашей работой.
              </p>
              <p className="text-sm text-blue-700">
                Вы можете приложить несколько документов
              </p>
            </div>
            <p className="mt-3 text-sm md:mt-0 md:ml-6">
              <button className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600 flex flex-row items-center gap-2 bg-blue-200 opacity-80 hover:opacity-100 tr resp px-2 py-1 rounded-lg"
              onClick={() => setOpen(true)}>
                <PaperClipIcon className={'w-6 h-6'}/>
                <p>Приложить </p>
              </button>
            </p>
          </div>
        </div>
      </div></>
  );
};
