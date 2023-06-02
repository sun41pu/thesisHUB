
//TODO: - добавить модаль для подтверждения выхода
//	    - сделать регистрацию с помощью react-hook-form
//      - сделать дропдаун с юзером вместо "выйти"
// 			- добавить RQ постов на главную


import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetThesisList } from "@sh/api/thesis/GET.ThesisList.js";
import { ThesisCard } from "./UI/ThesisCard.js";

const displayStausId = 3 // подтвержден

export const Content = () => {
  const queryClient = useQueryClient()

  const {isLoading, isError, data, error, isFetching}
    = useQuery( {
    queryKey: ['thesisList', displayStausId],
    queryFn: () => GetThesisList(displayStausId) })

  const mutation = useMutation({
    mutationFn: (params) => GetThesisList(3),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['thesisList'] })
    },
  })

 if (isLoading) {
    return <div>Загружаем...</div>
  }
 if (isError) {
     {/*@ts-ignore*/}
    return <div>Ошибка: {error.message}</div>
  }

  return (
    <>
        {/*@ts-ignore*/}
      {data.map((thesis, index) => (
        <ThesisCard key={thesis.id} thesis={thesis} index={index}/>
      ))}
    </>
  )


}
