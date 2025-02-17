import { Box, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import useIssueCardDrag from "../hooks/useIssueCardDrag";
import useIssueCardDrop from "../hooks/useIssueCardDrop";

const IssueCard = ({ id, title, number, createdAt, user, comments, index, column }) => {
  
  const dispatch = useDispatch();

  const { isDragging, drag } = useIssueCardDrag(id, index, column);
  const { drop } = useIssueCardDrop(id, index, column, dispatch);


  return (
    <Box
      ref={(node) => drag(drop(node))}
      cursor="pointer"
      bg="white"
      p={3}
      borderRadius="lg"
      boxShadow="md"
      w="full"
      minH="120px"
      opacity={isDragging ? 0.5 : 1}
      transition="transform 0.2s ease-in-out"
    >
      <Text fontWeight="bold" noOfLines={2}>
        {title}
      </Text>
      <Text fontSize="sm">
        #{number} opened {createdAt}
      </Text>
      <Text fontSize="xs" color="gray.600">
        {user} | Comments: {comments}
      </Text>
    </Box>
  );
};

IssueCard.propTypes = {
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  comments: PropTypes.number.isRequired,
  column: PropTypes.string.isRequired,
};

export default IssueCard;
