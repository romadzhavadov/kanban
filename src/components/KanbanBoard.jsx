import { useState } from "react";
import { Input, Button, VStack, HStack, Text, Link } from "@chakra-ui/react";
import ColumnIssue from "./ColumnIssue";
import { fetchIssues } from "../Redux/issuesSlice";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const KanbanBoard = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const dispatch = useDispatch();

  const error = useSelector((state) => state.issues.error);
  const owner = useSelector((state) => state.issues.owner);
  const repo = useSelector((state) => state.issues.repo);

  return (
    <DndProvider backend={HTML5Backend}>
      <VStack p={6} align="stretch">
        {/* Введення URL */}
        <HStack spacing={4}>
          <Input
            placeholder="Enter repo URL"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            borderRadius="lg"
            border="1px solid black"
            p={2}
            w="90%"
          />
          <Button
            bg="white"
            color="black"
            border="1px solid black"
            px={4}
            py={2}
            borderRadius="lg"
            _hover={{ bg: "gray.100", borderColor: "gray.500" }}
            onClick={() => dispatch(fetchIssues(repoUrl))}
          >
            Load Issues
          </Button>
        </HStack>

        {/* Відображення помилки */}
        {error && <Text color="red.500" fontSize="sm" mt={2}>{error}</Text>}

        {/* Посилання на профіль та репозиторій */}
        {owner && repo && (
          <HStack spacing={2} mt={4}>
            <Link
              href={`https://github.com/${owner}`}
              color="blue.500"
              fontSize="sm"
              fontWeight="bold"
              isExternal
            >
              {owner}
            </Link>
            <Text color="gray.600" fontSize="sm">/</Text>
            <Link
              href={`https://github.com/${owner}/${repo}`}
              color="blue.500"
              fontSize="sm"
              fontWeight="bold"
              isExternal
            >
              {repo}
            </Link>
          </HStack>
        )}

        {/* Колонки */}
        <HStack mt={6} spacing={4} align="stretch">
          <ColumnIssue title="ToDo" />
          <ColumnIssue title="In Progress" />
          <ColumnIssue title="Done" />
        </HStack>
      </VStack>
    </DndProvider>
  );
};

export default KanbanBoard;


