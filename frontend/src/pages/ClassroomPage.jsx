import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import Video from "twilio-video";

const ClassroomPage = () => {
  const [room, setRoom] = useState(null);
  const [localParticipant, setLocalParticipant] = useState(null);
  const [remoteParticipants, setRemoteParticipants] = useState([]);

  useEffect(() => {
    const initializeRoom = async () => {
      try {
        const response = await fetch("/api/twilio/token"); // Endpoint to generate a Twilio access token
        const { token, roomName } = await response.json();

        const videoRoom = await Video.connect(token, {
          name: roomName,
        });

        setRoom(videoRoom);
      } catch (error) {
        console.error("Failed to initialize video room:", error);
      }
    };

    initializeRoom();

    return () => {
      if (room) {
        room.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (room) {
      const handleParticipantConnected = (participant) => {
        setRemoteParticipants((prevParticipants) => [
          ...prevParticipants,
          participant,
        ]);
      };

      const handleParticipantDisconnected = (participant) => {
        setRemoteParticipants((prevParticipants) =>
          prevParticipants.filter((p) => p !== participant)
        );
      };

      room.on("participantConnected", handleParticipantConnected);
      room.on("participantDisconnected", handleParticipantDisconnected);

      setLocalParticipant(room.localParticipant);
      room.participants.forEach(handleParticipantConnected);

      return () => {
        room.off("participantConnected", handleParticipantConnected);
        room.off("participantDisconnected", handleParticipantDisconnected);
      };
    }
  }, [room]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
      }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        Classroom
      </Typography>

      {localParticipant && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Local Participant
          </Typography>
          <VideoElement participant={localParticipant} />
        </Box>
      )}

      {remoteParticipants.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Remote Participants
          </Typography>
          <Box sx={{ display: "flex" }}>
            {remoteParticipants.map((participant) => (
              <VideoElement key={participant.sid} participant={participant} />
            ))}
          </Box>
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={() => room.disconnect()}
      >
        Leave Classroom
      </Button>
    </Box>
  );
};

const VideoElement = styled("div")(({ theme }) => ({
  width: "300px",
  height: "200px",
  backgroundColor: theme.palette.grey[300],
  marginBottom: theme.spacing(1),
}));

export default ClassroomPage;
