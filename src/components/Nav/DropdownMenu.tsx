import React, { useState, useRef } from 'react';
import {
  Box,
  VStack,
  IconButton,
  Link,
  Flex,
  Button,
  useOutsideClick,
  useColorMode,
  Divider
} from '@chakra-ui/react';
import { FaXTwitter, FaGithub  } from "react-icons/fa6";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";

const DropdownMenu: React.FC = () => {
  const {colorMode} = useColorMode()
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useOutsideClick({
    ref: dropdownRef,
    handler: () => setIsOpen(false),
  });

  return (
    <Box position="relative" ref={dropdownRef}>
      <Button
        onClick={toggleDropdown}
        rounded="full"
        p={1} 
        variant="body"
        aria-label="Options"
        mx="1rem" 
      >
        <IoEllipsisHorizontalSharp />
      </Button>
      {isOpen && (
        <Box
          position="absolute"
          right={0}
          top="calc(100% + 1rem)"
          mt={2}
          w="200px"
          bg={colorMode === 'light' ? 'white' : 'mirage.800'}
          boxShadow="xl"
          borderRadius="15px"
          overflow="hidden"
          zIndex={1}
          border="1px solid"
          borderColor={colorMode === 'light' ? 'white' : 'mirage.600'}
        >
          <VStack align="stretch" spacing="0.25rem" py="0.5rem">
            <Box px="0.5rem" py="0.75">
              <Link href="#" _hover={{ textDecoration: 'none' }}>
                <Button px="0.5rem" py="0.25rem" borderRadius="15px" variant="link" w="100%" justifyContent="flex-start" fontWeight="normal">
                  About Geo
                </Button>
              </Link>
            </Box>
            <Box px="0.5rem" py="0.75">
              <Link href="#" _hover={{ textDecoration: 'none' }}>
                <Button  px="0.5rem" py="0.25rem" borderRadius="15px" variant="link" w="100%" justifyContent="flex-start" fontWeight="normal">
                  Docs
                </Button>
              </Link>
            </Box>
            <Box px="0.5rem" py="0.75">
              <Link href="#" _hover={{ textDecoration: 'none' }}>
                <Button  px="0.5rem" py="0.25rem" borderRadius="15px" variant="link" w="100%" justifyContent="flex-start" fontWeight="normal">
                  Terms
                </Button>
              </Link>
            </Box>
            <Box px="0.5rem" py="0.75">
              <Link href="#" >
                <Button  px="0.5rem" py="0.25rem" borderRadius="15px" variant="link" w="100%" justifyContent="flex-start" fontWeight="normal">
                  Contribute
                </Button>
              </Link>
            </Box>
          </VStack>
          <Box paddingX='1rem'>
            <Divider/>
          </Box>
          <Flex justifyContent="center" p={2}>
            <IconButton
              as={Link}
              href="#"
              aria-label="Twitter"
              icon={<FaXTwitter />}
              size="sm"
              colorScheme="twitter"
              variant="solid"
              p="0.5rem"
              rounded="full"
              mr={2}
            />
            <IconButton
              as={Link}
              href="#"
              aria-label="GitHub"
              icon={<FaGithub />}
              size="sm"
              variant="solid"
              p="0.5rem"
              rounded="full"
            />
          </Flex>
        </Box>
      )}
    </Box>
  );
};


export default DropdownMenu;