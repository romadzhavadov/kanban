// import { useState } from "react";
// import { Input, Button, VStack, HStack, Text } from "@chakra-ui/react";
// import ColumnIssue from "./ColumnIssue";
// import { fetchIssues, updateIssueState } from "../Redux/issuesSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

// const KanbanBoard = () => {
//   const [repoUrl, setRepoUrl] = useState("");

//   const dispatch = useDispatch();

//   const moveIssue = (issueId, newState) => {
//     dispatch(updateIssueState({ issueId, newState }));
//   };

//   const issues = useSelector((state) => state.issues.data);
//   const error = useSelector((state) => state.issues.error);
//   const owner = useSelector((state) => state.issues.owner);
//   const repo = useSelector((state) => state.issues.repo);
//     console.log(issues)
//   const loadIssues = () => {
//     try {
//       dispatch(fetchIssues(repoUrl));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const todoIssues = issues.filter(
//     (issue) => issue.state === "open" && !issue.assignee
//   );
//   const inProgressIssues = issues.filter(
//     (issue) => issue.state === "open" && issue.assignee
//   );
//   const doneIssues = issues.filter((issue) => issue.state === "closed");

//   return (
//       <DndProvider backend={HTML5Backend}>
//         <VStack p={6} align="stretch">
//           <HStack spacing={4}>
//             <Input
//               placeholder="Enter repo URL"
//               value={repoUrl}
//               onChange={(e) => setRepoUrl(e.target.value)}
//               borderRadius="lg"
//               border="1px solid black"
//               p={2}
//               w="90%" 
//             />
//             <Button
//               bg="white" 
//               color="black" 
//               border="1px solid black" 
//               px={4}
//               py={2}
//               borderRadius="lg"
//               _hover={{ bg: "gray.100", borderColor: "gray.500" }} 
//               onClick={loadIssues}
//             >
//               Load Issues
//             </Button>
//           </HStack>

//           {error && <Text color="red.500" fontSize="sm" mt={2}>{error}</Text>}
      
//           {owner && repo &&

//             <HStack spacing={1} mt={2}>
//               <Text color="blue.500" fontSize="sm" fontWeight="bold" cursor="pointer">
//                 {owner}
//               </Text>
//               <Text color="blue.500" fontSize="sm" fontWeight="bold"> &gt; </Text>
//               <Text color="blue.500" fontSize="sm" fontWeight="bold" cursor="pointer">
//                 {repo}
//               </Text>
//             </HStack>
//           }
//           <HStack mt={6} spacing={4} align="stretch">
//             <ColumnIssue title="ToDo" issues={todoIssues} moveIssue={moveIssue}/>
//             <ColumnIssue title="In Progress" issues={inProgressIssues} moveIssue={moveIssue}/>
//             <ColumnIssue title="Done" issues={doneIssues} moveIssue={moveIssue}/>
//           </HStack>
//             </VStack>
//       </DndProvider>

//   );
// };

// export default KanbanBoard;



import { useState, useEffect } from "react";
import { Input, Button, VStack, HStack, Text } from "@chakra-ui/react";
import ColumnIssue from "./ColumnIssue";
import { fetchIssues, updateIssueState } from "../redux/issuesSlice";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const KanbanBoard = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (repoUrl) {
  //     dispatch(fetchIssues(repoUrl));
  //   }
  // }, [repoUrl, dispatch]);

  const moveIssue = (issueId, newState) => {
    dispatch(updateIssueState({ issueId, newState }));
    console.log(issueId, newState)
  };

  const issues = useSelector((state) => state.issues.data) || [];
  const error = useSelector((state) => state.issues.error);
  const owner = useSelector((state) => state.issues.owner);
  const repo = useSelector((state) => state.issues.repo);

  const todoIssues = issues.filter(
    (issue) => issue.state === "open" && !issue.assignee
  );
  const inProgressIssues = issues.filter(
    (issue) => issue.state === "open" && issue.assignee
  );
  const doneIssues = issues.filter((issue) => issue.state === "closed");

  return (
    <DndProvider backend={HTML5Backend}>
      <VStack p={6} align="stretch">
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

        {error && <Text color="red.500" fontSize="sm" mt={2}>{error}</Text>}

        {owner && repo && (
          <HStack spacing={1} mt={2}>
            <Text color="blue.500" fontSize="sm" fontWeight="bold" cursor="pointer">
              {owner}
            </Text>
            <Text color="blue.500" fontSize="sm" fontWeight="bold"> &gt; </Text>
            <Text color="blue.500" fontSize="sm" fontWeight="bold" cursor="pointer">
              {repo}
            </Text>
          </HStack>
        )}

        <HStack mt={6} spacing={4} align="stretch">
          <ColumnIssue title="ToDo" issues={todoIssues} moveIssue={moveIssue} />
          <ColumnIssue title="In Progress" issues={inProgressIssues} moveIssue={moveIssue} />
          <ColumnIssue title="Done" issues={doneIssues} moveIssue={moveIssue} />
        </HStack>
      </VStack>
    </DndProvider>
  );
};

export default KanbanBoard;


