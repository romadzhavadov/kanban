import PropTypes from "prop-types";
import { Box, Heading, VStack } from "@chakra-ui/react";
import IssueCard from "./IssueCard";
import { useDispatch, useSelector } from "react-redux";
import useIssueColumnDrop from "../hooks/useIssueColumnDrop";
import { updateIssueState } from "../Redux/issuesSlice";


const ColumnIssue = ({ title }) => {
  const dispatch = useDispatch();
  const issues = useSelector((state) => state.issues.data);
  const order = useSelector((state) => state.issues.order);

  const issuesInColumn = order[title].map((id) => issues.find((issue) => issue.id === id));
  
  
  const moveIssue = (issueId, newState, index) => {
    dispatch(updateIssueState({ issueId, newState, index }));
  };
  const { isOver, drop } = useIssueColumnDrop(title, moveIssue)

  return (
    <VStack w="33%" minH="600px" spacing={4} align="stretch">
      <Heading size="md" textAlign="center">
        {title}
      </Heading>
      <Box ref={drop} bg={isOver ? "gray.300" : "gray.300"} p={4} borderRadius="lg" flex="1">
        <VStack spacing={4}>
          {issuesInColumn.map((issue, index) => (
            <IssueCard
              key={issue.id}
              id={issue.id}
              title={issue.title}
              number={issue.number}
              createdAt={new Date(issue.created_at).toDateString()}
              user={issue.user.login}
              comments={issue.comments}
              index={index}
              column={title}
            />
          ))}
        </VStack>
      </Box>
    </VStack>
  );
};

ColumnIssue.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ColumnIssue;
