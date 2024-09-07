import { Box, BoxProps, Button, useColorModeValue, useRadioGroup, useRadio, UseRadioProps, Center } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";
import { FaListUl } from "react-icons/fa";
import { IoIosGlobe } from "react-icons/io";
import { LuList } from "react-icons/lu";
import { IconContext } from "react-icons";
import { useRadioGroupToggle } from "@/hooks/useRadioGroupToggle";
import { color } from "framer-motion";


interface RadioGroupOptions extends BoxProps {
  // options?: String;
  children?: ReactNode;
  // onTab: React.Dispatch<React.SetStateAction<String>>;
}

interface CustomRadioProp extends UseRadioProps {
  icon?: React.ReactNode;
  option: OptionsProp
}

interface OptionsProp {
  label: string;
  icon: React.JSX.Element;
  style: {
      size: string;
  };
}

function CustomRadio(props:CustomRadioProp) {
  const light = useColorModeValue("black", "white");
  const { option, ...radioProps } = props
  const { state, getInputProps, getRadioProps } =
    useRadio(radioProps)
    return (
      <Box as="label" cursor='pointer'>
        <input {...getInputProps({})} hidden />
        <Button as="div"
          {...getRadioProps()}
          bg={state.isChecked ? 'black' : 'transparent'}
          // w={16}
          p={1.5}
          // m={1}
          rounded='full'
          variant='body'
          color={state.isChecked ? 'white' : light}
          _hover={{color: "none"}}
        >
          <Center>
            <IconContext.Provider value={option.style}>
              {option.icon}
            </IconContext.Provider>
          </Center>
        </Button>
      </Box>
    )
  }



// const RadioGroupToggle: FC<RadioGroupOptions>  = ({w='auto', onTab}) => {
const RadioGroupToggle: FC<RadioGroupOptions>  = ({w='auto', h='auto'}) => {
  const bg = useColorModeValue("F5F5F5", "#363B58");
  
  const options = [
    {
      label: 'globe',
      icon: <IoIosGlobe />,
      style: {size: "1rem"}
    },
    {
      label: 'list',
      icon: <LuList />,
      style: {size: "1rem"}
    }
  ]
  const [value, setValue] = useRadioGroupToggle(options[0].label)
  const handleChange = (e: string) => {
    // onTab(value)
    setValue(e)
  }
  // console.log("radiotoggle value: ", value)
  const { getRadioProps } = useRadioGroup({
    defaultValue: options[0].label,
    // onChange: handleChange
    onChange: handleChange
  })
  return(
    <Box bg={bg} rounded='full' p='0' h={h} w={w}>
      <Center h={h}>
        {options.map((option) => {
            return (
              <CustomRadio
                key = {option.label}
                option = {option}
                {...getRadioProps({ value: option.label })}
              />
            )
          })}
      </Center>
    </Box>
  )
};

export { RadioGroupToggle }