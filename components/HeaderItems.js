function HeaderItems({
  Icon,
  title,
  navtoHome,
  navtosearch,
  navtocollections,
  navtotrending,
}) {
  return (
    <div
      onClick={navtoHome || navtocollections || navtosearch || navtotrending}
      className="flex flex-col items-center cursor-pointer group w-12 sm:w-20 hover:text-white "
    >
      <Icon className="h-8 mb-1 group-hover:animate-bounce" />
      <p className=" tracking-widest opacity-0 group-hover:opacity-100 text-center">
        {title}
      </p>
    </div>
  );
}

export default HeaderItems;
