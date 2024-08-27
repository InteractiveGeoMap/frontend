import React, { useState } from 'react';
import { Box, Text, Heading, Stack, Tag, Icon, Link, Flex, IconButton } from '@chakra-ui/react';
import { FaTwitter, FaGlobe } from 'react-icons/fa';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

interface ProjectCard {
  Name: string;
  Category: string;
  About: string;
  Website: string;
  Twitter: string | null;
}

const SocialIcon = ({ type, link }: { type: string; link: string }) => {
  const icons = {
    Website: FaGlobe,
    Twitter: FaTwitter,
  };
  return (
    <Link href={link} isExternal>
      <Icon
        as={icons[type as keyof typeof icons]}
        boxSize={4}
        mr={1}
        color="gray.600"
        cursor="pointer"
      />
    </Link>
  );
};

const ProjectCard: React.FC<ProjectCard> = ({ Name, Category, About, Website, Twitter }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      p={2}
      boxShadow="sm"
      bg="white"
      mb={2}
    >
      <Flex justifyContent="space-between" alignItems="center" mb={1}>
        <Heading as="h3" size="sm" fontSize="sm">{Name}</Heading>
        <IconButton
          aria-label={isExpanded ? "Collapse card" : "Expand card"}
          icon={isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          onClick={() => setIsExpanded(!isExpanded)}
          size="xs"
          variant="ghost"
        />
      </Flex>
      {isExpanded && (
        <>
          <Text fontSize="xs" mb={2}>{About}</Text>
          <Text fontSize="xs" fontWeight="bold" mb={1}>Social:</Text>
          <Stack direction="row" spacing={1} mb={2}>
            {Website && <SocialIcon type="Website" link={Website} />}
            {Twitter && <SocialIcon type="Twitter" link={Twitter} />}
          </Stack>
          <Text fontSize="xs" fontWeight="bold" mb={1}>Category:</Text>
          <Tag size="sm" fontSize="xs" colorScheme="blue">{Category}</Tag>
        </>
      )}
    </Box>
  );
};

interface MultiCardsProps {
  projects: ProjectCard[];
}

const MultiCards: React.FC<MultiCardsProps> = ({ projects }) => (
  <Box width="100%">
    {projects.map((project, index) => (
      <ProjectCard key={index} {...project} />
    ))}
  </Box>
);

export default MultiCards;
