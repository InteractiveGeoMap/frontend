import React, { FC, ReactNode, Children, useState } from "react";
import { FiSidebar } from "react-icons/fi";

interface Props {
    children?: ReactNode
    // any props that come into the component
}
const Sidebar: FC<Props>  = ({ children }) => {
  // const { isCollapsed, toggleCollapse } = useContext(SidebarContext);
  const [isCollapsed, setCollapse] = useState<boolean>(true);
  const toggleCollapse = () => {
    setCollapse((prevState) => !prevState);
  };
  // console.log(isCollapsed)
  // todo make sidebar more reusable as a component
  // todo evavluate module css or moving whole css into component
  return(
    <>
      <div className="sidebar__wrapper">
        {/* <button className="btn" onClick={toggleCollapse}>
          {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
        </button> */}
        {/*  flex items-center justify-center bg-white text-black font-semibold py-3 px-4 rounded-[22px] border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none */}
        <button className="btn" onClick={toggleCollapse}>
          <span className="ml-3 float-left" >Explore</span>
          <FiSidebar className="mr-3 absolute right-0"/>
        </button>
        <aside className="sidebar" data-collapse={isCollapsed}>
          <ul className="sidebar__list">
            {Children.map(children, child => 
            <li className="sidebar__item">
              {child}
            </li> 
            )}
          </ul>
        </aside>
      </div>
    </>
  )
};
export { Sidebar }
