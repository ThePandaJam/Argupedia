// https://raptis.wtf/blog/create-a-navbar-with-chakra-ui-react/
import React from "react"
import { Box, Text } from "@chakra-ui/react"
 
export default function Logo(props) {
  return (
    <Box {...props}>
      <Text fontSize="lg" fontWeight="bold">
        Argupedia
      </Text>
    </Box>
  )
}