// import PropTypes from "prop-types";
// import { Box, Heading, VStack } from "@chakra-ui/react";
// import IssueCard from "./IssueCard";
// import { useDrop } from "react-dnd";

// const ColumnIssue = ({ title, issues, moveIssue  }) => {

//   const [{ isOver }, drop] = useDrop({
//     accept: "ISSUE",
//     drop: (item) => moveIssue(item.id, title),
//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//     }),
//   });

//   return (
//     <VStack w="33%" minH="600px" spacing={4} align="stretch">
//       <Heading size="md" textAlign="center">
//         {title}
//       </Heading>
//       <Box
//         ref={drop}
//         bg={isOver ? "gray.300" : "gray.300"}
//         p={4}
//         borderRadius="lg"
//         flex="1"
//       >
//         <VStack spacing={4}>
//           {issues.map((issue) => (
//             <IssueCard
//               key={issue.id}
//               title={issue.title}
//               id={issue.id}
//               number={issue.number}
//               createdAt={new Date(issue.created_at).toDateString()}
//               user={issue.user.login}
//               comments={issue.comments}
//             />
//           ))}
//         </VStack>
//       </Box>
//     </VStack>
//   );
// };

// ColumnIssue.propTypes = {
//   title: PropTypes.string.isRequired,
//   issues: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       title: PropTypes.string.isRequired,
//       number: PropTypes.number.isRequired,
//       created_at: PropTypes.string.isRequired,
//       user: PropTypes.shape({
//         login: PropTypes.string.isRequired,
//       }).isRequired,
//       comments: PropTypes.number.isRequired,
//     })
//   ).isRequired,
//   moveIssue: PropTypes.func.isRequired,
// };

// export default ColumnIssue;


import PropTypes from "prop-types";
import { Box, Heading, VStack } from "@chakra-ui/react";
import IssueCard from "./IssueCard";
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";



const ColumnIssue = ({ title, moveIssue}) => {

  const issuess = useSelector((state) => state.issues.data);
  const order = useSelector((state) => state.issues.order);

  // Фільтруємо задачі за колонкою, зберігаючи порядок з `order`
  const issuesInColumn = order[title].map((id) => issuess.find((issue) => issue.id === id));
  const [{ isOver }, drop] = useDrop({
    accept: "ISSUE",
    // drop: (item) => moveIssue(item.id, title),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

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
              moveIssue={moveIssue}
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
  issues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      created_at: PropTypes.string.isRequired,
      user: PropTypes.shape({
        login: PropTypes.string.isRequired,
      }).isRequired,
      comments: PropTypes.number.isRequired,
    })
  ).isRequired,
  moveIssue: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired,
};

export default ColumnIssue;
