

const StatusDraft = () => {
  return (
    <span className={'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-500'}>
      Драфт
    </span>
  )
}
const StatusPublished = () => {
  return (
    <span className={'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-500'}>
      Опубликован
    </span>
  )
}
const StatusReviewed = () => {
  return (
    <span className={'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-500'}>
      Подтвержден
    </span>
  )
}
const Statuses = new Map([
  [1, <StatusDraft/>],
  [2, <StatusPublished/>],
  [3, <StatusReviewed/>],
])
export const StatusBadge = ({statusId}) => {
  return Statuses.get(statusId) || <div>нет статуса</div>
}
