import { useDrag } from "react-dnd";

const useIssueCardDrag = (id, index, column ) => {
  const [{ isDragging }, drag] = useDrag({
    type: "ISSUE",
    item: { id, index, column },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return { isDragging, drag };
};

export default useIssueCardDrag;