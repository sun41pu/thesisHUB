export function IconBtn({Icon, isActive, color, children, ...props}) {
  return (
    <div
      className={`flex flex-row gap-1 ${isActive && 'font-bold stroke-current stroke-[2px]'} ${
        children != null ? "mr-2" : ""
      }`}
    >
      <button className={` ${isActive ? "" : ""} ${color || ""}`} {...props}>
        <span>
          <Icon className={"w-4 h-4"} />
        </span>
      </button>
      <div>{children}</div>
    </div>
  );
};
