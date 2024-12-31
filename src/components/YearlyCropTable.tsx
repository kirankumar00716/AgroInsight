import { Table, ScrollArea, Text, Paper } from "@mantine/core";

type YearlyCropTableProps = {
  data: { year: string; maxCrop: string; minCrop: string }[];
};

export const YearlyCropTable: React.FC<YearlyCropTableProps> = ({ data }) => {
  return (
    <Paper shadow="xs" p="md" style={{ borderRadius: "8px" }}>
      <ScrollArea>
        <Table highlightOnHover striped style={{ minWidth: "100%" ,border:"1px solid black", }}>
          <thead style={{backgroundColor:"black",color:"white"}}>
            <tr>
              <th>Year</th>
              <th>Crop with Maximum Production</th>
              <th>Crop with Minimum Production</th>
            </tr>
          </thead>
          <tbody style={{backgroundColor:"white"}}>
            {data.map((row) => (
              <tr key={row.year} style={{border:"1px solid black"}}>
                <td style={{textAlign:"center",border:"1px solid black"}}>{row.year}</td>
                <td style={{textAlign:"center",border:"1px solid black"}}>{row.maxCrop}</td>
                <td style={{textAlign:"center",border:"1px solid black"}}>{row.minCrop}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
};
