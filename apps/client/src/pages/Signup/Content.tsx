
//TODO: - добавить модаль для подтверждения выхода
//	    - сделать регистрацию с помощью react-hook-form
//      - сделать дропдаун с юзером вместо "выйти"
// 			- добавить RQ постов на главную


import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetThesisList } from "@sh/api/thesis/GET.ThesisList.js";
import { ThesisCard } from "./UI/ThesisCard.js";

export const Content = () => {
  const queryClient = useQueryClient()

  const {isLoading, isError, data, error, isFetching}
    = useQuery({ queryKey: ['thesisList'], queryFn: GetThesisList })

  const mutation = useMutation({
    mutationFn: GetThesisList,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['thesisList'] })
    },
  })

 if (isLoading) {
    return <div>Загружаем...</div>
  }
 if (isError) {
    return <div>Ошибка: {error.message}</div>
  }

  return (
    <>
      {data.map((thesis, index) => (
        <ThesisCard key={thesis.id} thesis={thesis} index={index}/>
      ))}
    </>
  )


}
