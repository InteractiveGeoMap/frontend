import React, { useState, useEffect } from 'react';
import { Box, IconButton, VStack, useColorModeValue, Input, Flex } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { FiSidebar } from 'react-icons/fi';
import MultiCards from './Cards';

interface RightSidebarProps {
  projects: any[]; // Replace 'any' with your actual project type
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ projects }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    const results = projects.filter(project =>
      project.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(results);
  }, [searchTerm, projects]);

  return (
    <Box
      position="fixed"
      right={4}
      top="80px" // Adjust this value based on your top bar height
      bottom="60px" // Adjust this value based on your bottom bar height
      zIndex={10}
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
    >
      {isOpen ? (
        <Box
          width="320px"
          height="100%"
          bg={bgColor}
          boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
          borderRadius="lg"
          display="flex"
          flexDirection="column"
        >
          <Flex justifyContent="space-between" alignItems="center" p={2}>
            <Input
              placeholder="Search projects..."
              size="sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              width="80%"
            />
            <IconButton
              aria-label="Close sidebar"
              icon={<ChevronRightIcon />}
              onClick={() => setIsOpen(false)}
              size="sm"
              borderRadius="full"
            />
          </Flex>
          <VStack
            overflowY="auto"
            spacing={4}
            p={4}
            flex={1}
            css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: borderColor,
                borderRadius: '24px',
              },
            }}
          >
            <MultiCards projects={filteredProjects} />
          </VStack>
        </Box>
      ) : (
        <IconButton
          aria-label="Open sidebar"
          icon={<FiSidebar />}
          onClick={() => setIsOpen(true)}
          size="md"
          borderRadius="full"
          boxShadow="md"
        />
      )}
    </Box>
  );
};