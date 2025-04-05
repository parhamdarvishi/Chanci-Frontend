import { ConvertAnswersToPromptResponse } from "@/shared/types/chanci/chanci"
import { Divider, Table } from "@mantine/core"

export const AnswerToPrompts = ({answerPrompt = null} : {answerPrompt : ConvertAnswersToPromptResponse | null  })=> {
    return(
      <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
  
        <div style={{ maxWidth: "800px" }}>
          <h4>personality</h4>
          <div>{answerPrompt?.jobRecommendation.personality}</div>
        </div>
  
        <div>
          <h4>highestScoringPersonality</h4>
          <div>{answerPrompt?.jobRecommendation.highestScoringPersonality}</div>
        </div>
  
        <div>
          <h4>certificateSuggestions</h4>
          {answerPrompt?.jobRecommendation.certificateSuggestions?.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
  
        <div>
          <h4>courseSuggestions</h4>
          {answerPrompt?.jobRecommendation.courseSuggestions?.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
  
        <div>
          <h4>hardSkillPotentialGaps</h4>
          {answerPrompt?.jobRecommendation.hardSkillPotentialGaps?.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
  
        <div>
          <h4>The industries that you select</h4>
          {answerPrompt?.jobRecommendation.industryRecommendations?.map((item, index) => (
            <div key={index} style={{ padding: ".5rem" }}>
              <div>
                <span style={{ color: "#08CD6A" }}>Name:</span>{" "}
                {item.industryName}
              </div>
              <div style={{ maxWidth: "800px" }}>
                <span style={{ color: "#08CD6A" }}>Description:</span>{" "}
                {item.industryDescription}
              </div>
              <div style={{ maxWidth: "800px" }}>
                <span style={{ color: "#08CD6A" }}>Why:</span> {item.why}
              </div>
              {/* <div>
                <span style={{ color: "#08CD6A" }}>Percentage:</span>{" "}
                {item.percentage}
              </div> */}
              <div>
                <span style={{ color: "#08CD6A" }}>JobTitles:</span>
                <div>
                  {item.jobTitles?.map((jobTitle, idx) => (
                    <div key={idx}>{jobTitle}</div>
                  ))}
                </div>
              </div>
              <Divider style={{ marginTop: ".5rem" }} />
            </div>
          ))}
        </div>
  
        <div style={{ padding: ".5rem 0" }}>
          <h4>networkingOpportunitiesSuggestions:</h4>
          <div>
            {answerPrompt?.jobRecommendation.networkingOpportunitiesSuggestions?.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </div>
  
        <div style={{ padding: ".5rem 0" }}>
          <h4>softSkillPotentialGaps:</h4>
          <div>
            {answerPrompt?.jobRecommendation.softSkillPotentialGaps?.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </div>
  
        <div style={{ padding: ".5rem 0" }}>
          <h4>strengths:</h4>
          <div>
            {answerPrompt?.jobRecommendation.strengths?.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </div>
  
        <div style={{ padding: ".5rem 0" }}>
          <h4>Industry Scores:</h4>
          <Table striped highlightOnHover withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Index</Table.Th>
                <Table.Th>Industry</Table.Th>
                <Table.Th>Score</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {answerPrompt?.industryScores?.map((item, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{index + 1}</Table.Td>
                  <Table.Td>{item.name}</Table.Td>
                  <Table.Td>{item.score}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      </div>
    )
  }