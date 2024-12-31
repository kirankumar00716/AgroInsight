import "@mantine/core/styles.css";
import { MantineProvider, Container, Title, Grid,Modal,Button,Text } from "@mantine/core"; // Import Grid from @mantine/core
import {YearlyCropTable} from "./components/YearlyCropTable";
import { CropYieldChart } from "./components/CropYieldChart";
import rawData from "./data/Manufac _ India Agro Dataset.json";
import { processDataForTable, processDataForChart } from "./utils/dataProcessing";
import { theme } from "./theme";
import { useState } from "react";
import { FloatingButton } from "./components/FloatingButton";

export default function App() {
  const tableData = processDataForTable(rawData);
  const chartData = processDataForChart(rawData);
  const [modalOpen, setModalOpen] = useState(false);

  const handleContactClick = () => {
    setModalOpen(true);
  };

  return (
    <MantineProvider theme={theme}>
      <Container size="lg" style={{ padding: "20px"}}>
        <Title order={1} align="center" mb="xl">
          Agriculture Data Visualization
        </Title>

        <Grid>
          <Grid.Col xs={12} md={6}> {/* Use Grid.Col instead of Col */}
            <Title order={2} align="center" mb="md">
              Yearly Crop Table
            </Title>
            <YearlyCropTable data={tableData} />
          </Grid.Col>

          <Grid.Col xs={12} md={6}> {/* Use Grid.Col instead of Col */}
            <Title order={2} align="center" mb="md">
              Average Yield Chart
            </Title>
            <CropYieldChart data={chartData} />
          </Grid.Col>
        </Grid>
        {/* Main content */}
        <FloatingButton onClick={handleContactClick} />
        <Modal
          opened={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Contact Me"
          style={{fontWeight:"bold"}}
        >
          <Text>Thank you for reaching out! You can contact me at:</Text>
          <Text weight={500} mt="sm">
            Email: kirankumar.mekala2003@gmail.com
          </Text>
          <Button
            fullWidth
            mt="md"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            onClick={() => setModalOpen(false)}
          >
            Close
          </Button>
        </Modal>
      </Container>
    </MantineProvider>
  );
}
