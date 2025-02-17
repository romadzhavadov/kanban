import { useDrop } from "react-dnd";

const useIssueColumnDrop = (title, moveIssue) => {
  const [{ isOver }, drop] = useDrop({
    accept: "ISSUE",
    drop: (item) => {
      if (item.column !== title) {
        moveIssue(item.id, title, item.index);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return { isOver, drop };
};

export default useIssueColumnDrop;