import { TriangleDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Collapse,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/react'



const About = () => {
    return (
        <Box lineHeight="1.6" h="100%" my="4em" textAlign="left" as="section">
          <Text>
            Hello my name is Renzo, at the time of writing this, I've been in the
            programming world for a year.
          </Text>
          <Box
            py={4}
            borderBottom="4px solid"
            borderColor={'purple.300'}
            my={5}
          >
            <Heading mb={4} fontSize="xl">
              Why?
            </Heading>
            <Text>
              I was always someone who liked to{' '}
              <Text as="strong" color="blue.900">
                invent and create
              </Text>{' '}
              different things, when I was a kid I used to combine different toys to
              create new ones (like the bad boy from Toy Story), when I started
              studying product design at the university, I realized that it was not
              my way to exploit my potential, and that's when I left the university
              and started this journey of programming and especially{' '}
              <Text color="blue.900" as="strong">
                web development.
              </Text>
            </Text>
          </Box>
          <Box py={4} borderBottom="4px solid" borderColor={'purple.300'} my={5}>
            <Heading mb={4} fontSize="xl">
              How?
            </Heading>
    
            <Text>
              My first line of code I wrote it thanks to a pythoin (p4e) course and
              then I realized that this was my thing, I've been researching on the
              web trying to see how I could work on this, I found web development
              and especially the Frontend and I loved it. I decided to study well
              the basics (HTML, CSS, JS) before jumping to a Framework like React,
              however this path has not been easy to be self-taught one has to learn
              to research very well and not waste time on unnecessary things.{' '}
            </Text>
          </Box>
          <Box>
            <Heading mb={4} fontSize="xl">
              What about now?
            </Heading>
            <Text>
              <Text color="blue.900" as="strong">
                Now I am pursuing web development as my primary career
              </Text>
              . Since then I have not stopped learning and creating, getting my
              hands into any code almost everyday, and I'm not overexagerating when
              I say I love the experience. I don't believe in perfection at all
              times but trying your best to achieve something functional and
              practical. Ergo, I'm pretty proud of what I've done so far and will
              continue to improve on what I do and can do.
            </Text>
          </Box>
        </Box>
      )
}

export default About
