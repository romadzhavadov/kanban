import { useDrop } from "react-dnd";
import { reorderIssues } from "../Redux/issuesSlice";

const useIssueCardDrop = (id, index, column, dispatch ) => {
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
        draggedItem.index = index; 
      }
    },
  });
  return { drop };
};

export default useIssueCardDrop;