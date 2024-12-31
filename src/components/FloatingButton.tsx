import { Button, Tooltip } from "@mantine/core";

type FloatingButtonProps = {
  onClick: () => void;
};

export const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  return (
    <Tooltip label="Contact Me" position="left" withArrow>
      <Button
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
        radius="xl"
        size="lg"
        variant="gradient"
        gradient={{ from: "blue", to: "cyan" }}
        onClick={onClick}
      >
        Contact Me
      </Button>
    </Tooltip>
  );
};
