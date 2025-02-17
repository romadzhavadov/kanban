import { Box } from "@chakra-ui/react";
import KanbanBoard from "./components/KanbanBoard";

function App() {
  return (
    <Box minH="100vh" w="100vw" bg="gray.100" p={10}>
      <KanbanBoard />
    </Box>
  );
}

export default App;

