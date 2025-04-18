import { Box, Button } from "@mantine/core";
import { AnsweriItem } from "@/shared/types/chanci/chanci";
import styles from "@/features/shared/styles.module.scss"
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
interface ChanciNavigationProps {
    previousVisibleCondition: boolean;
    forwardVisibleCondition: boolean;
    handlePreviousQuestion: ()=> void,
    handleNextQuestion: ()=> void,
}
const ChanciNavigation = ({previousVisibleCondition, forwardVisibleCondition, handlePreviousQuestion, handleNextQuestion}: ChanciNavigationProps)=> {
    return(
        <Box className={styles.backForwardWrapper}>
        <Box
          className={styles.backForwardBtnBox}
          style={{
            opacity: previousVisibleCondition ? 1 : 0,
            transform:
            previousVisibleCondition ? "translateX(0)" : "translateX(-20px)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            visibility: previousVisibleCondition ? "visible" : "hidden",
          }}
        >
          <Button
            variant="light"
            className={styles.backForwardBtn}
            onClick={handlePreviousQuestion}
          >
            <IconArrowNarrowLeft size={16} /><span style={{fontWeight: 400}}>Back</span>
          </Button>
        </Box>
        <Box
          style={{
            padding: "0 1rem",
            opacity:
            forwardVisibleCondition ? 1 : 0,
            transform:
            forwardVisibleCondition
                ? "translateX(0)"
                : "translateX(20px)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            visibility:
            forwardVisibleCondition
                ? "visible"
                : "hidden",
          }}
        >
          <Button
            variant="light"
            className={styles.backForwardBtn}
            onClick={handleNextQuestion}
          >
            <IconArrowNarrowRight size={16} /> <span style={{fontWeight: 400}}>Forward</span>
          </Button>
        </Box>
      </Box>
    )
}
export default ChanciNavigation;