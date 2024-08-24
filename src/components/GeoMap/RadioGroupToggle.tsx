import { Box, BoxProps, Button, useColorModeValue, useRadioGroup, useRadio, UseRadioProps, Center } from "@chakra-ui/react";
import React, { FC } from "react";

interface RadioGroupOptions extends BoxProps {
  options?: String;
  onTab: React.Dispatch<React.SetStateAction<String>>;
}

function CustomRadio(props:UseRadioProps) {
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
          variant='ghost'
          color={state.isChecked ? 'white' : light}
        >
          {radioProps.value}
        </Button>
      </Box>
    )
  }



const RadioGroupToggle: FC<RadioGroupOptions>  = ({w='20px', options="Insert options", onTab}) => {
  const bg = useColorModeValue("gray.200", "gray.600");
  const toggleOptions = options.split(",")
  const handleChange = (value: String) => {
    onTab(value)
  }

  const { getRadioProps } = useRadioGroup({
    defaultValue: toggleOptions[0],
    onChange: handleChange
  })
  return(
    <Box bg={bg} rounded='full' p='0.5rem' w={w}>
      <Center>
        {toggleOptions.map((option) => {
            return (
              <CustomRadio
                key = {option}
                {...getRadioProps({ value: option })}
              />
            )
          })}
      </Center>
    </Box>
  )
};

export { RadioGroupToggle }