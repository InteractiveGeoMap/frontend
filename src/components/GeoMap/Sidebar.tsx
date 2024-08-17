import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import React, { FC, ReactNode, Children, useState, useCol } from "react";
import { FiSidebar } from "react-icons/fi";
import styles from "./Sidebar.module.css";

interface Props {
    title?: String;
    children?: ReactNode;
    setParentCollapse: React.Dispatch<React.SetStateAction<boolean>>;
    // any props that come into the component
}


// Use setParentCollapse to obtain the collapse state of the component or use data-collapse
// TestSync
/*
In parent:
const [isCollapsed, setCollapse] = useState<boolean>(true);
<Sidebar setParentCollapse={setCollapse}>items</Sidebar>
*/ 
const Sidebar: FC<Props>  = ({ title="", children, setParentCollapse }) => {
  const bg = useColorModeValue("white", "gray.700");
  const [isCollapsed, setCollapse] = useState<boolean>(true);
  const toggleCollapse = () => {
    setCollapse((prevState) => !prevState);
    if(typeof setParentCollapse !== "undefined"){
      setParentCollapse((prevState) => !prevState);
    }
  };
  return(
    <>
      {/* <Box className="sidebar__wrapper"> */}
      <Box className={styles.sidebar__wrapper}>
        <Button variant="globe" className={styles.btn} onClick={toggleCollapse}>
          <span className="mx-3 absolute left-0" >{title}</span>
          <FiSidebar className="mx-3 absolute right-0"/>
        </Button>
        <Box bg={bg} className={styles.sidebar} data-collapse={isCollapsed}>
          <ul className={styles.sidebar__list}>
            {Children.map(children, child => 
            <li className={styles.sidebar__item}>
              {child}
            </li> 
            )}
          </ul>
        </Box>
      </Box>
    </>
  )
};

export { Sidebar }