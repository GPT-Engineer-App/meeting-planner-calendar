import React, { useState } from "react";
import { Container, Text, VStack, Box, HStack } from "@chakra-ui/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meetings, setMeetings] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Calendrier de Réunions</Text>
        <Box width="100%">
          <Calendar onChange={handleDateChange} value={selectedDate} />
        </Box>
        <Text fontSize="lg">Réunions pour le {selectedDate.toDateString()}:</Text>
        <VStack spacing={2} width="100%">
          {meetings
            .filter((meeting) => new Date(meeting.date).toDateString() === selectedDate.toDateString())
            .map((meeting, index) => (
              <Box key={index} p={4} borderWidth="1px" borderRadius="lg" width="100%">
                <Text fontWeight="bold">{meeting.title}</Text>
                <Text>{meeting.description}</Text>
              </Box>
            ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
