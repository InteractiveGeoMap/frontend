import { Box, HStack, Button, useColorModeValue, useRadioGroup, useRadio } from "@chakra-ui/react";
import React, { FC, ReactNode, Children, useState} from "react";

// interface RadioOption {
//     options: String;
//     // any props that come into the component
// }

interface RadioGroupOptions {
  options?: String;
  onTab: React.Dispatch<React.SetStateAction<String>>;
}

function CustomRadio(props) {
  const light = useColorModeValue("black", "white");
  const { ...radioProps } = props
  const { state, getInputProps, getRadioProps } =
    useRadio(radioProps)
    return (
      <Box as="label" cursor='pointer'>
        <input {...getInputProps({})} hidden />
        <Button as="div"
          {...getRadioProps()}
          bg={state.isChecked ? 'black' : 'transparent'}
          w={16}
          p={1}
          rounded='full'
          color={state.isChecked ? 'white' : light}
        >
          {radioProps.value}
        </Button>
      </Box>
    )
  }



const RadioGroupToggle: FC<RadioGroupOptions>  = ({options, onTab}) => {
  const bg = useColorModeValue("gray.200", "gray.600");
  var toggleOptions;
  if (typeof options !== "undefined"){
    toggleOptions = options.split(",");
  } else {
    toggleOptions = ["Insert options"];
  }

  const handleChange = (value: String) => {
    onTab(value)
  }

  const { value, getRadioProps, getRootProps } = useRadioGroup({
    defaultValue: toggleOptions[0],
    onChange: handleChange
  })
  // console.log("options: ", options)
  // console.log("Toggle options: ", toggleOptions)
  // console.log("Value: ", value)
  return(
    <Box bg={bg} rounded='full' p='0.5rem'>
      <HStack>
        {toggleOptions.map((option) => {
            return (
              <CustomRadio
                key = {option}
                {...getRadioProps({ value: option })}
              />
            )
          })}
      </HStack>
    </Box>
  )
};

export { RadioGroupToggle }