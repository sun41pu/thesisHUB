

const StudentBadge = () => {
  return (
    <span className={'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-500'}>
      Студент
    </span>
  )
}
const ProfessorBadge = () => {
  return (
    <span className={'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-500'}>
      Профессор
    </span>
  )
}
const AdminBadge = () => {
  return (
    <span className={'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black text-white'}>
      ThesisHub
    </span>
  )
}
const Badges = new Map([
  [1, <StudentBadge/>],
  [2, <ProfessorBadge/>],
  [3, <AdminBadge/>],
])
export const RoleBadge = ({roleId}) => {
  return Badges.get(roleId) || <div>нет роли</div>
}
