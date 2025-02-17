// import { Box, Text } from "@chakra-ui/react";
// import PropTypes from "prop-types";
// import { useDrag } from "react-dnd";

// const IssueCard = ({ id, title, number, createdAt, user, comments }) => {

//   const [{ isDragging }, drag] = useDrag({
//     type: "ISSUE",
//     item: { id: id, title: title },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });


//   return (
//     <Box
//       ref={drag}
//       cursor="pointer"
//       bg="white"
//       p={3}
//       borderRadius="lg"
//       boxShadow="md"
//       w="full"
//       minH="120px"
//       display="flex"
//       flexDirection="column"
//       justifyContent="space-between"
//       opacity={isDragging ? 0.5 : 1}
//     >
//       <Text fontWeight="bold" noOfLines={2}>
//         {title}
//       </Text>
//       <Text fontSize="sm">
//         #{number} opened {createdAt}
//       </Text>
//       <Text fontSize="xs" color="gray.600">
//         {user} | Comments: {comments}
//       </Text>
//     </Box>
//   );
// };

// IssueCard.propTypes = {
//   title: PropTypes.string.isRequired,
//   number: PropTypes.number.isRequired,
//   createdAt: PropTypes.string.isRequired,
//   user: PropTypes.string.isRequired,
//   comments: PropTypes.number.isRequired,
//   id: PropTypes.number.isRequired,
// };

// export default IssueCard;

import { Box, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { reorderIssues } from "../redux/issuesSlice";

const IssueCard = ({ id, title, number, createdAt, user, comments, index, column }) => {
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: "ISSUE",
    item: { id, index, column },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "ISSUE",
    hover: (draggedItem) => {
      if (draggedItem.id !== id && draggedItem.column === column) {
        dispatch(
          reorderIssues({
            sourceIndex: draggedItem.index,
            destinationIndex: index,
            column,
          })
        );
        draggedItem.index = index; // Оновлюємо індекс перетягуваного елемента
      }
    },
  });

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
