import React, { useState } from "react";
import { Container, Text, VStack, Box, HStack, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, Textarea } from "@chakra-ui/react";
import { FaCalendarAlt, FaPlus } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meetings, setMeetings] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newMeeting, setNewMeeting] = useState({ title: "", description: "", date: new Date() });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddMeeting = () => {
    setMeetings([...meetings, newMeeting]);
    setNewMeeting({ title: "", description: "", date: new Date() });
    onClose();
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Calendrier de Réunions</Text>
        <Box width="100%">
          <Calendar onChange={handleDateChange} value={selectedDate} />
        </Box>
        <HStack width="100%" justifyContent="space-between">
          <Text fontSize="lg">Réunions pour le {selectedDate.toDateString()}:</Text>
          <IconButton aria-label="Add Meeting" icon={<FaPlus />} size="md" onClick={onOpen} />
        </HStack>
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ajouter une Réunion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input placeholder="Titre" value={newMeeting.title} onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })} />
              <Textarea placeholder="Description" value={newMeeting.description} onChange={(e) => setNewMeeting({ ...newMeeting, description: e.target.value })} />
              <Input type="date" value={newMeeting.date.toISOString().split("T")[0]} onChange={(e) => setNewMeeting({ ...newMeeting, date: new Date(e.target.value) })} />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddMeeting}>
              Ajouter
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Annuler
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;
