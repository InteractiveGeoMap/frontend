import {
	Box,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Divider as ChakraDivider,
	Flex,
	Badge,
  } from "@chakra-ui/react"

import GeoCard from '@/components/GeoMap/GeoCard'

  export default function GeoDrawer({onClose, onOpen, isOpen, country, locationJSON}) {
	let data;
	if (country) {
			data = locationJSON.filter(location=>{
			return location.country===country
		})
		data = data[0]
	}
	else 
		data = locationJSON[0]
	// console.log("data",data)
	return (
		<Drawer
			isOpen={isOpen}
			placement="right"
			onClose={onClose}
			size="md"
		>
			<DrawerOverlay />
			<DrawerContent bg="background.base">
			<DrawerHeader mb={4}>
				{"Ethereum Projects and Communities"}
				<ChakraDivider
					mt={8}
					mb={4}
					display="inline-block"
					position="inherit"
					bg="border"
				/>
				{country}
				<Badge ml="2" bgColor={data.color} color="white">{data.region}</Badge>
				<Badge ml="2" bgColor={data.color} color="white">{"(" + data.organisationData.length+")"}</Badge>
				<DrawerCloseButton />
			</DrawerHeader>
				<DrawerBody p="6">
					{data.organisationData.map(organisationData=>{
						return <GeoCard key={organisationData.Name} organisationData={organisationData}></GeoCard>
					}
					)}
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	)
  }